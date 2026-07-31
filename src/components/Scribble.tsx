import React from 'react';
import {Easing, interpolate, random, useCurrentFrame} from 'remotion';
import {C} from '../theme';

/**
 * A marker oval that draws itself around whatever it's placed over — the
 * reference's closing move. The path is generated from the box it has to
 * enclose (with a little hand wobble) so it never has to be nudged by hand.
 */
export const ScribbleOval: React.FC<{
  width?: number;
  height?: number;
  color?: string;
  delay?: number;
  duration?: number;
  strokeWidth?: number;
  /** How far past a full turn the pen keeps going. */
  overlap?: number;
}> = ({
  width = 620,
  height = 300,
  color = C.mustard,
  delay = 6,
  duration = 22,
  strokeWidth = 12,
  overlap = 0.14,
}) => {
  const frame = useCurrentFrame() - delay;
  const pad = strokeWidth * 1.6;
  const rx = (width - pad * 2) / 2;
  const ry = (height - pad * 2) / 2;
  const cx = width / 2;
  const cy = height / 2;

  const steps = 46;
  const total = 1 + overlap;
  const start = -Math.PI * 0.62;
  const pts = new Array(steps + 1).fill(0).map((_, i) => {
    const t = (i / steps) * total * Math.PI * 2 + start;
    const wob = 1 + (random(`oval${i}`) - 0.5) * 0.05;
    // The pen drifts a touch as it comes back round, like a real marker.
    const drift = (i / steps) * total * 10;
    return [cx + Math.cos(t) * rx * wob + drift * 0.2, cy + Math.sin(t) * ry * wob - drift * 0.3];
  });

  const d = pts
    .map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`)
    .join(' ');

  const len = 3000;
  const draw = interpolate(frame, [0, duration], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none">
      <path
        d={d}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        pathLength={len}
        strokeDasharray={len}
        strokeDashoffset={len * (1 - draw)}
      />
    </svg>
  );
};

/** Small underline swash for kickers. */
export const Swash: React.FC<{width?: number; color?: string; delay?: number}> = ({
  width = 300,
  color = C.coral,
  delay = 8,
}) => {
  const frame = useCurrentFrame() - delay;
  const len = 1000;
  const draw = interpolate(frame, [0, 16], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  return (
    <svg width={width} height={width * 0.093} viewBox="0 0 300 28" fill="none">
      <path
        d="M6 20 C70 6 150 6 214 16 C244 21 268 20 294 10"
        stroke={color}
        strokeWidth={9}
        strokeLinecap="round"
        fill="none"
        pathLength={len}
        strokeDasharray={len}
        strokeDashoffset={len * (1 - draw)}
      />
    </svg>
  );
};
