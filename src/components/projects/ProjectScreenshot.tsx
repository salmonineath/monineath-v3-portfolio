import { ImageIcon } from 'lucide-react'
import Image from 'next/image'
import type { Project } from '@/data/projects'
import { cn } from '@/lib/cn'
import { toneClasses } from '@/lib/tones'

/**
 * Project screenshot inside a browser-style frame. The showcase panel stays
 * dark in both themes, like the design. Shows a labeled placeholder until a
 * screenshot is added in `data/projects.ts`.
 */
export function ProjectScreenshot({ project }: { project: Project }) {
  const colors = toneClasses[project.tone]

  return (
    <div data-theme="dark" className="flex h-full items-center bg-showcase p-5 sm:p-8">
      <div className="w-full overflow-hidden rounded-xl border border-line bg-code shadow-2xl shadow-black/40">
        <div className="flex items-center gap-2.5 border-b border-line-subtle px-4 py-3" aria-hidden="true">
          <span className={cn('size-2 shrink-0 rounded-full', colors.dot)} />
          <span className="truncate font-mono text-xs text-fg-secondary">{project.address ?? 'preview'}</span>
        </div>

        <div className="relative aspect-[16/10] overflow-hidden">
          {project.screenshot ? (
            <Image
              src={project.screenshot.src}
              alt={project.screenshot.alt}
              fill
              sizes="(min-width: 1024px) 620px, (min-width: 640px) 90vw, 100vw"
              className="object-cover object-top transition-transform duration-700 ease-out-expo group-hover/project:scale-[1.03] motion-reduce:transition-none"
            />
          ) : (
            <ScreenshotPlaceholder />
          )}
        </div>
      </div>
    </div>
  )
}

function ScreenshotPlaceholder() {
  return (
    <div
      role="img"
      aria-label="Screenshot placeholder"
      className="flex h-full flex-col items-center justify-center gap-2 bg-surface-raised p-4 text-center"
    >
      <ImageIcon className="size-8 text-fg-subtle" aria-hidden="true" />
      <p className="font-mono text-[0.7rem] font-medium tracking-[0.12em] text-amber-400 uppercase">
        Screenshot placeholder
      </p>
    </div>
  )
}
