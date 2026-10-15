import { ImageResponse } from 'next/og';

export const size = {
  width: 180,
  height: 180,
};
export const contentType = 'image/png';

export default function AppleIcon() {
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
          background: 'linear-gradient(135deg, #070709 0%, #111116 100%)',
          borderRadius: 36,
          border: '3px solid rgba(237, 30, 121, 0.4)',
        }}
      >
        <span
          style={{
            fontSize: 84,
            fontWeight: 800,
            fontFamily: 'sans-serif',
            background: 'linear-gradient(135deg, #ED1E79 0%, #A855F7 50%, #38BDF8 100%)',
            backgroundClip: 'text',
            color: 'transparent',
            letterSpacing: '-2px',
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
