import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import {Melt} from '../components/Melt';
import {Scene} from '../components/Scene';
import {HolaMark} from '../components/HolaLogo';
import {Kicker, Script, Title} from '../components/Type';
import {C} from '../theme';

/** Beat 1 — the greeting. The coral hand waves in above the word. */
export const Hello: React.FC<{duration: number}> = ({duration}) => {
  const frame = useCurrentFrame();
  const rise = interpolate(frame, [2, 24], [180, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const out = interpolate(frame, [duration - 9, duration], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const wave = Math.sin(frame / 9) * 5;

  return (
    <Scene bg={C.deepNavy} duration={duration} glow={0.13}>
      <AbsoluteFill
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: 30,
        }}
      >
        <div
          style={{
            transform: `translateY(${rise}px) rotate(${wave}deg) scale(${0.8 + 0.2 * out})`,
            transformOrigin: 'bottom center',
            opacity: out,
          }}
        >
          <HolaMark size={380} color={C.coral} gap={C.deepNavy} />
        </div>

        <Melt
          duration={duration}
          enter={12}
          exit={9}
          style={{display: 'grid', justifyItems: 'center', gap: 18}}
        >
          <Kicker color={C.mustard} size={50}>
            Tehran says
          </Kicker>
          <Title size={250} color={C.cream}>
            Hola
          </Title>
          <div style={{marginTop: -8}}>
            <Script color={C.coral} size={104} rotate={-8}>
              café
            </Script>
          </div>
        </Melt>
      </AbsoluteFill>
    </Scene>
  );
};
