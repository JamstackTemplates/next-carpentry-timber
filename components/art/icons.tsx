type IconProps = {
  className?: string;
};

const base = {
  viewBox: '0 0 24 24',
  width: 24,
  height: 24,
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true as const,
};

/** Bevel-edge joiner's chisel (furniture). */
export function ChiselIcon({ className = 'size-6 shrink-0' }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M9.5 3.5h5l-.8 6.5h-3.4l-.8-6.5Z" />
      <path d="M9.5 10h5" />
      <path d="M10.2 10v7.5L12 20.5l1.8-3V10" />
      <path d="M10.4 17.2h3.2" />
    </svg>
  );
}

/** Framed shaker kitchen cabinet door (kitchens). */
export function CabinetIcon({ className = 'size-6 shrink-0' }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="4" y="3.5" width="16" height="17" rx="1" />
      <rect x="7" y="6.5" width="10" height="11" rx="0.5" />
      <circle cx="15.2" cy="12" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Parallel hardwood deck boards over joists (decks). */
export function DeckIcon({ className = 'size-6 shrink-0' }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M3 7h18M3 11.5h18M3 16h18" />
      <path d="M6.5 4.5v15M17.5 4.5v15" strokeDasharray="1.5 2.5" />
      <path d="M4 19.5h16" />
    </svg>
  );
}

/** Built-in floor-to-ceiling bookshelf (built-ins). */
export function BookshelfIcon({ className = 'size-6 shrink-0' }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="4" y="3.5" width="16" height="17" rx="1" />
      <path d="M4 9.5h16M4 15h16" />
      <path d="M7.5 9.5v-4M10.5 9.5v-3.5M14 9.5l1-3.8" />
      <path d="M8.5 15v-3.5M12 15v-4M16 15v-3.2" />
    </svg>
  );
}

export function ClockIcon({ className = 'size-5 shrink-0' }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  );
}

export function MapPinIcon({ className = 'size-5 shrink-0' }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 20.5s6-5.6 6-10.2a6 6 0 1 0-12 0c0 4.6 6 10.2 6 10.2Z" />
      <circle cx="12" cy="10.2" r="2.2" />
    </svg>
  );
}

export function MailIcon({ className = 'size-5 shrink-0' }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="3.5" y="5.5" width="17" height="13" rx="1.2" />
      <path d="m4.5 6.8 7.5 6 7.5-6" />
    </svg>
  );
}

export function PhoneIcon({ className = 'size-5 shrink-0' }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M6.5 4.5h3l1.4 3.8-1.9 1.6a11.5 11.5 0 0 0 5.1 5.1l1.6-1.9 3.8 1.4v3a1.5 1.5 0 0 1-1.6 1.5A14.5 14.5 0 0 1 5 6.1a1.5 1.5 0 0 1 1.5-1.6Z" />
    </svg>
  );
}

export function MenuIcon({ className = 'size-5 shrink-0' }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M4 7h16M4 12h16M4 17h12" />
    </svg>
  );
}

export function ExternalLinkIcon({ className = 'size-4 shrink-0' }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M14 5h5v5M19 5l-8.5 8.5" />
      <path d="M16 13.5V18a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h4.5" />
    </svg>
  );
}

export function PencilCheckIcon({ className = 'size-5 shrink-0' }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="m4.5 12.5 4.8 4.8L19.5 6.8" />
    </svg>
  );
}
