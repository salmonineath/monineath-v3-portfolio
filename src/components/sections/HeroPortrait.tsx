import { existsSync } from 'node:fs'
import path from 'node:path'
import { UserRound } from 'lucide-react'
import Image from 'next/image'
import { site } from '@/data/site'
import { cn } from '@/lib/cn'
import { BrandIcon, type BrandIconName } from '../ui/BrandIcon'
import { FloatingFrame } from './FloatingFrame'

/** Checked at build time, so dropping the file into `public/` is all it takes. */
function hasProfilePhoto(): boolean {
  return existsSync(path.join(process.cwd(), 'public', site.profilePhoto.src))
}

/** Small stack logos orbiting the portrait. Purely decorative. */
const floatingLogos: { icon: BrandIconName; className: string; delay: number }[] = [
  { icon: 'react', className: '-left-4 top-[14%] sm:-left-7', delay: 0 },
  { icon: 'vue', className: '-right-4 top-[42%] sm:-right-7', delay: 1.2 },
  { icon: 'typescript', className: '-left-3 bottom-[12%] sm:-left-6', delay: 2.4 },
]

/** Hero photo: gradient ring, soft glow, and an offset outline for depth. */
export function HeroPortrait() {
  const { src, alt } = site.profilePhoto

  return (
    <div className="relative">
      {/* Glow behind the photo. */}
      <div
        aria-hidden="true"
        className="absolute -inset-6 rounded-full bg-radial from-blue-500/30 via-indigo-500/15 to-transparent blur-2xl"
      />
      {/* Offset outline frame. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 translate-x-3 translate-y-3 rounded-[2rem] border border-indigo-400/30 sm:translate-x-4 sm:translate-y-4"
      />

      <FloatingFrame distance={6}>
        <div className="relative rounded-[2rem] bg-linear-to-br from-blue-500 via-indigo-500 to-purple-500 p-[3px] shadow-2xl shadow-blue-900/40">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[calc(2rem-3px)] bg-surface-solid">
            {hasProfilePhoto() ? (
              <>
                <Image
                  src={src}
                  alt={alt}
                  fill
                  preload
                  sizes="(min-width: 640px) 368px, 80vw"
                  className="object-cover object-top"
                />
                {/* Blends the bottom of the photo into the page. */}
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-1/4 bg-linear-to-t from-slate-950/50 to-transparent"
                />
              </>
            ) : (
              <PortraitPlaceholder path={`public${src}`} />
            )}
          </div>
        </div>
      </FloatingFrame>

      {floatingLogos.map((logo) => (
        <FloatingFrame
          key={logo.icon}
          distance={10}
          duration={5}
          delay={logo.delay}
          className={cn('absolute z-10', logo.className)}
        >
          <span
            aria-hidden="true"
            className="grid size-11 place-items-center rounded-xl border border-line bg-surface-solid/90 shadow-lg shadow-black/30 backdrop-blur-md sm:size-12"
          >
            <BrandIcon name={logo.icon} colored className="size-5 sm:size-6" />
          </span>
        </FloatingFrame>
      ))}
    </div>
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
