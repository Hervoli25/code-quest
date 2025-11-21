// Code written and maintained by Elisee Kajingu
// Neon Database Client
import { neon } from '@neondatabase/serverless';

// Get the database URL from environment variables
const databaseUrl = import.meta.env.VITE_DATABASE_URL;

if (!databaseUrl) {
  console.error('VITE_DATABASE_URL is not set in environment variables');
}

// Create the Neon SQL client
export const sql = databaseUrl ? neon(databaseUrl) : null;

// Helper function to execute queries
export async function query(text, params = []) {
  if (!sql) {
    throw new Error('Database connection not configured');
  }
  
  try {
    const result = await sql(text, params);
    return { data: result, error: null };
  } catch (error) {
    console.error('Database query error:', error);
    return { data: null, error };
  }
}

// User authentication helpers (simplified version)
export const auth = {
  currentUser: null,
  
  async signUp({ email, password, options = {} }) {
    const username = options.data?.username || email.split('@')[0];
    const hashedPassword = await hashPassword(password);
    
    const result = await query(
      `INSERT INTO auth.users (email, encrypted_password, raw_user_meta_data)
       VALUES ($1, $2, $3)
       RETURNING id, email, created_at`,
      [email, hashedPassword, JSON.stringify({ username })]
    );
    
    if (result.error) {
      return { data: null, error: result.error };
    }
    
    return { data: { user: result.data[0] }, error: null };
  },
  
  async signIn({ email, password }) {
    const result = await query(
      `SELECT id, email, encrypted_password, raw_user_meta_data
       FROM auth.users
       WHERE email = $1`,
      [email]
    );
    
    if (result.error || !result.data || result.data.length === 0) {
      return { data: null, error: new Error('Invalid credentials') };
    }
    
    const user = result.data[0];
    const isValid = await verifyPassword(password, user.encrypted_password);
    
    if (!isValid) {
      return { data: null, error: new Error('Invalid credentials') };
    }
    
    // Store user session
    this.currentUser = { id: user.id, email: user.email };
    localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
    
    return { data: { user: this.currentUser }, error: null };
  },
  
  async signOut() {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
    return { error: null };
  },
  
  async getSession() {
    const stored = localStorage.getItem('currentUser');
    if (stored) {
      this.currentUser = JSON.parse(stored);
      return { data: { session: { user: this.currentUser } }, error: null };
    }
    return { data: { session: null }, error: null };
  },
  
  async getUser() {
    if (this.currentUser) {
      return { data: { user: this.currentUser }, error: null };
    }
    return { data: { user: null }, error: null };
  },
  
  onAuthStateChange(callback) {
    // Simple implementation - in production, use proper event system
    const checkAuth = () => {
      const stored = localStorage.getItem('currentUser');
      if (stored) {
        this.currentUser = JSON.parse(stored);
        callback('SIGNED_IN', { user: this.currentUser });
      } else {
        callback('SIGNED_OUT', null);
      }
    };
    
    checkAuth();
    
    // Return unsubscribe function
    return {
      data: {
        subscription: {
          unsubscribe: () => {}
        }
      }
    };
  }
};

// Simple password hashing (in production, use bcrypt or similar)
async function hashPassword(password) {
  // This is a placeholder - in production, use proper hashing
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

async function verifyPassword(password, hash) {
  const hashedInput = await hashPassword(password);
  return hashedInput === hash;
}

export default { sql, query, auth };

