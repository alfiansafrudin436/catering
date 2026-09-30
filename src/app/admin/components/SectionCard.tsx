type SectionCardProps = {
  title: string
  description?: string
  action?: React.ReactNode
  children: React.ReactNode
}

export function SectionCard({ title, description, action, children }: SectionCardProps) {
  return (
    <section className="border-border bg-surface rounded-card border p-5 md:p-6">
      <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="font-display text-lg font-semibold tracking-tight">{title}</h2>
          {description ? <p className="text-muted-foreground mt-1 text-sm">{description}</p> : null}
        </div>
        {action}
      </div>
      {children}
    </section>
  )
}
