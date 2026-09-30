import { getSupabaseBrowserClient } from '@/lib/supabase/client'
import { PACKAGE_PHOTO_BUCKET } from '@/lib/supabase/config'

function extensionOf(file: File) {
  const fromType = file.type.split('/')[1]

  return fromType === 'jpeg' ? 'jpg' : (fromType ?? 'jpg')
}

/** Unggah foto paket dan kembalikan URL publiknya. */
export async function uploadPackagePhoto(
  file: File | Blob,
  originalName = 'foto',
): Promise<string> {
  const supabase = getSupabaseBrowserClient()
  if (!supabase) throw new Error('Supabase belum dikonfigurasi.')

  const asFile = file instanceof File ? file : new File([file], originalName, { type: file.type })
  const path = `${crypto.randomUUID()}.${extensionOf(asFile)}`

  const { error } = await supabase.storage.from(PACKAGE_PHOTO_BUCKET).upload(path, asFile, {
    contentType: asFile.type,
    upsert: false,
  })

  if (error) throw new Error(error.message)

  const {
    data: { publicUrl },
  } = supabase.storage.from(PACKAGE_PHOTO_BUCKET).getPublicUrl(path)

  return publicUrl
}
