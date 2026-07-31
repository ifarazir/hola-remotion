import React from 'react';
import {getStaticFiles, Img, staticFile} from 'remotion';
import {C} from '../theme';

/**
 * If the real artwork is dropped into `public/logo/` (mark.svg / mark.png,
 * wordmark.svg / wordmark.png) it is used verbatim. Otherwise these vector
 * rebuilds stand in — same silhouette, same two brand colours.
 */
const findAsset = (base: string) => {
  const hit = getStaticFiles().find((f) =>
    new RegExp(`^logo/${base}\\.(svg|png|webp)$`, 'i').test(f.name)
  );
  return hit ? staticFile(hit.name) : null;
};

type Pt = [number, number];

/** Polygon with every corner rounded — how the wordmark's "A" is built. */
const roundedPolygon = (pts: Pt[], r: number) => {
  const n = pts.length;
  const towards = (from: Pt, to: Pt, d: number): Pt => {
    const [dx, dy] = [to[0] - from[0], to[1] - from[1]];
    const len = Math.hypot(dx, dy) || 1;
    const k = Math.min(d, len / 2) / len;
    return [from[0] + dx * k, from[1] + dy * k];
  };

  return (
    pts
      .map((v, i) => {
        const a = towards(v, pts[(i - 1 + n) % n], r);
        const b = towards(v, pts[(i + 1) % n], r);
        const move = i === 0 ? 'M' : 'L';
        return `${move}${a[0].toFixed(1)} ${a[1].toFixed(1)} Q${v[0]} ${v[1]} ${b[0].toFixed(
          1
        )} ${b[1].toFixed(1)}`;
      })
      .join(' ') + ' Z'
  );
};

const A_OUTER: Pt[] = [
  [522, 20],
  [594, 180],
  [450, 180],
];
const A_COUNTER: Pt[] = [
  [522, 88],
  [541, 132],
  [503, 132],
];

/** The waving-hand / coral mark. */
export const HolaMark: React.FC<{size?: number; color?: string; gap?: string}> = ({
  size = 320,
  color = C.coral,
  gap = 'transparent',
}) => {
  const real = findAsset('mark');
  if (real) {
    return <Img src={real} style={{width: size, height: 'auto'}} />;
  }

  // Four splayed fingers pivoting off the heel of the hand.
  const fingers = [
    {rot: -16, len: 152, w: 37},
    {rot: 6, len: 172, w: 39},
    {rot: 31, len: 158, w: 38},
    {rot: 59, len: 128, w: 35},
  ];

  return (
    <svg width={size} height={size * 1.12} viewBox="0 0 220 246" fill="none">
      <g transform="translate(122 188)">
        {fingers.map((f, i) => (
          <rect
            key={i}
            x={-f.w / 2}
            y={-f.len}
            width={f.w}
            height={f.len + 36}
            rx={f.w / 2}
            fill={color}
            transform={`rotate(${f.rot})`}
          />
        ))}
      </g>
      {/* palm blob, held off the fingers by a sliver of the background */}
      <ellipse
        cx="92"
        cy="176"
        rx="41"
        ry="56"
        fill={color}
        stroke={gap}
        strokeWidth={gap === 'transparent' ? 0 : 12}
        transform="rotate(-12 92 176)"
      />
      {/* detached thumb */}
      <ellipse cx="32" cy="106" rx="26" ry="52" fill={color} transform="rotate(-13 32 106)" />
    </svg>
  );
};

/** The HOLA wordmark: rounded geometric strokes + the wedge "A". */
export const HolaWordmark: React.FC<{width?: number; color?: string}> = ({
  width = 520,
  color = C.navy,
}) => {

  const real = findAsset('wordmark');
  if (real) {
    return <Img src={real} style={{width, height: 'auto'}} />;
  }

  // Cap height runs 20→180 once the round caps are accounted for.
  const sw = 46;
  return (
    <svg width={width} height={width * (200 / 610)} viewBox="0 0 610 200" fill="none">
      <g stroke={color} strokeWidth={sw} strokeLinecap="round" fill="none">
        {/* H */}
        <path d="M45 43 V157" />
        <path d="M125 43 V157" />
        <path d="M45 100 H125" />
        {/* O */}
        <circle cx="232" cy="100" r="52" />
        {/* L */}
        <path d="M348 43 V157" />
        <path d="M348 157 H414" />
      </g>
      {/* A — a solid wedge with rounded corners and a triangular counter cut
          straight out of the same path, so it reads on any background. */}
      <path
        d={`${roundedPolygon(A_OUTER, 20)} ${roundedPolygon(A_COUNTER, 5)}`}
        fill={color}
        fillRule="evenodd"
      />
    </svg>
  );
};

/** Stacked lockup: mark over wordmark, as on the café's signage. */
export const HolaLockup: React.FC<{size?: number; mark?: string; word?: string; bg?: string}> = ({
  size = 420,
  mark = C.coral,
  word = C.navy,
  bg = 'transparent',
}) => (
  <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: size * 0.1}}>
    <HolaMark size={size * 0.72} color={mark} gap={bg} />
    <HolaWordmark width={size} color={word} />
  </div>
);
