import type { CSSProperties, ReactNode } from 'react';
import { business } from '../content/business';
import { projects } from '../content/projects';
import {
  AVAILABILITY_LABELS,
  formatFromPrice,
  formatLeadWeeks,
  HOME_TRADES,
  servicesById,
} from '../content/services';
import {
  HOME_RACK_TIMBER_IDS,
  TIMBER_STOCK_LABELS,
  timbersById,
} from '../content/timbers';
import { mapSearchUrl } from '../lib/maps';
import { asset } from '../lib/paths';
import { EndGrainRound } from './art/end-grain-round';
import { FoldingRuleDivider } from './art/folding-rule';
import {
  CabinetIcon,
  ChiselIcon,
  DeckIcon,
  ExternalLinkIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
} from './art/icons';
import { ShopDrawing } from './art/shop-drawings';
import { TimberPlankBackdrop } from './art/timber-plank';
import { BrandStamp, WorkshopSketch } from './art/workshop-art';
import { HoursTimetable } from './hours-timetable';
import { OpenBadge } from './open-badge';
import { SiteLink } from './site-link';
import { TimeZoneNote } from './time-zone-note';

type Children = { children: ReactNode };

/* ========================= 1. HOME HERO ========================= */
const heroImageSources = {
  '--hero-image-light': `url("${asset('/carpentry-light.webp')}")`,
  '--hero-image-dark': `url("${asset('/carpentry-dark.webp')}")`,
} as CSSProperties;

function HomeHeroRoot({ children }: Children) {
  return (
    <section className="surface-graph relative z-20 border-b border-line">
      <div className="wrap relative grid items-center gap-5 pt-5 pb-6 sm:pt-10 sm:pb-12 lg:grid-cols-12 lg:gap-8 lg:pt-14 lg:pb-10">
        <div className="relative z-10 lg:col-span-7">{children}</div>
        <div
          role="img"
          aria-label="Fiddleback blackwood dining table with a pegged breadboard end, a hand plane and curled wood shavings"
          style={heroImageSources}
          className="hero-photo mx-auto aspect-[75/56] w-full max-w-lg rounded-sm border border-line bg-paper bg-cover bg-center lg:col-span-5"
        />
      </div>
      <div className="sawdust-edge h-5 w-full" aria-hidden="true" />
    </section>
  );
}

function HeroEyebrow({ children }: Children) {
  return <p className="pencil-note text-pencil text-[1.5rem] sm:text-[1.65rem]">{children}</p>;
}

function HeroHeading({ children }: Children) {
  return (
    <h1 className="mt-2 max-w-[22ch] font-display text-[clamp(2.1rem,4.5vw,3.55rem)] font-bold leading-[1.06] tracking-tight text-ink">
      {children}
    </h1>
  );
}

function HeroLead({ children }: Children) {
  return <p className="mt-4 max-w-[44ch] text-base text-muted sm:mt-5 sm:text-xl">{children}</p>;
}

function HeroActions({ children }: Children) {
  return <div className="mt-5 flex flex-wrap items-center gap-3 sm:mt-7">{children}</div>;
}

function HeroPrimaryAction({ children }: Children) {
  return (
    <SiteLink href="/contact/" className="button">
      {children}
    </SiteLink>
  );
}

function HeroSecondaryAction({ children }: Children) {
  return (
    <SiteLink href="/work/" className="button button-quiet">
      {children}
    </SiteLink>
  );
}

export const HomeHero = Object.assign(HomeHeroRoot, {
  Eyebrow: HeroEyebrow,
  Heading: HeroHeading,
  Lead: HeroLead,
  Actions: HeroActions,
  PrimaryAction: HeroPrimaryAction,
  SecondaryAction: HeroSecondaryAction,
});

/* ========================= 2. THREE TRADES (HONEY-OAK PLANK BAND) ========================= */
function TradeIcon({ serviceId }: { serviceId: string }) {
  if (serviceId === 'kitchens') return <CabinetIcon className="size-6 shrink-0 text-brass" />;
  if (serviceId === 'hardwood-decks') return <DeckIcon className="size-6 shrink-0 text-brass" />;
  return <ChiselIcon className="size-6 shrink-0 text-brass" />;
}

