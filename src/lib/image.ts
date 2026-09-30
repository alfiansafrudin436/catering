export const MAX_IMAGE_BYTES = 400 * 1024
export const MAX_IMAGE_EDGE = 1200

export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp']

function readAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = () => reject(new Error('Gagal membaca berkas.'))
    reader.readAsDataURL(file)
  })
}

function loadImage(dataUrl: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image()
    image.onload = () => resolve(image)
    image.onerror = () => reject(new Error('Berkas bukan gambar yang valid.'))
    image.src = dataUrl
  })
}

/** Perkirakan ukuran byte dari panjang string data URL base64. */
export function dataUrlBytes(dataUrl: string) {
  const base64 = dataUrl.split(',')[1] ?? ''

  return Math.ceil((base64.length * 3) / 4)
}

/**
 * Ubah berkas gambar menjadi data URL JPEG yang sudah diperkecil.
 *
 * Konten disimpan di localStorage yang kuotanya sekitar 5 MB, jadi gambar
 * diturunkan resolusinya dan kualitasnya sampai muat sebelum disimpan.
 */
export async function fileToCompressedDataUrl(file: File): Promise<string> {
  if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
    throw new Error('Format harus JPG, PNG, atau WebP.')
  }

  const original = await readAsDataUrl(file)
  const image = await loadImage(original)

  const scale = Math.min(1, MAX_IMAGE_EDGE / Math.max(image.width, image.height))
  const canvas = document.createElement('canvas')
  canvas.width = Math.round(image.width * scale)
  canvas.height = Math.round(image.height * scale)

  const context = canvas.getContext('2d')
  if (!context) throw new Error('Browser tidak mendukung pemrosesan gambar.')
  context.drawImage(image, 0, 0, canvas.width, canvas.height)

  for (const quality of [0.82, 0.7, 0.6, 0.5, 0.4]) {
    const candidate = canvas.toDataURL('image/jpeg', quality)
    if (dataUrlBytes(candidate) <= MAX_IMAGE_BYTES) return candidate
  }

  throw new Error('Gambar terlalu besar. Coba pakai foto dengan resolusi lebih kecil.')
}
