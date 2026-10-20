# monineath.dev — Personal Portfolio

Single-page portfolio built with React 19, TypeScript, Vite, and Tailwind CSS v4.

## Commands

| Task | Command |
|---|---|
| Install | `npm install` |
| Dev server | `npm run dev` |
| Production build (type-checks first) | `npm run build` |
| Lint | `npm run lint` |
| Unit tests | `npm test` |

## Where things live

- `src/styles/globals.css` — the design system: theme colors (dark + light), fonts, layout tokens. Components use the semantic tokens (`bg-page`, `text-fg-muted`, `border-line`, …), never raw hex values.
- `src/lib/tones.ts` — accent hues for cards, badges, and icons.
- `src/data/` — all editable content: `site.ts` (name, email, social links, nav), `stack.ts`, `services.ts`, `projects.ts`.
- `src/components/ui/` — shared primitives (buttons, cards, tags, headings, icons).
- `src/components/layout/` — header, footer, theme toggle.
- `src/components/sections/` — one file per page section, in page order in `App.tsx`.
- `src/components/projects/` — project card and its illustrative previews.

## Notes

- **Contact form:** there is no backend. The form validates input, then opens the visitor's email app with the message drafted (`mailto:`). To collect submissions server-side, replace `buildInquiryMailto` in `src/lib/contactForm.ts` with a request to a form service.
- **Fonts:** Fira Code (primary/body) and Plus Jakarta Sans (headings and buttons) load from Google Fonts in `index.html`.
- **Theme:** dark by default; the toggle stores the choice in `localStorage`.
