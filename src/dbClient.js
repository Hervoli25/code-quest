// Code written and maintained by Elisee Kajingu
// Database client using Neon Serverless with Supabase-compatible API

import { neon } from '@neondatabase/serverless';

// Get database URL from environment
const databaseUrl = import.meta.env.VITE_DATABASE_URL;

if (!databaseUrl) {
  console.error('VITE_DATABASE_URL is not set in environment variables');
}

// Create Neon SQL client
const sql = databaseUrl ? neon(databaseUrl) : null;

// Current user state
let currentUser = null;

// Initialize from localStorage
const initAuth = () => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('currentUser');
    if (stored) {
      try {
        currentUser = JSON.parse(stored);
      } catch (e) {
        localStorage.removeItem('currentUser');
      }
    }
  }
};

initAuth();

// Simple password hashing (for demo - use bcrypt in production)
async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + 'code-quest-salt');
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

async function verifyPassword(password, hash) {
  const hashedInput = await hashPassword(password);
  return hashedInput === hash;
}

// Supabase-compatible client object
export const supabase = {
  auth: {
    async signUp({ email, password, options = {} }) {
      if (!sql) {
        return {
          data: { user: null, session: null },
          error: { message: 'Database not configured' }
        };
      }

      const username = options.data?.username || email.split('@')[0];
      const hashedPassword = await hashPassword(password);

      try {
        // Create user in auth.users with all required fields
        const users = await sql`
          INSERT INTO auth.users (email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at)
          VALUES (${email}, ${hashedPassword}, NOW(), ${JSON.stringify({ username })}, NOW(), NOW())
          RETURNING id, email, created_at
        `;

        const user = users[0];

        // Create profile
        await sql`
          INSERT INTO profiles (id, username, created_at, updated_at)
          VALUES (${user.id}, ${username}, NOW(), NOW())
        `;

        // Create skills
        await sql`
          INSERT INTO skills (user_id, created_at, updated_at)
          VALUES (${user.id}, NOW(), NOW())
        `;

        // Create performance metrics
        await sql`
          INSERT INTO performance_metrics (user_id, created_at, updated_at)
          VALUES (${user.id}, NOW(), NOW())
        `;

        currentUser = { id: user.id, email: user.email };
        if (typeof window !== 'undefined') {
          localStorage.setItem('currentUser', JSON.stringify(currentUser));
        }

        return {
          data: {
            user: currentUser,
            session: { user: currentUser }
          },
          error: null
        };
      } catch (error) {
        console.error('Sign up error:', error);
        return {
          data: { user: null, session: null },
          error: { message: error.message }
        };
      }
    },
    
    async signInWithPassword({ email, password }) {
      if (!sql) {
        return {
          data: { user: null, session: null },
          error: { message: 'Database not configured' }
        };
      }

      try {
        const users = await sql`
          SELECT id, email, encrypted_password
          FROM auth.users
          WHERE email = ${email}
        `;

        if (users.length === 0) {
          return {
            data: { user: null, session: null },
            error: { message: 'Invalid credentials' }
          };
        }

        const user = users[0];
        const isValid = await verifyPassword(password, user.encrypted_password);

        if (!isValid) {
          return {
            data: { user: null, session: null },
            error: { message: 'Invalid credentials' }
          };
        }

        currentUser = { id: user.id, email: user.email };
        if (typeof window !== 'undefined') {
          localStorage.setItem('currentUser', JSON.stringify(currentUser));
        }

        return {
          data: {
            user: currentUser,
            session: { user: currentUser }
          },
          error: null
        };
      } catch (error) {
        console.error('Sign in error:', error);
        return {
          data: { user: null, session: null },
          error: { message: error.message }
        };
      }
    },
    
    async signOut() {
      currentUser = null;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('currentUser');
      }
      return { error: null };
    },
    
    async getSession() {
      if (currentUser) {
        return { data: { session: { user: currentUser } }, error: null };
      }
      return { data: { session: null }, error: null };
    },
    
    async getUser() {
      if (currentUser) {
        return { data: { user: currentUser }, error: null };
      }
      return { data: { user: null }, error: null };
    },
    
    onAuthStateChange(callback) {
      // Call immediately with current state
      if (currentUser) {
        setTimeout(() => callback('SIGNED_IN', { user: currentUser }), 0);
      } else {
        setTimeout(() => callback('SIGNED_OUT', null), 0);
      }
      
      // Return unsubscribe function
      return {
        data: {
          subscription: {
            unsubscribe: () => {}
          }
        }
      };
    }
  },

  // Expose SQL client for direct database access
  sql,

  // Database query helpers
  from(table) {
    return {
      select(columns = '*') {
        return {
          async eq(column, value) {
            const result = await sql`SELECT ${sql(columns)} FROM ${sql(table)} WHERE ${sql(column)} = ${value}`;
            return { data: result, error: null };
          },
          async then(resolve) {
            const result = await sql`SELECT ${sql(columns)} FROM ${sql(table)}`;
            resolve({ data: result, error: null });
          }
        };
      },
      async insert(data) {
        const columns = Object.keys(data);
        const values = Object.values(data);
        const placeholders = columns.map((_, i) => `$${i + 1}`).join(', ');

        try {
          const result = await sql`
            INSERT INTO ${sql(table)} (${sql(columns.join(', '))})
            VALUES (${values})
            RETURNING *
          `;
          return { data: result[0], error: null };
        } catch (error) {
          return { data: null, error };
        }
      },
      async update(data) {
        return {
          async eq(column, value) {
            const updates = Object.entries(data)
              .map(([k, v], i) => `${k} = $${i + 1}`)
              .join(', ');
            const values = [...Object.values(data), value];

            try {
              const result = await sql`
                UPDATE ${sql(table)}
                SET ${sql(updates)}
                WHERE ${sql(column)} = ${value}
                RETURNING *
              `;
              return { data: result, error: null };
            } catch (error) {
              return { data: null, error };
            }
          }
        };
      }
    };
  }
};

export default supabase;

