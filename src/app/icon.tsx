import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
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
          borderRadius: 6,
          fontFamily: 'Georgia, serif',
          position: 'relative',
        }}
      >
        {/* Gold quill-pen–inspired stroke */}
        <div
          style={{
            fontSize: 18,
            fontWeight: 300,
            fontStyle: 'italic',
            color: '#C9A96E',
            lineHeight: 1,
            display: 'flex',
          }}
        >
          TM
        </div>
      </div>
    ),
    { ...size },
  );
}
