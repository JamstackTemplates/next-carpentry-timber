export type ServiceCategory = 'furniture' | 'kitchens' | 'decks' | 'built-ins';
export type PriceUnit = 'per piece' | 'per kitchen' | 'per m²' | 'per linear metre';
export type ServiceAvailability = 'booking' | 'waitlist' | 'paused';

export interface Service {
  /** Stable, lowercase, URL-safe identifier (also used as /services/#<id> anchor). */
  id: string;
  /** Display name on the cutting list. */
  name: string;
  /** Primary trade category shared with projects. */
  category: ServiceCategory;
  /** Short plain description of the piece or trade. */
  summary: string;
  /** What is included in a typical commission. */
  includes: readonly string[];
  /** Suggested timber IDs from content/timbers.ts; empty array renders as "Matched to the piece". */
  timbers: readonly string[];
  /** Starting guide price in whole Australian dollars (AUD), always displayed as "from $X". */
  fromPrice: number;
  /** Unit paired with the starting price. */
  priceUnit: PriceUnit;
  /** Typical workshop lead time [min, max] in whole weeks (1–52). Edit here to update Home and Services. */
  leadWeeks: readonly [number, number];
  /** Current commission slot status. Edit here to update the cutting list stamp. */
  availability: ServiceAvailability;
  /** Optional short note printed alongside the availability stamp. */
  availabilityNote?: string;
}

export const SERVICE_CATEGORIES: readonly ServiceCategory[] = [
  'furniture',
  'kitchens',
  'decks',
  'built-ins',
] as const;

export const SERVICE_CATEGORY_LABELS: Record<ServiceCategory, string> = {
  furniture: 'Furniture',
  kitchens: 'Kitchens',
  decks: 'Decks',
  'built-ins': 'Built-ins',
};

export const AVAILABILITY_LABELS: Record<ServiceAvailability, string> = {
  booking: 'Booking now',
  waitlist: 'Waitlist',
  paused: 'Paused',
};

/**
 * The three flagship trades featured on the Home honey-oak plank band.
 * Prices, lead times and availability are read live from `services` below.
 */
export const HOME_TRADES: readonly {
  serviceId: string;
  tradeTitle: string;
  plankTimberId: string;
  blurb: string;
}[] = [
  {
    serviceId: 'dining-tables',
    tradeTitle: 'Custom furniture',
    plankTimberId: 'blackwood',
    blurb: 'Dining tables, sideboards and heirloom chests jointed to move with the seasons.',
  },
  {
    serviceId: 'kitchens',
    tradeTitle: 'Solid-timber kitchens',
    plankTimberId: 'tasmanian-oak',
    blurb: 'Framed cabinetry, dovetailed drawers and islands scribed directly to old Hobart walls.',
  },
  {
    serviceId: 'hardwood-decks',
    tradeTitle: 'Hardwood decks',
    plankTimberId: 'spotted-gum',
    blurb: 'Bushfire-hardy spotted gum and silvertop ash decks, steps and screening built on site.',
  },
] as const;

export const services: readonly Service[] = [
  {
    id: 'dining-tables',
    name: 'Dining tables',
    category: 'furniture',
    summary:
      'Long-grain tables in Tasmanian blackwood, oak or myrtle, with breadboard ends or mortised trestle bases built for daily family use.',
    includes: [
      'Timber selection together at the workshop rack',
      '1:10 elevation drawing and sample oil board',
      'Hand-planed top with three coats of hardwax oil',
      'Delivery and room placement across Greater Hobart and the Huon Valley',
    ],
    timbers: ['blackwood', 'tasmanian-oak', 'myrtle'],
    fromPrice: 4800,
    priceUnit: 'per piece',
    leadWeeks: [8, 10],
    availability: 'booking',
  },
  {
    id: 'cabinets-sideboards',
    name: 'Sideboards and cabinets',
    category: 'furniture',
    summary:
      'Bookmatched doors, piston-fit dovetailed drawers and sliding panels made to hold records, tableware or linen without sagging.',
    includes: [
      'Custom internal dividers, shelves and cable routing',
      'Through- or half-blind dovetailed drawer boxes',
      'Solid brass hardware and soft-close or traditional timber runners',
      'Delivery and levelling in your room',
    ],
    timbers: ['myrtle', 'blackwood', 'sassafras'],
    fromPrice: 3600,
    priceUnit: 'per piece',
    leadWeeks: [8, 12],
    availability: 'booking',
  },
  {
    id: 'built-in-joinery',
    name: 'Bookwalls, window seats and built-ins',
    category: 'built-ins',
    summary:
      'Floor-to-ceiling libraries, bay window benches and hallway storage scribed tight to crooked plaster and old floorboards.',
    includes: [
      'On-site laser and story-stick measure',
      'Full workshop dry-fit before finishing',
      'On-site scribing, installation and trim',
      'Optional solid-brass ladder rail or lift-up bench storage',
    ],
    timbers: ['tasmanian-oak', 'sassafras', 'celery-top-pine'],
    fromPrice: 1900,
    priceUnit: 'per linear metre',
    leadWeeks: [6, 10],
    availability: 'booking',
  },
  {
    id: 'kitchens',
    name: 'Kitchens and islands',
    category: 'kitchens',
    summary:
      'Full timber kitchens and standalone farmhouse islands built in solid hardwood frames with durable birch-ply carcasses and oiled benchtops.',
    includes: [
      'Site measure and coordination with your plumber, sparky or architect',
      'Full joinery drawings and fixed written quote before we cut',
      'Solid timber doors, dovetailed pantry drawers and island joinery',
      'On-site installation and final oil coat once trades clear',
    ],
    timbers: ['tasmanian-oak', 'celery-top-pine', 'blackwood'],
    fromPrice: 28000,
    priceUnit: 'per kitchen',
    leadWeeks: [14, 18],
    availability: 'waitlist',
    availabilityNote: 'Booking site measures for March',
  },
  {
    id: 'hardwood-decks',
    name: 'Hardwood decks and steps',
    category: 'decks',
    summary:
      'Well-drained subframes, hidden stainless fixings and crisp mitred stairs in dense Australian hardwoods that handle coastal weather.',
    includes: [
      'Site level check and subframe engineering coordination if required',
      'Seasoned spotted gum or silvertop ash boards',
      'Hidden deck clips or countersunk stainless screws with neat gaps',
      'First two coats of penetrating decking oil on all four faces',
    ],
    timbers: ['spotted-gum', 'silvertop-ash'],
    fromPrice: 640,
    priceUnit: 'per m²',
    leadWeeks: [4, 6],
    availability: 'booking',
  },
  {
    id: 'restoration',
    name: 'Repairs and restoration',
    category: 'furniture',
    summary:
      'Re-gluing loose chairs, tightening split tabletops and stripping tired varnish back to an honest oiled surface.',
    includes: [
      'Bench inspection and honest advice on whether a piece is worth saving',
      'Hide-glue or structural timber repairs matched to the original species',
      'Hand scraping and fresh oil finish',
    ],
    timbers: [],
    fromPrice: 480,
    priceUnit: 'per piece',
    leadWeeks: [2, 4],
    availability: 'paused',
    availabilityNote: 'Back in the new year',
  },
];

