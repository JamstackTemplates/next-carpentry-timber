import type { ReactNode } from 'react';
import { business } from '../content/business';
import { mapSearchUrl } from '../lib/maps';
import { ExternalLinkIcon, MailIcon, MapPinIcon, PencilCheckIcon, PhoneIcon } from './art/icons';
import { CopyEmail } from './copy-email';
import { HoursTimetable } from './hours-timetable';
import { OpenBadge } from './open-badge';
import { TimeZoneNote } from './time-zone-note';

export function ContactWorkspace({
  formContent,
  checklistHeading,
  enquiryNote,
}: {
  formContent: ReactNode;
  checklistHeading: ReactNode;
  enquiryNote: ReactNode;
}) {
  return (
    <section className="surface-graph py-12 md:py-16">
      <div className="wrap grid items-start gap-8 lg:grid-cols-12">
        {/* Left 7 columns: pinned paper sheet holding hosted form or email fallback */}
        <div className="sheet p-6 sm:p-8 lg:col-span-7" aria-label="Commission enquiry form">
          <span className="brass-tack absolute -top-2 left-8" aria-hidden="true" />
          {formContent}
          <p className="mt-6 border-t border-dashed border-line pt-4 text-sm text-muted">
            {enquiryNote}
          </p>
        </div>

        {/* Right 5 columns: kraft notepad checklist + contact details + hours */}
        <aside className="space-y-6 lg:col-span-5" aria-label="What to include and workshop details">
          <div className="surface-kraft relative rounded-ui p-6">
            <span className="brass-tack absolute -top-2 right-8" aria-hidden="true" />
            <p className="pencil-note text-pencil">bench checklist</p>
            <h2 className="mt-1 font-display text-2xl font-bold text-ink">{checklistHeading}</h2>
            <ul className="mt-4 space-y-2.5 text-sm text-ink/90">
              {business.enquiries.usefulToInclude.map(tip => (
                <li key={tip} className="flex items-start gap-2.5">
                  <PencilCheckIcon className="mt-0.5 size-4 shrink-0 text-accent-ink" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-ui border border-line bg-paper p-6 shadow-xs">
            <h2 className="font-display text-xl font-bold text-ink">Direct contact &amp; workshop</h2>

            <div className="mt-4 space-y-3 text-sm">
              <div className="flex items-start gap-2.5">
                <MailIcon className="mt-0.5 size-4 shrink-0 text-brass" />
                <div className="min-w-0 space-y-2">
                  <a
                    className="text-link block font-semibold wrap-anywhere"
                    href={`mailto:${business.email}`}
                  >
                    {business.email}
                  </a>
                  <div className="flex flex-wrap items-center gap-2">
                    <CopyEmail email={business.email} />
                  </div>
                </div>
              </div>

              {business.phone ? (
                <p className="flex items-center gap-2.5">
                  <PhoneIcon className="size-4 shrink-0 text-brass" />
                  <a
                    className="text-link font-semibold"
                    href={`tel:${business.phone.replace(/[^\d+]/g, '')}`}
                  >
                    {business.phone}
                  </a>
                </p>
              ) : null}

              <p className="flex items-start gap-2.5">
                <MapPinIcon className="mt-0.5 size-4 shrink-0 text-brass" />
                <span>
                  <strong className="font-semibold text-ink">{business.location.label}</strong>
                  <span className="block text-muted">{business.location.visitsNote}</span>
                  <a
                    className="text-link mt-1 inline-flex items-center gap-1 font-semibold"
                    href={mapSearchUrl(business.location.mapQuery)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>Open in maps</span>
                    <ExternalLinkIcon className="size-3.5" />
                  </a>
                </span>
              </p>
            </div>

            <div className="mt-5 border-t border-dashed border-line pt-4">
              <div className="mb-3">
                <OpenBadge hours={business.hours} />
              </div>
              <HoursTimetable hours={business.hours} />
              <TimeZoneNote />
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
