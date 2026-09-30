import type { UseFieldArrayReturn, UseFormReturn } from 'react-hook-form'
import { Plus } from 'lucide-react'

import { Field } from '@/components/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import type { LandingContentInput } from '@/lib/validation'

import { createFact } from '../helper'
import { RepeatableItem } from './RepeatableItem'
import { SectionCard } from './SectionCard'

type HeroFieldsProps = {
  form: UseFormReturn<LandingContentInput>
  facts: UseFieldArrayReturn<LandingContentInput, 'facts'>
}

export function HeroFields({ form, facts }: HeroFieldsProps) {
  const { register, formState, getValues } = form
  const errors = formState.errors.hero

  return (
    <>
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

      <SectionCard
        title="Fakta Layanan"
        description="Strip ringkas di bawah hero."
        action={
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => facts.append(createFact(getValues('facts').map((fact) => fact.id)))}
          >
            <Plus className="size-4" aria-hidden />
            Tambah fakta
          </Button>
        }
      >
        <div className="grid gap-3 md:grid-cols-2">
          {facts.fields.map((field, index) => (
            <RepeatableItem
              key={field.id}
              title={`Fakta ${index + 1}`}
              onRemove={() => facts.remove(index)}
              canRemove={facts.fields.length > 1}
            >
              <Field label="Teks" error={formState.errors.facts?.[index]?.label?.message}>
                {(props) => <Input {...props} {...register(`facts.${index}.label`)} />}
              </Field>
            </RepeatableItem>
          ))}
        </div>
      </SectionCard>
    </>
  )
}
