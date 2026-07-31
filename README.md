# Hola — Instagram Reel (Remotion)

A 15-second, 1080×1920 reel for **Hola**, the Mediterranean-bohemian café in Tehran.

The motion language is taken from the supplied reference: flat, saturated colour
fields, chunky retro display type, **hard cuts only**, film grain and a warm
vignette over everything. Type never fades — it condenses out of a fractal-noise
displacement and boils away again at the end of each beat.

## Run it

```bash
npm install
npm run studio               # preview + scrub in Remotion Studio
npm run render               # → out/hola-reel.mp4
```

If Chrome isn't found automatically, pass one:

```bash
npx remotion render HolaReel out/hola-reel.mp4 --browser-executable=/path/to/chrome
```

## The 15 seconds

| # | Beat | Frames | Colour | Copy |
|---|------|--------|--------|------|
| 1 | Hello | 0–75 | deep navy | `TEHRAN SAYS` / **HOLA** / _café_, coral hand waving in |
| 2 | Bohemian | 75–150 | terracotta | `MEDITERRANEAN` / **BOHEMIAN DAYS**, pergola arcade behind |
| 3 | The room | 150–240 | cream | the space itself — arch, pine slats, pendant, banquette |
| 4 | Menu | 240–315 | olive | `ALL DAY, EVERY DAY` / **COFFEE · MEZZE · WINE** |
| 5 | Hours | 315–390 | dusty blue | `OPEN DAILY` / **9 AM TILL LATE**, marker oval |
| 6 | Lockup | 390–450 | coral | logo, `@hola.cafe · Tehran`, Persian line |

Timings live in `src/theme.ts` (`BEATS`) — change a number there and everything
downstream re-flows.

## Dropping in the real assets

Everything below is optional; without it the reel renders complete from code.

- **`public/logo/mark.svg`** and **`public/logo/wordmark.svg`** (`.png`/`.webp`
  also work) — used verbatim if present. Otherwise the vector rebuilds in
  `src/components/HolaLogo.tsx` stand in.
- **`public/photos/*.jpg`** — the first photo takes over beat 3, cropped into
  the arch with a slow push-in and the slat light raking over it. Shoot/pick a
  vertical frame. With no photos, the drawn room is used.
- **`public/audio/*.mp3`** — scores the reel, with a half-second fade at each
  end. Nothing there means a silent render.

## Brand tokens

`src/theme.ts` holds the palette, pulled from the logo (coral hand `#E9744F`,
navy wordmark `#2E4E68`) and the café (terracotta banquette, pine slats, olive
and mustard herringbone, cream plaster). Fonts are vendored in `public/fonts/`
so a render never depends on the network:

- **Alfa Slab One** — display
- **Archivo Black** — kickers
- **Caveat** — handwritten accents
- **Vazirmatn** — Persian

## Where the effects live

- `src/components/Melt.tsx` — the signature reveal. `feTurbulence` →
  `feDisplacementMap` → gooey alpha contrast, animated to zero as the block
  scales up. The filter is only mounted while it's actually doing something.
- `src/components/Texture.tsx` — grain (a jittered noise tile, not a per-frame
  turbulence pass) and the vignette.
- `src/components/Cafe.tsx` — arches, pine slats, herringbone cushions, the
  rattan pendant, raking slat light.
- `src/components/Scribble.tsx` — self-drawing marker oval and swash.
