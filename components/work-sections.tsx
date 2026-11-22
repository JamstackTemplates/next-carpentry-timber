import type { ReactNode } from 'react';
import { FoldingRuleDivider } from './art/folding-rule';
import { JointDrawing, type JointKind } from './art/joint-drawings';
import { SiteLink } from './site-link';

type Children = { children: ReactNode };

function JoinerySectionRoot({ children }: Children) {
  return (
    <section className="bg-bg">
      <FoldingRuleDivider />
      <div className="wrap py-14 md:py-20">{children}</div>
    </section>
  );
}

function JoineryHeading({ children }: Children) {
  return <h2 className="font-display text-[clamp(1.9rem,3.6vw,2.8rem)] font-bold text-ink">{children}</h2>;
}

function JoineryIntro({ children }: Children) {
  return <p className="mt-2 max-w-2xl text-lg text-muted">{children}</p>;
}

function JoineryRows({ children }: Children) {
  return <div className="mt-10 space-y-10">{children}</div>;
}

function JoineryRow({
  kind,
  note,
  title,
  reverse = false,
  children,
}: {
  kind: JointKind;
  note: string;
  title: string;
  reverse?: boolean;
  children: ReactNode;
}) {
  return (
    <article className="grid items-center gap-6 border-t border-line pt-8 md:grid-cols-12 md:gap-10">
      <div className={`md:col-span-6 ${reverse ? 'md:order-2' : ''}`}>
        <div className="sheet p-4">
          <JointDrawing kind={kind} />
        </div>
      </div>
      <div className={`md:col-span-6 ${reverse ? 'md:order-1' : ''}`}>
        <p className="pencil-note text-pencil">{note}</p>
        <h3 className="mt-1 font-display text-2xl font-bold text-ink">{title}</h3>
        <p className="mt-3 text-base text-muted">{children}</p>
      </div>
    </article>
  );
}

export const JoinerySection = Object.assign(JoinerySectionRoot, {
  Heading: JoineryHeading,
  Intro: JoineryIntro,
  Rows: JoineryRows,
  Row: JoineryRow,
});

export function ClosingGrainCta({
  pencilNote,
  heading,
  body,
  actionLabel,
}: {
  pencilNote: string;
  heading: ReactNode;
  body: ReactNode;
  actionLabel: ReactNode;
}) {
  return (
    <section className="surface-grain border-t border-line py-14 md:py-16">
      <div className="wrap flex flex-wrap items-center justify-between gap-6">
        <div className="max-w-2xl">
          <p className="pencil-note text-pencil">{pencilNote}</p>
          <h2 className="mt-1 font-display text-[clamp(1.85rem,3.4vw,2.65rem)] font-bold text-ink">
            {heading}
          </h2>
          <p className="mt-2 text-lg text-ink/85">{body}</p>
        </div>
        <SiteLink href="/contact/" className="button">
          {actionLabel}
        </SiteLink>
      </div>
    </section>
  );
}
