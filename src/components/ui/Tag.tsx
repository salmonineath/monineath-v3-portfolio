import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'
import { toneClasses, type Tone } from '../../lib/tones'

type TagProps = {
  children: ReactNode
  /** Tinted variant; neutral when omitted. */
  tone?: Tone
  className?: string
}

/** Small monospace chip for technologies and feature keywords. */
export function Tag({ children, tone, className }: TagProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md border px-2.5 py-1 font-mono text-xs',
        tone
          ? cn(toneClasses[tone].soft, toneClasses[tone].border, toneClasses[tone].text)
          : 'border-line-subtle bg-surface-raised text-fg-secondary',
        className,
      )}
    >
      {children}
    </span>
  )
}
