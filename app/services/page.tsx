import type { Metadata } from 'next';
import { PageHead } from '../../components/page-head';
import {
  CuttingListSection,
  FaqSection,
  PriceFactorsRadial,
  ProcessBand,
} from '../../components/services-sections';
import { ClosingGrainCta } from '../../components/work-sections';
import { business } from '../../content/business';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Guide "from" prices, lead times and availability for custom dining tables, sideboards, built-ins, kitchens and hardwood decks in Hobart.',
  alternates: { canonical: absoluteUrl('/services/') },
};

const PRICE_FACTORS = [
  {
    number: '01',
    title: 'Timber choice',
    detail:
      'Regrowth Tasmanian oak and spotted gum sit at the accessible end; wide fiddleback blackwood, blackheart sassafras and salvaged Huon pine carry higher board costs.',
  },
  {
    number: '02',
    title: 'Size and span',
    detail:
      'Long single-length tabletops, tall bookwalls and wide elevated decks need thicker stock and deeper structural framing.',
  },
  {
    number: '03',
    title: 'Joinery detail',
    detail:
      'Hand-cut through dovetails, breadboard ends, inset beaded doors and custom brass hardware take more bench hours than simpler square-edged builds.',
  },
  {
    number: '04',
    title: 'Finish and coats',
    detail:
      'Hand-rubbed hardwax oil, multi-coat kitchen benchtop sealing and four-sided exterior decking oil are matched to how hard the surface works.',
  },
  {
    number: '05',
    title: 'Site access and fitting',
    detail:
      'Tight Battery Point stairs, uneven heritage walls requiring extra scribing, or steep hillside deck footings add on-site fitting time.',
  },
] as const;

export default function ServicesPage() {
  return (
    <>
      <PageHead pencilNote="cutting list & lead times" title="What we make" art="services">
        <p>
          Every figure below is a starting &ldquo;from&rdquo; guide in Australian dollars so you can
          gauge fit before we measure. Written quotes follow a site visit or plan review.
        </p>
      </PageHead>

      <CuttingListSection>
        <CuttingListSection.Heading>The cutting list</CuttingListSection.Heading>
        <CuttingListSection.Intro>
          Lead times run along a 0–20 week folding-rule scale from signed drawing to delivery or
          install. {business.enquiries.replyPromise}
        </CuttingListSection.Intro>
        <CuttingListSection.Sheet />
      </CuttingListSection>

      <ProcessBand>
        <ProcessBand.Heading>From first note to final coat</ProcessBand.Heading>
        <ProcessBand.Intro>
          Five clear steps so you always know what happens next and what it will cost before we cut
          a single board.
        </ProcessBand.Intro>
        <ProcessBand.List>
          <ProcessBand.Step number="1" title="Enquiry" side="left">
            Send your rough sizes, suburb, preferred timber and timing via our Contact page or
            email. We&rsquo;ll reply within two working days with honest guide numbers and next
            steps.
          </ProcessBand.Step>
          <ProcessBand.Step number="2" title="Site measure" side="right">
            For kitchens, built-ins and decks we visit on site across Greater Hobart, Kingston, the
            Eastern Shore and the Huon Valley. For freestanding furniture we can meet at the
            workshop rack.
          </ProcessBand.Step>
          <ProcessBand.Step number="3" title="Drawings and fixed quote" side="left">
            We prepare 1:10 shop elevations, confirm hardware and timber selection, and send a
            written fixed quote along with a provisional bench start week.
          </ProcessBand.Step>
          <ProcessBand.Step number="4" title="Build in the workshop" side="right">
            We mill, joint, dry-fit and oil your piece at our Hobart bench, sending progress photos
            or inviting you in to see the boards laid out before glue-up.
          </ProcessBand.Step>
          <ProcessBand.Step number="5" title="Fit and finish" side="left">
            We deliver furniture ourselves and install kitchens, bookwalls and hardwood decks on
            site, leaving you with a care card and a small tin of maintenance oil.
          </ProcessBand.Step>
        </ProcessBand.List>
      </ProcessBand>

      <PriceFactorsRadial
        heading="What shapes the price"
        intro="Two dining tables of the same length can sit thousands apart depending on the boards and joints. Here is what moves a written quote up or down."
        factors={PRICE_FACTORS}
      />

      <FaqSection>
        <FaqSection.Aside>
          <p className="pencil-note text-pencil">before you write</p>
          <FaqSection.Heading>Common questions</FaqSection.Heading>
          <FaqSection.Intro>
            Straight answers on quotes, site measures, timber care and working alongside your
            architect or builder.
          </FaqSection.Intro>
        </FaqSection.Aside>

        <FaqSection.List>
          <FaqSection.Item question="How do deposits and payments work?">
            Nothing is paid through this website. Once you approve the drawings and written fixed
            quote, we agree the deposit and milestone schedule in writing — typically a timber
            deposit to reserve your bench slot and buy the pack from the mill, with the balance on
            delivery or practical completion.
          </FaqSection.Item>

          <FaqSection.Item question="How do you handle site measures?">
            We do site measures across Greater Hobart, Kingston, the Eastern Shore and the Huon
            Valley once our initial &ldquo;from&rdquo; guide feels in the right ballpark for you.
            We measure walls, floor fall and stair access ourselves so the joinery scribes cleanly
            on installation day.
          </FaqSection.Item>

          <FaqSection.Item question="How do I care for an oiled timber finish?">
            Wipe spills with a damp cloth rather than harsh spray cleaners, and avoid leaving wet
            glass rings overnight. Every 18–24 months a quick wipe-on maintenance oil refreshes the
            surface in ten minutes without needing to sand back to bare wood.
          </FaqSection.Item>

          <FaqSection.Item question="Can you build from reclaimed or my own timber?">
            Yes, provided the boards are properly air- or kiln-dried (around 10–12% moisture content
            for Hobart interiors) and free of hidden metal. Bring a sample board or send photos when
            we reply and we&rsquo;ll let you know if it is workable.
          </FaqSection.Item>

          <FaqSection.Item question="Do you work from architects' or designers' drawings?">
            Often. Mention that you have architectural plans in your enquiry and we&rsquo;ll reply
            with where to send the PDFs. We translate concept drawings into full joinery shop
            drawings and coordinate directly with your builder.
          </FaqSection.Item>
        </FaqSection.List>
      </FaqSection>

      <ClosingGrainCta
        pencilNote="ready to talk sizes?"
        heading="Start with a short commission enquiry"
        body="No obligation and no automated quotes — just a direct reply from the workshop within two working days."
        actionLabel="Start a commission enquiry"
      />
    </>
  );
}
