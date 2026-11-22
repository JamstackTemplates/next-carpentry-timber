'use client';

import { useEffect, useState } from 'react';
import type { Project } from '../content/projects';
import {
  SERVICE_CATEGORIES,
  SERVICE_CATEGORY_LABELS,
  type ServiceCategory,
} from '../content/services';
import { BookshelfIcon, CabinetIcon, ChiselIcon, DeckIcon } from './art/icons';
import { ShopDrawing } from './art/shop-drawings';
import { SiteLink } from './site-link';

type FilterValue = 'all' | ServiceCategory;

const VALID_FILTERS = new Set<string>(['all', ...SERVICE_CATEGORIES]);

function CategoryIcon({ category }: { category: ServiceCategory }) {
  switch (category) {
    case 'furniture':
      return <ChiselIcon className="size-4 shrink-0" />;
    case 'kitchens':
      return <CabinetIcon className="size-4 shrink-0" />;
    case 'decks':
      return <DeckIcon className="size-4 shrink-0" />;
    case 'built-ins':
      return <BookshelfIcon className="size-4 shrink-0" />;
  }
}

export function WorkGallery({
  projects,
  timberNames,
}: {
  projects: readonly Project[];
  timberNames: Record<string, string>;
}) {
  const [filter, setFilter] = useState<FilterValue>('all');

  useEffect(() => {
    const syncFromHash = () => {
      const hash = window.location.hash.replace(/^#/, '').toLowerCase();
      if (VALID_FILTERS.has(hash)) {
        setFilter(hash as FilterValue);
      } else if (!hash) {
        setFilter('all');
      }
    };
    syncFromHash();
    window.addEventListener('hashchange', syncFromHash);
    return () => window.removeEventListener('hashchange', syncFromHash);
  }, []);

  function selectFilter(next: FilterValue) {
    setFilter(next);
    if (typeof window !== 'undefined') {
      const nextUrl = next === 'all' ? window.location.pathname : `${window.location.pathname}#${next}`;
      window.history.replaceState(null, '', nextUrl);
    }
  }

  const visible =
    filter === 'all' ? projects : projects.filter(project => project.category === filter);

  return (
    <section aria-label="Workshop project archive">
      {/* Sticky chiselled filter bar */}
      <div className="sticky top-20 z-30 border-b border-line bg-bg/95 backdrop-blur-xs">
        <div className="wrap flex flex-wrap items-center justify-between gap-3 py-3.5">
          <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter projects by trade">
            <button
              type="button"
              className="chisel-tab"
              aria-pressed={filter === 'all'}
              onClick={() => selectFilter('all')}
            >
              All
            </button>
            {SERVICE_CATEGORIES.map(category => (
              <button
                key={category}
                type="button"
                className="chisel-tab"
                aria-pressed={filter === category}
                onClick={() => selectFilter(category)}
              >
                <CategoryIcon category={category} />
                <span>{SERVICE_CATEGORY_LABELS[category]}</span>
              </button>
            ))}
          </div>
          <p className="pencil-note text-ink" role="status" aria-live="polite">
            {visible.length} {visible.length === 1 ? 'piece' : 'pieces'}
          </p>
        </div>
      </div>

      {/* Masonry-like two-size pinned shop-drawing wall */}
      <div className="surface-graph py-12 md:py-16">
        <div className="wrap grid gap-8 md:grid-cols-12">
          {visible.map((project, index) => {
            const isLastOdd = visible.length % 2 === 1 && index === visible.length - 1;
            const isWide = index % 4 === 0 || index % 4 === 3;
            const spanClass = isLastOdd
              ? 'md:col-span-8 md:col-start-3'
              : isWide
                ? 'md:col-span-7'
                : 'md:col-span-5';
            const tiltClass =
              index % 4 === 1
                ? 'md:-rotate-[0.65deg]'
                : index % 4 === 2
                  ? 'md:rotate-[0.65deg]'
                  : index % 4 === 3
                    ? 'md:-rotate-[0.4deg]'
                    : '';

            return (
              <article
                key={project.id}
                id={project.id}
                className={`sheet p-5 sm:p-6 ${spanClass} ${tiltClass}`}
              >
                {/* Brass pin tack */}
                <span className="brass-tack absolute -top-2 left-1/2 -translate-x-1/2" aria-hidden="true" />

                <div className="flex items-start justify-between gap-3 border-b border-dashed border-line pb-3">
                  <div>
                    <p className="eyebrow">{SERVICE_CATEGORY_LABELS[project.category]}</p>
                    <h2 className="mt-1 font-display text-2xl font-bold text-ink">
                      {project.title}
                    </h2>
                  </div>
                  <div className="shrink-0 rounded-ui border border-line bg-bg px-2.5 py-1 text-right">
                    <span className="block font-display text-xs font-bold uppercase tracking-wider text-ink">
                      {project.suburb}
                    </span>
                    <span className="block font-pencil text-lg leading-none text-pencil">
                      {project.year}
                    </span>
                  </div>
                </div>

                {/* Shop drawing */}
                <div className="my-4 rounded-ui border border-line/70 bg-bg/55 p-3">
                  <ShopDrawing kind={project.drawing} spec={project.spec} />
                </div>

                <p className="text-base text-muted">{project.summary}</p>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-line/80 pt-3 text-sm">
                  <span className="font-display font-semibold text-ink">{project.spec}</span>
                  <div className="flex flex-wrap items-center gap-1.5">
                    {project.timbers.map(timberId => (
                      <SiteLink
                        key={timberId}
                        href={`/timbers/#${timberId}`}
                        className="inline-flex items-center rounded-ui border border-line bg-band/55 px-2.5 py-0.5 text-xs font-semibold text-ink no-underline hover:border-brass hover:bg-band"
                      >
                        {timberNames[timberId] ?? timberId}
                      </SiteLink>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
