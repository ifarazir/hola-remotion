import React from 'react';
import {AbsoluteFill, random, useCurrentFrame} from 'remotion';

/**
 * 16mm-ish grain. Baked once into a data URI tile and jittered per frame —
 * far cheaper than running feTurbulence over 1080×1920 every frame, and the
 * repeat is invisible under the vignette.
 */
const tile = (size: number, freq: number) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">` +
      `<filter id="n"><feTurbulence type="fractalNoise" baseFrequency="${freq}" numOctaves="4" stitchTiles="stitch"/>` +
      `<feColorMatrix type="saturate" values="0"/></filter>` +
      `<rect width="100%" height="100%" filter="url(#n)"/></svg>`
  )}`;

const GRAIN = tile(260, 0.85);

export const Grain: React.FC<{opacity?: number}> = ({opacity = 0.17}) => {
  const frame = useCurrentFrame();
  const x = Math.round(random(`gx${frame}`) * 260);
  const y = Math.round(random(`gy${frame}`) * 260);

  return (
    <AbsoluteFill
      style={{
        backgroundImage: `url("${GRAIN}")`,
        backgroundPosition: `${x}px ${y}px`,
        opacity,
        mixBlendMode: 'overlay',
        pointerEvents: 'none',
      }}
    />
  );
};

/** Warm centre glow + darkened edges — the flat colour fields are never flat. */
export const Vignette: React.FC<{strength?: number; glow?: number}> = ({
  strength = 0.42,
  glow = 0.1,
}) => (
  <AbsoluteFill
    style={{
      background:
        `radial-gradient(58% 42% at 50% 42%, rgba(255,245,225,${glow}) 0%, rgba(255,245,225,0) 62%),` +
        `radial-gradient(88% 68% at 50% 48%, rgba(0,0,0,0) 38%, rgba(0,0,0,${strength}) 100%)`,
      pointerEvents: 'none',
    }}
  />
);
