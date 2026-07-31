import React from 'react';
import {cancelRender, Composition, continueRender, delayRender} from 'remotion';
import {HolaReel} from './HolaReel';
import {loadHolaFonts} from './fonts';
import {FPS, HEIGHT, TOTAL, WIDTH} from './theme';

// Must happen in the browser bundle, not in calculateMetadata — the render
// process would otherwise paint the first frames with fallback metrics.
const fontHandle = delayRender('Loading Hola fonts');
loadHolaFonts()
  .then(() => continueRender(fontHandle))
  .catch((err) => cancelRender(err));

export const RemotionRoot: React.FC = () => (
  <Composition
    id="HolaReel"
    component={HolaReel}
    durationInFrames={TOTAL}
    fps={FPS}
    width={WIDTH}
    height={HEIGHT}
  />
);
