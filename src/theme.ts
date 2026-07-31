/**
 * Hola — brand tokens.
 * Colours are lifted from the logo (coral hand + navy wordmark) and from the
 * café itself: terracotta banquettes, pine slats, olive/mustard herringbone
 * cushions, cream plaster walls.
 */
export const C = {
  coral: '#E9744F', // logo hand
  navy: '#2E4E68', // logo wordmark
  deepNavy: '#22394E',
  clay: '#B84B2A', // terracotta bench
  cream: '#F3EBDD', // plaster wall
  sand: '#E7D3AE', // pine slats
  olive: '#4E6B43', // cushion chevrons
  mustard: '#E3A63A', // cushion accent stitch
  dusty: '#5F7C99', // shaded sky through the pergola
} as const;

export const FONT = {
  display: 'HolaDisplay', // Alfa Slab One — chunky retro slab
  kicker: 'HolaKicker', // Archivo Black — wood-type gothic
  script: 'HolaScript', // Caveat 700 — handwritten accent
  fa: 'HolaFa', // Vazirmatn 700 — Persian
} as const;

export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;

/** Scene lengths in frames — hard cuts, ~2.5s a beat like the reference. */
export const BEATS = {
  hello: 75,
  bohemian: 75,
  space: 90,
  menu: 75,
  hours: 75,
  end: 60,
} as const;

export const TOTAL = Object.values(BEATS).reduce((a, b) => a + b, 0); // 450 = 15s

export const startOf = (key: keyof typeof BEATS) => {
  const keys = Object.keys(BEATS) as (keyof typeof BEATS)[];
  return keys.slice(0, keys.indexOf(key)).reduce((a, k) => a + BEATS[k], 0);
};
