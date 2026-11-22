import type { ReactNode } from 'react';
import { PageHeadArt } from './art/workshop-art';

/**
 * Split inner-page header on shop-drawing paper:
 * large Zilla Slab heading and pencilled margin note on the left,
 * cropped workshop artwork on the right.
 */
export function PageHead({
  pencilNote,
  title,
  art,
  children,
  id,
}: {
  pencilNote: string;
  title: ReactNode;
  art: 'work' | 'services' | 'timbers' | 'contact';
  children?: ReactNode;
  id?: string;
}) {
  return (
    <header className="surface-graph border-b border-line">
      <div className="wrap grid items-center gap-6 py-10 md:grid-cols-12 md:py-14">
        <div className="md:col-span-7">
          <p className="pencil-note text-pencil">{pencilNote}</p>
          <h1
            id={id}
            className="mt-2 font-display text-[clamp(2.4rem,5.5vw,4.1rem)] font-bold tracking-tight text-ink"
          >
            {title}
          </h1>
          {children ? (
            <div className="mt-4 max-w-(--measure) text-lg text-muted">{children}</div>
          ) : null}
        </div>
        <div className="md:col-span-5">
          <PageHeadArt variant={art} />
        </div>
      </div>
    </header>
  );
}
