/* ─── Module Illustration SVGs ──────────────────────────────── */

export function IllustrationBlockchain({ color = '#F7931A' }) {
  return (
    <svg viewBox="0 0 280 110" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ animation: 'lIllumEnter 0.4s ease both' }}>
      <style>{`
        @keyframes lBlockPop { 0%{opacity:0;transform:scale(0.7)} 100%{opacity:1;transform:scale(1)} }
        @keyframes lLineGrow { 0%{stroke-dashoffset:40} 100%{stroke-dashoffset:0} }
        @media (prefers-reduced-motion: reduce) { * { animation: none !important; } }
      `}</style>
      {[0,1,2,3].map(i => (
        <g key={i} style={{ animation: `lBlockPop 0.3s ease ${i * 0.1}s both` }}>
          <rect x={16 + i * 64} y={25} width={48} height={60} rx={8}
            fill={`color-mix(in srgb, ${color} 15%, transparent)`}
            stroke={color} strokeWidth={1.5} opacity={0.9} />
          {i === 0
            ? <text x={40} y={61} textAnchor="middle" fontSize={18} fontWeight={700} fill={color} fontFamily="monospace">₿</text>
            : <>
                <rect x={26 + i * 64} y={40} width={28} height={4} rx={2} fill={color} opacity={0.5} />
                <rect x={26 + i * 64} y={50} width={20} height={4} rx={2} fill={color} opacity={0.3} />
                <rect x={26 + i * 64} y={60} width={24} height={4} rx={2} fill={color} opacity={0.3} />
              </>
          }
        </g>
      ))}
      {[0,1,2].map(i => (
        <line key={i}
          x1={64 + i * 64} y1={55} x2={80 + i * 64} y2={55}
          stroke={color} strokeWidth={2} strokeDasharray={40}
          style={{ animation: `lLineGrow 0.25s ease ${0.25 + i * 0.1}s both` }} />
      ))}
      {[0,1,2].map(i => (
        <polygon key={i}
          points={`${78 + i * 64},50 ${84 + i * 64},55 ${78 + i * 64},60`}
          fill={color} opacity={0.7} />
      ))}
    </svg>
  );
}

export function IllustrationSecurity({ color = '#FF4D4D' }) {
  return (
    <svg viewBox="0 0 280 110" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ animation: 'lIllumEnter 0.4s ease both' }}>
      <style>{`
        @keyframes lShieldIn { 0%{opacity:0;transform:scale(0.8) translateY(10px)} 100%{opacity:1;transform:scale(1) translateY(0)} }
        @keyframes lScanLine { 0%,100%{transform:translateY(0);opacity:0.6} 50%{transform:translateY(26px);opacity:1} }
        @media (prefers-reduced-motion: reduce) { * { animation: none !important; } }
      `}</style>
      <g style={{ animation: 'lShieldIn 0.4s ease both' }}>
        <path d="M140 14 L172 26 L172 60 Q172 82 140 96 Q108 82 108 60 L108 26 Z"
          fill={`color-mix(in srgb, ${color} 14%, transparent)`}
          stroke={color} strokeWidth={1.5} />
        <rect x={128} y={48} width={24} height={20} rx={4}
          fill={`color-mix(in srgb, ${color} 30%, transparent)`} stroke={color} strokeWidth={1.2} />
        <path d="M132 48 L132 43 Q132 36 140 36 Q148 36 148 43 L148 48"
          stroke={color} strokeWidth={1.8} strokeLinecap="round" fill="none" />
        <circle cx={140} cy={57} r={3} fill={color} />
      </g>
      <rect x={108} y={46} width={64} height={2} rx={1} fill={color} opacity={0.6}
        style={{ animation: 'lScanLine 2s ease-in-out 0.5s infinite' }} />
      <text x={80} y={106} fontSize={7} fontFamily="monospace" fontWeight={700}
        fill={color} opacity={0.5} letterSpacing={2}>PRIVATE KEY SECURED</text>
    </svg>
  );
}

