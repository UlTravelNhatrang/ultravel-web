const LAND = 'rgb(243 247 252)';
const SEA = 'rgb(196 222 247)';
const INK = '#07327D';
const caption = { fontFamily: 'var(--font-sans), sans-serif' };

export type MapPin = { x: number; y: number; label: string; active?: boolean };

/** Illustrated Nha Trang coastline (land left, sea right) with numbered pins. Used by the hub and review pages. */
export function NhaTrangMap({ pins, label = 'Bản đồ minh họa Nha Trang', className = '' }: { pins: MapPin[]; label?: string; className?: string }) {
  return (
    <svg viewBox="0 0 400 460" preserveAspectRatio="xMidYMid meet" className={className} role="img" aria-label={label}>
      <defs>
        <pattern id="map-grid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0V20" fill="none" stroke="rgb(7 50 125/.08)" strokeWidth="1" /></pattern>
      </defs>
      <rect width="400" height="460" fill={SEA} />
      <rect width="400" height="460" fill="url(#map-grid)" />
      <path d="M0 0H150C170 60 140 110 165 170 185 230 150 290 175 350 190 400 165 430 180 460H0Z" fill={LAND} stroke={INK} strokeOpacity=".35" strokeWidth="1.5" />
      <ellipse cx="311" cy="117" rx="32" ry="24" fill={LAND} stroke={INK} strokeOpacity=".35" />
      <ellipse cx="351" cy="259" rx="18" ry="14" fill={LAND} stroke={INK} strokeOpacity=".35" />
      <ellipse cx="290" cy="370" rx="26" ry="19" fill={LAND} stroke={INK} strokeOpacity=".35" />
      <text x="250" y="222" fontSize="11" letterSpacing="1" fill={INK} fillOpacity=".6" style={caption}>Biển Đông</text>
      <text x="288" y="158" fontSize="10" letterSpacing="1" fill={INK} fillOpacity=".6" style={caption}>Hòn Tre</text>
      <g id="pins">
        {pins.map(p => (
          <g key={`${p.x}-${p.y}-${p.label}`} transform={`translate(${p.x},${p.y})`}>
            <g className={`pin ${p.active ? 'on' : ''}`}>
              <rect x="-13" y="-13" width="26" height="26" fill={INK} stroke="#fff" strokeWidth="2" />
              <text y="4.5" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="600" style={caption}>{p.label}</text>
            </g>
          </g>
        ))}
      </g>
    </svg>
  );
}

export const MAP_BACKGROUND = `linear-gradient(90deg,${LAND} 50%,${SEA} 50%)`;
