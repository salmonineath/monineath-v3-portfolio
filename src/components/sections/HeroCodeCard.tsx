'use client'

import { Check } from 'lucide-react'
import { useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/cn'

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

const list = (name: string, values: string[]): Segment[] => [
  ['punctuation', `  ${name}: [`],
  ['string', values.map((value) => `'${value}'`).join(', ')],
  ['punctuation', '],\n'],
]

const code: Segment[] = [
  ['comment', '// Building for the web, end to end\n'],
  ['keyword', 'export const '],
  ['name', 'developer'],
  ['punctuation', ' = {\n'],
  ...property('name', 'Monineath'),
  ...property('role', 'Full-Stack Developer'),
  ...list('frontend', ['Vue', 'React', 'Next.js']),
  ...list('backend', ['NestJS', 'Express']),
  ...property('openTo', 'Freelance'),
  ['punctuation', '};'],
]

/** Character offset where each segment starts. */
const segmentStarts = code.map((_, index) => code.slice(0, index).reduce((sum, [, text]) => sum + text.length, 0))
const totalChars = segmentStarts.at(-1)! + code.at(-1)![1].length

/** Waits for the hero copy to land, then types roughly 2 characters per frame. */
const TYPING_DELAY_MS = 900
const CHARS_PER_MS = 0.12

function useTypedLength(total: number): number {
  const reduceMotion = useReducedMotion()
  const [typed, setTyped] = useState(0)

  useEffect(() => {
    if (reduceMotion) return

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
  }, [total, reduceMotion])

  return reduceMotion ? total : typed
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
    <span className="-mb-0.5 inline-block h-[1.1em] w-[2px] translate-y-[0.1em] bg-blue-400 motion-safe:animate-caret" />
  )
}

/** Decorative "editor window" behind the hero portrait. Hidden from assistive tech. */
export function HeroCodeCard() {
  const typed = useTypedLength(totalChars)
  const done = typed >= totalChars

  return (
    <div
      aria-hidden="true"
      className="relative min-w-0 overflow-hidden rounded-card border border-blue-400/25 bg-code text-code-fg shadow-glow"
    >
      <div className="flex items-center gap-3 border-b border-white/5 bg-white/2 px-4 py-3">
        <span className="flex gap-2">
          <span className="size-2.5 rounded-full bg-rose-500/80 sm:size-3" />
          <span className="size-2.5 rounded-full bg-amber-500/80 sm:size-3" />
          <span className="size-2.5 rounded-full bg-emerald-500/80 sm:size-3" />
        </span>
        <span className="flex min-w-0 items-center gap-2 font-mono text-[0.65rem] text-slate-400 sm:text-xs">
          <span className={cn('size-1.5 shrink-0 rounded-full transition-colors', done ? 'bg-slate-500' : 'bg-blue-400')} />
          <span className="truncate">developer.config.ts</span>
        </span>
      </div>

      <pre className="overflow-hidden px-4 pt-4 pb-3 font-mono text-[0.62rem] leading-[1.75] min-[400px]:text-[0.7rem] sm:px-5 sm:text-[0.78rem]">
        <TypedCode typed={typed} />
      </pre>

      <div className="mx-4 flex items-center gap-1.5 border-t border-white/5 py-3 font-mono text-[0.65rem] text-emerald-400 sm:mx-5 sm:text-[0.7rem]">
        <Check className={cn('size-3 transition-opacity duration-500', done ? 'opacity-100' : 'opacity-0')} />
        {done ? 'Ready to build' : 'Compiling…'}
      </div>
    </div>
  )
}
