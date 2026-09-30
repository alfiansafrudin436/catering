/** Batas unggahan ke Supabase Storage. */
export const MAX_UPLOAD_IMAGE_BYTES = 2 * 1024 * 1024
export const MAX_UPLOAD_IMAGE_EDGE = 1600

export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp']

const QUALITY_STEPS = [0.82, 0.7, 0.6, 0.5, 0.4]

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

function canvasToBlob(canvas: HTMLCanvasElement, quality: number) {
  return new Promise<Blob | null>((resolve) =>
    canvas.toBlob((blob) => resolve(blob), 'image/jpeg', quality),
  )
}

async function drawToCanvas(file: File, maxEdge: number) {
  if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
    throw new Error('Format harus JPG, PNG, atau WebP.')
  }

  const image = await loadImage(await readAsDataUrl(file))

  const scale = Math.min(1, maxEdge / Math.max(image.width, image.height))
  const canvas = document.createElement('canvas')
  canvas.width = Math.round(image.width * scale)
  canvas.height = Math.round(image.height * scale)

  const context = canvas.getContext('2d')
  if (!context) throw new Error('Browser tidak mendukung pemrosesan gambar.')
  context.drawImage(image, 0, 0, canvas.width, canvas.height)

  return canvas
}

const TOO_LARGE = 'Gambar terlalu besar. Coba pakai foto dengan resolusi lebih kecil.'

/** Blob JPEG terkompresi, siap diunggah ke Supabase Storage. */
export async function fileToCompressedBlob(file: File): Promise<Blob> {
  const canvas = await drawToCanvas(file, MAX_UPLOAD_IMAGE_EDGE)

  for (const quality of QUALITY_STEPS) {
    const blob = await canvasToBlob(canvas, quality)
    if (blob && blob.size <= MAX_UPLOAD_IMAGE_BYTES) return blob
  }

  throw new Error(TOO_LARGE)
}
