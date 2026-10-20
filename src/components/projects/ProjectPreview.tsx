import type { AnalyticsPreview, BoardPreview, CodePreview, ProjectPreview as Preview } from '../../data/projects'
import { cn } from '../../lib/cn'
import { toneClasses, type Tone } from '../../lib/tones'
import { HighlightedSql } from './HighlightedSql'
import { stagger } from '../../lib/stagger'

type ProjectPreviewProps = {
  preview: Preview
  tone: Tone
}

/**
 * Illustrative mock of the project's UI. Pinned to the dark theme (like a
 * screenshot) so it looks the same whichever site theme is active.
 * Hidden from assistive tech: the card's text already describes the project.
 */
export function ProjectPreview({ preview, tone }: ProjectPreviewProps) {
  const colors = toneClasses[tone]

  return (
    <div data-theme="dark" className="flex h-full flex-col gap-6 bg-showcase p-5 sm:p-8" aria-hidden="true">
      <div className="rounded-xl border border-line bg-code p-4 shadow-2xl shadow-black/40 sm:p-5">
        <div className="flex items-center justify-between gap-3 border-b border-line-subtle pb-4">
          <span className="flex min-w-0 items-center gap-2.5 font-mono text-xs text-fg-secondary sm:text-sm">
            <span className={cn('size-2 shrink-0 rounded-full', colors.dot)} />
            <span className="truncate">{preview.address}</span>
          </span>
          <span
            className={cn(
              'hidden shrink-0 rounded border px-2 py-0.5 font-mono text-[0.65rem] sm:inline',
              colors.soft,
              colors.border,
              colors.text,
            )}
          >
            {preview.statusLabel}
          </span>
        </div>
        <div className="mt-4">
          {preview.kind === 'analytics' && <AnalyticsBody preview={preview} />}
          {preview.kind === 'board' && <BoardBody preview={preview} />}
          {preview.kind === 'code' && <CodeBody preview={preview} />}
        </div>
      </div>

      <p className="mt-auto flex flex-wrap justify-between gap-2 font-mono text-xs">
        <span className="text-fg-subtle">{preview.footer[0]}</span>
        <span className="text-emerald-400">{preview.footer[1]}</span>
      </p>
    </div>
  )
}

const barColors = ['bg-blue-500/45', 'bg-blue-400/65', 'bg-indigo-500/55', 'bg-blue-500/75', 'bg-indigo-400/60']

function AnalyticsBody({ preview }: { preview: AnalyticsPreview }) {
  return (
    <>
      <div className="grid gap-2 sm:grid-cols-3">
        {preview.stats.map((stat) => (
          <div key={stat.label} className="rounded-lg border border-line-subtle bg-surface-raised px-3 py-2.5">
            <p className="font-mono text-[0.65rem] text-fg-subtle">{stat.label}</p>
            <p
              className={cn(
                'mt-1 font-display text-xs font-semibold sm:text-sm',
                stat.tone ? toneClasses[stat.tone].text : 'text-fg',
              )}
            >
              {stat.value}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-3 flex h-28 items-end gap-2 rounded-lg border border-line-subtle bg-surface-raised px-3 pt-3 pb-4 sm:h-32">
        {preview.bars.map((height, index) => (
          <span
            // Bars are static and never reorder, so the index is a stable key.
            key={index}
            className={cn('reveal-bar flex-1 rounded-t-sm', barColors[index % barColors.length])}
            style={{ height: `${height}%`, ...stagger(index) }}
          />
        ))}
      </div>
    </>
  )
}

function BoardBody({ preview }: { preview: BoardPreview }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {preview.columns.map((column) => (
        <div key={column.title} className="rounded-lg border border-line-subtle bg-surface-raised p-3">
          <p className="flex items-center justify-between font-mono text-[0.7rem] tracking-[0.1em] text-fg-muted uppercase">
            {column.title}
            <span className={cn('size-1.5 rounded-full', toneClasses[column.tone].dot)} />
          </p>
          <div className="mt-3 rounded-md border border-line bg-code px-3 py-2.5">
            <p className="font-display text-sm text-fg">{column.task.title}</p>
            <p className="mt-1 font-mono text-[0.65rem] text-fg-subtle">{column.task.meta}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

function CodeBody({ preview }: { preview: CodePreview }) {
  return (
    <pre className="overflow-x-auto rounded-lg bg-black/30 p-4 font-mono text-[0.7rem] leading-[1.9] text-code-fg sm:text-xs">
      <code>
        <HighlightedSql code={preview.code} />
      </code>
    </pre>
  )
}
