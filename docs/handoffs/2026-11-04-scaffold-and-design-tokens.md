# Scaffold and design tokens

- **Date**: 2026-11-04
- **Status**: complete, not committed
- **Repos touched**: frontend-japanese-learning, backend-japanese-learning
- **Supersedes**: none (first handoff)

## Summary

Set up the Next.js app: a typed API client, types that mirror the backend, the Tuon design tokens (from the
"Hoshibi design tokens v0.1" design file, renamed and extended with full shade scales), and the four brand fonts.
The app was renamed from Hoshibi to **Tuon (トゥオン)**. The only page is a placeholder that checks the API.

## Current state

Verified on 2026-11-04:

- `npm run lint`, `npx tsc --noEmit` and `npm run build`: pass.
- With the backend running, the dev server rendered the API status as "ok" with 100 speakers. That was checked
  before the token restyle; after it, only the build was re-run.
- In the built CSS, every semantic utility resolves to the intended palette variable (`bg-canvas`,
  `text-primary`/`secondary`/`muted`, `text-accent`, `text-correct`, `text-weak`, `font-display`, `font-jp`, the
  default border). Shippori Mincho is emitted as 244 unicode-range slices, so Japanese glyphs load on demand.
- **Not checked visually in a browser**, and the user hasn't reviewed the generated shades.

## Decisions

- **Name**: Tuon, with the katakana トゥオン (トゥ is the usual spelling of "tu"). It means "to learn" in Romblomanon,
  the user's native language. The repo and package names stay `*-japanese-learning`.
- **Dark theme only**, with `color-scheme: dark`.
- **Two token layers** in `src/app/globals.css`:
  - Palette scales (`night`, `sand`, `gold`, `teal`, `sakura`, 50 to 950, plus `void`), interpolated in OKLCH with
    each original design color at a fixed step: `night-950/900/800` = bg-deep/mid/elev,
    `sand-100/400/600` = ink/ink-soft/ink-mute, `gold-400/700` = gold/gold-deep, `teal-400`, `sakura-400`.
  - Semantic tokens named by role. Readability matters more than matching the design file's names, so `--ink`
    became `text-primary` and `--line` became `border-default`.
- **Utility-specific namespaces**: `--text-color-*`, `--background-color-*` and `--border-color-*`. Class names
  read `text-primary` rather than `text-text-primary`, and `bg-primary` doesn't exist, on purpose. Accent and
  state colors (`accent`, `listening`, `recording`, `feedback`, `correct`, `weak`, `complete`) are plain
  `--color-*` tokens, so they work with any color utility.
- **Color encodes learning phase**: gold = listening, sakura = recording, teal = feedback. In the design file an
  "orb" changes hue by state, so no text label is needed.
- **Fonts** come through `next/font/google`: Fraunces (display, italic too), Manrope (UI, the default sans),
  Shippori Mincho 400/500 (Japanese), JetBrains Mono (IPA, timers, scores). Geist was removed.
- **Gradients**: `bg-canvas` for landing, listening and feedback, and `bg-canvas-deep` for recording and stage
  complete. There's also `animate-twinkle` for background stars.
- **Environment**: Node 24 (`.nvmrc`). The project `.npmrc` pins `registry.npmjs.org`, because the user's global
  `~/.npmrc` points at an unreachable work registry.
- **API types are mirrored by hand** from the backend for now.

## Changes

- `src/app/globals.css`: all design tokens
- `src/app/layout.tsx`: fonts, metadata (`title: "Tuon"`)
- `src/app/page.tsx`: placeholder with the API status
- `src/lib/config.ts`, `src/lib/api.ts`: `API_URL`, `apiGet`, `ApiError`
- `src/types/corpus.ts`: API types
- `.env.example`, `.nvmrc`, `.npmrc`, `.gitignore` (allows `.env.example`)
- Removed the create-next-app SVGs from `public/`
- `README.md` (token reference tables), `CLAUDE.md`, `docs/handoffs/`

## Known issues

- **Nothing is committed.** The remote `github.com/arrecto/frontend-japanese-learning` is empty. Committing is
  waiting on the user's OK.
- The visual check above hasn't been done.
- `AGENTS.md` is generated, and `next dev` re-adds it. `CLAUDE.md` imports it.
- Disk space is tight: 8.1 GB free on 2026-11-04. An earlier `npm install` failed when the disk was full.

## Next steps

1. Commit and push. **Needs the user's OK.**
2. Optional: a dev-only `/tokens` page that shows every swatch and font, for the visual check. It was offered to
   the user, who hasn't answered yet.
3. Build the first real screens once the backend has corpus endpoints. The design implies a stage flow of
   listening, then recording, then feedback. **Confirm the flow with the user.**
4. Consider generating the types from the backend's `/openapi.json` instead of mirroring them by hand.

## Related

- Backend: `../backend-japanese-learning/docs/handoffs/2026-11-04-api-scaffold.md`
- Pipeline: `../pipeline-japanese-learning/docs/handoffs/2026-11-04-baseline.md`
- Design source: `~/Downloads/hoshibi_design_tokens.html`
