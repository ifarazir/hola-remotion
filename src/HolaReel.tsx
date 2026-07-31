import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {BEATS, startOf} from './theme';
import {Hello} from './scenes/Hello';
import {Bohemian} from './scenes/Bohemian';
import {Space} from './scenes/Space';
import {Menu} from './scenes/Menu';
import {Hours} from './scenes/Hours';
import {End} from './scenes/End';
import {Soundtrack} from './components/Soundtrack';

/**
 * Six hard-cut beats, 15s total. No cross-fades anywhere — every transition is
 * carried by the type melting away and the colour field snapping to the next.
 */
export const HolaReel: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: '#000'}}>
    <Soundtrack />
    <Sequence from={startOf('hello')} durationInFrames={BEATS.hello} name="1 · Hola">
      <Hello duration={BEATS.hello} />
    </Sequence>
    <Sequence from={startOf('bohemian')} durationInFrames={BEATS.bohemian} name="2 · Bohemian days">
      <Bohemian duration={BEATS.bohemian} />
    </Sequence>
    <Sequence from={startOf('space')} durationInFrames={BEATS.space} name="3 · The room">
      <Space duration={BEATS.space} />
    </Sequence>
    <Sequence from={startOf('menu')} durationInFrames={BEATS.menu} name="4 · Coffee · Mezze · Wine">
      <Menu duration={BEATS.menu} />
    </Sequence>
    <Sequence from={startOf('hours')} durationInFrames={BEATS.hours} name="5 · Open daily">
      <Hours duration={BEATS.hours} />
    </Sequence>
    <Sequence from={startOf('end')} durationInFrames={BEATS.end} name="6 · Lockup">
      <End duration={BEATS.end} />
    </Sequence>
  </AbsoluteFill>
);
