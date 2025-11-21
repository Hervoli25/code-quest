// Simple script to test Neon database connection
// Run with: node test-connection.js <your-connection-string>

import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const databaseUrl = process.argv[2] || process.env.VITE_DATABASE_URL;

if (!databaseUrl) {
  console.error('❌ No database URL provided');
  console.log('\nUsage: node test-connection.js <connection-string>');
  console.log('Or set VITE_DATABASE_URL in .env file\n');
  process.exit(1);
}

console.log('🔌 Testing Neon database connection...\n');

const sql = neon(databaseUrl);

async function testConnection() {
  try {
    // Test basic connection
    console.log('1️⃣  Testing basic connection...');
    const result = await sql`SELECT NOW() as current_time, version() as pg_version`;
    console.log('✅ Connected successfully!');
    console.log(`   Time: ${result[0].current_time}`);
    console.log(`   PostgreSQL: ${result[0].pg_version.split(' ')[0]} ${result[0].pg_version.split(' ')[1]}\n`);
    
    // Check if tables exist
    console.log('2️⃣  Checking for tables...');
    const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' OR table_schema = 'auth'
      ORDER BY table_schema, table_name
    `;
    
    if (tables.length === 0) {
      console.log('⚠️  No tables found. Run: npm run setup-db\n');
    } else {
      console.log(`✅ Found ${tables.length} tables:`);
      tables.forEach(t => console.log(`   - ${t.table_name}`));
      console.log('');
    }
    
    // Check for required tables
    console.log('3️⃣  Checking required tables...');
    const requiredTables = ['users', 'profiles', 'skills', 'challenges', 'completed_challenges', 'performance_metrics', 'ai_challenges'];
    const existingTables = tables.map(t => t.table_name);
    
    const missing = requiredTables.filter(t => !existingTables.includes(t));
    
    if (missing.length > 0) {
      console.log(`⚠️  Missing tables: ${missing.join(', ')}`);
      console.log('   Run: npm run setup-db\n');
    } else {
      console.log('✅ All required tables exist!\n');
    }
    
    console.log('🎉 Connection test complete!\n');
    console.log('Next steps:');
    if (missing.length > 0) {
      console.log('1. Run: npm run setup-db');
      console.log('2. Add VITE_DATABASE_URL to your .env file');
      console.log('3. Run: npm run dev\n');
    } else {
      console.log('1. Make sure .env has VITE_DATABASE_URL and VITE_OPENAI_API_KEY');
      console.log('2. Run: npm run dev');
      console.log('3. Open http://localhost:5173\n');
    }
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    console.error('\nTroubleshooting:');
    console.error('- Check your connection string is correct');
    console.error('- Make sure it includes ?sslmode=require');
    console.error('- Verify your Neon project is active');
    console.error('- Check your internet connection\n');
    process.exit(1);
  }
}

testConnection();

