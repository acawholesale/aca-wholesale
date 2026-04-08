import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: '#0a0500',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Georgia, serif',
          padding: '60px',
        }}
      >
        {/* Top accent line */}
        <div
          style={{
            width: '80px',
            height: '3px',
            background: '#C4962A',
            marginBottom: '40px',
          }}
        />

        {/* Main title */}
        <div
          style={{
            fontSize: '96px',
            fontWeight: '700',
            color: '#ffffff',
            letterSpacing: '0.08em',
            textAlign: 'center',
            lineHeight: '1',
            marginBottom: '24px',
          }}
        >
          ACA WHOLESALE
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: '32px',
            fontWeight: '400',
            color: '#C4962A',
            letterSpacing: '0.12em',
            textAlign: 'center',
            marginBottom: '20px',
          }}
        >
          Lots de Vêtements de Seconde Main
        </div>

        {/* Location */}
        <div
          style={{
            fontSize: '22px',
            fontWeight: '400',
            color: '#888888',
            letterSpacing: '0.1em',
            textAlign: 'center',
          }}
        >
          Moselle, France
        </div>

        {/* Bottom accent line */}
        <div
          style={{
            width: '80px',
            height: '3px',
            background: '#C4962A',
            marginTop: '40px',
          }}
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
