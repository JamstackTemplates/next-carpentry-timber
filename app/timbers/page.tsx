import type { Metadata } from 'next';
import { PageHead } from '../../components/page-head';
import { TimberRack } from '../../components/timber-rack';
import { FinishesBand, SourcingSection } from '../../components/timbers-sections';
import { timbers } from '../../content/timbers';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Timbers',
  description:
    'Eight Tasmanian and Australian timbers on our Hobart rack — Tasmanian oak, blackwood, myrtle, blackheart sassafras, Huon pine, celery-top pine, spotted gum and silvertop ash.',
  alternates: { canonical: absoluteUrl('/timbers/') },
};

export default function TimbersPage() {
  return (
    <>
      <PageHead pencilNote="eight species · Hobart rack" title="The timber rack" art="timbers">
        <p>
          Every board on the rack is drawn in its own heartwood and sapwood tones, with dry Janka
          hardness and current stock status. Filter by what you&rsquo;re planning to build.
        </p>
      </PageHead>

      <TimberRack timbers={timbers} />

      <FinishesBand>
        <FinishesBand.Heading>Finishes on the shelf</FinishesBand.Heading>
        <FinishesBand.Intro>
          We avoid thick plastic lacquers that chip and yellow. Every piece leaves the bench with an
          oil finish you can feel under your fingertips and repair easily at home.
        </FinishesBand.Intro>

        <FinishesBand.Shelf>
          <FinishesBand.Item kind="hardwax" name="Hardwax oil" suits="Dining tables & kitchens">
            Plant-oil and natural wax blend that cures to a tough, water-resistant satin sheen.
            Food-safe for kitchen benchtops and dining tables; wipes clean with a damp cloth and
            refreshes easily every couple of years with a single maintenance coat.
          </FinishesBand.Item>

          <FinishesBand.Item kind="danish" name="Danish oil" suits="Sideboards, bookwalls & chests">
            Penetrating tung-oil blend that brings out deep chatoyance in fiddleback blackwood,
            myrtle and blackheart sassafras without sitting on top of the grain. Buffed to a warm
            low-lustre sheen; dust dry and feed lightly once every few years.
          </FinishesBand.Item>

          <FinishesBand.Item kind="decking" name="Penetrating decking oil" suits="Hardwood decks & steps">
            UV-stabilised exterior oil brushed onto all four sides of every spotted gum or silvertop
            ash board before laying. Resists cupping and surface checking in Tasmanian sun and sea
            air; wash down and recoat high-sun decks every 12–18 months.
          </FinishesBand.Item>
        </FinishesBand.Shelf>
      </FinishesBand>

      <SourcingSection>
        <SourcingSection.Copy>
          <p className="pencil-note text-pencil">mills, salvage &amp; offcuts</p>
          <SourcingSection.Heading>Where our timber comes from</SourcingSection.Heading>
          <p className="text-base text-muted">
            We buy Tasmanian oak, blackwood, myrtle, sassafras and celery-top pine directly from
            small local mills working plantation and managed regrowth coupes, plus plantation
            spotted gum and Victorian silvertop ash for exterior decks.
          </p>
          <p className="text-base text-muted">
            Every stick of <strong className="text-ink">Huon pine</strong> on our rack is strictly
            salvaged — recovered from historic hydro impoundments or windblown forest-floor logs,
            never felled green.
          </p>
          <p className="text-base text-muted">
            Nothing useful leaves the workshop as waste: short offcuts go to local Hobart school
            woodwork rooms and woodturners, and clean untreated shavings and scraps warm neighbours
            through winter.
          </p>
        </SourcingSection.Copy>
        <SourcingSection.Art />
      </SourcingSection>
    </>
  );
}