export const servicesById = new Map<string, Service>(services.map(item => [item.id, item]));

const AUD = new Intl.NumberFormat('en-AU', { maximumFractionDigits: 0 });

/** Formats a whole AUD amount with thousands separators, always prefixed with "from". */
export function formatFromPrice(amount: number): string {
  return `from $${AUD.format(amount)}`;
}

/** Formats a lead-time week range such as "8–10 weeks". */
export function formatLeadWeeks([min, max]: readonly [number, number]): string {
  return min === max ? `${min} ${min === 1 ? 'week' : 'weeks'}` : `${min}–${max} weeks`;
}

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const VALID_CATEGORIES = new Set<string>(SERVICE_CATEGORIES);
const VALID_UNITS = new Set<string>(['per piece', 'per kitchen', 'per m²', 'per linear metre']);
const VALID_AVAILABILITY = new Set<string>(['booking', 'waitlist', 'paused']);

/** Validates services and their timber ID references with item- and field-specific errors. */
export function validateServices(items: readonly Service[], timberIds: ReadonlySet<string>): void {
  if (items.length === 0) throw new Error('services: at least one service is required');
  const seen = new Set<string>();
  for (const item of items) {
    const label = `services[${item.id || '?'}]`;
    if (!item.id || !SLUG.test(item.id)) {
      throw new Error(`${label}.id: must be lowercase and URL-safe`);
    }
    if (seen.has(item.id)) {
      throw new Error(`${label}.id: duplicate service id "${item.id}"`);
    }
    seen.add(item.id);
    if (!item.name?.trim()) throw new Error(`${label}.name: required`);
    if (!VALID_CATEGORIES.has(item.category)) {
      throw new Error(`${label}.category: unknown category "${item.category}"`);
    }
    if (!item.summary?.trim()) throw new Error(`${label}.summary: required`);
    if (!Array.isArray(item.includes) || item.includes.length === 0) {
      throw new Error(`${label}.includes: must list at least one included item`);
    }
    for (const line of item.includes) {
      if (!line.trim()) throw new Error(`${label}.includes: empty entry`);
    }
    for (const timberId of item.timbers) {
      if (!timberIds.has(timberId)) {
        throw new Error(`${label}.timbers: unknown timber "${timberId}"`);
      }
    }
    if (!Number.isInteger(item.fromPrice) || item.fromPrice <= 0) {
      throw new Error(`${label}.fromPrice: must be a positive integer AUD amount (got ${item.fromPrice})`);
    }
    if (!VALID_UNITS.has(item.priceUnit)) {
      throw new Error(`${label}.priceUnit: unknown unit "${item.priceUnit}"`);
    }
    const [min, max] = item.leadWeeks ?? [];
    if (!Number.isInteger(min) || !Number.isInteger(max) || min < 1 || max > 52 || min > max) {
      throw new Error(`${label}.leadWeeks: must be ordered integers [min, max] within 1–52 (got [${min}, ${max}])`);
    }
    if (!VALID_AVAILABILITY.has(item.availability)) {
      throw new Error(`${label}.availability: unknown availability "${item.availability}"`);
    }
    if (item.availabilityNote !== undefined && !item.availabilityNote.trim()) {
      throw new Error(`${label}.availabilityNote: omit instead of leaving blank`);
    }
  }
}
