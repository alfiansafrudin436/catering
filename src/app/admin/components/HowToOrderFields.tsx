import type { UseFieldArrayReturn, UseFormReturn } from 'react-hook-form'
import { Plus } from 'lucide-react'

import { Field } from '@/components/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import type { LandingContentInput } from '@/lib/validation'

import { createStep } from '../helper'
import { RepeatableItem } from './RepeatableItem'
import { SectionCard } from './SectionCard'

type HowToOrderFieldsProps = {
  form: UseFormReturn<LandingContentInput>
  steps: UseFieldArrayReturn<LandingContentInput, 'howToOrder.steps'>
}

export function HowToOrderFields({ form, steps }: HowToOrderFieldsProps) {
  const { register, formState, getValues } = form
  const errors = formState.errors.howToOrder

  return (
    <SectionCard
      title="Cara Pesan"
      description="Nomor langkah diurutkan ulang otomatis saat disimpan."
      action={
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => steps.append(createStep(getValues('howToOrder.steps')))}
        >
          <Plus className="size-4" aria-hidden />
          Tambah langkah
        </Button>
      }
    >
      <div className="grid gap-4">
        <Field label="Judul section" error={errors?.title?.message}>
          {(props) => <Input {...props} {...register('howToOrder.title')} />}
        </Field>
        <Field label="Deskripsi" error={errors?.description?.message}>
          {(props) => <Textarea {...props} rows={3} {...register('howToOrder.description')} />}
        </Field>
        <Field label="Keterangan slot foto" error={errors?.photoLabel?.message}>
          {(props) => <Input {...props} {...register('howToOrder.photoLabel')} />}
        </Field>

        <div className="grid gap-3 md:grid-cols-2">
          {steps.fields.map((field, index) => (
            <RepeatableItem
              key={field.id}
              title={`Langkah ${index + 1}`}
              onRemove={() => steps.remove(index)}
              canRemove={steps.fields.length > 1}
            >
              <div className="grid gap-3">
                <Field label="Judul langkah" error={errors?.steps?.[index]?.title?.message}>
                  {(props) => <Input {...props} {...register(`howToOrder.steps.${index}.title`)} />}
                </Field>
                <Field label="Keterangan" error={errors?.steps?.[index]?.description?.message}>
                  {(props) => (
                    <Textarea
                      {...props}
                      rows={2}
                      {...register(`howToOrder.steps.${index}.description`)}
                    />
                  )}
                </Field>
              </div>
            </RepeatableItem>
          ))}
        </div>
      </div>
    </SectionCard>
  )
}
