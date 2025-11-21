// Script to set up Neon database schema
// Run with: node setup-neon-db.js

import { neon } from '@neondatabase/serverless';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Get database URL from command line or environment
const databaseUrl = process.argv[2] || process.env.VITE_DATABASE_URL;

if (!databaseUrl) {
  console.error('❌ Error: No database URL provided');
  console.log('\nUsage:');
  console.log('  node setup-neon-db.js <your-neon-connection-string>');
  console.log('\nOr set VITE_DATABASE_URL in your .env file and run:');
  console.log('  node setup-neon-db.js');
  console.log('\nGet your connection string from: https://console.neon.tech');
  process.exit(1);
}

console.log('🚀 Setting up Neon database...\n');

const sql = neon(databaseUrl);

async function setupDatabase() {
  try {
    // Read the schema file
    const schemaPath = join(__dirname, 'neon', 'schema.sql');
    const schema = readFileSync(schemaPath, 'utf-8');
    
    console.log('📄 Reading schema from neon/schema.sql...');
    
    // Split the schema into individual statements
    const statements = schema
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'));
    
    console.log(`📝 Found ${statements.length} SQL statements to execute\n`);
    
    // Execute the entire schema as one statement
    console.log('Executing schema...\n');

    try {
      // Use the neon client's query method for raw SQL
      await sql([schema]);
      console.log('✅ Schema executed successfully!\n');
    } catch (error) {
      // If that doesn't work, try executing the whole thing as a tagged template
      try {
        await sql`${schema}`;
        console.log('✅ Schema executed successfully!\n');
      } catch (error2) {
        console.error('❌ Error executing schema:', error2.message);
        console.log('\n⚠️  Trying to execute via Neon SQL Editor instead...\n');
        console.log('Please do the following:');
        console.log('1. Go to https://console.neon.tech');
        console.log('2. Select your project');
        console.log('3. Go to SQL Editor');
        console.log('4. Copy the contents of neon/schema.sql');
        console.log('5. Paste and run it in the SQL Editor\n');
        process.exit(1);
      }
    }
    
    console.log('✨ Database setup complete!\n');
    console.log('Next steps:');
    console.log('1. Make sure your .env file has VITE_DATABASE_URL set');
    console.log('2. Add your VITE_OPENAI_API_KEY to .env');
    console.log('3. Run: npm run dev');
    console.log('4. Open http://localhost:5173 in your browser\n');
    
  } catch (error) {
    console.error('❌ Fatal error:', error.message);
    console.error(error);
    process.exit(1);
  }
}

setupDatabase();

