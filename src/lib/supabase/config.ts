export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''

/** Nama tabel dan bucket, disamakan dengan berkas migrasi di supabase/migrations. */
export const LANDING_CONTENT_TABLE = 'landing_content'
export const LANDING_CONTENT_ID = 'default'
export const PACKAGE_PHOTO_BUCKET = 'package-photos'

/**
 * Supabase bersifat opsional.
 *
 * Selama kedua variable belum diisi, aplikasi tetap jalan dengan mode lokal:
 * konten disimpan di localStorage dan login memakai kredensial .env.local.
 * Begitu diisi, seluruh layanan otomatis beralih ke Supabase.
 */
export function isSupabaseConfigured() {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY)
}
