import { business } from '../content/business.ts';
import { services } from '../content/services.ts';
import { absoluteUrl } from './paths.ts';
import { site } from './site.ts';

/** HomeAndConstructionBusiness JSON-LD derived directly from content/ files. */
export function businessStructuredData() {
  const url = absoluteUrl('/');
  const ogImage = site.url ? `${site.url}/og.png` : undefined;
  const openingHoursSpecification = business.hours
    .filter(entry => entry.opens && entry.closes)
    .map(entry => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: `https://schema.org/${entry.day}`,
      opens: entry.opens,
      closes: entry.closes,
    }));

  const makesOffer = services.map(service => ({
    '@type': 'Offer',
    name: service.name,
    url: absoluteUrl(`/services/#${service.id}`),
    itemOffered: {
      '@type': 'Service',
      name: service.name,
      description: service.summary,
    },
    priceSpecification: {
      '@type': 'PriceSpecification',
      minPrice: service.fromPrice,
      priceCurrency: 'AUD',
      unitText: service.priceUnit,
    },
  }));

  return {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    name: business.name,
    description: business.introduction,
    email: business.email,
    ...(business.phone ? { telephone: business.phone } : {}),
    ...(url ? { url } : {}),
    ...(ogImage ? { image: ogImage } : {}),
    address: {
      '@type': 'PostalAddress',
      addressLocality: business.location.locality,
      addressRegion: business.location.region,
      postalCode: business.location.postalCode,
      addressCountry: business.location.country,
    },
    areaServed: business.location.areaServed.map(name => ({
      '@type': 'AdministrativeArea',
      name,
    })),
    openingHoursSpecification,
    makesOffer,
  };
}

/** Prevent content containing a closing script tag from escaping JSON-LD. */
export function jsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}
