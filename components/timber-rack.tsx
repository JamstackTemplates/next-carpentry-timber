'use client';

import { useEffect, useState } from 'react';
import {
  formatPriceBand,
  TIMBER_STOCK_LABELS,
  TIMBER_USE_LABELS,
  TIMBER_USES,
  type Timber,
  type TimberUse,
} from '../content/timbers';
import { EndGrainRound } from './art/end-grain-round';
import { TimberPlankBackdrop } from './art/timber-plank';

type UseFilter = 'all' | TimberUse;
const VALID_USES = new Set<string>(['all', ...TIMBER_USES]);

const PLANK_LENGTH_CLASSES = [
  'lg:w-full',
  'lg:w-[95%]',
  'lg:w-[98%]',
  'lg:w-[93%]',
  'lg:w-[97%]',
  'lg:w-[94%]',
  'lg:w-full',
  'lg:w-[96%]',
];

export function TimberRack({ timbers }: { timbers: readonly Timber[] }) {
  const [filter, setFilter] = useState<UseFilter>('all');

  useEffect(() => {
    const syncFromHash = () => {
      const hash = window.location.hash.replace(/^#/, '').toLowerCase();
      if (VALID_USES.has(hash)) {
        setFilter(hash as UseFilter);
      } else if (!hash) {
        setFilter('all');
      }
      // Note: if hash matches a specific timber ID (e.g. #blackwood), keep filter = 'all'
      // so the anchor target stays visible and scrolls into view naturally.
    };
    syncFromHash();
    window.addEventListener('hashchange', syncFromHash);
    return () => window.removeEventListener('hashchange', syncFromHash);
  }, []);

  function selectFilter(next: UseFilter) {
    setFilter(next);
    if (typeof window !== 'undefined') {
      const nextUrl = next === 'all' ? window.location.pathname : `${window.location.pathname}#${next}`;
      window.history.replaceState(null, '', nextUrl);
    }
  }

  const visible =
    filter === 'all' ? timbers : timbers.filter(item => item.uses.includes(filter));

  return (
    <section aria-label="Workshop timber rack">
      {/* Sticky use filter bar */}
      <div className="sticky top-20 z-30 border-b border-line bg-bg/95 backdrop-blur-xs">
        <div className="wrap flex flex-wrap items-center justify-between gap-3 py-3.5">
          <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter timbers by workshop use">
            <button
              type="button"
              className="chisel-tab"
              aria-pressed={filter === 'all'}
              onClick={() => selectFilter('all')}
            >
              All species
            </button>
            {TIMBER_USES.map(use => (
              <button
                key={use}
                type="button"
                className="chisel-tab"
                aria-pressed={filter === use}
                onClick={() => selectFilter(use)}
              >
                {TIMBER_USE_LABELS[use]}
              </button>
            ))}
          </div>
          <p className="pencil-note text-ink" role="status" aria-live="polite">
            {visible.length} {visible.length === 1 ? 'species' : 'species on the rack'}
          </p>
        </div>
      </div>

      {/* Planks laid on workshop rack arms */}
      <div className="bg-bg py-12 md:py-16">
        <div className="wrap space-y-7">
          {visible.map((timber, index) => {
            const jankaPercent = Math.min(100, Math.round((timber.jankaKn / 12) * 100));
            const lengthClass = PLANK_LENGTH_CLASSES[index % PLANK_LENGTH_CLASSES.length];
            const isFiddleback = timber.id === 'blackwood' || timber.id === 'myrtle';
            const stockTone =
              timber.stock === 'in-stock'
                ? 'border-accent bg-accent text-on-accent'
                : timber.stock === 'limited'
                  ? 'border-brass bg-band text-ink'
                  : 'border-line bg-paper text-muted';

            return (
              <article
                key={timber.id}
                id={timber.id}
                className={`relative scroll-mt-32 ${lengthClass}`}
              >
                {/* Steel rack brackets underneath the board */}
                <div
                  className="pointer-events-none absolute -bottom-2.5 left-12 right-12 hidden justify-between sm:flex"
                  aria-hidden="true"
                >
                  <span className="h-2.5 w-10 rounded-b bg-ink/40" />
                  <span className="h-2.5 w-10 rounded-b bg-ink/40" />
                </div>

                {/* Full timber plank surface */}
                <div className="relative overflow-hidden rounded-ui border-2 border-ink/70 shadow-md">
                  <TimberPlankBackdrop
                    swatch={timber.swatch}
                    fiddleback={isFiddleback}
                    className="absolute inset-0 h-full w-full"
                  />

                  <div className="relative grid items-center gap-5 p-4 sm:p-5 md:grid-cols-12">
                    {/* Left end-grain round */}
                    <div className="flex items-center gap-4 md:col-span-3 md:justify-center">
                      <div className="rounded-full bg-paper/85 p-1.5 shadow-sm ring-1 ring-ink/20">
                        <EndGrainRound
                          swatch={timber.swatch}
                          seed={timber.id}
                          rings={9 + (index % 4)}
                          size={104}
                          label={`${timber.name} end-grain cross section`}
                        />
                      </div>
                      <div className="rounded-ui bg-paper/95 px-3 py-1.5 text-ink md:hidden">
                        <h2 className="font-display text-xl font-bold">{timber.name}</h2>
                        <p className="text-xs italic text-muted">{timber.botanical}</p>
                      </div>
                    </div>

                    {/* High-contrast workshop spec plate pinned to the plank */}
                    <div className="rounded-ui border border-line bg-paper/95 p-4 text-ink shadow-xs md:col-span-9 sm:p-5">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div className="hidden md:block">
                          <h2 className="font-display text-2xl font-bold text-ink">
                            {timber.name}
                          </h2>
                          <p className="text-sm italic text-muted">
                            {timber.botanical} · <span className="not-italic">{timber.origin}</span>
                          </p>
                        </div>
                        <p className="text-xs font-medium text-muted md:hidden">{timber.origin}</p>

                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className="rounded-ui border border-line bg-bg px-2.5 py-0.5 font-display text-sm font-bold text-ink"
                            title={`Price band ${timber.priceBand} of 4`}
                          >
                            {formatPriceBand(timber.priceBand)}
                          </span>
                          <span
                            className={`rounded-ui border px-2.5 py-0.5 font-display text-xs font-bold uppercase tracking-wider ${stockTone}`}
                            data-timber-stock={timber.stock}
                          >
                            {TIMBER_STOCK_LABELS[timber.stock]}
                          </span>
                        </div>
                      </div>

                      <div className="mt-3 grid gap-4 sm:grid-cols-12">
                        <div className="space-y-1.5 text-sm sm:col-span-7">
                          <p>
                            <strong className="font-semibold text-ink">Colour:</strong>{' '}
                            <span className="text-muted">{timber.colour}</span>
                          </p>
                          <p>
                            <strong className="font-semibold text-ink">Grain:</strong>{' '}
                            <span className="text-muted">{timber.grain}</span>
                          </p>
                        </div>

                        {/* Janka hardness bar (0–12 kN) & uses */}
                        <div className="space-y-3 sm:col-span-5">
                          <div>
                            <div className="flex items-baseline justify-between text-xs">
                              <span className="font-display font-semibold uppercase tracking-wider text-muted">
                                Janka hardness
                              </span>
                              <span className="font-display font-bold text-ink">
                                {timber.jankaKn.toFixed(1)} kN
                              </span>
                            </div>
                            <div
                              className="mt-1.5 h-2.5 w-full overflow-hidden rounded-full border border-line bg-bg"
                              role="img"
                              aria-label={`Janka hardness ${timber.jankaKn.toFixed(1)} kilonewtons out of 12`}
                            >
                              <div
                                className="h-full rounded-full"
                                style={{
                                  width: `${jankaPercent}%`,
                                  backgroundColor: timber.swatch.heart,
                                }}
                              />
                            </div>
                            <div className="mt-0.5 flex justify-between text-[0.7rem] text-muted">
                              <span>0</span>
                              <span>6</span>
                              <span>12 kN</span>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-1.5">
                            {timber.uses.map(use => (
                              <span
                                key={use}
                                className="rounded-ui border border-line bg-band/50 px-2 py-0.5 text-xs font-semibold text-ink"
                              >
                                {TIMBER_USE_LABELS[use]}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Maker's opinion pencilled along the foot of the board */}
                      <p className="mt-3 border-t border-dashed border-line pt-2.5 font-pencil text-2xl leading-snug text-ink">
                        &ldquo;{timber.note}&rdquo;
                      </p>
                    </div>
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
