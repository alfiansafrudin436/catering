import { z } from 'zod'

export const orderInquirySchema = z.object({
  name: z.string().min(2, 'Nama minimal 2 karakter'),
  phone: z.string().min(8, 'Nomor WhatsApp tidak valid'),
  packageSlug: z.string().min(1, 'Pilih paket terlebih dahulu'),
  portion: z.coerce.number().int().positive('Jumlah porsi harus lebih dari 0'),
  eventDate: z.string().min(1, 'Tanggal acara wajib diisi'),
  note: z.string().optional(),
})

export type OrderInquiryInput = z.infer<typeof orderInquirySchema>