export function IllustrationWallets({ color = '#21D4C4' }) {
  return (
    <svg viewBox="0 0 280 110" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ animation: 'lIllumEnter 0.4s ease both' }}>
      <style>{`
        @keyframes lHotPulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
        @media (prefers-reduced-motion: reduce) { * { animation: none !important; } }
      `}</style>
      <line x1={140} y1={12} x2={140} y2={98} stroke={`color-mix(in srgb, ${color} 30%, transparent)`} strokeWidth={1} strokeDasharray="4 3" />
      <text x={70} y={26} textAnchor="middle" fontSize={7} fontFamily="monospace" fontWeight={700} fill={color} letterSpacing={1} opacity={0.7}>HOT</text>
      <rect x={36} y={34} width={68} height={46} rx={8}
        fill={`color-mix(in srgb, ${color} 12%, transparent)`} stroke={color} strokeWidth={1.2} />
      <path d="M62 52 Q70 44 78 52 M56 52 Q70 38 84 52"
        stroke={color} strokeWidth={1.5} strokeLinecap="round" fill="none"
        style={{ animation: 'lHotPulse 2s ease-in-out infinite' }} />
      <circle cx={70} cy={61} r={4} fill={color} opacity={0.8} />
      <text x={210} y={26} textAnchor="middle" fontSize={7} fontFamily="monospace" fontWeight={700} fill={color} letterSpacing={1} opacity={0.7}>COLD</text>
      <rect x={176} y={34} width={68} height={46} rx={8}
        fill={`color-mix(in srgb, ${color} 12%, transparent)`} stroke={color} strokeWidth={1.2} />
      <rect x={196} y={50} width={28} height={18} rx={3} stroke={color} strokeWidth={1.2} fill="none" />
      <rect x={204} y={46} width={12} height={6} rx={2} stroke={color} strokeWidth={1.2} fill="none" />
      <rect x={209} y={58} width={2} height={6} rx={1} fill={color} opacity={0.6} />
    </svg>
  );
}

export function IllustrationDeFi({ color = '#7C5CFC' }) {
  const nodes: [number, number][] = [
    [140, 24], [188, 48], [172, 88], [108, 88], [92, 48]
  ];
  return (
    <svg viewBox="0 0 280 110" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ animation: 'lIllumEnter 0.4s ease both' }}>
      <style>{`
        @keyframes lNodeGlow { 0%,100%{opacity:0.7} 50%{opacity:1} }
        @media (prefers-reduced-motion: reduce) { * { animation: none !important; } }
      `}</style>
      {nodes.map(([x1, y1], i) =>
        nodes.slice(i + 1).map(([x2, y2], j) => (
          <line key={`${i}-${j}`} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke={color} strokeWidth={1} opacity={0.25} />
        ))
      )}
      {nodes.map(([cx, cy], i) => (
        <g key={i} style={{ animation: `lNodeGlow 2s ease-in-out ${i * 0.4}s infinite` }}>
          <circle cx={cx} cy={cy} r={14}
            fill={`color-mix(in srgb, ${color} 15%, transparent)`}
            stroke={color} strokeWidth={1.5} />
          <circle cx={cx} cy={cy} r={4} fill={color} />
        </g>
      ))}
      <text x={140} y={106} textAnchor="middle" fontSize={7} fontFamily="monospace" fontWeight={700} fill={color} opacity={0.5} letterSpacing={2}>NO MIDDLEMAN</text>
    </svg>
  );
}

