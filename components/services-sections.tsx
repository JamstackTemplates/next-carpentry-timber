import type { ReactNode } from 'react';
import {
  AVAILABILITY_LABELS,
  formatFromPrice,
  formatLeadWeeks,
  services,
} from '../content/services';
import { timbersById } from '../content/timbers';
import { EndGrainRound } from './art/end-grain-round';
import { FoldingRuleDivider, LeadTimeRule } from './art/folding-rule';
import { SiteLink } from './site-link';

type Children = { children: ReactNode };

/* ========================= CUTTING LIST JOB SHEET ========================= */
function CuttingListRoot({ children }: Children) {
  return (
    <section className="surface-graph py-12 md:py-16">
      <div className="wrap">{children}</div>
    </section>
  );
}

function CuttingListHeading({ children }: Children) {
  return <h2 className="font-display text-[clamp(1.8rem,3.2vw,2.5rem)] font-bold text-ink">{children}</h2>;
}

function CuttingListIntro({ children }: Children) {
  return <p className="mt-2 max-w-2xl text-base text-muted sm:text-lg">{children}</p>;
}

function CuttingListSheet() {
  return (
    <div className="mt-8 overflow-hidden rounded-ui border-2 border-ink/70 bg-paper shadow-md">
      {/* Desktop ruled header bar */}
      <div className="hidden border-b-2 border-ink/70 bg-band/70 px-6 py-3 font-display text-xs font-bold uppercase tracking-widest text-ink lg:grid lg:grid-cols-12 lg:gap-4">
        <span className="lg:col-span-4">Piece &amp; what&rsquo;s included</span>
        <span className="lg:col-span-2">Timbers</span>
        <span className="lg:col-span-2">Guide price</span>
        <span className="lg:col-span-2">Lead time (0–20w)</span>
        <span className="lg:col-span-2 text-right">Status</span>
      </div>

      <div className="divide-y divide-line">
        {services.map((service, idx) => {
          const stampColor =
            service.availability === 'booking'
              ? 'text-accent-ink border-accent-ink'
              : service.availability === 'waitlist'
                ? 'text-brass border-brass'
                : 'text-pencil border-pencil';

          return (
            <article
              key={service.id}
              id={service.id}
              className="grid scroll-mt-28 gap-5 px-5 py-6 sm:px-6 lg:grid-cols-12 lg:items-start lg:gap-4"
            >
              {/* Column 1: Piece & includes */}
              <div className="lg:col-span-4">
                <div className="flex items-baseline gap-2.5">
                  <span className="font-pencil text-2xl leading-none text-pencil">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-display text-2xl font-bold text-ink">{service.name}</h3>
                </div>
                <p className="mt-2 text-sm text-muted">{service.summary}</p>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-ink/90">
                  {service.includes.map(item => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* Column 2: Suitable timbers */}
              <div className="lg:col-span-2">
                <p className="eyebrow mb-1.5 lg:hidden">Suitable timbers</p>
                {service.timbers.length === 0 ? (
                  <p className="font-pencil text-2xl leading-tight text-muted">
                    Matched to the piece
                  </p>
                ) : (
                  <div className="flex flex-wrap gap-1.5">
                    {service.timbers.map(timberId => (
                      <SiteLink
                        key={timberId}
                        href={`/timbers/#${timberId}`}
                        className="rounded-ui border border-line bg-band/45 px-2.5 py-0.5 text-xs font-semibold text-ink no-underline hover:border-brass hover:bg-band"
                      >
                        {timbersById.get(timberId)?.name ?? timberId}
                      </SiteLink>
                    ))}
                  </div>
                )}
              </div>

              {/* Column 3: From price */}
              <div className="lg:col-span-2">
                <p className="eyebrow mb-1 lg:hidden">Guide price</p>
                <p className="font-display text-2xl font-bold text-ink">
                  {formatFromPrice(service.fromPrice)}
                </p>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                  {service.priceUnit}
                </p>
              </div>

              {/* Column 4: Lead time on folding rule scale */}
              <div className="lg:col-span-2">
                <p className="eyebrow mb-1 lg:hidden">Typical lead time</p>
                <p className="mb-1.5 font-display text-sm font-bold text-ink">
                  {formatLeadWeeks(service.leadWeeks)}
                </p>
                <LeadTimeRule leadWeeks={service.leadWeeks} />
              </div>

              {/* Column 5: Availability rubber stamp */}
              <div className="flex flex-col items-start gap-2 lg:col-span-2 lg:items-end lg:text-right">
                <span
                  className={`stamp-badge ${stampColor}`}
                  data-service-availability={service.availability}
                >
                  {AVAILABILITY_LABELS[service.availability]}
                </span>
                {service.availabilityNote ? (
                  <p className="font-pencil text-xl leading-tight text-muted">
                    {service.availabilityNote}
                  </p>
                ) : null}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

export const CuttingListSection = Object.assign(CuttingListRoot, {
  Heading: CuttingListHeading,
  Intro: CuttingListIntro,
  Sheet: CuttingListSheet,
});

/* ========================= 5-STEP PROCESS ON VERTICAL RULE ========================= */
function ProcessBandRoot({ children }: Children) {
  return (
    <section className="surface-grain border-y border-line py-14 md:py-20">
      <div className="wrap">{children}</div>
    </section>
  );
}

function ProcessHeading({ children }: Children) {
  return <h2 className="font-display text-[clamp(1.9rem,3.6vw,2.8rem)] font-bold text-ink">{children}</h2>;
}

function ProcessIntro({ children }: Children) {
  return <p className="mt-2 max-w-2xl text-lg text-ink/85">{children}</p>;
}

function ProcessList({ children }: Children) {
  return (
    <ol className="relative mt-10 space-y-6 before:absolute before:top-2 before:bottom-2 before:left-5 before:w-2 before:rounded-full before:border before:border-ink/40 before:bg-brass/70 md:before:left-1/2 md:before:-translate-x-1/2">
      {children}
    </ol>
  );
}

function ProcessStep({
  number,
  title,
  side,
  children,
}: {
  number: string;
  title: string;
  side: 'left' | 'right';
  children: ReactNode;
}) {
  const desktopPlacement =
    side === 'left'
      ? 'md:w-[calc(50%-2.25rem)] md:mr-auto'
      : 'md:w-[calc(50%-2.25rem)] md:ml-auto';

  return (
    <li className="relative pl-14 md:pl-0">
      {/* Brass hinge rivet marker on the vertical rule */}
      <span
        className="absolute top-5 left-2.5 flex size-7 items-center justify-center rounded-full border-2 border-ink bg-brass font-display text-xs font-bold text-on-accent md:left-1/2 md:-translate-x-1/2"
        aria-hidden="true"
      >
        {number}
      </span>
      <div className={`sheet p-5 ${desktopPlacement}`}>
        <p className="pencil-note text-pencil">Step {number}</p>
        <h3 className="mt-0.5 font-display text-xl font-bold text-ink">{title}</h3>
        <p className="mt-2 text-sm text-muted">{children}</p>
      </div>
    </li>
  );
}

export const ProcessBand = Object.assign(ProcessBandRoot, {
  Heading: ProcessHeading,
  Intro: ProcessIntro,
  List: ProcessList,
  Step: ProcessStep,
});

/* ========================= WHAT SHAPES THE PRICE (RADIAL END-GRAIN LAYOUT) ========================= */
export interface PriceFactor {
  number: string;
  title: string;
  detail: string;
}

export function PriceFactorsRadial({
  heading,
  intro,
  factors,
}: {
  heading: ReactNode;
  intro: ReactNode;
  factors: readonly PriceFactor[];
}) {
  const [f1, f2, f3, f4, f5] = factors;

  const renderFactor = (factor: PriceFactor | undefined) =>
    factor ? (
      <div className="rounded-ui border border-line bg-paper p-4 shadow-xs">
        <div className="flex items-baseline gap-2.5">
          <span className="font-pencil text-3xl leading-none text-pencil">{factor.number}</span>
          <h3 className="font-display text-lg font-bold text-ink">{factor.title}</h3>
        </div>
        <p className="mt-1.5 text-sm text-muted">{factor.detail}</p>
      </div>
    ) : null;

  return (
    <section className="surface-graph border-b border-line py-14 md:py-20">
      <div className="wrap">
        <div className="max-w-2xl">
          <h2 className="font-display text-[clamp(1.9rem,3.6vw,2.8rem)] font-bold text-ink">
            {heading}
          </h2>
          <p className="mt-2 text-lg text-muted">{intro}</p>
        </div>

        {/* Radial around end-grain slab on desktop, clean vertical list on mobile */}
        <div className="mt-10 grid gap-6 lg:grid-cols-12 lg:items-center">
          <div className="space-y-6 lg:col-span-4">
            {renderFactor(f1)}
            {renderFactor(f2)}
          </div>

          <div className="hidden flex-col items-center justify-center lg:col-span-4 lg:flex">
            <EndGrainRound
              seed="price-factors-slab"
              rings={12}
              size={220}
              swatch={{ base: '#E4C592', grain: '#9E6E38', heart: '#653C1D' }}
            />
            <p className="pencil-note mt-2 text-center text-muted">
              written fixed quote before any cut
            </p>
          </div>

          <div className="space-y-6 lg:col-span-4">
            {renderFactor(f3)}
            {renderFactor(f4)}
          </div>

          <div className="lg:col-span-6 lg:col-start-4">{renderFactor(f5)}</div>
        </div>
      </div>
    </section>
  );
}

/* ========================= FAQ ACCORDION (<details> WITH CHISEL MARKER) ========================= */
function FaqSectionRoot({ children }: Children) {
  return (
    <section className="bg-bg py-14 md:py-20" aria-labelledby="services-faq-heading">
      <div className="wrap grid gap-8 lg:grid-cols-12">
        {children}
      </div>
    </section>
  );
}

function FaqAside({ children }: Children) {
  return <div className="lg:col-span-4">{children}</div>;
}

function FaqHeading({ children }: Children) {
  return (
    <h2 id="services-faq-heading" className="font-display text-[clamp(1.85rem,3.2vw,2.5rem)] font-bold text-ink">
      {children}
    </h2>
  );
}

function FaqIntro({ children }: Children) {
  return <p className="mt-3 text-base text-muted">{children}</p>;
}

function FaqList({ children }: Children) {
  return <div className="lg:col-span-8">{children}</div>;
}

function FaqItem({ question, children }: { question: string; children: ReactNode }) {
  return (
    <details className="faq-item">
      <summary className="faq-summary">{question}</summary>
      <div className="px-4 pb-5 pl-11 text-base text-muted">{children}</div>
    </details>
  );
}

export const FaqSection = Object.assign(FaqSectionRoot, {
  Aside: FaqAside,
  Heading: FaqHeading,
  Intro: FaqIntro,
  List: FaqList,
  Item: FaqItem,
});

export { FoldingRuleDivider };
