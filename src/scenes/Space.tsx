import React from 'react';
import {
  AbsoluteFill,
  Easing,
  getStaticFiles,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from 'remotion';
import {Melt} from '../components/Melt';
import {Scene} from '../components/Scene';
import {Arch, Foliage, Herringbone, Pendant, SlatLight} from '../components/Cafe';
import {Kicker} from '../components/Type';
import {C} from '../theme';

/** Any jpg/png dropped into public/photos/ takes over this beat. */
const cafePhotos = () =>
  getStaticFiles()
    .filter((f) => /^photos\/.+\.(jpe?g|png|webp)$/i.test(f.name))
    .map((f) => staticFile(f.name))
    .sort();

/** Photo in an arch cut-out, pushing in slowly behind the slat light. */
const ArchPhoto: React.FC<{src: string; duration: number; w: number; h: number}> = ({
  src,
  duration,
  w,
  h,
}) => {
  const frame = useCurrentFrame();
  const zoom = interpolate(frame, [0, duration], [1.06, 1.2]);
  const radius = `${w / 2}px ${w / 2}px 20px 20px`;

  return (
    <div style={{width: w, height: h, position: 'relative'}}>
      <div style={{width: w, height: h, overflow: 'hidden', borderRadius: radius, background: C.sand}}>
        <Img
          src={src}
          style={{width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${zoom})`}}
        />
        <AbsoluteFill>
          <SlatLight duration={duration} opacity={0.12} />
        </AbsoluteFill>
      </div>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: radius,
          border: `12px solid ${C.cream}`,
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};

/** Drawn stand-in: pergola roof, pendant, arcade and the terracotta banquette. */
const DrawnRoom: React.FC<{duration: number}> = ({duration}) => {
  const frame = useCurrentFrame();
  const sway = Math.sin(frame / 20) * 2.2;
  const benchUp = interpolate(frame, [2, 28], [220, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill>
      {/* one big pergola arch, cut into the plaster wall */}
      <AbsoluteFill style={{alignItems: 'center', justifyContent: 'flex-start', marginTop: 150}}>
        <div style={{position: 'relative'}}>
          <Arch
            w={760}
            h={1180}
            slats={22}
            frameColor={C.navy}
            slatColor="#DFBB86"
            fill="#DDE6DA"
            behind={<Foliage w={760} h={1180} />}
          />
          {/* raking light lives inside the arch only */}
          <AbsoluteFill
            style={{
              borderRadius: '380px 380px 0 0',
              overflow: 'hidden',
              opacity: 0.55,
            }}
          >
            <SlatLight duration={duration} opacity={0.08} angle={-28} />
          </AbsoluteFill>
        </div>
      </AbsoluteFill>

      {/* rattan pendant hanging in the arch */}
      <AbsoluteFill style={{alignItems: 'center', justifyContent: 'flex-start', marginTop: 210}}>
        <div style={{transform: `rotate(${sway}deg)`, transformOrigin: 'top center'}}>
          <Pendant width={360} cord={300} />
        </div>
      </AbsoluteFill>

      {/* terracotta banquette with bolsters and seat cushions */}
      <AbsoluteFill style={{justifyContent: 'flex-end'}}>
        <div style={{transform: `translateY(${benchUp}px)`}}>
          <div
            style={{
              display: 'flex',
              gap: 26,
              justifyContent: 'center',
              transform: 'translateY(58px)',
              filter: 'drop-shadow(0 16px 20px rgba(90,30,10,0.3))',
            }}
          >
            {[0, 1, 2].map((i) => (
              <Herringbone key={i} width={286} height={104} radius={52} scale={1.7} />
            ))}
          </div>
          <div style={{height: 56, background: C.clay}} />
          <div style={{background: C.clay, padding: '0 60px 22px', display: 'flex'}}>
            <Herringbone width={960} height={130} radius={22} scale={1.7} />
          </div>
          <div style={{height: 240, background: '#A34122'}} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/** Beat 3 — the room itself. The one beat that breathes instead of shouting. */
export const Space: React.FC<{duration: number}> = ({duration}) => {
  const photos = cafePhotos();
  const frame = useCurrentFrame();
  const reveal = interpolate(frame, [0, 16], [0.88, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  return (
    <Scene bg={C.cream} duration={duration} drift={0.03} vignette={0.32} glow={0.16} grain={0.15}>
      {photos.length > 0 ? (
        <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
          <div style={{transform: `scale(${reveal})`}}>
            <ArchPhoto src={photos[0]} duration={duration} w={820} h={1300} />
          </div>
        </AbsoluteFill>
      ) : (
        <DrawnRoom duration={duration} />
      )}

      <AbsoluteFill style={{alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 110}}>
        <Melt
          duration={duration}
          delay={18}
          enter={10}
          exit={8}
          amount={110}
          shrink={0.3}
          style={{background: C.navy, padding: '22px 44px', borderRadius: 999}}
        >
          <Kicker color={C.cream} size={38}>
            pine · plaster · terracotta
          </Kicker>
        </Melt>
      </AbsoluteFill>
    </Scene>
  );
};
