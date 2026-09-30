import type { UseFormReturn } from 'react-hook-form'

import { Field } from '@/components/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import type { LandingContentInput } from '@/lib/validation'

import { SectionCard } from '../SectionCard'

type HeroFieldsProps = {
  form: UseFormReturn<LandingContentInput>
}

export function HeroFields({ form }: HeroFieldsProps) {
  const { register, formState } = form
  const errors = formState.errors.hero

  return (
    <SectionCard title="Hero" description="Bagian paling atas halaman.">
      <div className="grid gap-4">
        <Field label="Label kecil di atas judul" error={errors?.eyebrow?.message}>
          {(props) => <Input {...props} {...register('hero.eyebrow')} />}
        </Field>
        <Field label="Judul utama" error={errors?.title?.message}>
          {(props) => <Textarea {...props} rows={3} {...register('hero.title')} />}
        </Field>
        <Field label="Deskripsi" error={errors?.description?.message}>
          {(props) => <Textarea {...props} rows={3} {...register('hero.description')} />}
        </Field>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Label tombol WhatsApp" error={errors?.primaryCtaLabel?.message}>
            {(props) => <Input {...props} {...register('hero.primaryCtaLabel')} />}
          </Field>
          <Field label="Label tautan ke paket" error={errors?.secondaryCtaLabel?.message}>
            {(props) => <Input {...props} {...register('hero.secondaryCtaLabel')} />}
          </Field>
        </div>
        <Field
          label="Keterangan slot foto"
          error={errors?.photoLabel?.message}
          hint="Teks yang tampil selama foto belum diunggah."
        >
          {(props) => <Input {...props} {...register('hero.photoLabel')} />}
        </Field>
      </div>
    </SectionCard>
  )
}
