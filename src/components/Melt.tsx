import React, {useId} from 'react';
import {Easing, interpolate, useCurrentFrame} from 'remotion';

type MeltProps = {
  /** Length of the slot this element lives in, in frames. */
  duration: number;
  /** Frames to wait before the element starts forming. */
  delay?: number;
  /** Frames spent forming / dissolving. */
  enter?: number;
  exit?: number;
  /** Peak displacement in px — how violently the letters shred. */
  amount?: number;
  /** How much the block shrinks toward its centre while melted. */
  shrink?: number;
  /** Blob-merge strength. 0 disables the gooey pass (cheaper). */
  goo?: number;
  style?: React.CSSProperties;
  children: React.ReactNode;
};

/**
 * The reference reel's signature move: type doesn't fade in, it *condenses*.
 * A fractal-noise displacement map shreds the glyphs into blobs, then relaxes
 * to zero as the block scales up. On the way out the same thing runs backwards,
 * so every beat ends by boiling away instead of cutting flat.
 *
 * The filter is only mounted while it's actually doing something — a full-frame
 * feTurbulence on every one of 450 frames is not worth paying for.
 */
export const Melt: React.FC<MeltProps> = ({
  duration,
  delay = 0,
  enter = 11,
  exit = 9,
  amount = 170,
  shrink = 0.46,
  goo = 1,
  style,
  children,
}) => {
  const frame = useCurrentFrame() - delay;
  const id = useId().replace(/:/g, '');

  const inMelt = interpolate(frame, [0, enter], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const outMelt =
    exit <= 0
      ? 0
      : interpolate(frame, [duration - delay - exit, duration - delay], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
          easing: Easing.in(Easing.cubic),
        });

  const melt = Math.max(inMelt, outMelt);
  const active = melt > 0.004;

  // A touch of overshoot on the way in gives the block a little pop.
  const pop = interpolate(frame, [0, enter, enter + 6], [1 - shrink, 1.035, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.quad),
  });
  const scale = outMelt > 0 ? 1 - shrink * outMelt : pop;

  const displacement = amount * melt;
  const blur = goo * 7 * melt;
  const freq = 0.011 + 0.012 * melt;

  return (
    <>
      {active ? (
        <svg width={0} height={0} style={{position: 'absolute'}} aria-hidden>
          <defs>
            <filter id={id} x="-70%" y="-70%" width="240%" height="240%" colorInterpolationFilters="sRGB">
              <feTurbulence
                type="fractalNoise"
                baseFrequency={freq}
                numOctaves={3}
                seed={frame % 90}
                result="noise"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale={displacement}
                xChannelSelector="R"
                yChannelSelector="G"
                result="shred"
              />
              {goo > 0 ? (
                <feGaussianBlur in="shred" stdDeviation={blur} result="soft" />
              ) : null}
              {goo > 0 ? (
                <feColorMatrix
                  in="soft"
                  type="matrix"
                  values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -8"
                />
              ) : null}
            </filter>
          </defs>
        </svg>
      ) : null}
      <div
        style={{
          ...style,
          filter: active ? `url(#${id})` : undefined,
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
          opacity: frame < 0 || melt > 0.995 ? 0 : 1,
          willChange: 'filter, transform',
        }}
      >
        {children}
      </div>
    </>
  );
};
