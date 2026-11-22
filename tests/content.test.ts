import assert from 'node:assert/strict';
import { test } from 'node:test';
import { business } from '../content/business.ts';
import { projects, validateProjects } from '../content/projects.ts';
import {
  formatFromPrice,
  formatLeadWeeks,
  HOME_TRADES,
  services,
  servicesById,
  validateServices,
} from '../content/services.ts';
import { HOME_RACK_TIMBER_IDS, timbers, timbersById, validateTimbers } from '../content/timbers.ts';
import { validateHours } from '../lib/hours.ts';
import { businessStructuredData, jsonLd } from '../lib/structured-data.ts';

const timberIds = new Set(timbers.map(item => item.id));

test('business content has actionable required fields and valid hours', () => {
  for (const key of ['name', 'tagline', 'introduction', 'email', 'phone'] as const) {
    assert.ok(business[key].trim(), `business.${key}: required`);
  }
  assert.match(business.email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'business.email: valid public email required');
  assert.ok(business.location.label.trim(), 'business.location.label: required');
  assert.ok(business.location.areaServed.length >= 3, 'business.location.areaServed: list regions');
  assert.doesNotThrow(() => validateHours(business.hours));
  assert.ok(business.enquiries.title.trim(), 'business.enquiries.title: required');
  assert.ok(business.enquiries.introduction.trim(), 'business.enquiries.introduction: required');
  assert.ok(business.enquiries.replyPromise.includes('two working days'));
  assert.ok(business.enquiries.usefulToInclude.length >= 5, 'business.enquiries.usefulToInclude: include message guidance');
  for (const tip of business.enquiries.usefulToInclude) {
    assert.ok(tip.trim(), 'business.enquiries.usefulToInclude: empty tip');
  }
});

test('timbers collection validates and catches item-specific errors', () => {
  assert.equal(timbers.length, 8);
  assert.doesNotThrow(() => validateTimbers(timbers));
  for (const id of HOME_RACK_TIMBER_IDS) {
    assert.ok(timbersById.has(id), `HOME_RACK_TIMBER_IDS: unknown timber "${id}"`);
  }

  // Duplicate ID
  assert.throws(
    () => validateTimbers([...timbers, timbers[0]]),
    /timbers\[tasmanian-oak\]\.id: duplicate/,
  );
  // Out-of-range Janka
  assert.throws(
    () => validateTimbers(timbers.map(t => (t.id === 'huon-pine' ? { ...t, jankaKn: 20 } : t))),
    /timbers\[huon-pine\]\.jankaKn/,
  );
  // Invalid price band
  assert.throws(
    () => validateTimbers(timbers.map(t => (t.id === 'myrtle' ? { ...t, priceBand: 5 as never } : t))),
    /timbers\[myrtle\]\.priceBand/,
  );
  // Invalid hex swatch
  assert.throws(
    () =>
      validateTimbers(
        timbers.map(t =>
          t.id === 'blackwood' ? { ...t, swatch: { ...t.swatch, heart: 'brown' } } : t,
        ),
      ),
    /timbers\[blackwood\]\.swatch\.heart/,
  );
  // Empty uses
  assert.throws(
    () => validateTimbers(timbers.map(t => (t.id === 'sassafras' ? { ...t, uses: [] } : t))),
    /timbers\[sassafras\]\.uses/,
  );
});

test('services collection validates prices, lead times, availability and timber links', () => {
  assert.equal(services.length, 6);
  assert.doesNotThrow(() => validateServices(services, timberIds));
  assert.equal(formatFromPrice(28000), 'from $28,000');
  assert.equal(formatFromPrice(640), 'from $640');
  assert.equal(formatLeadWeeks([8, 10]), '8–10 weeks');

  for (const trade of HOME_TRADES) {
    assert.ok(servicesById.has(trade.serviceId), `HOME_TRADES: unknown service "${trade.serviceId}"`);
    assert.ok(timbersById.has(trade.plankTimberId), `HOME_TRADES: unknown timber "${trade.plankTimberId}"`);
  }

  // Restoration allows empty timbers list
  assert.deepEqual(servicesById.get('restoration')?.timbers, []);

  // Unknown timber reference names the service and field
  assert.throws(
    () =>
      validateServices(
        services.map(s => (s.id === 'hardwood-decks' ? { ...s, timbers: ['merbau'] } : s)),
        timberIds,
      ),
    /services\[hardwood-decks\]\.timbers: unknown timber "merbau"/,
  );

  // Non-integer / non-positive price
  assert.throws(
    () =>
      validateServices(
        services.map(s => (s.id === 'dining-tables' ? { ...s, fromPrice: 0 } : s)),
        timberIds,
      ),
    /services\[dining-tables\]\.fromPrice/,
  );

  // Reversed or out-of-range lead weeks
  assert.throws(
    () =>
      validateServices(
        services.map(s => (s.id === 'kitchens' ? { ...s, leadWeeks: [18, 12] as const } : s)),
        timberIds,
      ),
    /services\[kitchens\]\.leadWeeks/,
  );
  assert.throws(
    () =>
      validateServices(
        services.map(s => (s.id === 'kitchens' ? { ...s, leadWeeks: [2, 60] as const } : s)),
        timberIds,
      ),
    /services\[kitchens\]\.leadWeeks/,
  );
});

