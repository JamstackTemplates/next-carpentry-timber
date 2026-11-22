import type { Service, ServiceCategory } from './services.ts';

export type ProjectDrawing =
  | 'table'
  | 'sideboard'
  | 'kitchen'
  | 'deck'
  | 'bookwall'
  | 'chest'
  | 'window-seat'
  | 'island';

export interface Project {
  /** Stable, lowercase, URL-safe identifier. */
  id: string;
  /** Project title stamped on the shop-drawing sheet. */
  title: string;
  /** Must match the referenced service's category. */
  category: ServiceCategory;
  /** Reference to a service ID in content/services.ts. */
  service: string;
  /** One or more timber IDs from content/timbers.ts. */
  timbers: readonly string[];
  /** Completion year (2015–current year). */
  year: number;
  /** Hobart or Huon Valley suburb. */
  suburb: string;
  /** Key dimensions or area stamped on the drawing. */
  spec: string;
  /** One or two sentences describing the piece and joinery. */
  summary: string;
  /** Which inline SVG shop drawing renders on the sheet. */
  drawing: ProjectDrawing;
  /** Exactly three projects must be featured for the Home page. */
  featured: boolean;
}

export const PROJECT_DRAWINGS: readonly ProjectDrawing[] = [
  'table',
  'sideboard',
  'kitchen',
  'deck',
  'bookwall',
  'chest',
  'window-seat',
  'island',
] as const;

/**
 * Workshop archive. Adding a new entry here automatically publishes it on /work/
 * and under its matching category filter. Keep exactly three projects marked `featured: true`.
 */
export const projects: readonly Project[] = [
  {
    id: 'sandy-bay-table',
    title: 'Fiddleback blackwood dining table',
    category: 'furniture',
    service: 'dining-tables',
    timbers: ['blackwood'],
    year: 2025,
    suburb: 'Sandy Bay',
    spec: '2400 × 1000 mm, seats 10',
    summary:
      'Four wide quartersawn boards matched from a single north-west flitch, pinned into breadboard ends with drawbored blackwood pegs.',
    drawing: 'table',
    featured: true,
  },
  {
    id: 'battery-point-kitchen',
    title: 'Cottage kitchen in oak and celery-top',
    category: 'kitchens',
    service: 'kitchens',
    timbers: ['tasmanian-oak', 'celery-top-pine'],
    year: 2025,
    suburb: 'Battery Point',
    spec: '5.2 m run with 2.1 m island',
    summary:
      'Inset-framed Tasmanian oak doors paired with calm celery-top pine uppers and dovetailed pantry drawers scribed to 1880s brickwork.',
    drawing: 'kitchen',
    featured: true,
  },
  {
    id: 'kingston-deck',
    title: 'Wraparound spotted gum deck',
    category: 'decks',
    service: 'hardwood-decks',
    timbers: ['spotted-gum'],
    year: 2024,
    suburb: 'Kingston Beach',
    spec: '46 m², three steps',
    summary:
      'Wide 135 mm spotted gum boards laid on hidden stainless clips, wrapping the sunny corner with three broad picture-framed steps.',
    drawing: 'deck',
    featured: true,
  },
  {
    id: 'north-hobart-bookwall',
    title: 'Library bookwall with rolling ladder',
    category: 'built-ins',
    service: 'built-in-joinery',
    timbers: ['tasmanian-oak'],
    year: 2024,
    suburb: 'North Hobart',
    spec: '4.6 × 2.9 m',
    summary:
      'Full-height stopped-dado shelving in regrowth Tasmanian oak, topped with a solid brass rail and custom-fitted rolling ladder.',
    drawing: 'bookwall',
    featured: false,
  },
  {
    id: 'huon-pine-chest',
    title: 'Salvaged Huon pine blanket box',
    category: 'furniture',
    service: 'cabinets-sideboards',
    timbers: ['huon-pine'],
    year: 2023,
    suburb: 'Cygnet',
    spec: '1100 × 480 × 520 mm',
    summary:
      'Hand-cut through dovetails on all four corners with an unvarnished aromatic interior, sliding candle till and brass stay hinges.',
    drawing: 'chest',
    featured: false,
  },
  {
    id: 'myrtle-sideboard',
    title: 'Myrtle sideboard, blackwood doors',
    category: 'furniture',
    service: 'cabinets-sideboards',
    timbers: ['myrtle', 'blackwood'],
    year: 2024,
    suburb: 'West Hobart',
    spec: '1800 × 450 × 800 mm',
    summary:
      'Mitred red myrtle case housing bookmatched sliding blackwood doors on waxed timber tracks, raised on wedged mortise-and-tenon legs.',
    drawing: 'sideboard',
    featured: false,
  },
  {
    id: 'lenah-valley-deck',
    title: 'Silvertop ash deck and stair',
    category: 'decks',
    service: 'hardwood-decks',
    timbers: ['silvertop-ash'],
    year: 2023,
    suburb: 'Lenah Valley',
    spec: '28 m², 9-tread stair',
    summary:
      'Elevated bush-edge deck in BAL-rated silvertop ash with housed stringers, open risers and an integrated bench along the western rail.',
    drawing: 'deck',
    featured: false,
  },
  {
    id: 'west-hobart-window-seat',
    title: 'Bay window seat with drawers',
    category: 'built-ins',
    service: 'built-in-joinery',
    timbers: ['sassafras'],
    year: 2025,
    suburb: 'West Hobart',
    spec: '2.4 m bay, three drawers',
    summary:
      'Angled alcove bench scribed cleanly to the bay walls, with three deep blackheart sassafras drawers showing continuous horizontal grain.',
    drawing: 'window-seat',
    featured: false,
  },
  {
    id: 'huonville-island',
    title: 'Farmhouse island with end-grain block',
    category: 'kitchens',
    service: 'kitchens',
    timbers: ['tasmanian-oak', 'blackwood'],
    year: 2022,
    suburb: 'Huonville',
    spec: '2600 × 1100 mm',
    summary:
      'Freestanding prep island with a 75 mm end-grain blackwood chopping block inset on one end and a slatted Tasmanian oak pot shelf below.',
    drawing: 'island',
    featured: false,
  },
];

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const VALID_DRAWINGS = new Set<string>(PROJECT_DRAWINGS);

