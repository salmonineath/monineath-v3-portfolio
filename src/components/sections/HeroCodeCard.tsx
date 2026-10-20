import { useEffect, useState } from 'react'
import { cn } from '../../lib/cn'
import { Icon } from '../ui/Icon'

type TokenKind = 'keyword' | 'name' | 'string' | 'comment' | 'punctuation'

const tokenClasses: Record<TokenKind, string> = {
  keyword: 'text-code-keyword',
  name: 'text-code-name',
  string: 'text-code-string',
  comment: 'text-code-comment',
  punctuation: 'text-code-fg',
}

type Segment = [kind: TokenKind, text: string]

const property = (name: string, value: string): Segment[] => [
  ['punctuation', `  ${name}: `],
  ['string', `'${value}'`],
  ['punctuation', ',\n'],
]

const code: Segment[] = [
  ['comment', '// Client-focused full-stack engineering profile\n'],
  ['keyword', 'export const '],
  ['name', 'freelanceService'],
  ['punctuation', ' = {\n'],
  ...property('engineer', 'Monineath'),
  ...property('focus', 'Custom Websites & SaaS Platforms'),
  ...property('turnaround', 'Fast, Agile & Milestone-Driven'),
  ['punctuation', '  deliverables: [\n'],
  ['string', "    'Pixel-Perfect Responsive UI',\n"],
  ['string', "    'High-Performance REST & Cloud APIs',\n"],
  ['string', "    'Turnkey Deployments & SEO'\n"],
  ['punctuation', '  ],\n  clientGuarantee: '],
  ['name', "'100% Quality & Clean Code'"],
  ['punctuation', '\n};'],
]

/** Character offset where each segment starts. */
const segmentStarts = code.map((_, index) => code.slice(0, index).reduce((sum, [, text]) => sum + text.length, 0))
const totalChars = segmentStarts.at(-1)! + code.at(-1)![1].length

/** Waits for the hero copy to land, then types roughly 2 characters per frame. */
const TYPING_DELAY_MS = 700
const CHARS_PER_MS = 0.12

function useTypedLength(total: number): number {
  const [typed, setTyped] = useState(() =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ? total : 0,
  )

  useEffect(() => {
    if (typed >= total) return

    let frame = 0
    let start: number | undefined
    const timeout = window.setTimeout(() => {
      const tick = (now: number) => {
        start ??= now
        const next = Math.min(total, Math.floor((now - start) * CHARS_PER_MS))
        setTyped(next)
        if (next < total) frame = requestAnimationFrame(tick)
      }
      frame = requestAnimationFrame(tick)
    }, TYPING_DELAY_MS)

    return () => {
      window.clearTimeout(timeout)
      cancelAnimationFrame(frame)
    }
    // Runs once on mount; `typed` only seeds the reduced-motion shortcut.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total])

  return typed
}

/**
 * Renders the full code at all times so the card never changes size; the
 * untyped tail is transparent and the caret sits at the typing position.
 */
function TypedCode({ typed }: { typed: number }) {
  const done = typed >= totalChars

  return (
    <code>
      {code.map(([kind, text], index) => {
        const remaining = typed - segmentStarts[index]
        const visible = text.slice(0, Math.max(0, remaining))
        const hidden = text.slice(visible.length)
        const caretHere = !done && remaining >= 0 && hidden.length > 0

        return (
          <span key={index} className={tokenClasses[kind]}>
            {visible}
            {caretHere && <Caret />}
            {hidden && <span className="text-transparent">{hidden}</span>}
          </span>
        )
      })}
      {done && <Caret />}
    </code>
  )
}

function Caret() {
  return (
    <span
      aria-hidden="true"
      className="-mb-0.5 inline-block h-[1.1em] w-[2px] translate-y-[0.1em] bg-blue-400 motion-safe:animate-caret"
    />
  )
}

/** Decorative "editor window" beside the hero copy. */
export function HeroCodeCard() {
  const typed = useTypedLength(totalChars)
  const done = typed >= totalChars

  return (
    <figure className="relative min-w-0 overflow-hidden rounded-card border border-blue-400/25 bg-code text-code-fg shadow-glow motion-safe:animate-rise motion-safe:[animation-delay:400ms]">
      <figcaption className="flex items-center gap-3 border-b border-white/5 bg-white/2 px-4 py-3">
        <span className="flex gap-2" aria-hidden="true">
          <span className="size-3 rounded-full bg-rose-500/80" />
          <span className="size-3 rounded-full bg-amber-500/80" />
          <span className="size-3 rounded-full bg-emerald-500/80" />
        </span>
        <span className="flex min-w-0 items-center gap-2 font-mono text-xs text-slate-400">
          <span
            className={cn('size-1.5 shrink-0 rounded-full transition-colors', done ? 'bg-slate-500' : 'bg-blue-400')}
            aria-hidden="true"
          />
          <span className="truncate">monineath.client-config.ts</span>
        </span>
        <span className="ml-auto hidden shrink-0 rounded border border-emerald-500/20 bg-emerald-500/10 px-1.5 py-0.5 font-mono text-[0.65rem] text-emerald-400 sm:inline">
          Freelance Ready
        </span>
      </figcaption>

      <pre className="overflow-x-auto px-5 pt-5 pb-4 font-mono text-[0.75rem] leading-[1.7] sm:text-[0.8rem]">
        <TypedCode typed={typed} />
      </pre>

      <div className="mx-5 flex flex-wrap items-center justify-between gap-2 border-t border-white/5 py-3 font-mono text-[0.7rem]">
        <span
          className={cn(
            'flex items-center gap-1.5 text-emerald-400 transition-all duration-500 ease-out-expo',
            done ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-0',
          )}
        >
          <Icon name="check" className="size-3" />
          TypeScript Strict • Zero Technical Debt
        </span>
        <span className="text-slate-500">{done ? 'Fast Delivery' : 'Compiling…'}</span>
      </div>
    </figure>
  )
}
