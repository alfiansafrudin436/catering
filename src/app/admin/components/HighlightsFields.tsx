import type { UseFieldArrayReturn, UseFormReturn } from 'react-hook-form'
import { Plus } from 'lucide-react'

import { Field } from '@/components/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import type { LandingContentInput } from '@/lib/validation'

import { createHighlight, HIGHLIGHT_ICON_OPTIONS } from '../helper'
import { RepeatableItem } from './RepeatableItem'
import { SectionCard } from './SectionCard'

type HighlightsFieldsProps = {
  form: UseFormReturn<LandingContentInput>
  highlights: UseFieldArrayReturn<LandingContentInput, 'highlights.items'>
}

export function HighlightsFields({ form, highlights }: HighlightsFieldsProps) {
  const { register, formState, getValues } = form
  const errors = formState.errors.highlights

  return (
    <SectionCard
      title="Keunggulan"
      description="Kartu alasan pelanggan kembali memesan."
      action={
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() =>
            highlights.append(createHighlight(getValues('highlights.items').map((item) => item.id)))
          }
        >
          <Plus className="size-4" aria-hidden />
          Tambah keunggulan
        </Button>
      }
    >
      <div className="grid gap-4">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Judul section" error={errors?.title?.message}>
            {(props) => <Input {...props} {...register('highlights.title')} />}
          </Field>
          <Field label="Deskripsi section" error={errors?.description?.message}>
            {(props) => <Input {...props} {...register('highlights.description')} />}
          </Field>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          {highlights.fields.map((field, index) => (
            <RepeatableItem
              key={field.id}
              title={`Keunggulan ${index + 1}`}
              onRemove={() => highlights.remove(index)}
              canRemove={highlights.fields.length > 1}
            >
              <div className="grid gap-3">
                <Field label="Ikon" error={errors?.items?.[index]?.icon?.message}>
                  {(props) => (
                    <Select {...props} {...register(`highlights.items.${index}.icon`)}>
                      {HIGHLIGHT_ICON_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Select>
                  )}
                </Field>
                <Field label="Judul" error={errors?.items?.[index]?.title?.message}>
                  {(props) => <Input {...props} {...register(`highlights.items.${index}.title`)} />}
                </Field>
                <Field label="Deskripsi" error={errors?.items?.[index]?.description?.message}>
                  {(props) => (
                    <Textarea
                      {...props}
                      rows={3}
                      {...register(`highlights.items.${index}.description`)}
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
