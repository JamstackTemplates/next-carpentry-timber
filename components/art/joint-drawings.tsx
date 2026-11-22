export type JointKind =
  | 'through-dovetail'
  | 'mortise-tenon'
  | 'breadboard-end'
  | 'hidden-deck-fixing';

/**
 * Four exploded isometric joinery illustrations with alignment arrows and pencilled callouts.
 */
export function JointDrawing({ kind, className = '' }: { kind: JointKind; className?: string }) {
  return (
    <svg
      viewBox="0 0 360 220"
      role="img"
      aria-label={`Exploded isometric drawing of a ${kind.replace(/-/g, ' ')} joint.`}
      className={`block w-full h-auto ${className}`}
    >
      {kind === 'through-dovetail' && (
        <g stroke="var(--text)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          {/* Tail board (left) */}
          <polygon points="34,74 134,36 164,48 64,86" fill="var(--band)" />
          <polygon points="34,74 64,86 64,174 34,162" fill="var(--band-deep)" />
          {/* Tails projecting */}
          <polygon points="134,36 164,48 164,68 134,56" fill="var(--band-deep)" />
          <polygon points="134,56 172,72 172,102 134,88" fill="var(--band)" />
          <polygon points="134,116 172,130 172,158 134,144" fill="var(--band)" />
          {/* Dashed assembly vectors */}
          <g stroke="var(--pencil)" strokeWidth="1.2" strokeDasharray="4 4">
            <line x1="176" y1="84" x2="218" y2="96" />
            <line x1="176" y1="142" x2="218" y2="154" />
          </g>
          {/* Pin board (right) */}
          <polygon points="222,64 316,96 290,110 196,78" fill="var(--band)" />
          <polygon points="196,78 290,110 290,192 196,160" fill="var(--band-deep)" />
          {/* Cut sockets */}
          <polygon points="210,83 236,92 236,116 210,107" fill="var(--paper)" />
          <polygon points="210,131 236,140 236,164 210,155" fill="var(--paper)" />
          <text x="190" y="34" textAnchor="middle" fontFamily="var(--font-pencil)" fontSize="22" fill="var(--pencil)" stroke="none">
            1:8 hardwood slope · hand-sawn
          </text>
        </g>
      )}

      {kind === 'mortise-tenon' && (
        <g stroke="var(--text)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          {/* Vertical leg post with chopped through-mortise */}
          <polygon points="62,40 108,24 140,38 94,54" fill="var(--band)" />
          <polygon points="62,40 94,54 94,196 62,182" fill="var(--band-deep)" />
          <polygon points="94,54 140,38 140,180 94,196" fill="var(--band)" />
          {/* Mortise slot */}
          <polygon points="108,82 126,76 126,136 108,142" fill="var(--text)" opacity="0.82" />
          {/* Drawbore peg holes */}
          <circle cx="78" cy="96" r="4" fill="var(--brass)" />
          <circle cx="78" cy="126" r="4" fill="var(--brass)" />
          {/* Assembly arrows */}
          <g stroke="var(--pencil)" strokeWidth="1.2" strokeDasharray="4 4">
            <line x1="132" y1="108" x2="188" y2="88" />
          </g>
          {/* Rail with shouldered tenon */}
          <polygon points="222,52 326,18 342,28 238,62" fill="var(--band)" />
          <polygon points="238,62 342,28 342,102 238,136" fill="var(--band-deep)" />
          {/* Protruding tenon tongue */}
          <polygon points="190,74 238,58 238,118 190,134" fill="var(--band)" />
          <circle cx="214" cy="86" r="3.6" fill="var(--paper)" />
          <circle cx="214" cy="112" r="3.6" fill="var(--paper)" />
          {/* Two drawbore oak pegs floating above */}
          <line x1="78" y1="10" x2="78" y2="30" stroke="var(--brass)" strokeWidth="4" />
          <text x="195" y="196" textAnchor="middle" fontFamily="var(--font-pencil)" fontSize="19" fill="var(--pencil)" stroke="none">
            twin drawbore pegs · pulls shoulder tight
          </text>
        </g>
      )}

      {kind === 'breadboard-end' && (
        <g stroke="var(--text)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          {/* Tabletop slab with long tongue & three tenons */}
          <polygon points="34,116 176,54 246,84 104,146" fill="var(--band)" />
          <polygon points="34,116 104,146 104,162 34,132" fill="var(--band-deep)" />
          {/* Three tenons projecting */}
          <polygon points="190,62 214,72 200,82 176,72" fill="var(--band-deep)" />
          <polygon points="218,74 242,84 228,94 204,84" fill="var(--band-deep)" />
          {/* Elongated movement slot on outer tenon */}
          <ellipse cx="222" cy="84" rx="8" ry="3.5" fill="var(--paper)" />
          {/* Exploded breadboard end cap */}
          <g transform="translate(26, 18)">
            <polygon points="200,104 294,64 316,74 222,114" fill="var(--band-deep)" />
            <polygon points="222,114 316,74 316,92 222,132" fill="var(--band)" />
            {/* Three pegs */}
            <circle cx="238" cy="100" r="3.2" fill="var(--brass)" />
            <circle cx="262" cy="90" r="3.2" fill="var(--brass)" />
            <circle cx="286" cy="80" r="3.2" fill="var(--brass)" />
          </g>
          {/* Movement arrows */}
          <path d="M180 42 L244 70" stroke="var(--pencil)" strokeWidth="1.2" strokeDasharray="3 3" fill="none" />
          <text x="180" y="198" textAnchor="middle" fontFamily="var(--font-pencil)" fontSize="18.5" fill="var(--pencil)" stroke="none">
            elongated outer slots · flat across Hobart winters
          </text>
        </g>
      )}

      {kind === 'hidden-deck-fixing' && (
        <g stroke="var(--text)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          {/* Timber joist below */}
          <polygon points="36,160 220,104 268,122 84,178" fill="var(--band-deep)" />
          <polygon points="36,160 84,178 84,202 36,184" fill="var(--muted)" opacity="0.5" />
          {/* Left hardwood decking board with side groove */}
          <polygon points="56,110 156,78 214,100 114,132" fill="var(--band)" />
          <polygon points="114,132 214,100 214,118 114,150" fill="var(--band-deep)" />
          <polygon points="114,138 214,106 214,112 114,144" fill="var(--text)" opacity="0.7" />
          {/* Concealed stainless deck clip & brass-highlighted screw */}
          <polygon points="164,126 190,118 198,122 172,130" fill="var(--brass)" />
          <line x1="180" y1="86" x2="180" y2="124" stroke="var(--pencil)" strokeWidth="1.4" strokeDasharray="3 3" />
          <polygon points="175,78 185,78 181,92 179,92" fill="var(--brass)" />
          {/* Right decking board sliding into clip */}
          <polygon points="196,136 296,104 334,118 234,150" fill="var(--band)" />
          <polygon points="196,136 234,150 234,168 196,154" fill="var(--band-deep)" />
          <text x="180" y="42" textAnchor="middle" fontFamily="var(--font-pencil)" fontSize="21" fill="var(--pencil)" stroke="none">
            316 stainless hidden clip · clean bare-foot surface
          </text>
        </g>
      )}
    </svg>
  );
}
