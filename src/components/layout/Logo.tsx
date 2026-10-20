import { site } from '@/data/site'
import { cn } from '@/lib/cn'

type LogoMarkProps = {
  className?: string
}

/** The "MN" monogram tile. */
export function LogoMark({ className }: LogoMarkProps) {
  return (
    <span
      className={cn(
        'grid size-8 shrink-0 place-items-center rounded-lg bg-linear-to-tr from-blue-600 to-indigo-500 font-mono text-sm font-semibold text-white',
        className,
      )}
      aria-hidden="true"
    >
      {site.initials}
    </span>
  )
}
