import type { UseFieldArrayReturn, UseFormReturn } from 'react-hook-form'
import { Plus } from 'lucide-react'

import { Field } from '@/components/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { LandingContentInput } from '@/lib/validation'

import { createFact } from '../../helper'
import { RepeatableItem } from '../RepeatableItem'
import { SectionCard } from '../SectionCard'

type FactsFieldsProps = {
  form: UseFormReturn<LandingContentInput>
  facts: UseFieldArrayReturn<LandingContentInput, 'facts'>
}

export function FactsFields({ form, facts }: FactsFieldsProps) {
  const { register, formState, getValues } = form

  return (
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
  )
}