function TradesBandRoot({ children }: Children) {
  return (
    <section className="surface-grain relative z-10 border-b border-line py-14 lg:pt-24 lg:pb-16">
      <div className="wrap">{children}</div>
    </section>
  );
}

function TradesHeader({ children }: Children) {
  return <div className="max-w-2xl">{children}</div>;
}

function TradesHeading({ children }: Children) {
  return <h2 className="font-display text-[clamp(1.9rem,3.6vw,2.85rem)] font-bold text-ink">{children}</h2>;
}

function TradesIntro({ children }: Children) {
  return <p className="mt-2.5 text-lg text-ink/85">{children}</p>;
}

const PLANK_ANGLES = ['md:-rotate-[1deg]', 'md:rotate-[0.75deg] md:ml-8', 'md:-rotate-[0.7deg] md:ml-4'];

function TradesPlanks() {
  return (
    <div className="mt-9 space-y-6">
      {HOME_TRADES.map((trade, index) => {
        const service = servicesById.get(trade.serviceId);
        const plankTimber = timbersById.get(trade.plankTimberId);
        if (!service || !plankTimber) return null;

        return (
          <SiteLink
            key={trade.serviceId}
            href={`/services/#${service.id}`}
            className={`group relative block overflow-hidden rounded-ui border-2 border-ink/75 text-ink no-underline shadow-md transition-transform duration-200 hover:-translate-y-1 hover:no-underline ${PLANK_ANGLES[index % PLANK_ANGLES.length]}`}
          >
            <TimberPlankBackdrop
              swatch={plankTimber.swatch}
              fiddleback={plankTimber.id === 'blackwood'}
              className="absolute inset-0 h-full w-full"
            />
            <div className="relative grid items-center gap-4 p-4 sm:p-5 md:grid-cols-12">
              <div className="rounded-ui border border-line bg-paper/95 p-4 md:col-span-7">
                <div className="flex items-center gap-3">
                  <TradeIcon serviceId={service.id} />
                  <h3 className="font-display text-2xl font-bold text-ink group-hover:text-accent-ink">
                    {trade.tradeTitle}
                  </h3>
                </div>
                <p className="mt-2 text-base text-muted">{trade.blurb}</p>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 rounded-ui border border-line bg-paper/95 px-4 py-3 md:col-span-5">
                <div>
                  <span className="block font-display text-xl font-bold text-ink">
                    {formatFromPrice(service.fromPrice)}
                  </span>
                  <span className="block text-xs font-semibold uppercase tracking-wider text-muted">
                    {service.priceUnit}
                  </span>
                </div>
                <div className="border-l border-dashed border-line pl-4 text-right">
                  <span className="block font-pencil text-2xl leading-none text-pencil">
                    {formatLeadWeeks(service.leadWeeks)}
                  </span>
                  <span className="mt-1 block text-xs font-semibold text-muted">
                    {AVAILABILITY_LABELS[service.availability]}
                    {service.availabilityNote ? ` · ${service.availabilityNote}` : ''}
                  </span>
                </div>
              </div>
            </div>
          </SiteLink>
        );
      })}
    </div>
  );
}

export const TradesBand = Object.assign(TradesBandRoot, {
  Header: TradesHeader,
  Heading: TradesHeading,
  Intro: TradesIntro,
  Planks: TradesPlanks,
});

/* ========================= 3. RECENT WORK (ASYMMETRIC PINNED SHEETS) ========================= */
function RecentWorkRoot({ children }: Children) {
  return (
    <section className="surface-graph border-b border-line py-14 md:py-20">
      <div className="wrap">{children}</div>
    </section>
  );
}

function RecentWorkTop({ children }: Children) {
  return <div className="flex flex-wrap items-end justify-between gap-4">{children}</div>;
}

function RecentWorkHeading({ children }: Children) {
  return <h2 className="font-display text-[clamp(1.9rem,3.6vw,2.85rem)] font-bold text-ink">{children}</h2>;
}