export function IllustrationProtocols({ color = '#2E8BFF' }) {
  return (
    <svg viewBox="0 0 280 110" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ animation: 'lIllumEnter 0.4s ease both' }}>
      <style>{`
        @keyframes lFlow { 0%{stroke-dashoffset:60} 100%{stroke-dashoffset:0} }
        @media (prefers-reduced-motion: reduce) { * { animation: none !important; } }
      `}</style>
      <circle cx={60} cy={55} r={28} fill={`color-mix(in srgb, ${color} 14%, transparent)`} stroke={color} strokeWidth={1.5} />
      <text x={60} y={60} textAnchor="middle" fontSize={13} fontWeight={700} fill={color} fontFamily="monospace">A</text>
      <ellipse cx={140} cy={55} rx={22} ry={28}
        fill={`color-mix(in srgb, ${color} 20%, transparent)`} stroke={color} strokeWidth={1.2} />
      <text x={140} y={59} textAnchor="middle" fontSize={8} fontWeight={700} fill={color} fontFamily="monospace" opacity={0.7}>POOL</text>
      <circle cx={220} cy={55} r={28} fill={`color-mix(in srgb, ${color} 14%, transparent)`} stroke={color} strokeWidth={1.5} />
      <text x={220} y={60} textAnchor="middle" fontSize={13} fontWeight={700} fill={color} fontFamily="monospace">B</text>
      <path d="M88 44 Q114 28 118 38" stroke={color} strokeWidth={1.5} strokeDasharray={60} fill="none"
        style={{ animation: 'lFlow 1.2s linear infinite' }} />
      <path d="M162 38 Q166 28 192 44" stroke={color} strokeWidth={1.5} strokeDasharray={60} fill="none"
        style={{ animation: 'lFlow 1.2s linear 0.6s infinite' }} />
      <path d="M88 66 Q114 82 118 72" stroke={color} strokeWidth={1.5} strokeDasharray={60} fill="none" opacity={0.5}
        style={{ animation: 'lFlow 1.2s linear 0.3s infinite' }} />
      <path d="M162 72 Q166 82 192 66" stroke={color} strokeWidth={1.5} strokeDasharray={60} fill="none" opacity={0.5}
        style={{ animation: 'lFlow 1.2s linear 0.9s infinite' }} />
    </svg>
  );
}

export function IllustrationResearch({ color = '#F2C14E' }) {
  return (
    <svg viewBox="0 0 280 110" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ animation: 'lIllumEnter 0.4s ease both' }}>
      <style>{`
        @keyframes lMagnify { 0%,100%{transform:translateX(0)} 50%{transform:translateX(32px)} }
        @media (prefers-reduced-motion: reduce) { * { animation: none !important; } }
      `}</style>
      <rect x={88} y={16} width={80} height={80} rx={6}
        fill={`color-mix(in srgb, ${color} 10%, transparent)`} stroke={color} strokeWidth={1.2} />
      {[30, 44, 56, 68, 80].map((y, i) => (
        <rect key={y} x={100} y={y} width={i % 3 === 1 ? 44 : 56} height={4} rx={2} fill={color} opacity={0.3} />
      ))}
      <g style={{ animation: 'lMagnify 3s ease-in-out 0.5s infinite' }}>
        <circle cx={116} cy={46} r={18}
          fill={`color-mix(in srgb, ${color} 8%, transparent)`}
          stroke={color} strokeWidth={2} />
        <line x1={129} y1={59} x2={142} y2={72} stroke={color} strokeWidth={2.5} strokeLinecap="round" />
      </g>
    </svg>
  );
}

