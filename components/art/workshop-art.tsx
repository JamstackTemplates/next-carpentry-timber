import { EndGrainRound } from './end-grain-round';

/** Circular hot-iron maker's stamp reading "HEARTWOOD · HOBART · TAS". */
export function BrandStamp({
  size = 112,
  className = '',
  invert = false,
}: {
  size?: number;
  className?: string;
  invert?: boolean;
}) {
  const stroke = invert ? 'var(--fumed-ink)' : 'var(--text)';
  const accent = invert ? 'var(--brass-soft)' : 'var(--brass)';
  return (
    <svg
      viewBox="0 0 140 140"
      width={size}
      height={size}
      role="img"
      aria-label="Heartwood Carpentry, Hobart Tasmania maker's stamp"
      className={`select-none ${className}`}
    >
      <defs>
        <path id="hw-stamp-top" d="M 22,70 A 48,48 0 1,1 118,70" />
        <path id="hw-stamp-bot" d="M 16,70 A 54,54 0 0,0 124,70" />
      </defs>
      <circle cx="70" cy="70" r="65" fill="none" stroke={stroke} strokeWidth="2.2" strokeDasharray="8 2 2 2" />
      <circle cx="70" cy="70" r="59" fill="none" stroke={stroke} strokeWidth="1.2" />
      <circle cx="70" cy="70" r="36" fill="none" stroke={accent} strokeWidth="1.4" />
      <text
        fill={stroke}
        fontFamily="var(--font-display)"
        fontSize="11.5"
        fontWeight="700"
        letterSpacing="2.4"
      >
        <textPath href="#hw-stamp-top" startOffset="50%" textAnchor="middle">
          HEARTWOOD
        </textPath>
      </text>
      <text
        fill={stroke}
        fontFamily="var(--font-display)"
        fontSize="10"
        fontWeight="700"
        letterSpacing="2.6"
      >
        <textPath href="#hw-stamp-bot" startOffset="50%" textAnchor="middle">
          HOBART · TAS
        </textPath>
      </text>
      {/* Inner rings */}
      <g stroke={accent} fill="none" strokeWidth="1.35">
        <ellipse cx="70" cy="70" rx="24" ry="22" />
        <ellipse cx="70" cy="70" rx="16" ry="15" />
        <ellipse cx="70" cy="70" rx="8.5" ry="8" />
        <circle cx="70" cy="70" r="2.5" fill={accent} />
        <line x1="70" y1="70" x2="88" y2="85" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" />
      </g>
    </svg>
  );
}

/** Three hand-labelled workshop oil tins for the Timbers finishes shelf. */
export function FinishTin({
  kind,
  className = '',
}: {
  kind: 'hardwax' | 'danish' | 'decking';
  className?: string;
}) {
  const palette = {
    hardwax: { body: '#DFC295', label: 'HARDWAX', sub: 'satin · food-safe', cap: 'var(--brass)' },
    danish: { body: '#C48A5A', label: 'DANISH', sub: 'deep grain oil', cap: 'var(--accent)' },
    decking: { body: '#9B7552', label: 'DECK OIL', sub: 'UV exterior', cap: 'var(--pencil)' },
  }[kind];

  return (
    <svg viewBox="0 0 120 132" aria-hidden="true" className={`block w-24 h-auto ${className}`}>
      <g stroke="var(--text)" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round">
        {/* Tin screw cap & spout */}
        <rect x="48" y="8" width="24" height="12" rx="2" fill={palette.cap} />
        <line x1="54" y1="8" x2="54" y2="20" strokeWidth="1" opacity="0.5" />
        <line x1="66" y1="8" x2="66" y2="20" strokeWidth="1" opacity="0.5" />
        {/* Tin shoulders */}
        <polygon points="28,32 42,20 78,20 92,32" fill="var(--band)" />
        {/* Main tin body */}
        <rect x="24" y="32" width="72" height="86" rx="3" fill={palette.body} />
        {/* Paper workshop label */}
        <rect x="30" y="46" width="60" height="54" rx="1.5" fill="var(--paper)" />
        <line x1="36" y1="56" x2="84" y2="56" stroke="var(--brass)" strokeWidth="1.2" />
        <line x1="36" y1="90" x2="84" y2="90" stroke="var(--brass)" strokeWidth="1.2" />
        {/* Bottom rim */}
        <rect x="22" y="114" width="76" height="8" rx="2" fill="var(--muted)" opacity="0.55" />
      </g>
      <text
        x="60"
        y="72"
        textAnchor="middle"
        fontFamily="var(--font-display)"
        fontSize="10.5"
        fontWeight="700"
        fill="var(--text)"
      >
        {palette.label}
      </text>
      <text
        x="60"
        y="85"
        textAnchor="middle"
        fontFamily="var(--font-pencil)"
        fontSize="14"
        fill="var(--muted)"
      >
        {palette.sub}
      </text>
    </svg>
  );
}

