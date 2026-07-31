import React, {useId} from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {C} from '../theme';

/**
 * Motifs traced from the café itself — the arched pine-slat pergola, the
 * terracotta banquette, the olive/mustard herringbone cushions and the woven
 * rattan pendant. Everything is drawn, so it stays crisp at 1080×1920 and
 * always sits exactly on the brand palette.
 */

/** Horizontal pine battens, as on the pergola roof and the screen walls. */
export const Slats: React.FC<{
  count?: number;
  color?: string;
  thickness?: number;
  opacity?: number;
}> = ({count = 26, color = C.sand, thickness = 10, opacity = 1}) => (
  <AbsoluteFill style={{opacity}}>
    {new Array(count).fill(0).map((_, i) => (
      <div
        key={i}
        style={{
          position: 'absolute',
          left: '-6%',
          width: '112%',
          top: `${(i / count) * 100}%`,
          height: thickness,
          background: color,
          borderRadius: thickness,
        }}
      />
    ))}
  </AbsoluteFill>
);

/** One arch of the pergola, slats clipped to the arch silhouette. */
export const Arch: React.FC<{
  w: number;
  h: number;
  frameColor?: string;
  slatColor?: string;
  slats?: number;
  fill?: string;
  /** Anything to show behind the slats — foliage, sky, a photo. */
  behind?: React.ReactNode;
}> = ({w, h, frameColor = C.cream, slatColor = C.sand, slats = 18, fill = 'transparent', behind}) => {
  const uid = useId().replace(/:/g, '');
  const r = w / 2;
  const straight = Math.max(h - r, 0);

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none">
      <defs>
        <clipPath id={uid}>
          <path d={`M0 ${h} V${r} A${r} ${r} 0 0 1 ${w} ${r} V${h} Z`} />
        </clipPath>
      </defs>
      <path d={`M0 ${h} V${r} A${r} ${r} 0 0 1 ${w} ${r} V${h} Z`} fill={fill} />
      <g clipPath={`url(#${uid})`}>{behind}</g>
      <g clipPath={`url(#${uid})`}>
        {new Array(slats).fill(0).map((_, i) => (
          <rect
            key={i}
            x={-4}
            y={(i / slats) * h + straight * 0.02}
            width={w + 8}
            height={h / slats / 2.6}
            rx={5}
            fill={slatColor}
          />
        ))}
      </g>
      <path
        d={`M0 ${h} V${r} A${r} ${r} 0 0 1 ${w} ${r} V${h}`}
        stroke={frameColor}
        strokeWidth={12}
        fill="none"
      />
    </svg>
  );
};

/** The cushion textile: olive chevrons with mustard stitch lines on cream. */
export const Herringbone: React.FC<{
  width: number;
  height: number;
  radius?: number;
  scale?: number;
}> = ({width, height, radius = 18, scale = 1}) => {
  const uid = useId().replace(/:/g, '');
  const s = 34 * scale;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <defs>
        <pattern id={uid} width={s} height={s} patternUnits="userSpaceOnUse">
          <rect width={s} height={s} fill="#EDE6D2" />
          <path
            d={`M${s * 0.16} ${s * 0.34} L${s * 0.36} ${s * 0.14} L${s * 0.56} ${s * 0.34}`}
            stroke={C.olive}
            strokeWidth={s * 0.11}
            fill="none"
            strokeLinecap="round"
          />
          <path
            d={`M${s * 0.16} ${s * 0.82} L${s * 0.36} ${s * 0.62} L${s * 0.56} ${s * 0.82}`}
            stroke={C.olive}
            strokeWidth={s * 0.11}
            fill="none"
            strokeLinecap="round"
          />
          <path
            d={`M${s * 0.82} 0 V${s}`}
            stroke={C.mustard}
            strokeWidth={s * 0.09}
            strokeDasharray={`${s * 0.16} ${s * 0.14}`}
          />
        </pattern>
      </defs>
      <rect width={width} height={height} rx={radius} fill={`url(#${uid})`} />
    </svg>
  );
};

