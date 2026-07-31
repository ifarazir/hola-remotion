import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Melt} from '../components/Melt';
import {Scene} from '../components/Scene';
import {Herringbone} from '../components/Cafe';
import {Kicker, Title} from '../components/Type';
import {Swash} from '../components/Scribble';
import {C} from '../theme';

const ITEMS = ['Coffee', 'Mezze', 'Wine'];

/** Beat 4 — what's on the table. Each line lands on its own offset. */
export const Menu: React.FC<{duration: number}> = ({duration}) => (
  <Scene bg={C.olive} duration={duration} drift={0.04} glow={0.11}>
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', opacity: 0.13}}>
      <Herringbone width={1400} height={2200} radius={0} scale={3.4} />
    </AbsoluteFill>

    <AbsoluteFill
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 46,
      }}
    >
      <Melt
        duration={duration}
        enter={10}
        exit={9}
        amount={130}
        style={{display: 'grid', justifyItems: 'center', gap: 14}}
      >
        <Kicker color={C.mustard} size={48}>
          All day, every day
        </Kicker>
        <Swash width={320} color={C.mustard} delay={12} />
      </Melt>

      <div style={{display: 'grid', justifyItems: 'center', gap: 12}}>
        {ITEMS.map((item, i) => (
          <Melt
            key={item}
            duration={duration}
            delay={5 + i * 5}
            enter={10}
            exit={8}
            amount={150}
            style={{display: 'grid', justifyItems: 'center'}}
          >
            <Title size={156} color={i === 1 ? C.mustard : C.cream}>
              {item}
            </Title>
          </Melt>
        ))}
      </div>
    </AbsoluteFill>
  </Scene>
);
