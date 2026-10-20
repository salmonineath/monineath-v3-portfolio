import type { AnchorHTMLAttributes } from 'react'
import { buttonStyles, type ButtonSize, type ButtonVariant } from './buttonStyles'
import type { Tone } from '../../lib/tones'

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string
  variant?: ButtonVariant
  size?: ButtonSize
  tone?: Tone
  /** Opens in a new tab with safe `rel` attributes. */
  external?: boolean
}

export function ButtonLink({ variant, size, tone, external = false, className, ...props }: ButtonLinkProps) {
  return (
    <a
      className={buttonStyles({ variant, size, tone, className })}
      {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
      {...props}
    />
  )
}
