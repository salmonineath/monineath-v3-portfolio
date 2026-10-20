import { cn } from '../../lib/cn'
import { toneClasses, type Tone } from '../../lib/tones'

export type ButtonVariant = 'primary' | 'secondary'
export type ButtonSize = 'sm' | 'md'

type ButtonStyleOptions = {
  variant?: ButtonVariant
  size?: ButtonSize
  /** Recolors a primary button (used by project cards). Defaults to the brand primary. */
  tone?: Tone
  className?: string
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-9 gap-2 px-4 text-sm',
  md: 'h-11 gap-2.5 px-6 text-[0.95rem]',
}

/**
 * Shared button look for both `<a>` and `<button>` elements, so links and
 * real buttons stay visually identical.
 */
export function buttonStyles({ variant = 'primary', size = 'md', tone, className }: ButtonStyleOptions = {}) {
  return cn(
    'inline-flex shrink-0 items-center justify-center rounded-lg font-display font-semibold whitespace-nowrap transition-colors duration-200',
    sizeClasses[size],
    variant === 'primary' && 'text-white',
    variant === 'primary' && (tone ? toneClasses[tone].solid : 'bg-primary hover:bg-primary-hover'),
    variant === 'secondary' &&
      'border border-line bg-surface-raised text-fg hover:border-fg-subtle hover:bg-line-subtle',
    className,
  )
}
