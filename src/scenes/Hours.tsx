import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Melt} from '../components/Melt';
import {Scene} from '../components/Scene';
import {Slats} from '../components/Cafe';
import {ScribbleOval} from '../components/Scribble';
import {Kicker, Title} from '../components/Type';
import {C} from '../theme';

/** Beat 5 — the practical one, ringed by a marker oval like the reference. */
export const Hours: React.FC<{duration: number}> = ({duration}) => (
  <Scene bg={C.dusty} duration={duration} drift={0.045} glow={0.14}>
    <AbsoluteFill style={{opacity: 0.11}}>
      <Slats count={40} color={C.cream} thickness={8} />
    </AbsoluteFill>

    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', padding: '0 60px'}}>
      <Melt
        duration={duration}
        enter={11}
        exit={9}
        style={{display: 'grid', justifyItems: 'center', gap: 54}}
      >
        <Kicker color={C.mustard} size={50}>
          Open daily
        </Kicker>
        <div style={{position: 'relative', display: 'grid', justifyItems: 'center'}}>
          <Title size={124} color={C.cream} lineHeight={1.02}>
            9 am
            <br />
            till late
          </Title>
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none',
            }}
          >
            <ScribbleOval
              width={900}
              height={330}
              color={C.mustard}
              delay={18}
              duration={24}
              strokeWidth={13}
            />
          </div>
        </div>
      </Melt>
    </AbsoluteFill>
  </Scene>
);
