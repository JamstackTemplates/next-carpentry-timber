/** Suitable end-uses for a timber species; drives the /timbers/ filter. */
export type TimberUse = 'furniture' | 'kitchens' | 'outdoor';

/** Current yard and rack availability; this is the field the owner edits most often. */
export type TimberStock = 'in-stock' | 'limited' | 'by-order';

/** Hex palette used to draw a species' plank and end-grain round artwork. */
export interface TimberSwatch {
  /** Main sawn face tone (#RRGGBB). */
  base: string;
  /** Darker growth-ring and grain contour tone (#RRGGBB). */
  grain: string;
  /** Deeper heartwood core tone (#RRGGBB). */
  heart: string;
}

export interface Timber {
  /** Stable, lowercase, URL-safe identifier (also used as /timbers/#<id> anchor). */
  id: string;
  /** Common Australian timber name. */
  name: string;
  /** Botanical species name(s), rendered in italics. */
  botanical: string;
  /** Provenance and harvest type. */
  origin: string;
  /** Plain description of sapwood and heartwood tones. */
  colour: string;
  /** Plain description of texture and figure. */
  grain: string;
  /** Janka dry hardness in kilonewtons (1–15 kN). */
  jankaKn: number;
  /** One or more suitable workshop uses. */
  uses: readonly TimberUse[];
  /** Relative cost tier from 1 ($) to 4 ($$$$). */
  priceBand: 1 | 2 | 3 | 4;
  /** Rack status: in-stock, limited or by-order. */
  stock: TimberStock;
  /** One sentence of maker's opinion, pencilled on the board. */
  note: string;
  /** Species colours used by EndGrainRound and TimberPlank SVGs. */
  swatch: TimberSwatch;
}

export const TIMBER_USES: readonly TimberUse[] = ['furniture', 'kitchens', 'outdoor'] as const;

export const TIMBER_USE_LABELS: Record<TimberUse, string> = {
  furniture: 'Furniture',
  kitchens: 'Kitchens',
  outdoor: 'Outdoor',
};

export const TIMBER_STOCK_LABELS: Record<TimberStock, string> = {
  'in-stock': 'In stock',
  limited: 'Limited rack',
  'by-order': 'By order',
};

/** Five species displayed as end-grain rounds on the Home "From the rack" band. */
export const HOME_RACK_TIMBER_IDS: readonly string[] = [
  'tasmanian-oak',
  'blackwood',
  'myrtle',
  'huon-pine',
  'spotted-gum',
] as const;

export const timbers: readonly Timber[] = [
  {
    id: 'tasmanian-oak',
    name: 'Tasmanian oak',
    botanical: 'Eucalyptus obliqua, E. regnans, E. delegatensis',
    origin: 'Tasmania, regrowth',
    colour: 'Straw to pale honey, warming gently to biscuit in sunlight.',
    grain: 'Straight, even and open-pored with clean cathedral crowns on backsawn boards.',
    jankaKn: 5.5,
    uses: ['furniture', 'kitchens'],
    priceBand: 2,
    stock: 'in-stock',
    note: 'Honest, steady timber that planes cleanly and brightens a southern room.',
    swatch: { base: '#DFC295', grain: '#B28751', heart: '#8F6535' },
  },
  {
    id: 'blackwood',
    name: 'Tasmanian blackwood',
    botanical: 'Acacia melanoxylon',
    origin: 'North-west Tasmania',
    colour: 'Golden honey to deep chocolate brown, often with a warm russet flash.',
    grain: 'Medium, lustrous and frequently figured with rippled fiddleback chatoyance.',
    jankaKn: 5.2,
    uses: ['furniture', 'kitchens'],
    priceBand: 3,
    stock: 'in-stock',
    note: "The timber we'd choose for our own table.",
    swatch: { base: '#966239', grain: '#5E381C', heart: '#412410' },
  },
  {
    id: 'myrtle',
    name: 'Myrtle',
    botanical: 'Nothofagus cunninghamii',
    origin: 'Tasmania',
    colour: 'Soft salmon pink through to deep red-brown with occasional misty grey banding.',
    grain: 'Fine, dense and silky under a hand plane; takes a crisp arris without splintering.',
    jankaKn: 5.1,
    uses: ['furniture'],
    priceBand: 3,
    stock: 'by-order',
    note: 'Nothing finishes quite like hand-planed red myrtle under hardwax oil.',
    swatch: { base: '#B56B4E', grain: '#7E412B', heart: '#5C2C1B' },
  },
  {
    id: 'sassafras',
    name: 'Blackheart sassafras',
    botanical: 'Atherosperma moschatum',
    origin: 'Tasmania',
    colour: 'Creamy pale biscuit threaded with dramatic ink-dark olive and charcoal heart streaks.',
    grain: 'Very fine and even; cuts crisply for dovetails and framed cabinet fronts.',
    jankaKn: 4.1,
    uses: ['furniture'],
    priceBand: 3,
    stock: 'limited',
    note: 'One bookmatched pair of blackheart boards gives a sideboard all the ornament it needs.',
    swatch: { base: '#CCB48D', grain: '#6B523E', heart: '#392F28' },
  },
  {
    id: 'huon-pine',
    name: 'Huon pine',
    botanical: 'Lagarostrobos franklinii',
    origin: 'Salvaged, Tasmania',
    colour: 'Pale butter yellow ageing to rich amber honey.',
    grain: 'Tight, silky, close-ringed and naturally aromatic from its protective oils.',
    jankaKn: 2.5,
    uses: ['furniture'],
    priceBand: 4,
    stock: 'limited',
    note: 'We work salvaged logs only — soft underfoot, heirloom-grade for chests and drawer linings.',
    swatch: { base: '#E2C579', grain: '#B79142', heart: '#967128' },
  },
  {
    id: 'celery-top-pine',
    name: 'Celery-top pine',
    botanical: 'Phyllocladus aspleniifolius',
    origin: 'Tasmania',
    colour: 'Clean pale blonde to warm cream with crisp fine growth rings.',
    grain: 'Dense for a softwood, remarkably stable across seasonal swings and wet bench zones.',
    jankaKn: 4.9,
    uses: ['kitchens', 'outdoor'],
    priceBand: 3,
    stock: 'by-order',
    note: 'Our favourite pale joinery timber when a kitchen needs calm, quiet grain.',
    swatch: { base: '#E0C087', grain: '#B28B4E', heart: '#8C6730' },
  },
  {
    id: 'spotted-gum',
    name: 'Spotted gum',
    botanical: 'Corymbia maculata',
    origin: 'New South Wales, plantation',
    colour: 'Olive-taupe, warm caramel and smoky chocolate varying naturally board to board.',
    grain: 'Interlocked, dense and naturally oily with subtle wavy figure.',
    jankaKn: 11.0,
    uses: ['outdoor', 'kitchens'],
    priceBand: 2,
    stock: 'in-stock',
    note: 'Tough enough for coastal weather and bare feet, with far less splintering than cheaper decking.',
    swatch: { base: '#A67C54', grain: '#6C4C2F', heart: '#50361E' },
  },
  {
    id: 'silvertop-ash',
    name: 'Silvertop ash',
    botanical: 'Eucalyptus sieberi',
    origin: 'Victoria',
    colour: 'Cool pale ochre and warm grey-brown that weathers evenly to driftwood silver.',
    grain: 'Moderately coarse with strong, straight fibres and crisp pencil-round edges.',
    jankaKn: 8.8,
    uses: ['outdoor'],
    priceBand: 2,
    stock: 'in-stock',
    note: 'Clean Australian hardwood for hillside decks and stairs where bushfire-rated density counts.',
    swatch: { base: '#C5AF8E', grain: '#8A7253', heart: '#6A5438' },
  },
];

