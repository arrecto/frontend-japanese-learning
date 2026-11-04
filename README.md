# frontend-japanese-learning

Web app for Tuon (トゥオン), a Japanese learning app. "Tuon" means "to learn" in Romblomanon. Next.js (App Router), React, TypeScript, Tailwind CSS v4.

## Setup

Requires Node 24 (`nvm use`).

```bash
npm install
cp .env.example .env.local
```

The project `.npmrc` pins the public npm registry so installs don't depend on a global registry setting.

## Scripts

```bash
npm run dev     # http://localhost:3000
npm run build
npm run start
npm run lint
```

## Environment

| Variable | Default | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_API_URL` | `http://localhost:8000/api/v1` | Base URL of backend-japanese-learning |

## Layout

```
src/
  app/              Routes (App Router)
  lib/config.ts     Runtime configuration
  lib/api.ts        Typed fetch wrapper (apiGet, ApiError)
  types/corpus.ts   API types, mirroring backend app/schemas/corpus.py
```

## Design tokens

All tokens live in `src/app/globals.css`. The theme is dark only.

**Semantic tokens.** Use these by default. Each one is named for its role.

| Role | Utilities | Value |
| --- | --- | --- |
| Backgrounds | `bg-base`, `bg-surface`, `bg-surface-raised` | night 950 / 900 / 800 |
| Text | `text-primary`, `text-secondary`, `text-muted` | sand 100 / 400 / 600 |
| Borders | `border-default` (the default for every border), `border-subtle` | sand 100 at 10% / 5% |
| Accent | `*-accent`, `*-accent-deep` | gold 400 / 700 |
| Learning phase | `*-listening`, `*-recording`, `*-feedback` | gold / sakura / teal 400 |
| Phoneme result | `*-correct`, `*-weak`, `*-complete` | teal 400 / sakura 400 / gold 700 |
| Gradients | `bg-canvas` (landing, listening, feedback), `bg-canvas-deep` (recording, stage complete) | |

`*` means any color utility (`text-`, `bg-`, `border-`, `ring-`, ...). Color encodes phase, not decoration.

**Palette.** Full 50-950 scales for `night`, `sand`, `gold`, `teal` and `sakura` (for example `bg-teal-900/40` or
`text-gold-300`), plus `void` for the outermost gradient stop. Shades were interpolated in OKLCH, with the original
design colors kept exactly at the steps noted in `globals.css`.

**Fonts.**

| Utility | Face | Use |
| --- | --- | --- |
| `font-display` | Fraunces | headlines, hero moments, italic accents |
| `font-sans` (default) | Manrope | interface: buttons, labels, body |
| `font-jp` | Shippori Mincho | all kana and kanji (also set `lang="ja"`) |
| `font-mono` | JetBrains Mono | IPA, timers, accuracy values |

**Motion.** `animate-twinkle` for background stars.

Audio URLs returned by the API are presigned and expire after a few minutes. Request them shortly before playback
and don't cache them.
