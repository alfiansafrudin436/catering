import type { UseFormReturn } from 'react-hook-form'

import { Field } from '@/components/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import type { LandingContentInput } from '@/lib/validation'

import { SectionCard } from '../SectionCard'

type CtaFieldsProps = {
  form: UseFormReturn<LandingContentInput>
}

export function CtaFields({ form }: CtaFieldsProps) {
  const { register, formState } = form
  const errors = formState.errors.cta

  return (
    <SectionCard title="CTA Penutup" description="Panel hijau sebelum footer.">
      <div className="grid gap-4">
        <Field label="Judul" error={errors?.title?.message}>
          {(props) => <Input {...props} {...register('cta.title')} />}
        </Field>
        <Field label="Deskripsi" error={errors?.description?.message}>
          {(props) => <Textarea {...props} rows={2} {...register('cta.description')} />}
        </Field>
        <Field label="Label tombol" error={errors?.buttonLabel?.message}>
          {(props) => <Input {...props} {...register('cta.buttonLabel')} />}
        </Field>
      </div>
    </SectionCard>
  )
}
