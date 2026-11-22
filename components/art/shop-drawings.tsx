import type { ProjectDrawing } from '../../content/projects';

/**
 * Eight technical pencil-on-paper shop drawings matching each project `drawing` value.
 * Drawn in 1.5px rounded-cap ink with flat timber fills and pencilled dimension callouts.
 */
export function ShopDrawing({
  kind,
  spec,
  className = '',
}: {
  kind: ProjectDrawing;
  spec?: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 360 220"
      aria-hidden="true"
      className={`block w-full h-auto ${className}`}
    >
      {/* Subtle architectural margin ticks */}
      <g stroke="var(--line)" strokeWidth="0.8" opacity="0.6">
        <line x1="12" y1="12" x2="24" y2="12" />
        <line x1="12" y1="12" x2="12" y2="24" />
        <line x1="348" y1="208" x2="336" y2="208" />
        <line x1="348" y1="208" x2="348" y2="196" />
      </g>

      {kind === 'table' && (
        <g stroke="var(--text)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          {/* Tabletop with breadboard ends */}
          <rect x="44" y="64" width="272" height="18" rx="1.5" fill="var(--band)" />
          <rect x="44" y="64" width="28" height="18" fill="var(--band-deep)" />
          <rect x="288" y="64" width="28" height="18" fill="var(--band-deep)" />
          {/* Drawbore pegs */}
          <circle cx="58" cy="73" r="2" fill="var(--brass)" />
          <circle cx="302" cy="73" r="2" fill="var(--brass)" />
          {/* Apron rail */}
          <rect x="78" y="82" width="204" height="18" fill="var(--paper)" />
          {/* Splayed tapered legs */}
          <polygon points="82,100 96,100 86,182 74,182" fill="var(--band-deep)" />
          <polygon points="264,100 278,100 286,182 274,182" fill="var(--band-deep)" />
          <line x1="106" y1="100" x2="100" y2="164" opacity="0.55" />
          <line x1="254" y1="100" x2="260" y2="164" opacity="0.55" />
          {/* Dimension lines */}
          <g stroke="var(--muted)" strokeWidth="1.1">
            <line x1="44" y1="42" x2="316" y2="42" />
            <path d="M51 38 L44 42 L51 46 M309 38 L316 42 L309 46" fill="none" />
            <line x1="44" y1="36" x2="44" y2="60" strokeDasharray="2 3" />
            <line x1="316" y1="36" x2="316" y2="60" strokeDasharray="2 3" />
            <line x1="334" y1="64" x2="334" y2="182" />
            <path d="M330 71 L334 64 L338 71 M330 175 L334 182 L338 175" fill="none" />
          </g>
          <text x="180" y="34" textAnchor="middle" fontFamily="var(--font-pencil)" fontSize="20" fill="var(--pencil)" stroke="none">
            {spec || '2400 × 1000 mm'}
          </text>
          <text x="344" y="128" textAnchor="middle" fontFamily="var(--font-pencil)" fontSize="17" fill="var(--muted)" stroke="none" transform="rotate(90 344 128)">
            745 mm
          </text>
        </g>
      )}

      {kind === 'sideboard' && (
        <g stroke="var(--text)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          {/* Mitred timber carcass */}
          <rect x="48" y="58" width="264" height="82" rx="1.5" fill="var(--band)" />
          <rect x="56" y="66" width="248" height="66" fill="var(--paper)" />
          {/* Four sliding / framed doors with bookmatched grain chevrons */}
          <rect x="58" y="68" width="60" height="62" fill="var(--band-deep)" />
          <rect x="120" y="68" width="60" height="62" fill="var(--band)" />
          <rect x="180" y="68" width="60" height="62" fill="var(--band)" />
          <rect x="242" y="68" width="60" height="62" fill="var(--band-deep)" />
          {/* Finger pulls */}
          <rect x="108" y="92" width="4" height="14" rx="1" fill="var(--brass)" />
          <rect x="126" y="92" width="4" height="14" rx="1" fill="var(--brass)" />
          <rect x="230" y="92" width="4" height="14" rx="1" fill="var(--brass)" />
          <rect x="248" y="92" width="4" height="14" rx="1" fill="var(--brass)" />
          {/* Underframe & wedged splayed legs */}
          <line x1="72" y1="140" x2="288" y2="140" strokeWidth="2.2" />
          <polygon points="78,140 90,140 78,186 68,186" fill="var(--band-deep)" />
          <polygon points="270,140 282,140 292,186 282,186" fill="var(--band-deep)" />
          <line x1="86" y1="164" x2="274" y2="164" strokeDasharray="3 3" opacity="0.5" />
          {/* Dimensions */}
          <g stroke="var(--muted)" strokeWidth="1.1">
            <line x1="48" y1="38" x2="312" y2="38" />
            <path d="M55 34 L48 38 L55 42 M305 34 L312 38 L305 42" fill="none" />
          </g>
          <text x="180" y="31" textAnchor="middle" fontFamily="var(--font-pencil)" fontSize="20" fill="var(--pencil)" stroke="none">
            {spec || '1800 × 800 mm'}
          </text>
        </g>
      )}

      {kind === 'kitchen' && (
        <g stroke="var(--text)" strokeWidth="1.45" strokeLinecap="round" strokeLinejoin="round">
          {/* Upper celery-top cabinets */}
          <rect x="38" y="36" width="136" height="48" fill="var(--paper)" />
          <line x1="84" y1="36" x2="84" y2="84" />
          <line x1="128" y1="36" x2="128" y2="84" />
          {/* Open timber shelf & rangehood line */}
          <rect x="192" y="54" width="128" height="8" fill="var(--band)" />
          {/* Main benchtop */}
          <rect x="32" y="114" width="296" height="10" fill="var(--band-deep)" />
          {/* Lower framed oak joinery run */}
          <rect x="36" y="124" width="288" height="66" fill="var(--band)" />
          {[94, 152, 210, 268].map(x => (
            <line key={x} x1={x} y1="124" x2={x} y2="190" />
          ))}
          {/* Drawer stack */}
          <line x1="152" y1="144" x2="210" y2="144" />
          <line x1="152" y1="166" x2="210" y2="166" />
          {/* Brass pulls */}
          {[65, 123, 181, 239, 296].map(x => (
            <line key={x} x1={x - 7} y1="134" x2={x + 7} y2="134" stroke="var(--brass)" strokeWidth="2.4" />
          ))}
          {/* Kickboard */}
          <rect x="40" y="190" width="280" height="8" fill="var(--muted)" opacity="0.45" />
          {/* Dimension callout */}
          <g stroke="var(--muted)" strokeWidth="1.1">
            <line x1="36" y1="22" x2="324" y2="22" />
            <path d="M43 18 L36 22 L43 26 M317 18 L324 22 L317 26" fill="none" />
          </g>
          <text x="180" y="17" textAnchor="middle" fontFamily="var(--font-pencil)" fontSize="19" fill="var(--pencil)" stroke="none">
            {spec || '5.2 m run · inset frames'}
          </text>
        </g>
      )}

      {kind === 'deck' && (
        <g stroke="var(--text)" strokeWidth="1.45" strokeLinecap="round" strokeLinejoin="round">
          {/* Isometric-style deck platform */}
          <polygon points="36,108 188,48 326,96 174,158" fill="var(--band)" />
          {/* Parallel hardwood boards */}
          {[1, 2, 3, 4, 5, 6].map(i => {
            const t = i / 7;
            const x1 = 36 + (188 - 36) * t;
            const y1 = 108 + (48 - 108) * t;
            const x2 = 174 + (326 - 174) * t;
            const y2 = 158 + (96 - 158) * t;
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth="1.1" opacity="0.72" />;
          })}
          {/* Picture-framed edge & three wide steps */}
          <polygon points="36,108 174,158 174,170 36,120" fill="var(--band-deep)" />
          <polygon points="174,158 326,96 326,108 174,170" fill="var(--muted)" opacity="0.45" />
          {/* Step 1 */}
          <polygon points="148,162 274,111 290,118 164,170" fill="var(--band)" />
          <polygon points="164,170 290,118 290,130 164,182" fill="var(--band-deep)" />
          {/* Step 2 */}
          <polygon points="166,182 292,130 308,137 182,190" fill="var(--band)" />
          <polygon points="182,190 308,137 308,148 182,201" fill="var(--band-deep)" />
          {/* Callout */}
          <path d="M74 66 L54 44 L140 44" fill="none" stroke="var(--muted)" strokeWidth="1.1" />
          <text x="58" y="38" fontFamily="var(--font-pencil)" fontSize="20" fill="var(--pencil)" stroke="none">
            {spec || '135 mm boards · hidden clips'}
          </text>
        </g>
      )}

      {kind === 'bookwall' && (
        <g stroke="var(--text)" strokeWidth="1.45" strokeLinecap="round" strokeLinejoin="round">
          {/* Full-height shelving carcass */}
          <rect x="44" y="36" width="272" height="162" fill="var(--paper)" />
          {/* Vertical stiles */}
          {[44, 112, 180, 248, 316].map(x => (
            <rect key={x} x={x - 3} y="36" width="6" height="162" fill="var(--band-deep)" />
          ))}
          {/* Horizontal shelves */}
          {[36, 72, 108, 144, 194].map(y => (
            <rect key={y} x="44" y={y} width="272" height="5" fill="var(--band)" />
          ))}
          {/* Lower cupboard doors */}
          <rect x="50" y="150" width="58" height="44" fill="var(--band)" />
          <rect x="118" y="150" width="58" height="44" fill="var(--band)" />
          <rect x="186" y="150" width="58" height="44" fill="var(--band)" />
          <rect x="254" y="150" width="58" height="44" fill="var(--band)" />
          {/* Brass ladder rail */}
          <line x1="38" y1="68" x2="322" y2="68" stroke="var(--brass)" strokeWidth="3" />
          {/* Rolling wooden library ladder */}
          <g stroke="var(--text)" strokeWidth="2">
            <line x1="212" y1="68" x2="188" y2="202" />
            <line x1="238" y1="68" x2="214" y2="202" />
            {[90, 112, 134, 156, 178].map((y, idx) => (
              <line key={y} x1={208 - idx * 4.2} y1={y} x2={234 - idx * 4.2} y2={y} strokeWidth="1.6" />
            ))}
          </g>
          <text x="180" y="24" textAnchor="middle" fontFamily="var(--font-pencil)" fontSize="20" fill="var(--pencil)" stroke="none">
            {spec || '4.6 × 2.9 m · brass rail'}
          </text>
        </g>
      )}

      {kind === 'chest' && (
        <g stroke="var(--text)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          {/* Blanket box front & angled lid */}
          <polygon points="74,78 276,78 294,64 92,64" fill="var(--band)" />
          <rect x="74" y="78" width="202" height="12" fill="var(--band-deep)" />
          <rect x="80" y="90" width="190" height="84" fill="var(--band)" />
          <polygon points="270,90 288,76 288,160 270,174" fill="var(--band-deep)" />
          {/* Exposed corner through dovetails */}
          {[96, 114, 132, 150].map(y => (
            <polygon key={y} points={`80,${y} 92,${y + 2} 92,${y + 10} 80,${y + 12}`} fill="var(--brass)" opacity="0.65" />
          ))}
          {[96, 114, 132, 150].map(y => (
            <polygon key={`r-${y}`} points={`270,${y} 258,${y + 2} 258,${y + 10} 270,${y + 12}`} fill="var(--brass)" opacity="0.65" />
          ))}
          {/* Plinth */}
          <rect x="76" y="174" width="198" height="12" fill="var(--muted)" opacity="0.5" />
          <text x="180" y="42" textAnchor="middle" fontFamily="var(--font-pencil)" fontSize="20" fill="var(--pencil)" stroke="none">
            {spec || 'through dovetails · Huon pine'}
          </text>
        </g>
      )}

      {kind === 'window-seat' && (
        <g stroke="var(--text)" strokeWidth="1.45" strokeLinecap="round" strokeLinejoin="round">
          {/* Bay window frame behind */}
          <polyline points="42,102 74,40 286,40 318,102" fill="none" stroke="var(--muted)" strokeDasharray="3 3" />
          <rect x="92" y="46" width="176" height="58" fill="var(--paper)" stroke="var(--muted)" />
          <line x1="150" y1="46" x2="150" y2="104" stroke="var(--muted)" />
          <line x1="210" y1="46" x2="210" y2="104" stroke="var(--muted)" />
          {/* Thick bay bench seat */}
          <polygon points="36,120 74,104 286,104 324,120" fill="var(--band)" />
          <rect x="36" y="120" width="288" height="12" fill="var(--band-deep)" />
          {/* Three deep inset sassafras drawers */}
          <rect x="44" y="132" width="272" height="54" fill="var(--paper)" />
          <rect x="52" y="138" width="80" height="42" fill="var(--band)" />
          <rect x="140" y="138" width="80" height="42" fill="var(--band)" />
          <rect x="228" y="138" width="80" height="42" fill="var(--band)" />
          {/* Continuous grain streak across drawers */}
          <path d="M54 158 C120 150, 210 166, 306 156" fill="none" stroke="var(--text)" strokeWidth="1.3" opacity="0.5" />
          {[92, 180, 268].map(x => (
            <line key={x} x1={x - 10} y1="148" x2={x + 10} y2="148" stroke="var(--brass)" strokeWidth="2.4" />
          ))}
          <text x="180" y="28" textAnchor="middle" fontFamily="var(--font-pencil)" fontSize="20" fill="var(--pencil)" stroke="none">
            {spec || '2.4 m bay · scribed ends'}
          </text>
        </g>
      )}

      {kind === 'island' && (
        <g stroke="var(--text)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          {/* Main island benchtop */}
          <rect x="40" y="64" width="206" height="16" fill="var(--band)" />
          {/* Inset thick end-grain blackwood chopping block on right */}
          <rect x="246" y="60" width="74" height="24" fill="#7D4C27" />
          {[258, 270, 282, 294, 306].map(x => (
            <line key={x} x1={x} y1="60" x2={x} y2="84" stroke="var(--text)" strokeWidth="0.9" opacity="0.55" />
          ))}
          <line x1="246" y1="72" x2="320" y2="72" stroke="var(--text)" strokeWidth="0.9" opacity="0.55" />
          {/* Framed drawers & open slatted lower pot shelf */}
          <rect x="52" y="80" width="256" height="36" fill="var(--paper)" />
          <rect x="60" y="86" width="114" height="24" fill="var(--band)" />
          <rect x="184" y="86" width="114" height="24" fill="var(--band)" />
          <circle cx="117" cy="98" r="2.6" fill="var(--brass)" />
          <circle cx="241" cy="98" r="2.6" fill="var(--brass)" />
          {/* Legs */}
          <rect x="52" y="80" width="12" height="106" fill="var(--band-deep)" />
          <rect x="296" y="84" width="12" height="102" fill="var(--band-deep)" />
          {/* Lower slatted shelf */}
          <rect x="64" y="156" width="232" height="10" fill="var(--band)" />
          {/* Callout for end-grain block */}
          <path d="M284 56 L296 36 L220 36" fill="none" stroke="var(--muted)" strokeWidth="1.1" />
          <text x="176" y="34" textAnchor="middle" fontFamily="var(--font-pencil)" fontSize="20" fill="var(--pencil)" stroke="none">
            {spec || '75 mm end-grain block'}
          </text>
        </g>
      )}
    </svg>
  );
}
