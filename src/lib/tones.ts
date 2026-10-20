/**
 * Accent colors used to tint cards, badges, and icons (e.g. each stack
 * category or service has its own hue in the design).
 *
 * Class names are written out in full so Tailwind can detect them at build
 * time — never build them with string interpolation.
 */
export type Tone =
  | 'blue'
  | 'sky'
  | 'cyan'
  | 'teal'
  | 'emerald'
  | 'amber'
  | 'yellow'
  | 'orange'
  | 'rose'
  | 'purple'
  | 'indigo'
  | 'slate'

type ToneClasses = {
  /** Readable accent text in both themes. */
  text: string
  /** Translucent tinted background (badges, icon tiles). */
  soft: string
  /** Translucent tinted border to pair with `soft`. */
  border: string
  /** Small status dots. */
  dot: string
  /** Solid call-to-action background with hover state. */
  solid: string
}

export const toneClasses: Record<Tone, ToneClasses> = {
  blue: {
    text: 'text-blue-600 dark:text-blue-400',
    soft: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    dot: 'bg-blue-500 dark:bg-blue-400',
    solid: 'bg-blue-600 hover:bg-blue-500',
  },
  sky: {
    text: 'text-sky-600 dark:text-sky-400',
    soft: 'bg-sky-500/10',
    border: 'border-sky-500/20',
    dot: 'bg-sky-500 dark:bg-sky-400',
    solid: 'bg-sky-600 hover:bg-sky-500',
  },
  cyan: {
    text: 'text-cyan-600 dark:text-cyan-400',
    soft: 'bg-cyan-500/10',
    border: 'border-cyan-500/20',
    dot: 'bg-cyan-500 dark:bg-cyan-400',
    solid: 'bg-cyan-600 hover:bg-cyan-500',
  },
  teal: {
    text: 'text-teal-600 dark:text-teal-400',
    soft: 'bg-teal-500/10',
    border: 'border-teal-500/20',
    dot: 'bg-teal-500 dark:bg-teal-400',
    solid: 'bg-teal-600 hover:bg-teal-500',
  },
  emerald: {
    text: 'text-emerald-600 dark:text-emerald-400',
    soft: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
    dot: 'bg-emerald-500 dark:bg-emerald-400',
    solid: 'bg-emerald-600 hover:bg-emerald-500',
  },
  amber: {
    text: 'text-amber-600 dark:text-amber-400',
    soft: 'bg-amber-500/10',
    border: 'border-amber-500/20',
    dot: 'bg-amber-500 dark:bg-amber-400',
    solid: 'bg-amber-600 hover:bg-amber-500',
  },
  yellow: {
    text: 'text-yellow-600 dark:text-yellow-400',
    soft: 'bg-yellow-500/10',
    border: 'border-yellow-500/20',
    dot: 'bg-yellow-500 dark:bg-yellow-400',
    solid: 'bg-yellow-600 hover:bg-yellow-500',
  },
  orange: {
    text: 'text-orange-600 dark:text-orange-400',
    soft: 'bg-orange-500/10',
    border: 'border-orange-500/20',
    dot: 'bg-orange-500 dark:bg-orange-400',
    solid: 'bg-orange-600 hover:bg-orange-500',
  },
  rose: {
    text: 'text-rose-600 dark:text-rose-400',
    soft: 'bg-rose-500/10',
    border: 'border-rose-500/20',
    dot: 'bg-rose-500 dark:bg-rose-400',
    solid: 'bg-rose-600 hover:bg-rose-500',
  },
  purple: {
    text: 'text-purple-600 dark:text-purple-400',
    soft: 'bg-purple-500/10',
    border: 'border-purple-500/20',
    dot: 'bg-purple-500 dark:bg-purple-400',
    solid: 'bg-purple-600 hover:bg-purple-500',
  },
  indigo: {
    text: 'text-indigo-600 dark:text-indigo-400',
    soft: 'bg-indigo-500/10',
    border: 'border-indigo-500/20',
    dot: 'bg-indigo-500 dark:bg-indigo-400',
    solid: 'bg-indigo-600 hover:bg-indigo-500',
  },
  slate: {
    text: 'text-slate-700 dark:text-slate-200',
    soft: 'bg-slate-500/10',
    border: 'border-slate-500/20',
    dot: 'bg-slate-500 dark:bg-slate-400',
    solid: 'bg-slate-700 hover:bg-slate-600',
  },
}
