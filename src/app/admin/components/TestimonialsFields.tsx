import type { UseFieldArrayReturn, UseFormReturn } from 'react-hook-form'
import { Plus } from 'lucide-react'

import { Field } from '@/components/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import type { LandingContentInput } from '@/lib/validation'

import { createTestimonial } from '../helper'
import { RepeatableItem } from './RepeatableItem'
import { SectionCard } from './SectionCard'

type TestimonialsFieldsProps = {
  form: UseFormReturn<LandingContentInput>
  testimonials: UseFieldArrayReturn<LandingContentInput, 'testimonials.items'>
}

export function TestimonialsFields({ form, testimonials }: TestimonialsFieldsProps) {
  const { register, formState, getValues } = form
  const errors = formState.errors.testimonials

  return (
    <SectionCard
      title="Ulasan"
      description="Tempel ulasan asli pelanggan."
      action={
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() =>
            testimonials.append(
              createTestimonial(getValues('testimonials.items').map((item) => item.id)),
            )
          }
        >
          <Plus className="size-4" aria-hidden />
          Tambah ulasan
        </Button>
      }
    >
      <div className="grid gap-4">
        <Field label="Judul section" error={errors?.title?.message}>
          {(props) => <Input {...props} {...register('testimonials.title')} />}
        </Field>

        <div className="grid gap-3 md:grid-cols-2">
          {testimonials.fields.map((field, index) => (
            <RepeatableItem
              key={field.id}
              title={`Ulasan ${index + 1}`}
              onRemove={() => testimonials.remove(index)}
              canRemove={testimonials.fields.length > 1}
            >
              <div className="grid gap-3">
                <Field label="Isi ulasan" error={errors?.items?.[index]?.quote?.message}>
                  {(props) => (
                    <Textarea
                      {...props}
                      rows={3}
                      {...register(`testimonials.items.${index}.quote`)}
                    />
                  )}
                </Field>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field
                    label="Nama pelanggan"
                    error={errors?.items?.[index]?.customerName?.message}
                  >
                    {(props) => (
                      <Input {...props} {...register(`testimonials.items.${index}.customerName`)} />
                    )}
                  </Field>
                  <Field label="Kota" error={errors?.items?.[index]?.city?.message}>
                    {(props) => (
                      <Input {...props} {...register(`testimonials.items.${index}.city`)} />
                    )}
                  </Field>
                </div>
              </div>
            </RepeatableItem>
          ))}
        </div>
      </div>
    </SectionCard>
  )
}
