// Code written and maintained by Elisee Kajingu
//src/supabaseClient.js
import { createClient } from "@supabase/supabase-js";

// Replace these with your actual Supabase URL and anon key
const supabaseUrl = "https://okodssiizzhosgsoiynr.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9rb2Rzc2lpenpob3Nnc29peW5yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUyNTgyMDcsImV4cCI6MjA2MDgzNDIwN30.wwA0WG_iiinmAnEHgmXYk-uR-xpqIXnxAR6xNkRY9gc";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
