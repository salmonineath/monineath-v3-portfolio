import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { toneClasses, type Tone } from '@/lib/tones'

type StatusPillProps = {
  children: ReactNode
  tone?: Tone
  className?: string
}

/** Rounded status indicator with a colored dot, e.g. "Available for freelance". */
export function StatusPill({ children, tone = 'emerald', className }: StatusPillProps) {
  const colors = toneClasses[tone]

  return (
    <p
      className={cn(
        'inline-flex items-center gap-2.5 rounded-full border px-3.5 py-1.5 font-mono text-xs',
        colors.soft,
        colors.border,
        colors.text,
        className,
      )}
    >
      <span className="relative grid size-2 shrink-0" aria-hidden="true">
        <span className={cn('absolute inset-0 rounded-full motion-safe:animate-beacon', colors.dot)} />
        <span className={cn('relative rounded-full', colors.dot)} />
      </span>
      {children}
    </p>
  )
}
