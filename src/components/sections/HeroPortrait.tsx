import { existsSync } from 'node:fs'
import path from 'node:path'
import { UserRound } from 'lucide-react'
import Image from 'next/image'
import { site } from '@/data/site'
import { FloatingFrame } from './FloatingFrame'

/** Checked at build time, so dropping the file into `public/` is all it takes. */
function hasProfilePhoto(): boolean {
  return existsSync(path.join(process.cwd(), 'public', site.profilePhoto.src))
}

/** Hero photo in a 4:5 frame with a blue-purple border and glow. */
export function HeroPortrait() {
  const { src, alt } = site.profilePhoto

  return (
    <FloatingFrame>
      <div className="rounded-panel bg-linear-to-br from-blue-500/70 via-indigo-500/50 to-purple-500/70 p-px shadow-glow">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[calc(var(--radius-panel)-1px)] bg-surface-solid">
          {hasProfilePhoto() ? (
            <Image
              src={src}
              alt={alt}
              fill
              preload
              sizes="(min-width: 1024px) 272px, (min-width: 640px) 272px, 62vw"
              className="object-cover object-top"
            />
          ) : (
            <PortraitPlaceholder path={`public${src}`} />
          )}
        </div>
      </div>
    </FloatingFrame>
  )
}

/** Shown until the real photo is added. Deliberately labeled so it is never shipped by accident. */
function PortraitPlaceholder({ path: filePath }: { path: string }) {
  return (
    <div
      role="img"
      aria-label="Profile photo placeholder"
      className="flex h-full flex-col items-center justify-center gap-3 border-2 border-dashed border-line p-4 text-center"
    >
      <UserRound className="size-12 text-fg-subtle" aria-hidden="true" />
      <p className="font-mono text-[0.7rem] font-medium tracking-[0.12em] text-amber-600 uppercase dark:text-amber-400">
        Photo placeholder
      </p>
      <p className="font-mono text-[0.65rem] break-all text-fg-muted">Add {filePath}</p>
    </div>
  )
}
