import type { ComponentPropsWithoutRef, ElementType } from 'react'
import { cn } from '@/lib/cn'

type CardProps<T extends ElementType> = {
  as?: T
} & ComponentPropsWithoutRef<T>

/** Translucent bordered surface shared by most panels on the page. */
export function Card<T extends ElementType = 'div'>({ as, className, ...props }: CardProps<T>) {
  const Component = as ?? 'div'

  return <Component data-spotlight="" className={cn('rounded-card border border-line bg-surface', className)} {...props} />
}
