import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {Grain, Vignette} from './Texture';

type Props = {
  bg: string;
  duration: number;
  /** Slow push-in keeps a flat colour field from feeling like a still. */
  drift?: number;
  grain?: number;
  vignette?: number;
  glow?: number;
  children: React.ReactNode;
};

export const Scene: React.FC<Props> = ({
  bg,
  duration,
  drift = 0.035,
  grain = 0.17,
  vignette = 0.42,
  glow = 0.1,
  children,
}) => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [0, duration], [1, 1 + drift]);

  return (
    <AbsoluteFill style={{backgroundColor: bg, overflow: 'hidden'}}>
      <AbsoluteFill
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {children}
      </AbsoluteFill>
      <Vignette strength={vignette} glow={glow} />
      <Grain opacity={grain} />
    </AbsoluteFill>
  );
};