/** Simple ink-and-pencil street sketch of the laneway workshop door near Salamanca Place. */
export function WorkshopSketch({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 480 280"
      role="img"
      aria-label="Sketch of the Heartwood Carpentry laneway workshop doors near Salamanca Place, Hobart, with timber boards stacked inside."
      className={`block w-full h-auto ${className}`}
    >
      {/* Sandstone laneway wall */}
      <g stroke="var(--text)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="26" y="42" width="428" height="202" fill="var(--paper)" />
        {/* Sandstone ashlar courses */}
        <g stroke="var(--line)" strokeWidth="1" opacity="0.8">
          <line x1="26" y1="74" x2="454" y2="74" />
          <line x1="26" y1="108" x2="454" y2="108" />
          <line x1="26" y1="142" x2="454" y2="142" />
          <line x1="26" y1="176" x2="454" y2="176" />
          <line x1="26" y1="210" x2="454" y2="210" />
          <line x1="94" y1="42" x2="94" y2="74" />
          <line x1="382" y1="74" x2="382" y2="108" />
          <line x1="416" y1="142" x2="416" y2="176" />
        </g>

        {/* Corrugated iron roofline */}
        <polygon points="16,42 464,42 454,24 26,24" fill="var(--band-deep)" />

        {/* Hanging timber sign */}
        <line x1="64" y1="70" x2="112" y2="70" strokeWidth="2.2" />
        <rect x="68" y="76" width="44" height="28" rx="2" fill="var(--band)" />
        <circle cx="90" cy="90" r="8" fill="none" stroke="var(--brass)" strokeWidth="1.5" />
        <circle cx="90" cy="90" r="3.5" fill="var(--brass)" />

        {/* Wide arched timber carriage doors (one ajar showing timber rack!) */}
        <rect x="148" y="88" width="184" height="156" fill="var(--fumed)" />
        {/* Inside peeking timber rack */}
        <g stroke="var(--brass-soft)" strokeWidth="1.3">
          <rect x="234" y="114" width="84" height="12" fill="#DFC295" />
          <rect x="230" y="132" width="90" height="12" fill="#966239" />
          <rect x="238" y="150" width="80" height="12" fill="#B56B4E" />
          <rect x="228" y="168" width="92" height="12" fill="#A67C54" />
        </g>
        {/* Left closed batten door */}
        <rect x="148" y="88" width="88" height="156" fill="var(--band)" />
        {[166, 184, 202, 220].map(x => (
          <line key={x} x1={x} y1="88" x2={x} y2="244" strokeWidth="1" opacity="0.55" />
        ))}
        {/* Brass door strap hinges & ring handle */}
        <rect x="148" y="118" width="32" height="7" fill="var(--brass)" />
        <rect x="148" y="204" width="32" height="7" fill="var(--brass)" />
        <circle cx="222" cy="172" r="5" fill="var(--brass)" />

        {/* Right door swung open */}
        <polygon points="332,88 378,74 378,236 332,244" fill="var(--band-deep)" />

        {/* Workshop transom window above */}
        <rect x="148" y="56" width="184" height="24" fill="var(--band)" opacity="0.45" />
        <line x1="194" y1="56" x2="194" y2="80" />
        <line x1="240" y1="56" x2="240" y2="80" />
        <line x1="286" y1="56" x2="286" y2="80" />

        {/* Sawhorse outside right */}
        <line x1="394" y1="210" x2="438" y2="210" strokeWidth="2.5" />
        <line x1="402" y1="210" x2="394" y2="244" strokeWidth="2" />
        <line x1="430" y1="210" x2="438" y2="244" strokeWidth="2" />

        {/* Laneway cobbles */}
        <line x1="12" y1="244" x2="468" y2="244" strokeWidth="1.8" />
      </g>

      {/* Pencilled direction pointer */}
      <g stroke="var(--pencil)" strokeWidth="1.3" fill="none" strokeLinecap="round">
        <path d="M28 264 L112 264" />
        <path d="M36 259 L27 264 L36 269" />
      </g>
      <text x="122" y="270" fontFamily="var(--font-pencil)" fontSize="20.5" fill="var(--pencil)">
        2 mins off Salamanca Place · laneway entry
      </text>
    </svg>
  );
}

