import type { ReactNode, SVGProps } from 'react'

/*
 * Inline SVG icons (outline icons follow the Lucide style, 24×24 grid).
 * Kept local to avoid an icon dependency for ~15 glyphs.
 */
const outlineIcons = {
  'arrow-right': <path d="M5 12h14M13 6l6 6-6 6" />,
  'arrow-up': <path d="M12 19V5M6 11l6-6 6 6" />,
  'external-link': (
    <path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
  ),
  moon: <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />,
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </>
  ),
  menu: <path d="M4 6h16M4 12h16M4 18h16" />,
  close: <path d="M18 6 6 18M6 6l12 12" />,
  globe: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z" />
    </>
  ),
  layers: (
    <>
      <rect x="3" y="11" width="18" height="10" rx="2" />
      <path d="M5 11V8a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3M7 7V4.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 .5.5V7M3 15h18" />
    </>
  ),
  'bar-chart': <path d="M3 3v16a2 2 0 0 0 2 2h16M8 17v-4M13 17V9M18 17V5" />,
  zap: <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z" />,
  mail: (
    <>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 6L2 7" />
    </>
  ),
  check: <path d="M20 6 9 17l-5-5" />,
}

const filledIcons = {
  github: (
    <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.39-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
  ),
  linkedin: (
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
  ),
  figma: (
    <>
      <path fill="#F24E1E" d="M8 24a4 4 0 0 0 4-4v-4H8a4 4 0 0 0 0 8Z" />
      <path fill="#A259FF" d="M4 12a4 4 0 0 1 4-4h4v8H8a4 4 0 0 1-4-4Z" />
      <path fill="#FF7262" d="M4 4a4 4 0 0 1 4-4h4v8H8a4 4 0 0 1-4-4Z" />
      <path fill="#1ABCFE" d="M12 0h4a4 4 0 0 1 0 8h-4V0Z" />
      <path fill="#0ACF83" d="M20 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" />
    </>
  ),
}

export type IconName = keyof typeof outlineIcons | keyof typeof filledIcons

const iconContent: Record<IconName, ReactNode> = { ...outlineIcons, ...filledIcons }

type IconProps = Omit<SVGProps<SVGSVGElement>, 'name'> & {
  name: IconName
}

/** Decorative by default. Give the surrounding control an accessible name. */
export function Icon({ name, className = 'size-4', ...props }: IconProps) {
  const isOutline = Object.hasOwn(outlineIcons, name)

  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      className={className}
      fill={isOutline ? 'none' : 'currentColor'}
      stroke={isOutline ? 'currentColor' : 'none'}
      strokeWidth={isOutline ? 2 : undefined}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {iconContent[name]}
    </svg>
  )
}
