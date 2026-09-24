import { createClient } from '@supabase/supabase-js'

// La clé "publishable" est sans danger à exposer côté navigateur : la sécurité
// est assurée par les règles RLS définies sur les tables (voir supabase_setup.sql).
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('⚠️ Variables Supabase manquantes — vérifie ton fichier .env (voir .env.example)')
}

export const supabase = createClient(supabaseUrl, supabaseKey)