/** Drawn Tasmanian regrowth forest & sawmill strip for the Timbers sourcing section. */
export function SawmillStrip({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 420 220"
      role="img"
      aria-label="Illustration of tall Tasmanian regrowth gums beside stacked air-drying timber flitches at a small local mill."
      className={`block w-full h-auto ${className}`}
    >
      <g stroke="var(--text)" strokeWidth="1.45" strokeLinecap="round" strokeLinejoin="round">
        {/* Rolling hills */}
        <path d="M12 178 Q105 140 205 168 T408 164" fill="none" stroke="var(--muted)" />
        {/* Tall Tasmanian eucalypts (left) */}
        {[48, 86, 128, 162].map((x, idx) => (
          <g key={x}>
            <line x1={x} y1="176" x2={x} y2={58 + (idx % 2) * 18} strokeWidth="2.4" />
            <ellipse cx={x} cy={52 + (idx % 2) * 18} rx={18 + (idx % 2) * 5} ry="22" fill="var(--band)" />
            <path d={`M${x - 7} ${56 + (idx % 2) * 18} Q${x} ${46 + (idx % 2) * 18} ${x + 8} ${56 + (idx % 2) * 18}`} fill="none" stroke="var(--muted)" strokeWidth="1" />
          </g>
        ))}

        {/* Stick-stacked air-drying timber pack (right) */}
        <g transform="translate(216, 86)">
          {/* Corrugated tin rain cap */}
          <polygon points="-8,12 172,2 174,10 -6,20" fill="var(--muted)" opacity="0.55" />
          {/* Stacked slabs with drying stickers between */}
          {[22, 40, 58, 76].map((y, i) => (
            <g key={y}>
              <rect x="0" y={y} width="160" height="12" fill={i % 2 === 0 ? '#DFC295' : '#A67C54'} />
              {/* Stickers */}
              <rect x="20" y={y + 12} width="8" height="6" fill="var(--paper)" />
              <rect x="76" y={y + 12} width="8" height="6" fill="var(--paper)" />
              <rect x="132" y={y + 12} width="8" height="6" fill="var(--paper)" />
            </g>
          ))}
          {/* Bearers */}
          <rect x="14" y="94" width="18" height="12" fill="var(--band-deep)" />
          <rect x="128" y="94" width="18" height="12" fill="var(--band-deep)" />
        </g>

        <line x1="12" y1="192" x2="408" y2="192" />
      </g>
      <text x="296" y="76" textAnchor="middle" fontFamily="var(--font-pencil)" fontSize="19" fill="var(--pencil)">
        air-dried 12 months per 25 mm
      </text>
      <text x="148" y="212" textAnchor="middle" fontFamily="var(--font-pencil)" fontSize="18" fill="var(--muted)">
        Tasmanian regrowth &amp; salvaged logs
      </text>
    </svg>
  );
}

/** 404 illustration: a board sawn short into two pieces with a 404 mm gap and sawdust below. */
export function SawnShort404({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 540 230"
      role="img"
      aria-label="Illustration of a timber board sawn into two pieces with a 404 millimetre gap and sawdust below."
      className={`block w-full max-w-[34rem] mx-auto h-auto ${className}`}
    >
      <g stroke="var(--text)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        {/* Left board piece */}
        <polygon points="24,104 202,104 196,148 24,148" fill="var(--band)" />
        <path d="M34 118 C85 112, 138 124, 194 116" fill="none" stroke="var(--muted)" strokeWidth="1" opacity="0.6" />
        <path d="M34 134 C90 140, 145 128, 192 136" fill="none" stroke="var(--muted)" strokeWidth="1" opacity="0.6" />

        {/* Right sawn-off board piece */}
        <polygon points="342,104 516,104 516,148 336,148" fill="var(--band)" />
        <polygon points="342,104 336,148 346,148 352,104" fill="var(--band-deep)" />
        <path d="M358 118 C406 112, 460 124, 506 116" fill="none" stroke="var(--muted)" strokeWidth="1" opacity="0.6" />
        <path d="M354 134 C410 140, 464 128, 506 136" fill="none" stroke="var(--muted)" strokeWidth="1" opacity="0.6" />

        {/* Dimension line across the missing 404 mm gap */}
        <g stroke="var(--pencil)" strokeWidth="1.5">
          <line x1="202" y1="54" x2="202" y2="98" strokeDasharray="3 3" />
          <line x1="342" y1="54" x2="342" y2="98" strokeDasharray="3 3" />
          <line x1="206" y1="68" x2="338" y2="68" />
          <path d="M214 63 L205 68 L214 73 M330 63 L339 68 L330 73" fill="none" />
        </g>

        {/* Sawdust mound below the kerf */}
        <path d="M226 196 Q270 162 316 196 Z" fill="var(--band-deep)" stroke="var(--muted)" strokeWidth="1.2" />
        {[246, 260, 272, 286, 298, 254, 280].map((x, idx) => (
          <circle key={idx} cx={x} cy={176 + (idx % 3) * 7} r="1.7" fill="var(--brass)" stroke="none" />
        ))}
      </g>

      <text x="272" y="54" textAnchor="middle" fontFamily="var(--font-display)" fontSize="24" fontWeight="700" fill="var(--pencil)">
        404 mm
      </text>
      <text x="272" y="92" textAnchor="middle" fontFamily="var(--font-pencil)" fontSize="24" fill="var(--muted)">
        measure twice...
      </text>
    </svg>
  );
}

