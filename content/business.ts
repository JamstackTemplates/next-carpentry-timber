import type { OpeningHours } from '../lib/hours.ts';

export interface BusinessLocation {
  /** Short public locality without a street number. */
  label: string;
  /** Locality with state and postcode for display and schema. */
  fullLabel: string;
  /** Town/city for schema.org PostalAddress. */
  locality: string;
  /** State abbreviation for schema.org PostalAddress. */
  region: string;
  /** Postcode for schema.org PostalAddress. */
  postalCode: string;
  /** Country code for schema.org PostalAddress. */
  country: string;
  /** Landmark search query passed to the keyless map link helper. */
  mapQuery: string;
  /** Visiting arrangement note shown alongside hours. */
  visitsNote: string;
  /** Regions served across Greater Hobart and southern Tasmania. */
  areaServed: readonly string[];
}

export interface Business {
  /** Public display name; also update site.config.json's name when renaming. */
  name: string;
  /** Short craft subtitle shown beside the wordmark. */
  subtitle: string;
  /** Year the workshop started building; used for the ring-count pencil note. */
  foundedYear: number;
  /** Short headline for the home page. */
  tagline: string;
  /** Plain-text description used as metadata and structured-data fallback. */
  introduction: string;
  /** Public contact address, always visible with or without the hosted form. */
  email: string;
  /** Public phone number (fictitious ACMA drama range). */
  phone: string;
  /** Workshop locality, map query and service area. */
  location: BusinessLocation;
  /** Seven weekly opening-hours entries in Australia/Hobart local time. */
  hours: readonly OpeningHours[];
  /** Contact copy; the hosted form supports name, email and message only. */
  enquiries: {
    /** Primary action and Contact page heading. */
    title: string;
    /** Plain enquiry framing; no confirmed bookings, quotes or start dates. */
    introduction: string;
    /** Reassurance shown below Contact and Services pricing. */
    replyPromise: string;
    /** Prompt list for the message box, not extra form inputs. */
    usefulToInclude: readonly string[];
  };
}

export const business: Business = {
  name: 'Heartwood Carpentry',
  subtitle: 'Joinery · Hobart',
  foundedYear: 2009,
  tagline: "Furniture, kitchens and decks, made by hand from timber that's earned its place.",
  introduction:
    'Custom furniture, kitchens and hardwood decks, made by hand in a Hobart workshop from Tasmanian oak, blackwood, myrtle and spotted gum.',
  email: 'hello@heartwoodcarpentry.example',
  phone: '(03) 5550 4127',
  location: {
    label: 'near Salamanca Place, Hobart',
    fullLabel: 'Near Salamanca Place, Hobart TAS 7000',
    locality: 'Hobart',
    region: 'TAS',
    postalCode: '7000',
    country: 'AU',
    mapQuery: 'Salamanca Place, Hobart TAS 7000, Australia',
    visitsNote: 'Visits by appointment',
    areaServed: ['Greater Hobart', 'Kingston', 'Eastern Shore', 'Huon Valley'],
  },
  hours: [
    { day: 'Monday', opens: '07:30', closes: '16:00' },
    { day: 'Tuesday', opens: '07:30', closes: '16:00' },
    { day: 'Wednesday', opens: '07:30', closes: '16:00' },
    { day: 'Thursday', opens: '07:30', closes: '16:00' },
    { day: 'Friday', opens: '07:30', closes: '16:00' },
    { day: 'Saturday', opens: '09:00', closes: '12:00' },
    { day: 'Sunday' },
  ],
  enquiries: {
    title: 'Start a commission enquiry',
    introduction:
      "Tell us what you'd like built — furniture, a kitchen, a deck, built-in joinery or a site measure. We'll reply within two working days to talk it through.",
    replyPromise:
      "We'll reply within two working days to talk it through. Every figure on this site is a \"from\" guide; no quote, price or start date is confirmed until we've measured and sent it in writing.",
    usefulToInclude: [
      "What you'd like made (table, cabinet, kitchen, deck or built-in)",
      'Rough sizes or the space it goes in',
      'A timber you like, if you have one in mind',
      'Your suburb (Greater Hobart, Kingston, Eastern Shore or Huon Valley)',
      "When you'd like it finished",
      'A rough budget range, if you have one',
      "Mention any photos or architect's plans — we'll reply with where to send them",
    ],
  },
};
