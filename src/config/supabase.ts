import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY as string;

// Validación explícita
if (!supabaseUrl) {
  console.error('❌ SUPABASE_URL no está en process.env');
  console.error('Variables disponibles:', Object.keys(process.env));
  throw new Error('SUPABASE_URL is required. Verifica tu archivo .env');
}

if (!supabaseSecretKey) {
  console.error('❌ SUPABASE_SECRET_KEY no está en process.env');
  throw new Error('SUPABASE_SECRET_KEY is required');
}

console.log('✅ Supabase configurado con:', {
  url: supabaseUrl.substring(0, 20) + '...',
  keyExists: !!supabaseSecretKey
});


export const supabase = createClient(supabaseUrl, supabaseSecretKey);