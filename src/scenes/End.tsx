import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import {Melt} from '../components/Melt';
import {Scene} from '../components/Scene';
import {HolaLockup} from '../components/HolaLogo';
import {Farsi, Kicker} from '../components/Type';
import {C} from '../theme';

/** Beat 6 — the card you screenshot: lockup, handle, city. */
export const End: React.FC<{duration: number}> = ({duration}) => {
  const frame = useCurrentFrame();
  const settle = interpolate(frame, [0, 20], [0.9, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const footer = interpolate(frame, [16, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <Scene bg={C.coral} duration={duration} drift={0.02} vignette={0.34} glow={0.15}>
      <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', marginTop: -90}}>
        <Melt duration={duration} enter={13} exit={0} amount={190} shrink={0.5}>
          <div style={{transform: `scale(${settle})`}}>
            <HolaLockup size={560} mark={C.cream} word={C.navy} bg={C.coral} />
          </div>
        </Melt>
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          alignItems: 'center',
          justifyContent: 'flex-end',
          paddingBottom: 190,
          opacity: footer,
        }}
      >
        <div style={{display: 'grid', justifyItems: 'center', gap: 26}}>
          <Kicker color={C.navy} size={46}>
            @hola.cafe · Tehran
          </Kicker>
          <Farsi color={C.cream} size={44}>
            کافه هُلا — یک گوشه‌ی مدیترانه‌ای در تهران
          </Farsi>
        </div>
      </AbsoluteFill>
    </Scene>
  );
};
