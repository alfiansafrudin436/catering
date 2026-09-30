import { MessageCircle } from 'lucide-react'

import { Button, type ButtonProps } from '@/components/ui/button'
import { buildWhatsAppLink } from '@/lib/config'

type WhatsAppButtonProps = {
  message: string
  phone?: string
  label?: string
  className?: string
  variant?: ButtonProps['variant']
  size?: ButtonProps['size']
}

export function WhatsAppButton({
  message,
  phone,
  label = 'Pesan via WhatsApp',
  className,
  variant = 'primary',
  size = 'md',
}: WhatsAppButtonProps) {
  return (
    <Button asChild variant={variant} size={size} className={className}>
      <a href={buildWhatsAppLink(message, phone)} target="_blank" rel="noopener noreferrer">
        <MessageCircle className="size-4" aria-hidden />
        {label}
      </a>
    </Button>
  )
}