/** Validates projects, their references and featured count with item- and field-specific errors. */
export function validateProjects(
  items: readonly Project[],
  servicesMap: ReadonlyMap<string, Service>,
  timberIds: ReadonlySet<string>,
  currentYear = new Date().getFullYear(),
): void {
  if (items.length === 0) throw new Error('projects: at least one project is required');
  const seen = new Set<string>();
  let featuredCount = 0;

  for (const item of items) {
    const label = `projects[${item.id || '?'}]`;
    if (!item.id || !SLUG.test(item.id)) {
      throw new Error(`${label}.id: must be lowercase and URL-safe`);
    }
    if (seen.has(item.id)) {
      throw new Error(`${label}.id: duplicate project id "${item.id}"`);
    }
    seen.add(item.id);
    for (const field of ['title', 'suburb', 'spec', 'summary'] as const) {
      if (!item[field] || !item[field].trim()) {
        throw new Error(`${label}.${field}: required`);
      }
    }
    const service = servicesMap.get(item.service);
    if (!service) {
      throw new Error(`${label}.service: unknown service "${item.service}"`);
    }
    if (item.category !== service.category) {
      throw new Error(
        `${label}.category: "${item.category}" does not match service "${item.service}" category "${service.category}"`,
      );
    }
    if (!Array.isArray(item.timbers) || item.timbers.length === 0) {
      throw new Error(`${label}.timbers: must reference at least one timber`);
    }
    for (const timberId of item.timbers) {
      if (!timberIds.has(timberId)) {
        throw new Error(`${label}.timbers: unknown timber "${timberId}"`);
      }
    }
    if (!Number.isInteger(item.year) || item.year < 2015 || item.year > currentYear) {
      throw new Error(`${label}.year: must be an integer between 2015 and ${currentYear} (got ${item.year})`);
    }
    if (!VALID_DRAWINGS.has(item.drawing)) {
      throw new Error(`${label}.drawing: unknown drawing "${item.drawing}"`);
    }
    if (typeof item.featured !== 'boolean') {
      throw new Error(`${label}.featured: must be a boolean`);
    }
    if (item.featured) featuredCount++;
  }

  if (featuredCount !== 3) {
    throw new Error(`projects: expected exactly 3 featured projects (found ${featuredCount})`);
  }
}