function RecentWorkIntro({ children }: Children) {
  return <p className="mt-2 max-w-xl text-lg text-muted">{children}</p>;
}

function RecentWorkLink({ children }: Children) {
  return (
    <SiteLink href="/work/" className="button button-quiet">
      {children}
    </SiteLink>
  );
}

function FeaturedProjectsGrid() {
  const featured = projects.filter(p => p.featured).slice(0, 3);
  const [primary, ...secondary] = featured;
  if (!primary) return null;

  return (
    <div className="mt-10 grid gap-8 lg:grid-cols-12">
      {/* Large pinned sheet on left (7 columns) */}
      <article className="sheet flex flex-col justify-between p-6 lg:col-span-7 lg:-rotate-[0.45deg]">
        <span className="brass-tack absolute -top-2 left-1/2 -translate-x-1/2" aria-hidden="true" />
        <div>
          <div className="flex items-start justify-between gap-4 border-b border-dashed border-line pb-3">
            <div>
              <p className="pencil-note text-pencil">Sheet 01 · {primary.suburb} ({primary.year})</p>
              <h3 className="mt-1 font-display text-2xl font-bold text-ink sm:text-3xl">
                <SiteLink href={`/work/#${primary.id}`} className="text-ink no-underline hover:underline">
                  {primary.title}
                </SiteLink>
              </h3>
            </div>
            <BrandStamp size={68} className="hidden shrink-0 sm:block" />
          </div>

          <div className="my-5 rounded-ui border border-line/70 bg-bg/55 p-4">
            <ShopDrawing kind={primary.drawing} spec={primary.spec} />
          </div>

          <p className="text-base text-muted">{primary.summary}</p>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-3 text-sm">
          <span className="font-display font-semibold text-ink">{primary.spec}</span>
          <div className="flex flex-wrap gap-1.5">
            {primary.timbers.map(id => (
              <SiteLink
                key={id}
                href={`/timbers/#${id}`}
                className="rounded-ui border border-line bg-band/55 px-2.5 py-0.5 text-xs font-semibold text-ink no-underline hover:border-brass hover:bg-band"
              >
                {timbersById.get(id)?.name ?? id}
              </SiteLink>
            ))}
          </div>
        </div>
      </article>

      {/* Two smaller sheets stacked on right (5 columns) */}
      <div className="grid gap-8 lg:col-span-5">
        {secondary.map((project, idx) => (
          <article
            key={project.id}
            className={`sheet p-5 ${idx === 0 ? 'lg:rotate-[0.6deg]' : 'lg:-rotate-[0.55deg]'}`}
          >
            <span className="brass-tack absolute -top-2 left-1/2 -translate-x-1/2" aria-hidden="true" />
            <div className="flex items-baseline justify-between gap-3 border-b border-dashed border-line pb-2.5">
              <h3 className="font-display text-xl font-bold text-ink">
                <SiteLink href={`/work/#${project.id}`} className="text-ink no-underline hover:underline">
                  {project.title}
                </SiteLink>
              </h3>
              <span className="shrink-0 font-pencil text-xl text-pencil">{project.suburb}</span>
            </div>

            <div className="my-3 rounded-ui border border-line/70 bg-bg/55 p-2.5">
              <ShopDrawing kind={project.drawing} spec={project.spec} className="max-h-40" />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="font-semibold text-muted">{project.spec}</span>
              <div className="flex flex-wrap gap-1">
                {project.timbers.map(id => (
                  <SiteLink
                    key={id}
                    href={`/timbers/#${id}`}
                    className="rounded-ui border border-line bg-band/55 px-2 py-0.5 font-semibold text-ink no-underline hover:border-brass"
                  >
                    {timbersById.get(id)?.name ?? id}
                  </SiteLink>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export const RecentWorkSection = Object.assign(RecentWorkRoot, {
  Top: RecentWorkTop,
  Heading: RecentWorkHeading,
  Intro: RecentWorkIntro,
  ViewAll: RecentWorkLink,
  Grid: FeaturedProjectsGrid,
});

/* ========================= 4. FROM THE RACK (DARK FUMED-OAK BAND) ========================= */
function TimberRackBandRoot({ children }: Children) {
  return (
    <section className="surface-fumed py-14 md:py-20">
      <div className="wrap">{children}</div>
    </section>
  );
}

function TimberRackHeader({ children }: Children) {
  return <div className="flex flex-wrap items-end justify-between gap-4">{children}</div>;
}

function TimberRackHeading({ children }: Children) {
  return <h2 className="font-display text-[clamp(1.9rem,3.6vw,2.85rem)] font-bold text-fumed-ink">{children}</h2>;
}

function TimberRackIntro({ children }: Children) {
  return <p className="mt-2 max-w-xl text-lg text-fumed-muted">{children}</p>;
}

function TimberRackLink({ children }: Children) {
  return (
    <SiteLink
      href="/timbers/"
      className="inline-flex min-h-11 items-center rounded-ui border border-fumed-line bg-fumed-surface px-4 py-2 font-display font-semibold text-fumed-ink no-underline hover:border-brass-soft hover:text-brass-soft"
    >
      {children}
    </SiteLink>
  );
}

const ROUND_SIZES = [144, 124, 138, 118, 148];

function TimberRackRounds() {
  const items = HOME_RACK_TIMBER_IDS.map(id => timbersById.get(id)).filter(Boolean);

  return (
    <div className="mt-10 -mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-3 md:mx-0 md:grid md:grid-cols-5 md:items-end md:overflow-visible md:px-0">
      {items.map((timber, idx) => {
        if (!timber) return null;
        const size = ROUND_SIZES[idx % ROUND_SIZES.length];
        const dotColor =
          timber.stock === 'in-stock'
            ? 'bg-[#86B049]'
            : timber.stock === 'limited'
              ? 'bg-brass-soft'
              : 'bg-fumed-muted';

        return (
          <SiteLink
            key={timber.id}
            href={`/timbers/#${timber.id}`}
            className="group flex shrink-0 snap-center flex-col items-center text-center text-fumed-ink no-underline hover:no-underline"
          >
            <div className="flex h-40 items-center justify-center">
              <EndGrainRound
                swatch={timber.swatch}
                seed={timber.id}
                rings={9 + (idx % 4)}
                size={size}
                className="drop-shadow-md transition-transform duration-200 group-hover:scale-[1.03]"
              />
            </div>
            <span className="mt-3 font-pencil text-2xl leading-none text-fumed-ink group-hover:text-brass-soft">
              {timber.name}
            </span>
            <span className="mt-1.5 inline-flex items-center gap-1.5 text-xs font-medium text-fumed-muted">
              <span className={`size-2 rounded-full ${dotColor}`} aria-hidden="true" />
              <span>{TIMBER_STOCK_LABELS[timber.stock]}</span>
              <span aria-hidden="true">·</span>
              <span>{timber.jankaKn.toFixed(1)} kN</span>
            </span>
          </SiteLink>
        );
      })}
    </div>
  );
}

export const TimberRackBand = Object.assign(TimberRackBandRoot, {
  Header: TimberRackHeader,
  Heading: TimberRackHeading,
  Intro: TimberRackIntro,
  ViewAll: TimberRackLink,
  Rounds: TimberRackRounds,
});

/* ========================= 5. HOW A COMMISSION RUNS (FOLDING RULE STEPS) ========================= */
function CommissionStepsRoot({ children }: Children) {
  return (
    <section className="surface-graph border-b border-line py-14 md:py-20">
      <div className="wrap">{children}</div>
    </section>
  );
}

function CommissionStepsHeading({ children }: Children) {
  return <h2 className="font-display text-[clamp(1.9rem,3.6vw,2.85rem)] font-bold text-ink">{children}</h2>;
}

function CommissionStepsIntro({ children }: Children) {
  return <p className="mt-2 max-w-2xl text-lg text-muted">{children}</p>;
}

function CommissionStepsTrack({ children }: Children) {
  return (
    <div className="mt-10">
      <FoldingRuleDivider className="mb-6 hidden md:block" />
      <ol className="grid gap-6 md:grid-cols-4">{children}</ol>
    </div>
  );
}

function CommissionStep({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <li className="relative rounded-ui border border-line bg-paper p-5 shadow-xs">
      <div className="flex items-center justify-between gap-2">
        <span className="font-pencil text-5xl leading-none text-pencil" aria-hidden="true">
          {number}
        </span>
        <span
          className="inline-flex size-6 items-center justify-center rounded-full border border-ink/50 bg-brass text-[0.65rem] font-bold text-on-accent"
          aria-hidden="true"
        >
          ●
        </span>
      </div>
      <h3 className="mt-3 font-display text-xl font-bold text-ink">{title}</h3>
      <p className="mt-2 text-sm text-muted">{children}</p>
    </li>
  );
}

export const CommissionSteps = Object.assign(CommissionStepsRoot, {
  Heading: CommissionStepsHeading,
  Intro: CommissionStepsIntro,
  Track: CommissionStepsTrack,
  Step: CommissionStep,
});

/* ========================= 6. VISIT THE WORKSHOP (5/7 SPLIT) ========================= */
function VisitWorkshopRoot({
  heading,
  intro,
  ctaLabel,
}: {
  heading: ReactNode;
  intro: ReactNode;
  ctaLabel: ReactNode;
}) {
  return (
    <section className="bg-bg py-14 md:py-20">
      <div className="wrap grid items-start gap-8 lg:grid-cols-12">
        {/* Left 5 columns: kraft label with hours, live badge, contact */}
        <div className="surface-kraft relative rounded-ui p-6 sm:p-7 lg:col-span-5">
          <span className="brass-tack absolute -top-2 left-6" aria-hidden="true" />
          <p className="pencil-note text-pencil">bench hours &amp; enquiries</p>
          <h2 className="mt-1 font-display text-2xl font-bold text-ink sm:text-3xl">{heading}</h2>
          <p className="mt-2 text-base text-muted">{intro}</p>

          <div className="mt-5">
            <OpenBadge hours={business.hours} />
          </div>

          <div className="mt-4">
            <HoursTimetable hours={business.hours} />
            <TimeZoneNote />
          </div>

          <div className="mt-5 space-y-2.5 border-t border-dashed border-kraft-line pt-4 text-sm">
            <p className="flex items-center gap-2.5">
              <MapPinIcon className="size-4 shrink-0 text-brass" />
              <span>
                <strong className="font-semibold text-ink">{business.location.label}</strong>
                <span className="text-muted"> · {business.location.visitsNote}</span>
              </span>
            </p>
            <p className="flex items-center gap-2.5">
              <PhoneIcon className="size-4 shrink-0 text-brass" />
              <a className="text-link font-semibold" href={`tel:${business.phone.replace(/[^\d+]/g, '')}`}>
                {business.phone}
              </a>
            </p>
            <p className="flex items-center gap-2.5">
              <MailIcon className="size-4 shrink-0 text-brass" />
              <a className="text-link wrap-anywhere font-semibold" href={`mailto:${business.email}`}>
                {business.email}
              </a>
            </p>
          </div>
        </div>

        {/* Right 7 columns: drawn workshop door sketch + maps link + primary CTA */}
        <div className="lg:col-span-7">
          <div className="sheet p-4 sm:p-6">
            <WorkshopSketch />
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1 text-sm text-muted">
              <p>
                Serving <strong className="text-ink">{business.location.areaServed.join(', ')}</strong>.
                Decks and kitchens installed on site; furniture delivered.
              </p>
              <p>
                <a
                  href={mapSearchUrl(business.location.mapQuery)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-link inline-flex items-center gap-1.5 font-semibold"
                >
                  <span>Open Salamanca Place in maps</span>
                  <ExternalLinkIcon className="size-3.5" />
                </a>
              </p>
            </div>
            <SiteLink href="/contact/" className="button">
              {ctaLabel}
            </SiteLink>
          </div>
        </div>
      </div>
    </section>
  );
}

export const VisitWorkshop = VisitWorkshopRoot;