/** Woven rattan pendant lamp on its flex. */
export const Pendant: React.FC<{width?: number; cord?: number; color?: string}> = ({
  width = 300,
  cord = 240,
  color = C.sand,
}) => {
  const cx = width / 2;
  const dome = width * 0.34; // height of the woven dome
  const top = cord; // where the shade starts
  const rim = top + dome; // flat underside of the shade
  const h = rim + width * 0.1;

  return (
    <svg width={width} height={h} viewBox={`0 0 ${width} ${h}`}>
      {/* flex + ceiling rose */}
      <path d={`M${cx} 0 V${top - 4}`} stroke={C.navy} strokeWidth={5} opacity={0.7} />
      <rect x={cx - 16} y={0} width={32} height={12} rx={5} fill={C.navy} opacity={0.7} />
      {/* woven dome: flat underside, domed top */}
      <path
        d={`M${cx - width / 2} ${rim} Q${cx - width * 0.46} ${top} ${cx} ${top} Q${
          cx + width * 0.46
        } ${top} ${cx + width / 2} ${rim} Z`}
        fill={color}
      />
      {/* weave ribs */}
      {[-0.34, -0.17, 0, 0.17, 0.34].map((p) => (
        <path
          key={p}
          d={`M${cx + width * p} ${rim} Q${cx + width * p * 0.75} ${top + dome * 0.25} ${
            cx + width * p * 0.34
          } ${top + dome * 0.06}`}
          stroke="rgba(90,50,20,0.16)"
          strokeWidth={3}
          fill="none"
        />
      ))}
      {/* rim ellipse, seen slightly from below */}
      <ellipse cx={cx} cy={rim} rx={width / 2} ry={width * 0.075} fill={color} />
      <ellipse
        cx={cx}
        cy={rim}
        rx={width * 0.38}
        ry={width * 0.055}
        fill="rgba(60,40,20,0.18)"
        stroke={C.navy}
        strokeWidth={4}
        strokeOpacity={0.35}
      />
    </svg>
  );
};

/** Olive canopy glimpsed through the pergola, as in the courtyard photos. */
export const Foliage: React.FC<{w: number; h: number}> = ({w, h}) => {
  const blobs: [number, number, number, number][] = [
    [0.06, 0.99, 0.19, 0.1],
    [0.26, 1.02, 0.2, 0.11],
    [0.52, 0.99, 0.18, 0.09],
    [0.78, 1.03, 0.21, 0.11],
    [0.97, 0.98, 0.17, 0.09],
    [0.14, 0.9, 0.13, 0.06],
    [0.42, 0.88, 0.15, 0.07],
    [0.67, 0.91, 0.12, 0.06],
    [0.9, 0.87, 0.11, 0.05],
    [0.3, 0.8, 0.09, 0.04],
    [0.58, 0.82, 0.1, 0.045],
  ];

  return (
    <g>
      {blobs.map(([x, y, rx, ry], i) => (
        <ellipse
          key={i}
          cx={w * x}
          cy={h * y}
          rx={w * rx}
          ry={h * ry}
          fill={i % 2 ? '#4E6B43' : '#5F7C4C'}
          opacity={0.9}
        />
      ))}
    </g>
  );
};

/** Slat shadows raking across the plaster — the light does the animating. */
export const SlatLight: React.FC<{
  duration: number;
  angle?: number;
  opacity?: number;
}> = ({duration, angle = -22, opacity = 0.16}) => {
  const frame = useCurrentFrame();
  const shift = interpolate(frame, [0, duration], [0, 190]);

  return (
    <AbsoluteFill
      style={{
        background: `repeating-linear-gradient(${angle}deg, rgba(0,0,0,${opacity}) 0px, rgba(0,0,0,${opacity}) 26px, rgba(255,255,255,0) 26px, rgba(255,255,255,0) 96px)`,
        transform: `translateX(${shift}px)`,
        pointerEvents: 'none',
      }}
    />
  );
};
