import { ImageResponse } from 'next/og';
import fs from 'fs';
import path from 'path';

export const OG_IMAGE_SIZE = {
  width: 1200,
  height: 630,
};

export const OG_IMAGE_ALT =
  'Richard Elikem Amenorpe, Technical Project Manager and Software Engineer';

export const OG_IMAGE_CONTENT_TYPE = 'image/png';

export function generateOgImageResponse() {
  let profileBase64 = '';
  try {
    const profilePath = path.join(process.cwd(), 'public', 'Profile.png');
    if (fs.existsSync(profilePath)) {
      const buffer = fs.readFileSync(profilePath);
      profileBase64 = `data:image/png;base64,${buffer.toString('base64')}`;
    }
  } catch {
    profileBase64 = '';
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#070709',
          padding: 64,
          position: 'relative',
          overflow: 'hidden',
          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        }}
      >
        {/* Subtle Top Gradient Accent Bar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 6,
            background: 'linear-gradient(90deg, #ED1E79 0%, #A855F7 50%, #38BDF8 100%)',
          }}
        />

        {/* Ambient background glows */}
        <div
          style={{
            position: 'absolute',
            top: -100,
            right: -100,
            width: 450,
            height: 450,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(237, 30, 121, 0.15) 0%, transparent 70%)',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -150,
            left: -100,
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(102, 45, 140, 0.2) 0%, transparent 70%)',
            display: 'flex',
          }}
        />

        {/* Corner Node Network Graphic */}
        <svg
          width="360"
          height="300"
          viewBox="0 0 360 300"
          style={{
            position: 'absolute',
            top: 24,
            right: 24,
            opacity: 0.22,
          }}
        >
          <line x1="60" y1="50" x2="160" y2="80" stroke="white" strokeWidth="1.5" />
          <line x1="160" y1="80" x2="280" y2="40" stroke="white" strokeWidth="1.5" />
          <line x1="160" y1="80" x2="210" y2="180" stroke="#ED1E79" strokeWidth="1.5" />
          <line x1="280" y1="40" x2="330" y2="130" stroke="#38BDF8" strokeWidth="1.5" />
          <line x1="210" y1="180" x2="330" y2="130" stroke="white" strokeWidth="1.5" />
          <line x1="210" y1="180" x2="140" y2="240" stroke="white" strokeWidth="1.5" />
          <circle cx="60" cy="50" r="3.5" fill="#38BDF8" />
          <circle cx="160" cy="80" r="4.5" fill="white" />
          <circle cx="280" cy="40" r="3.5" fill="#ED1E79" />
          <circle cx="330" cy="130" r="4" fill="white" />
          <circle cx="210" cy="180" r="5" fill="#A855F7" />
          <circle cx="140" cy="240" r="3" fill="white" />
        </svg>

        {/* Top Section: Role badge & Headshot */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            width: '100%',
            position: 'relative',
          }}
        >
          {/* Tag & Subtitle */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '8px 18px',
                borderRadius: 9999,
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#E4E4E7',
                fontSize: 16,
                fontWeight: 600,
                letterSpacing: '1px',
                textTransform: 'uppercase',
                marginBottom: 20,
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: '#38BDF8',
                  marginRight: 10,
                }}
              />
              Technical Project Manager · Software Engineer
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                color: '#A1A1AA',
                fontSize: 18,
                fontWeight: 500,
              }}
            >
              <span style={{ color: '#ED1E79', marginRight: 6 }}>📍</span>
              Accra, Ghana
            </div>
          </div>

          {/* Right-side Headshot if available */}
          {profileBase64 ? (
            <div
              style={{
                width: 170,
                height: 170,
                borderRadius: '50%',
                overflow: 'hidden',
                border: '3px solid rgba(237, 30, 121, 0.5)',
                boxShadow: '0 0 32px rgba(102, 45, 140, 0.35)',
                display: 'flex',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={profileBase64}
                alt="Richard Elikem Amenorpe"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'top center',
                }}
              />
            </div>
          ) : null}
        </div>

        {/* Middle Section: Name Large (74px) */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginTop: 10,
            marginBottom: 20,
            position: 'relative',
          }}
        >
          <h1
            style={{
              fontSize: 74,
              fontWeight: 800,
              lineHeight: 1.05,
              color: '#FFFFFF',
              letterSpacing: '-2px',
              margin: 0,
              padding: 0,
            }}
          >
            Richard{' '}
            <span
              style={{
                background: 'linear-gradient(90deg, #ED1E79 0%, #A855F7 60%, #38BDF8 100%)',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              Elikem
            </span>{' '}
            Amenorpe
          </h1>
          <p
            style={{
              fontSize: 22,
              color: '#9BA1A6',
              margin: '12px 0 0 0',
              maxWidth: 820,
              lineHeight: 1.4,
            }}
          >
            Turning ideas into structured plans, and plans into real progress.
          </p>
        </div>

        {/* Footer Section: Projects list & Brand */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            paddingTop: 24,
            width: '100%',
            position: 'relative',
          }}
        >
          <div
            style={{
              fontSize: 18,
              color: '#71717A',
              fontWeight: 500,
              letterSpacing: '0.5px',
            }}
          >
            Klavora · Verdis · Beam · NameCheckGH · Rikelm
          </div>
          <div
            style={{
              fontSize: 16,
              color: '#ED1E79',
              fontWeight: 600,
              letterSpacing: '1px',
              textTransform: 'uppercase',
            }}
          >
            elikem.dev
          </div>
        </div>
      </div>
    ),
    {
      ...OG_IMAGE_SIZE,
    }
  );
}
