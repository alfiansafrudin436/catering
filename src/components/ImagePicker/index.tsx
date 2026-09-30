'use client'

import { useId, useRef, useState } from 'react'
import { ImageUp, Trash2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { ACCEPTED_IMAGE_TYPES, fileToCompressedDataUrl } from '@/lib/image'
import { cn } from '@/lib/utils'

type ImagePickerProps = {
  label: string
  value?: string
  onChange: (value: string) => void
  /**
   * Bila diberikan, berkas diunggah lewat fungsi ini dan URL hasilnya disimpan.
   * Tanpa itu, gambar disimpan sebagai data URL terkompresi.
   */
  onUpload?: (file: File) => Promise<string>
  hint?: string
  className?: string
}

/** Pemilih gambar: pratinjau, unggah dari perangkat, dan hapus. */
export function ImagePicker({
  label,
  value,
  onChange,
  onUpload,
  hint,
  className,
}: ImagePickerProps) {
  const inputId = useId()
  const inputRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleFile = async (file: File | undefined) => {
    if (!file) return

    setError(null)
    setIsProcessing(true)

    try {
      onChange(onUpload ? await onUpload(file) : await fileToCompressedDataUrl(file))
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Gagal memproses gambar.')
    } finally {
      setIsProcessing(false)
      // Kosongkan input supaya memilih berkas yang sama lagi tetap memicu change.
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <Label htmlFor={inputId}>{label}</Label>

      <div className="flex items-start gap-3">
        <div
          className={cn(
            'border-border bg-background size-20 shrink-0 overflow-hidden rounded-lg border',
            !value && 'photo-placeholder',
          )}
        >
          {value ? (
            // Sumbernya bisa data URL atau URL luar sembarang, jadi pakai img biasa.
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="" className="size-full object-cover" />
          ) : null}
        </div>

        <div className="flex flex-col gap-2">
          <input
            id={inputId}
            ref={inputRef}
            type="file"
            accept={ACCEPTED_IMAGE_TYPES.join(',')}
            className="sr-only"
            onChange={(event) => handleFile(event.target.files?.[0])}
          />
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={isProcessing}
              onClick={() => inputRef.current?.click()}
            >
              <ImageUp className="size-4" aria-hidden />
              {isProcessing
                ? onUpload
                  ? 'Mengunggah...'
                  : 'Memproses...'
                : value
                  ? 'Ganti gambar'
                  : 'Pilih gambar'}
            </Button>
            {value ? (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  setError(null)
                  onChange('')
                }}
              >
                <Trash2 className="size-4" aria-hidden />
                Hapus
              </Button>
            ) : null}
          </div>

          {error ? (
            <p className="text-primary text-xs">{error}</p>
          ) : hint ? (
            <p className="text-muted-foreground text-xs">{hint}</p>
          ) : null}
        </div>
      </div>
    </div>
  )
}
