/**
 * Terjemahkan kegagalan masuk menjadi pesan yang bisa ditindaklanjuti.
 *
 * Kegagalan jaringan dari fetch hanya berbunyi "Failed to fetch", yang tidak
 * memberi tahu apa pun tentang penyebabnya.
 */
export function describeSignInError(error: unknown) {
  const message = error instanceof Error ? error.message : ''

  if (/failed to fetch|network|fetch failed/i.test(message)) {
    return 'Tidak bisa menghubungi Supabase. Periksa NEXT_PUBLIC_SUPABASE_URL dan koneksi jaringan.'
  }

  if (/invalid login credentials/i.test(message)) {
    return 'Email atau kata sandi salah.'
  }

  return message || 'Gagal masuk.'
}
