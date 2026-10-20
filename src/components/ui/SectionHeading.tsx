import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { stagger } from '@/lib/stagger'

type SectionEyebrowProps = {
  /** Two-digit section number, e.g. "01". */
  index: string
  label: string
  className?: string
}

/** The "01 // DISCOVERY" label with a trailing rule that opens each section. */
export function SectionEyebrow({ index, label, className }: SectionEyebrowProps) {
  return (
    <p
      data-reveal=""
      className={cn(
        'flex items-center gap-4 font-mono text-xs font-medium tracking-[0.12em] text-blue-600 uppercase dark:text-blue-400',
        className,
      )}
    >
      <span>{`${index} // ${label}`}</span>
      <span className="reveal-line h-px w-24 bg-line sm:w-32" aria-hidden="true" />
    </p>
  )
}

type SectionHeadingProps = SectionEyebrowProps & {
  /** Used as the section's accessible name via `aria-labelledby`. */
  titleId: string
  title: ReactNode
  description?: ReactNode
}

export function SectionHeading({ index, label, titleId, title, description, className }: SectionHeadingProps) {
  return (
    <div className={className}>
      <SectionEyebrow index={index} label={label} />
      <h2 id={titleId} data-reveal="" style={stagger(1)} className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
        {title}
      </h2>
      {description && <p data-reveal="" style={stagger(2)} className="mt-2 max-w-2xl text-sm leading-relaxed text-fg-muted sm:text-base">{description}</p>}
    </div>
  )
}
