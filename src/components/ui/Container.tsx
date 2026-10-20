import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

type ContainerProps = {
  children: ReactNode
  className?: string
}

/** Centers content in the site's 1104px column with responsive gutters. */
export function Container({ children, className }: ContainerProps) {
  return <div className={cn('mx-auto w-full max-w-content px-5 sm:px-8', className)}>{children}</div>
}
