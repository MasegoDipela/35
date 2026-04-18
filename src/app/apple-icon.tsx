import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(145deg, #1A1A1A 0%, #2D2D2D 100%)',
          borderRadius: 40,
          fontFamily: 'Georgia, serif',
          position: 'relative',
        }}
      >
        {/* Gold "W" matching Written in Light brand */}
        <div
          style={{
            fontSize: 96,
            fontWeight: 300,
            fontStyle: 'italic',
            color: '#C9A96E',
            lineHeight: 1,
            display: 'flex',
          }}
        >
          W
        </div>
      </div>
    ),
    { ...size },
  );
}