export const timbersById = new Map<string, Timber>(timbers.map(item => [item.id, item]));

export function formatPriceBand(band: 1 | 2 | 3 | 4): string {
  return '$'.repeat(band);
}

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const HEX = /^#[0-9A-Fa-f]{6}$/;
const VALID_USES = new Set<string>(TIMBER_USES);
const VALID_STOCK = new Set<string>(['in-stock', 'limited', 'by-order']);

/** Validates a timbers collection with item- and field-specific errors. */
export function validateTimbers(items: readonly Timber[]): void {
  if (items.length === 0) throw new Error('timbers: at least one timber species is required');
  const seen = new Set<string>();
  for (const item of items) {
    const label = `timbers[${item.id || '?'}]`;
    if (!item.id || !SLUG.test(item.id)) {
      throw new Error(`${label}.id: must be lowercase and URL-safe`);
    }
    if (seen.has(item.id)) {
      throw new Error(`${label}.id: duplicate timber id "${item.id}"`);
    }
    seen.add(item.id);
    for (const field of ['name', 'botanical', 'origin', 'colour', 'grain', 'note'] as const) {
      if (!item[field] || !item[field].trim()) {
        throw new Error(`${label}.${field}: required`);
      }
    }
    if (typeof item.jankaKn !== 'number' || !Number.isFinite(item.jankaKn) || item.jankaKn < 1 || item.jankaKn > 15) {
      throw new Error(`${label}.jankaKn: must be between 1 and 15 (got ${item.jankaKn})`);
    }
    if (!Array.isArray(item.uses) || item.uses.length === 0) {
      throw new Error(`${label}.uses: must list at least one use`);
    }
    for (const use of item.uses) {
      if (!VALID_USES.has(use)) {
        throw new Error(`${label}.uses: unknown use "${use}"`);
      }
    }
    if (!Number.isInteger(item.priceBand) || item.priceBand < 1 || item.priceBand > 4) {
      throw new Error(`${label}.priceBand: must be an integer from 1 to 4 (got ${item.priceBand})`);
    }
    if (!VALID_STOCK.has(item.stock)) {
      throw new Error(`${label}.stock: unknown stock status "${item.stock}"`);
    }
    for (const key of ['base', 'grain', 'heart'] as const) {
      if (!item.swatch?.[key] || !HEX.test(item.swatch[key])) {
        throw new Error(`${label}.swatch.${key}: must be a 6-digit hex colour (got "${item.swatch?.[key]}")`);
      }
    }
  }
}
