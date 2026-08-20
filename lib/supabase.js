import { createBrowserClient } from '@supabase/ssr'

export const supabase = createBrowserClient(
  "https://gkxbuxiwlmffictwxggy.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdreGJ1eGl3bG1mZmljdHd4Z2d5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcwMzEwNDYsImV4cCI6MjA5MjYwNzA0Nn0.htCIhYvf4KOrzrP2KvcUWkVIT7G9kW3E8abPBMn4LeI"
)