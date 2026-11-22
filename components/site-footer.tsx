import { business } from '../content/business';
import { mapSearchUrl } from '../lib/maps';
import { FoldingRuleDivider } from './art/folding-rule';
import { ExternalLinkIcon, MailIcon, MapPinIcon, PhoneIcon } from './art/icons';
import { BrandStamp } from './art/workshop-art';
import { HoursTimetable } from './hours-timetable';
import { OpenBadge } from './open-badge';
import { SiteLink } from './site-link';
import { TimeZoneNote } from './time-zone-note';

export function SiteFooter() {
  return (
    <footer className="mt-0">
      <FoldingRuleDivider compact />
      <div className="surface-walnut py-14 text-fumed-ink">
        <div className="wrap grid gap-10 md:grid-cols-12">
          {/* Brand stamp & workshop note */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <BrandStamp size={88} invert className="shrink-0" />
              <div>
                <p className="font-display text-xl font-bold text-fumed-ink">{business.name}</p>
                <p className="font-pencil text-xl text-brass-soft">
                  building since {business.foundedYear}
                </p>
              </div>
            </div>
            <p className="max-w-sm text-sm text-fumed-muted">
              Custom furniture, solid-timber kitchens and hardwood decks crafted in Hobart from
              Tasmanian and Australian timbers. Serving {business.location.areaServed.join(', ')}.
            </p>
          </div>

          {/* Workshop hours timetable */}
          <div className="md:col-span-3">
            <h2 className="font-display text-base font-bold uppercase tracking-wider text-brass-soft">
              Workshop hours
            </h2>
            <div className="mt-3">
              <HoursTimetable hours={business.hours} tone="dark" />
            </div>
            <div className="mt-3">
              <OpenBadge hours={business.hours} tone="dark" />
            </div>
            <TimeZoneNote className="text-fumed-muted" />
          </div>

          {/* Contact details */}
          <div className="md:col-span-3 space-y-3 text-sm">
            <h2 className="font-display text-base font-bold uppercase tracking-wider text-brass-soft">
              Workshop &amp; enquiries
            </h2>
            <p className="flex items-start gap-2.5 text-fumed-ink">
              <MapPinIcon className="mt-0.5 size-4 shrink-0 text-brass-soft" />
              <span>
                {business.location.fullLabel}
                <span className="block text-fumed-muted">{business.location.visitsNote}</span>
              </span>
            </p>
            <p className="flex items-center gap-2.5">
              <MailIcon className="size-4 shrink-0 text-brass-soft" />
              <a
                className="text-fumed-ink underline decoration-brass-soft/60 wrap-anywhere hover:text-brass-soft"
                href={`mailto:${business.email}`}
              >
                {business.email}
              </a>
            </p>
            <p className="flex items-center gap-2.5">
              <PhoneIcon className="size-4 shrink-0 text-brass-soft" />
              <a
                className="text-fumed-ink underline decoration-brass-soft/60 hover:text-brass-soft"
                href={`tel:${business.phone.replace(/[^\d+]/g, '')}`}
              >
                {business.phone}
              </a>
            </p>
            <p className="pt-1">
              <a
                className="inline-flex items-center gap-1.5 text-brass-soft underline hover:text-fumed-ink"
                href={mapSearchUrl(business.location.mapQuery)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Open in maps</span>
                <ExternalLinkIcon className="size-3.5" />
              </a>
            </p>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer" className="md:col-span-2">
            <h2 className="font-display text-base font-bold uppercase tracking-wider text-brass-soft">
              Pages
            </h2>
            <ul className="mt-3 space-y-2 text-sm">
              <li><SiteLink href="/" className="text-fumed-ink hover:text-brass-soft">Home</SiteLink></li>
              <li><SiteLink href="/work/" className="text-fumed-ink hover:text-brass-soft">Work</SiteLink></li>
              <li><SiteLink href="/services/" className="text-fumed-ink hover:text-brass-soft">Services</SiteLink></li>
              <li><SiteLink href="/timbers/" className="text-fumed-ink hover:text-brass-soft">Timbers</SiteLink></li>
              <li><SiteLink href="/contact/" className="text-fumed-ink hover:text-brass-soft">Contact</SiteLink></li>
            </ul>
          </nav>
        </div>

        <div className="wrap mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-fumed-line pt-6 text-xs text-fumed-muted">
          <p>
            {business.name} · {business.location.label}. Prices are guide &ldquo;from&rdquo;
            figures; every commission is quoted in writing.
          </p>
          <span title="Made with love by jamstacks.net">
            with <span role="img" aria-label="love">❤️</span>{' '}
            <a
              className="text-fumed-ink no-underline hover:text-brass-soft hover:underline"
              href="https://jamstacks.net"
            >
              jamstacks.net
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
