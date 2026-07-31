import {loadFont} from '@remotion/fonts';
import {staticFile} from 'remotion';
import {FONT} from './theme';

/** Fonts are vendored in public/fonts so a render never depends on the network. */
export const loadHolaFonts = () =>
  Promise.all([
    loadFont({family: FONT.display, url: staticFile('fonts/alfa-slab-one.woff2'), weight: '400'}),
    loadFont({family: FONT.kicker, url: staticFile('fonts/archivo-black.woff2'), weight: '400'}),
    loadFont({family: FONT.script, url: staticFile('fonts/caveat-700.woff2'), weight: '700'}),
    loadFont({family: FONT.fa, url: staticFile('fonts/vazirmatn-700.woff2'), weight: '700'}),
  ]);
