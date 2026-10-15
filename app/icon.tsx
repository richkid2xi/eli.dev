import { ImageResponse } from 'next/og';

export const size = {
  width: 32,
  height: 32,
};
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
          background: 'linear-gradient(135deg, #0A0A0C 0%, #17171C 100%)',
          borderRadius: 8,
          border: '1.5px solid rgba(237, 30, 121, 0.6)',
        }}
      >
        <span
          style={{
            fontSize: 16,
            fontWeight: 800,
            fontFamily: 'sans-serif',
            background: 'linear-gradient(135deg, #ED1E79 0%, #A855F7 50%, #38BDF8 100%)',
            backgroundClip: 'text',
            color: 'transparent',
            letterSpacing: '-0.5px',
          }}
        >
          EA
        </span>
      </div>
    ),
    {
      ...size,
    }
  );
}
