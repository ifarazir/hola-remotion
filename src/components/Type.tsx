import React from 'react';
import {C, FONT} from '../theme';

export const Kicker: React.FC<{
  children: React.ReactNode;
  color?: string;
  size?: number;
}> = ({children, color = C.mustard, size = 54}) => (
  <div
    style={{
      fontFamily: FONT.kicker,
      fontSize: size,
      letterSpacing: size * 0.06,
      color,
      textTransform: 'uppercase',
      lineHeight: 1,
      textAlign: 'center',
    }}
  >
    {children}
  </div>
);

export const Title: React.FC<{
  children: React.ReactNode;
  color?: string;
  size?: number;
  lineHeight?: number;
}> = ({children, color = C.cream, size = 168, lineHeight = 0.9}) => (
  <div
    style={{
      fontFamily: FONT.display,
      fontSize: size,
      lineHeight,
      letterSpacing: -size * 0.015,
      color,
      textTransform: 'uppercase',
      textAlign: 'center',
    }}
  >
    {children}
  </div>
);

export const Script: React.FC<{
  children: React.ReactNode;
  color?: string;
  size?: number;
  rotate?: number;
}> = ({children, color = C.mustard, size = 92, rotate = -7}) => (
  <div
    style={{
      fontFamily: FONT.script,
      fontSize: size,
      lineHeight: 1,
      color,
      transform: `rotate(${rotate}deg)`,
      textAlign: 'center',
    }}
  >
    {children}
  </div>
);

export const Farsi: React.FC<{
  children: React.ReactNode;
  color?: string;
  size?: number;
}> = ({children, color = C.cream, size = 46}) => (
  <div
    dir="rtl"
    style={{
      fontFamily: FONT.fa,
      fontWeight: 700,
      fontSize: size,
      lineHeight: 1.6,
      color,
      textAlign: 'center',
    }}
  >
    {children}
  </div>
);
