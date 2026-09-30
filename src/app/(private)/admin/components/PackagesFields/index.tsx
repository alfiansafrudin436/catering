import { Controller, type UseFieldArrayReturn, type UseFormReturn } from 'react-hook-form'
import { Plus } from 'lucide-react'

import { ImagePicker } from '@/components'
import { Field } from '@/components/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import type { LandingContentInput } from '@/lib/validation'

import { createPackage } from '../../helper'
import { RepeatableItem } from '../RepeatableItem'
import { SectionCard } from '../SectionCard'

type PackagesFieldsProps = {
  form: UseFormReturn<LandingContentInput>
  packages: UseFieldArrayReturn<LandingContentInput, 'packages.items'>
  /** Tanpa ini, foto disimpan sebagai data URL alih-alih diunggah. */
  onUploadPhoto?: (file: File) => Promise<string>
}

export function PackagesFields({ form, packages, onUploadPhoto }: PackagesFieldsProps) {
  const { register, formState, getValues } = form
  const errors = formState.errors.packages

  return (
    <SectionCard
      title="Paket"
      description="Daftar paket beserta harga per porsi."
      action={
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() =>
            packages.append(createPackage(getValues('packages.items').map((item) => item.slug)))
          }
        >
          <Plus className="size-4" aria-hidden />
          Tambah paket
        </Button>
      }
    >
      <div className="grid gap-4">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Judul section" error={errors?.title?.message}>
            {(props) => <Input {...props} {...register('packages.title')} />}
          </Field>
          <Field label="Catatan harga" error={errors?.note?.message}>
            {(props) => <Input {...props} {...register('packages.note')} />}
          </Field>
        </div>

        {errors?.items?.message ? (
          <p className="text-primary text-xs">{errors.items.message}</p>
        ) : null}

        <div className="grid gap-3 md:grid-cols-2">
          {packages.fields.map((field, index) => (
            <RepeatableItem
              key={field.id}
              title={`Paket ${index + 1}`}
              onRemove={() => packages.remove(index)}
              canRemove={packages.fields.length > 1}
            >
              <div className="grid gap-3">
                <Field label="Nama paket" error={errors?.items?.[index]?.name?.message}>
                  {(props) => <Input {...props} {...register(`packages.items.${index}.name`)} />}
                </Field>
                <Field label="Isi paket" error={errors?.items?.[index]?.description?.message}>
                  {(props) => (
                    <Textarea
                      {...props}
                      rows={2}
                      {...register(`packages.items.${index}.description`)}
                    />
                  )}
                </Field>
                <Field label="Harga per porsi" error={errors?.items?.[index]?.price?.message}>
                  {(props) => <Input {...props} {...register(`packages.items.${index}.price`)} />}
                </Field>
                <Controller
                  control={form.control}
                  name={`packages.items.${index}.imageUrl`}
                  render={({ field }) => (
                    <ImagePicker
                      label="Foto paket"
                      value={field.value}
                      onChange={field.onChange}
                      onUpload={onUploadPhoto}
                      hint="JPG, PNG, atau WebP. Kosongkan untuk memakai placeholder."
                    />
                  )}
                />
              </div>
            </RepeatableItem>
          ))}
        </div>
      </div>
    </SectionCard>
  )
}
