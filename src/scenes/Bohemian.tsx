import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {Melt} from '../components/Melt';
import {Scene} from '../components/Scene';
import {Arch} from '../components/Cafe';
import {Kicker, Title} from '../components/Type';
import {C} from '../theme';

/** Beat 2 — the positioning line, standing inside the pergola arcade. */
export const Bohemian: React.FC<{duration: number}> = ({duration}) => {
  const frame = useCurrentFrame();
  const slide = interpolate(frame, [0, duration], [-40, 40]);

  return (
    <Scene bg={C.clay} duration={duration} drift={0.05} glow={0.12}>
      <AbsoluteFill
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          opacity: 0.5,
          transform: `translateX(${slide}px)`,
        }}
      >
        <div style={{display: 'flex', gap: 46, alignItems: 'flex-end'}}>
          {[0, 1, 2].map((i) => (
            <Arch
              key={i}
              w={i === 1 ? 400 : 300}
              h={i === 1 ? 1080 : 900}
              slats={i === 1 ? 20 : 17}
              frameColor="#F0DCC6"
              slatColor="#EBC79A"
              fill="rgba(255,240,220,0.07)"
            />
          ))}
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', padding: '0 60px'}}>
        <Melt
          duration={duration}
          enter={11}
          exit={9}
          style={{display: 'grid', justifyItems: 'center', gap: 28}}
        >
          <Kicker color={C.mustard} size={50}>
            Mediterranean
          </Kicker>
          <Title size={158} color={C.cream} lineHeight={0.94}>
            Bohemian
            <br />
            Days
          </Title>
        </Melt>
      </AbsoluteFill>
    </Scene>
  );
};
