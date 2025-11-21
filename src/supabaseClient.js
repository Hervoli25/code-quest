// Code written and maintained by Elisee Kajingu
// Database client - now using Prisma with Neon
// This file re-exports the Prisma-based client for backward compatibility

export { supabase, default } from './dbClient.js';

// Legacy code below (kept for reference, not used)
/*
import { neon } from '@neondatabase/serverless';

// Get the database URL from environment variables
const databaseUrl = import.meta.env.VITE_DATABASE_URL;

if (!databaseUrl) {
  console.warn('VITE_DATABASE_URL is not set. Please add it to your .env file');
}

// Create the Neon SQL client
const sql = databaseUrl ? neon(databaseUrl) : null;

// Current user state
let currentUser = null;

// Initialize from localStorage
const initAuth = () => {
  const stored = localStorage.getItem('currentUser');
  if (stored) {
    try {
      currentUser = JSON.parse(stored);
    } catch (e) {
      localStorage.removeItem('currentUser');
    }
  }
};

initAuth();

// Helper function to execute queries
async function executeQuery(queryText, params = []) {
  if (!sql) {
    throw new Error('Database connection not configured. Please set VITE_DATABASE_URL in your .env file');
  }

  try {
    const result = await sql(queryText, params);
    return { data: result, error: null };
  } catch (error) {
    console.error('Database query error:', error);
    return { data: null, error };
  }
}

// Simple password hashing
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
      const username = options.data?.username || email.split('@')[0];
      const hashedPassword = await hashPassword(password);

      const result = await executeQuery(
        `INSERT INTO auth.users (email, encrypted_password, raw_user_meta_data, email_confirmed_at)
         VALUES ($1, $2, $3, NOW())
         RETURNING id, email, created_at`,
        [email, hashedPassword, JSON.stringify({ username })]
      );

      if (result.error) {
        return { data: { user: null, session: null }, error: result.error };
      }

      const user = result.data[0];
      currentUser = { id: user.id, email: user.email };
      localStorage.setItem('currentUser', JSON.stringify(currentUser));

      return {
        data: {
          user: currentUser,
          session: { user: currentUser }
        },
        error: null
      };
    },

    async signInWithPassword({ email, password }) {
      const result = await executeQuery(
        `SELECT id, email, encrypted_password, raw_user_meta_data
         FROM auth.users
         WHERE email = $1`,
        [email]
      );

      if (result.error || !result.data || result.data.length === 0) {
        return {
          data: { user: null, session: null },
          error: new Error('Invalid credentials')
        };
      }

      const user = result.data[0];
      const isValid = await verifyPassword(password, user.encrypted_password);

      if (!isValid) {
        return {
          data: { user: null, session: null },
          error: new Error('Invalid credentials')
        };
      }

      currentUser = { id: user.id, email: user.email };
      localStorage.setItem('currentUser', JSON.stringify(currentUser));

      return {
        data: {
          user: currentUser,
          session: { user: currentUser }
        },
        error: null
      };
    },

    async signOut() {
      currentUser = null;
      localStorage.removeItem('currentUser');
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

  // Database query methods (Supabase-compatible API)
  from(table) {
    return {
      select(columns = '*') {
        let query = `SELECT ${columns} FROM ${table}`;
        let whereClause = '';
        let orderClause = '';
        let limitClause = '';
        let singleResult = false;

        return {
          async eq(column, value) {
            whereClause = ` WHERE ${column} = $1`;
            const result = await executeQuery(query + whereClause + orderClause + limitClause, [value]);
            return singleResult && result.data ? { ...result, data: result.data[0] || null } : result;
          },

          async neq(column, value) {
            whereClause = ` WHERE ${column} != $1`;
            const result = await executeQuery(query + whereClause + orderClause + limitClause, [value]);
            return singleResult && result.data ? { ...result, data: result.data[0] || null } : result;
          },

          order(column, options = {}) {
            const direction = options.ascending === false ? 'DESC' : 'ASC';
            orderClause = ` ORDER BY ${column} ${direction}`;
            return this;
          },

          limit(count) {
            limitClause = ` LIMIT ${count}`;
            return this;
          },

          single() {
            singleResult = true;
            limitClause = ' LIMIT 1';
            return this;
          },

          async then(resolve, reject) {
            try {
              const result = await executeQuery(query + whereClause + orderClause + limitClause);
              const finalResult = singleResult && result.data ? { ...result, data: result.data[0] || null } : result;
              resolve(finalResult);
            } catch (error) {
              reject(error);
            }
          }
        };
      },

      async insert(data) {
        const isArray = Array.isArray(data);
        const records = isArray ? data : [data];

        if (records.length === 0) {
          return { data: null, error: new Error('No data to insert') };
        }

        const columns = Object.keys(records[0]);
        const values = records.map((record, idx) => {
          const placeholders = columns.map((_, colIdx) => `$${idx * columns.length + colIdx + 1}`);
          return `(${placeholders.join(', ')})`;
        }).join(', ');

        const allValues = records.flatMap(record => columns.map(col => record[col]));

        const query = `INSERT INTO ${table} (${columns.join(', ')}) VALUES ${values} RETURNING *`;
        const result = await executeQuery(query, allValues);

        return isArray ? result : { ...result, data: result.data?.[0] || null };
      },

      async update(data) {
        const columns = Object.keys(data);
        const setClause = columns.map((col, idx) => `${col} = $${idx + 1}`).join(', ');
        const values = columns.map(col => data[col]);

        return {
          async eq(column, value) {
            const query = `UPDATE ${table} SET ${setClause} WHERE ${column} = $${values.length + 1} RETURNING *`;
            return executeQuery(query, [...values, value]);
          }
        };
      },

      async delete() {
        return {
          async eq(column, value) {
            const query = `DELETE FROM ${table} WHERE ${column} = $1 RETURNING *`;
            return executeQuery(query, [value]);
          }
        };
      }
    };
  }
};
*/
