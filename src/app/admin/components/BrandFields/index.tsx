import type { UseFormReturn } from 'react-hook-form'

import { Field } from '@/components/form'
import { Input } from '@/components/ui/input'
import type { LandingContentInput } from '@/lib/validation'

import { SectionCard } from '../SectionCard'

type BrandFieldsProps = {
  form: UseFormReturn<LandingContentInput>
}

export function BrandFields({ form }: BrandFieldsProps) {
  const { register, formState } = form
  const errors = formState.errors.brand

  return (
    <SectionCard
      title="Brand & Kontak"
      description="Dipakai di header, footer, dan seluruh tombol WhatsApp."
    >
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Nama brand" error={errors?.name?.message}>
          {(props) => <Input {...props} {...register('brand.name')} />}
        </Field>
        <Field label="Alamat / kota" error={errors?.address?.message}>
          {(props) => <Input {...props} {...register('brand.address')} />}
        </Field>
        <Field
          label="Nomor WhatsApp"
          error={errors?.whatsappNumber?.message}
          hint="Format internasional tanpa + atau spasi, contoh 628120000000."
        >
          {(props) => (
            <Input {...props} inputMode="numeric" {...register('brand.whatsappNumber')} />
          )}
        </Field>
        <Field label="Nomor tampil di footer" error={errors?.phoneLabel?.message}>
          {(props) => <Input {...props} {...register('brand.phoneLabel')} />}
        </Field>
        <Field label="Instagram" error={errors?.instagram?.message}>
          {(props) => <Input {...props} {...register('brand.instagram')} />}
        </Field>
        <Field label="Email" error={errors?.email?.message}>
          {(props) => <Input {...props} {...register('brand.email')} />}
        </Field>
      </div>
    </SectionCard>
  )
}
