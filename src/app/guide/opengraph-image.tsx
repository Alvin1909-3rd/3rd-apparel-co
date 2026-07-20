import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'The Ledger — Crypto, the easy way';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  const mono = await fetch(
    'https://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKxTOlOV.woff2'
  ).then(r => r.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: '#0C0C0E',
          display: 'flex',
          flexDirection: 'column',
          fontFamily: '"JetBrains Mono", monospace',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Subtle grid overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(247,147,26,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(247,147,26,0.03) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          display: 'flex',
        }} />

        {/* Top-left orange accent bar */}
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0,
          width: 6, background: '#F7931A',
          boxShadow: '0 0 40px rgba(247,147,26,0.6)',
          display: 'flex',
        }} />

        {/* Top right ghost number */}
        <div style={{
          position: 'absolute', right: -20, top: -40,
          fontSize: 480, fontWeight: 700, color: 'rgba(247,147,26,0.04)',
          lineHeight: 1, letterSpacing: '-0.04em',
          display: 'flex',
        }}>
          ₿
        </div>

        {/* Content */}
        <div style={{
          display: 'flex', flexDirection: 'column',
          padding: '72px 80px 72px 86px',
          flex: 1, justifyContent: 'space-between',
          position: 'relative',
        }}>

          {/* Eyebrow */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 16,
          }}>
            <div style={{
              fontSize: 13, fontWeight: 700, letterSpacing: '0.22em',
              textTransform: 'uppercase', color: '#F7931A',
              display: 'flex',
            }}>
              3RD APPAREL CO
            </div>
            <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(247,147,26,0.4)', display: 'flex' }} />
            <div style={{
              fontSize: 13, fontWeight: 700, letterSpacing: '0.22em',
              textTransform: 'uppercase', color: 'rgba(247,147,26,0.5)',
              display: 'flex',
            }}>
              THE CHOSEN FEW
            </div>
          </div>

          {/* Main text block */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{
              fontSize: 11, fontWeight: 700, letterSpacing: '0.3em',
              textTransform: 'uppercase', color: 'rgba(244,242,236,0.3)',
              display: 'flex',
            }}>
              ENTRY 00 — 08
            </div>
            <div style={{
              fontSize: 96, fontWeight: 700, color: '#F4F2EC',
              lineHeight: 1.0, letterSpacing: '-0.03em',
              display: 'flex',
            }}>
              The Ledger
            </div>
            <div style={{
              fontSize: 28, fontWeight: 400, color: '#8A8884',
              lineHeight: 1.4, letterSpacing: '-0.01em',
              display: 'flex',
            }}>
              Crypto, the easy way.
            </div>
          </div>

          {/* Bottom row */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', gap: 32 }}>
              {['8 Modules', 'Glossary', 'Security Checklist', 'Position Sizer'].map((item, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                }}>
                  <div style={{
                    width: 6, height: 6, borderRadius: '50%', background: '#F7931A',
                    opacity: 1 - i * 0.2,
                    display: 'flex',
                  }} />
                  <div style={{
                    fontSize: 13, fontWeight: 600, color: 'rgba(244,242,236,0.45)',
                    letterSpacing: '0.06em', textTransform: 'uppercase',
                    display: 'flex',
                  }}>
                    {item}
                  </div>
                </div>
              ))}
            </div>
            <div style={{
              fontSize: 13, fontWeight: 700, color: '#F7931A',
              letterSpacing: '0.1em', textTransform: 'uppercase',
              opacity: 0.7, display: 'flex',
            }}>
              3rdapparelco.com/guide
            </div>
          </div>

        </div>

        {/* Bottom accent line */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: 3, background: 'linear-gradient(90deg, #F7931A 0%, rgba(247,147,26,0.1) 60%, transparent 100%)',
          display: 'flex',
        }} />
      </div>
    ),
    {
      ...size,
      fonts: [{ name: 'JetBrains Mono', data: mono, weight: 700 }],
    }
  );
}