export function IllustrationRisk({ color = '#FF7A1A' }) {
  return (
    <svg viewBox="0 0 280 110" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ animation: 'lIllumEnter 0.4s ease both' }}>
      <style>{`
        @keyframes lNeedleSweep { 0%{transform:rotate(-70deg)} 100%{transform:rotate(20deg)} }
        @media (prefers-reduced-motion: reduce) { * { animation: none !important; } }
      `}</style>
      <path d="M80 78 A60 60 0 0 1 200 78" stroke={`color-mix(in srgb, ${color} 20%, transparent)`} strokeWidth={14} strokeLinecap="round" fill="none" />
      <path d="M80 78 A60 60 0 0 1 158 30" stroke={color} strokeWidth={4} strokeLinecap="round" fill="none" opacity={0.7} />
      {[-70, -45, -20, 5, 30].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        const cx = 140, cy = 78, r1 = 56, r2 = 48;
        return (
          <line key={i}
            x1={cx + r1 * Math.cos(rad - Math.PI / 2)} y1={cy + r1 * Math.sin(rad - Math.PI / 2)}
            x2={cx + r2 * Math.cos(rad - Math.PI / 2)} y2={cy + r2 * Math.sin(rad - Math.PI / 2)}
            stroke={color} strokeWidth={1.5} opacity={0.5} />
        );
      })}
      <g style={{ transformOrigin: '140px 78px', animation: 'lNeedleSweep 1s cubic-bezier(0.34,1.56,0.64,1) 0.3s both' }}>
        <line x1={140} y1={78} x2={140} y2={28} stroke={color} strokeWidth={2.5} strokeLinecap="round" />
        <circle cx={140} cy={78} r={6} fill={color} />
        <circle cx={140} cy={78} r={3} fill="var(--bg)" />
      </g>
      <text x={80} y={100} fontSize={7} fontFamily="monospace" fontWeight={700} fill={color} opacity={0.5} letterSpacing={1}>LOW</text>
      <text x={200} y={100} textAnchor="end" fontSize={7} fontFamily="monospace" fontWeight={700} fill={color} opacity={0.5} letterSpacing={1}>HIGH</text>
    </svg>
  );
}

export function IllustrationProfits({ color = '#24C38A' }) {
  return (
    <svg viewBox="0 0 280 110" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ animation: 'lIllumEnter 0.4s ease both' }}>
      <style>{`
        @keyframes lStepIn { 0%{opacity:0;transform:translateY(8px)} 100%{opacity:1;transform:translateY(0)} }
        @media (prefers-reduced-motion: reduce) { * { animation: none !important; } }
      `}</style>
      <polyline points="40,82 80,60 120,36 160,36 200,58 240,70"
        stroke={`color-mix(in srgb, ${color} 40%, transparent)`} strokeWidth={1.5} fill="none" />
      {[
        { x: 120, y: 36, label: 'T1' },
        { x: 170, y: 50, label: 'T2' },
        { x: 214, y: 64, label: 'T3' },
      ].map(({ x, y, label }, i) => (
        <g key={label} style={{ animation: `lStepIn 0.3s ease ${0.2 + i * 0.15}s both` }}>
          <circle cx={x} cy={y} r={5} fill={color} />
          <line x1={x} y1={y} x2={x + 28} y2={y} stroke={color} strokeWidth={1.5} strokeDasharray="4 2" opacity={0.6} />
          <text x={x + 32} y={y + 4} fontSize={8} fontFamily="monospace" fontWeight={700} fill={color} opacity={0.8}>{label}</text>
        </g>
      ))}
      <polyline points="40,82 80,60 120,36 160,36 200,58 240,70 240,90 40,90"
        fill={`color-mix(in srgb, ${color} 6%, transparent)`} stroke="none" />
      <text x={40} y={106} fontSize={7} fontFamily="monospace" fontWeight={700} fill={color} opacity={0.5} letterSpacing={1}>SELL IN STAGES · LOCK GAINS</text>
    </svg>
  );
}

/* ─── UI Icons ───────────────────────────────────────────────── */