/** Cropped right-hand artworks for inner PageHead splits. */
export function PageHeadArt({ variant }: { variant: 'work' | 'services' | 'timbers' | 'contact' }) {
  if (variant === 'contact') {
    return (
      <div className="flex items-center justify-end gap-4">
        <div className="text-right hidden sm:block">
          <p className="pencil-note text-pencil">stamped on every piece</p>
          <p className="text-xs uppercase tracking-widest text-muted">Hobart · TAS</p>
        </div>
        <BrandStamp size={126} className="shrink-0 rotate-[-6deg]" />
      </div>
    );
  }

  if (variant === 'timbers') {
    const stack = [
      { base: '#DFC295', grain: '#B28751', heart: '#8F6535', seed: 'tasmanian-oak', x: 0 },
      { base: '#966239', grain: '#5E381C', heart: '#412410', seed: 'blackwood', x: 18 },
      { base: '#B56B4E', grain: '#7E412B', heart: '#5C2C1B', seed: 'myrtle', x: 8 },
      { base: '#A67C54', grain: '#6C4C2F', heart: '#50361E', seed: 'spotted-gum', x: 24 },
    ];
    return (
      <svg viewBox="0 0 320 140" aria-hidden="true" className="block w-full max-w-[20rem] ml-auto h-auto">
        <g stroke="var(--text)" strokeWidth="1.4" strokeLinejoin="round">
          {stack.map((b, i) => (
            <g key={b.seed} transform={`translate(${b.x}, ${14 + i * 28})`}>
              <rect x="0" y="0" width="270" height="22" rx="1.5" fill={b.base} />
              <rect x="0" y="0" width="28" height="22" fill={b.heart} opacity="0.55" />
              <line x1="36" y1="8" x2="256" y2="8" stroke={b.grain} strokeWidth="1.2" opacity="0.65" />
              <line x1="42" y1="15" x2="246" y2="15" stroke={b.grain} strokeWidth="1" opacity="0.55" />
            </g>
          ))}
        </g>
        <g transform="translate(232, 34)">
          <svg width="86" height="86" viewBox="0 0 200 200">
            <EndGrainRound seed="timbers-head" rings={9} interactive={false} />
          </svg>
        </g>
      </svg>
    );
  }

  if (variant === 'services') {
    return (
      <svg viewBox="0 0 320 130" aria-hidden="true" className="block w-full max-w-[20rem] ml-auto h-auto">
        <g stroke="var(--text)" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round">
          {/* Open folding rule */}
          <polygon points="16,44 218,22 221,42 19,64" fill="var(--band)" />
          <polygon points="212,24 304,96 290,112 198,40" fill="var(--band-deep)" />
          {[36, 62, 88, 114, 140, 166, 192].map(x => (
            <line key={x} x1={x} y1={42 - x * 0.1} x2={x + 1} y2={51 - x * 0.1} strokeWidth="1.1" />
          ))}
          <circle cx="212" cy="34" r="10" fill="var(--brass)" />
          <circle cx="212" cy="34" r="3.5" fill="var(--brass-soft)" />
          {/* Carpenter's pencil */}
          <g transform="translate(36, 94) rotate(-6)">
            <rect x="0" y="0" width="142" height="13" fill="var(--pencil)" />
            <polygon points="142,0 164,6.5 142,13" fill="var(--band)" />
            <polygon points="156,4.4 164,6.5 156,8.6" fill="var(--text)" />
          </g>
        </g>
      </svg>
    );
  }

  // variant === 'work' (cropped shop drawing corner)
  return (
    <svg viewBox="0 0 320 140" aria-hidden="true" className="block w-full max-w-[20rem] ml-auto h-auto">
      <g stroke="var(--text)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <rect x="16" y="14" width="288" height="114" fill="var(--paper)" stroke="var(--line)" />
        <rect x="44" y="48" width="232" height="14" fill="var(--band)" />
        <rect x="44" y="48" width="24" height="14" fill="var(--band-deep)" />
        <rect x="252" y="48" width="24" height="14" fill="var(--band-deep)" />
        <polygon points="74,62 86,62 78,116 68,116" fill="var(--band-deep)" />
        <polygon points="234,62 246,62 252,116 242,116" fill="var(--band-deep)" />
        <line x1="44" y1="32" x2="276" y2="32" stroke="var(--pencil)" strokeWidth="1.1" />
      </g>
      <text x="160" y="28" textAnchor="middle" fontFamily="var(--font-pencil)" fontSize="19" fill="var(--pencil)">
        scale 1:10 · shop elevation
      </text>
    </svg>
  );
}
