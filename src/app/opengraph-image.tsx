import { ImageResponse } from 'next/og';

export const alt = 'Written in Light — A birthday letter, told in chapters.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(145deg, #FAF6F1 0%, #E8D5C4 50%, #D4C5B2 100%)',
          fontFamily: 'Georgia, serif',
          position: 'relative',
        }}
      >
        {/* Subtle vignette overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse at center, transparent 40%, rgba(26,26,26,0.08) 100%)',
            display: 'flex',
          }}
        />

        {/* Top ornamental line */}
        <div
          style={{
            width: 80,
            height: 1,
            background: '#C9A96E',
            marginBottom: 32,
            display: 'flex',
          }}
        />

        {/* Title */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 300,
            color: '#1A1A1A',
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            display: 'flex',
          }}
        >
          Written in Light
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 24,
            color: '#C9A96E',
            marginTop: 20,
            fontStyle: 'italic',
            fontWeight: 400,
            display: 'flex',
          }}
        >
          A birthday letter, told in chapters.
        </div>

        {/* Bottom ornamental line */}
        <div
          style={{
            width: 80,
            height: 1,
            background: '#C9A96E',
            marginTop: 32,
            display: 'flex',
          }}
        />

        {/* Domain */}
        <div
          style={{
            fontSize: 16,
            color: '#8A7A6A',
            marginTop: 40,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            display: 'flex',
          }}
        >
          tshegofatsomogotsi.com
        </div>
      </div>
    ),
    { ...size },
  );
}
