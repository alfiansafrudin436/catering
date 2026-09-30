import Image from 'next/image'

import { cn } from '@/lib/utils'

type PhotoPlaceholderProps = {
  label: string
  src?: string
  className?: string
}

/** Slot foto: menampilkan gambar bila tersedia, atau placeholder bergaris bila belum. */
export function PhotoPlaceholder({ label, src, className }: PhotoPlaceholderProps) {
  if (src) {
    return (
      <div className={cn('relative overflow-hidden', className)}>
        <Image
          src={src}
          alt={label}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          // Gambar dari ImagePicker berupa data URL yang sudah dikompresi,
          // jadi tidak perlu (dan tidak bisa) lewat optimizer.
          unoptimized={src.startsWith('data:')}
          className="object-cover"
        />
      </div>
    )
  }

  return (
    <div
      className={cn(
        'photo-placeholder text-muted-foreground flex items-center justify-center p-6 text-center text-[0.7rem] tracking-wide',
        className,
      )}
    >
      {label}
    </div>
  )
}
