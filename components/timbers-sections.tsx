import type { ReactNode } from 'react';
import { FoldingRuleDivider } from './art/folding-rule';
import { FinishTin, SawmillStrip } from './art/workshop-art';

type Children = { children: ReactNode };

function FinishesBandRoot({ children }: Children) {
  return (
    <section className="surface-grain border-t border-line">
      <FoldingRuleDivider compact />
      <div className="wrap py-14 md:py-20">{children}</div>
    </section>
  );
}

function FinishesHeading({ children }: Children) {
  return <h2 className="font-display text-[clamp(1.9rem,3.6vw,2.8rem)] font-bold text-ink">{children}</h2>;
}

function FinishesIntro({ children }: Children) {
  return <p className="mt-2 max-w-2xl text-lg text-ink/85">{children}</p>;
}

function FinishesShelf({ children }: Children) {
  return (
    <div className="mt-10 grid gap-6 md:grid-cols-3 md:items-end border-b-8 border-ink/55 pb-6">
      {children}
    </div>
  );
}

function FinishItem({
  kind,
  name,
  suits,
  children,
}: {
  kind: 'hardwax' | 'danish' | 'decking';
  name: string;
  suits: string;
  children: ReactNode;
}) {
  return (
    <article className="sheet flex flex-col justify-between p-5">
      <div className="flex items-start gap-4">
        <FinishTin kind={kind} className="w-20 shrink-0" />
        <div>
          <p className="pencil-note text-pencil">{suits}</p>
          <h3 className="mt-1 font-display text-2xl font-bold text-ink">{name}</h3>
        </div>
      </div>
      <p className="mt-4 text-sm text-muted">{children}</p>
    </article>
  );
}

export const FinishesBand = Object.assign(FinishesBandRoot, {
  Heading: FinishesHeading,
  Intro: FinishesIntro,
  Shelf: FinishesShelf,
  Item: FinishItem,
});

function SourcingSectionRoot({ children }: Children) {
  return (
    <section className="surface-graph border-t border-line py-14 md:py-20">
      <div className="wrap grid items-center gap-10 lg:grid-cols-12">{children}</div>
    </section>
  );
}

function SourcingCopy({ children }: Children) {
  return <div className="space-y-4 lg:col-span-6">{children}</div>;
}

function SourcingHeading({ children }: Children) {
  return <h2 className="font-display text-[clamp(1.9rem,3.6vw,2.75rem)] font-bold text-ink">{children}</h2>;
}

function SourcingArt() {
  return (
    <div className="lg:col-span-6">
      <div className="sheet p-5">
        <SawmillStrip />
      </div>
    </div>
  );
}

export const SourcingSection = Object.assign(SourcingSectionRoot, {
  Copy: SourcingCopy,
  Heading: SourcingHeading,
  Art: SourcingArt,
});