export function IconCheck({ size = 14, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <polyline points="3,8 7,12 13,5" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconArrowLeft({ size = 16, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M10 3 L5 8 L10 13" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconArrowRight({ size = 16, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M6 3 L11 8 L6 13" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconChevronDown({ size = 14, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M4 6 L8 10 L12 6" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconSun({ size = 16, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <circle cx={8} cy={8} r={3} stroke={color} strokeWidth={1.5} />
      {[0, 45, 90, 135, 180, 225, 270, 315].map(deg => {
        const r = Math.PI * deg / 180;
        return <line key={deg} x1={8 + 4.5 * Math.cos(r)} y1={8 + 4.5 * Math.sin(r)}
          x2={8 + 6 * Math.cos(r)} y2={8 + 6 * Math.sin(r)}
          stroke={color} strokeWidth={1.5} strokeLinecap="round" />;
      })}
    </svg>
  );
}

export function IconMoon({ size = 16, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M10 3 A5 5 0 1 0 10 13 A4 4 0 0 1 10 3" fill={color} />
    </svg>
  );
}

export function IconToolkit({ size = 20, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <rect x={2} y={7} width={16} height={11} rx={2} stroke={color} strokeWidth={1.4} />
      <path d="M7 7 V5 Q7 2 10 2 Q13 2 13 5 V7" stroke={color} strokeWidth={1.4} strokeLinecap="round" />
      <circle cx={10} cy={12} r={2} fill={color} opacity={0.7} />
    </svg>
  );
}

/* ─── Per-module small icons (hub cards) ─────────────────────── */

export function IconModule({ id, color, size = 22 }: { id: string; color: string; size?: number }) {
  const icons: Record<string, React.ReactNode> = {
    '01': <path d="M8 4 L14 4 L14 8 Q14 10 12 10 Q14 10 14 12 L14 16 L8 16 Q6 16 6 14 Q6 16 8 16" stroke={color} strokeWidth={1.6} strokeLinecap="round" fill="none" />,
    '02': <path d="M10 3 L16 5.5 L16 11 Q16 15.5 10 18 Q4 15.5 4 11 L4 5.5 Z" stroke={color} strokeWidth={1.4} fill="none" />,
    '03': <><rect x={4} y={8} width={12} height={9} rx={2} stroke={color} strokeWidth={1.4} fill="none" /><path d="M7 8 V6 Q7 3 10 3 Q13 3 13 6 V8" stroke={color} strokeWidth={1.4} strokeLinecap="round" fill="none" /></>,
    '04': <><circle cx={10} cy={10} r={3} stroke={color} strokeWidth={1.4} fill="none" />{([[10,3],[16,7],[16,13],[10,17],[4,13],[4,7]] as [number,number][]).map(([x,y],i) => <g key={i}><circle cx={x} cy={y} r={1.5} fill={color} /><line x1={10} y1={10} x2={x} y2={y} stroke={color} strokeWidth={0.8} opacity={0.4} /></g>)}</>,
    '05': <><circle cx={6} cy={10} r={3} stroke={color} strokeWidth={1.4} fill="none" /><circle cx={14} cy={10} r={3} stroke={color} strokeWidth={1.4} fill="none" /><path d="M9 8 Q10 6 11 8 M9 12 Q10 14 11 12" stroke={color} strokeWidth={1.2} fill="none" /></>,
    '06': <><rect x={5} y={3} width={9} height={12} rx={1.5} stroke={color} strokeWidth={1.4} fill="none" /><circle cx={13} cy={13} r={3.5} stroke={color} strokeWidth={1.4} fill="none" /><line x1={15.5} y1={15.5} x2={18} y2={18} stroke={color} strokeWidth={1.8} strokeLinecap="round" /></>,
    '07': <><path d="M4 14 A6 6 0 0 1 16 14" stroke={color} strokeWidth={1.4} strokeLinecap="round" fill="none" /><line x1={10} y1={14} x2={14} y2={8} stroke={color} strokeWidth={1.6} strokeLinecap="round" /><circle cx={10} cy={14} r={1.5} fill={color} /></>,
    '08': <><polyline points="3,14 7,9 11,5 15,5 17,9" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" fill="none" />{[11,14,17].map((x,i) => <line key={x} x1={x} y1={5+i*4} x2={x+2} y2={5+i*4} stroke={color} strokeWidth={1.5} strokeLinecap="round" opacity={0.7} />)}</>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      {icons[id]}
    </svg>
  );
}

export const ILLUSTRATIONS: Record<string, React.ComponentType<{ color: string }>> = {
  '01': IllustrationBlockchain,
  '02': IllustrationSecurity,
  '03': IllustrationWallets,
  '04': IllustrationDeFi,
  '05': IllustrationProtocols,
  '06': IllustrationResearch,
  '07': IllustrationRisk,
  '08': IllustrationProfits,
};
