import React from 'react';
import {Audio, getStaticFiles, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {FPS, TOTAL} from '../theme';

/**
 * Drop a track into public/audio/ and it scores the reel automatically —
 * trimmed to length with a short fade at each end. Nothing there, no audio.
 */
export const Soundtrack: React.FC = () => {
  const frame = useCurrentFrame();
  const track = getStaticFiles().find((f) => /^audio\/.+\.(mp3|m4a|aac|wav)$/i.test(f.name));

  if (!track) {
    return null;
  }

  const fade = FPS * 0.5;
  const volume = interpolate(
    frame,
    [0, fade, TOTAL - fade * 2, TOTAL],
    [0, 1, 1, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
  );

  return <Audio src={staticFile(track.name)} volume={volume} />;
};