test('projects collection validates references, categories and featured count', () => {
  assert.equal(projects.length, 9);
  assert.doesNotThrow(() => validateProjects(projects, servicesById, timberIds, 2026));

  // Unknown timber names item & field exactly
  assert.throws(
    () =>
      validateProjects(
        projects.map(p => (p.id === 'kingston-deck' ? { ...p, timbers: ['merbau'] } : p)),
        servicesById,
        timberIds,
        2026,
      ),
    /projects\[kingston-deck\]\.timbers: unknown timber "merbau"/,
  );

  // Unknown service
  assert.throws(
    () =>
      validateProjects(
        projects.map(p => (p.id === 'sandy-bay-table' ? { ...p, service: 'benches' } : p)),
        servicesById,
        timberIds,
        2026,
      ),
    /projects\[sandy-bay-table\]\.service: unknown service "benches"/,
  );

  // Category mismatch with service
  assert.throws(
    () =>
      validateProjects(
        projects.map(p => (p.id === 'kingston-deck' ? { ...p, category: 'furniture' } : p)),
        servicesById,
        timberIds,
        2026,
      ),
    /projects\[kingston-deck\]\.category/,
  );

  // Featured count must be exactly 3
  assert.throws(
    () =>
      validateProjects(
        projects.map(p => (p.id === 'kingston-deck' ? { ...p, featured: false } : p)),
        servicesById,
        timberIds,
        2026,
      ),
    /expected exactly 3 featured projects/,
  );

  // Adding a 10th non-featured project passes validation
  const withTenth = [
    ...projects,
    {
      id: 'bellerive-console',
      title: 'Blackwood hallway console',
      category: 'furniture' as const,
      service: 'cabinets-sideboards',
      timbers: ['blackwood'],
      year: 2025,
      suburb: 'Bellerive',
      spec: '1400 × 360 × 780 mm',
      summary: 'Slim tapered hallway console with two shallow dovetailed key drawers.',
      drawing: 'sideboard' as const,
      featured: false,
    },
  ];
  assert.doesNotThrow(() => validateProjects(withTenth, servicesById, timberIds, 2026));
});

test('frequent owner edits validate cleanly', () => {
  const editedTimbers = timbers.map(t =>
    t.id === 'huon-pine' ? { ...t, stock: 'by-order' as const } : t,
  );
  const editedServices = services.map(s =>
    s.id === 'kitchens'
      ? { ...s, availability: 'booking' as const, leadWeeks: [12, 16] as const, availabilityNote: undefined }
      : s,
  );
  assert.doesNotThrow(() => validateTimbers(editedTimbers));
  assert.doesNotThrow(() => validateServices(editedServices, timberIds));
});

test('HomeAndConstructionBusiness JSON-LD derives from content and escapes script tags', () => {
  const data = businessStructuredData();
  assert.equal(data['@type'], 'HomeAndConstructionBusiness');
  assert.equal(data.name, business.name);
  assert.equal(data.email, business.email);
  assert.equal(data.telephone, business.phone);
  assert.equal(data.openingHoursSpecification.length, 6);
  assert.equal(data.areaServed.length, business.location.areaServed.length);
  assert.equal(data.makesOffer.length, services.length);
  assert.equal(data.makesOffer[0].priceSpecification.priceCurrency, 'AUD');

  const malicious = { name: '</script><script>alert(1)</script>', text: '< & >' };
  const encoded = jsonLd(malicious);
  assert.ok(!encoded.includes('<'), 'JSON-LD must escape <');
  assert.deepEqual(JSON.parse(encoded), malicious);
});
