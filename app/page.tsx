import type { Metadata } from 'next';
import {
  CommissionSteps,
  HomeHero,
  RecentWorkSection,
  TimberRackBand,
  TradesBand,
  VisitWorkshop,
} from '../components/home-sections';
import { business } from '../content/business';
import { absoluteUrl } from '../lib/paths';
import { businessStructuredData, jsonLd } from '../lib/structured-data';

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl('/') },
};

export default function HomePage() {
  return (
    <>
      {/* 1. Hero — shop-drawing paper with a themed blackwood table image */}
      <HomeHero>
        <HomeHero.Eyebrow>Hobart joinery workshop · est. {business.foundedYear}</HomeHero.Eyebrow>
        <HomeHero.Heading>
          Furniture, kitchens and decks, made by hand from timber that&rsquo;s earned its place.
        </HomeHero.Heading>
        <HomeHero.Lead>
          One Hobart workshop, two makers, and a rack of Tasmanian oak, blackwood and myrtle. We
          draw it, build it and fit it ourselves.
        </HomeHero.Lead>
        <HomeHero.Actions>
          <HomeHero.PrimaryAction>Start a commission enquiry</HomeHero.PrimaryAction>
          <HomeHero.SecondaryAction>See the work</HomeHero.SecondaryAction>
        </HomeHero.Actions>
      </HomeHero>

      {/* 2. Three trades — full-bleed honey-oak grain band with angled timber planks */}
      <TradesBand>
        <TradesBand.Header>
          <TradesBand.Heading>Three trades, one bench</TradesBand.Heading>
          <TradesBand.Intro>
            Every price below is a starting &ldquo;from&rdquo; guide with current lead times from
            our workshop cutting list. Pick a plank to see what&rsquo;s included.
          </TradesBand.Intro>
        </TradesBand.Header>
        <TradesBand.Planks />
      </TradesBand>

      {/* 3. Recent work — asymmetric pinned shop-drawing sheets on paper */}
      <RecentWorkSection>
        <RecentWorkSection.Top>
          <div>
            <RecentWorkSection.Heading>Recent work off the bench</RecentWorkSection.Heading>
            <RecentWorkSection.Intro>
              Three recent commissions from Sandy Bay, Battery Point and Kingston Beach, each drawn
              and jointed in-house.
            </RecentWorkSection.Intro>
          </div>
          <RecentWorkSection.ViewAll>Browse all pieces</RecentWorkSection.ViewAll>
        </RecentWorkSection.Top>
        <RecentWorkSection.Grid />
      </RecentWorkSection>

      {/* 4. From the rack — dark fumed-oak band with five end-grain rounds */}
      <TimberRackBand>
        <TimberRackBand.Header>
          <div>
            <TimberRackBand.Heading>From the timber rack</TimberRackBand.Heading>
            <TimberRackBand.Intro>
              Seasoned Tasmanian regrowth, salvaged logs and hardy mainland decking boards. Tap any
              round to check Janka hardness and current rack stock.
            </TimberRackBand.Intro>
          </div>
          <TimberRackBand.ViewAll>Explore the timber rack</TimberRackBand.ViewAll>
        </TimberRackBand.Header>
        <TimberRackBand.Rounds />
      </TimberRackBand>

      {/* 5. How a commission runs — zig-zag folding rule with four hinged steps */}
      <CommissionSteps>
        <CommissionSteps.Heading>How a commission runs</CommissionSteps.Heading>
        <CommissionSteps.Intro>
          No showroom middlemen. You talk straight to the makers who select the boards and plane the
          joints.
        </CommissionSteps.Intro>
        <CommissionSteps.Track>
          <CommissionSteps.Step number="01" title="Talk it through">
            Send a note with rough sizes, the room or deck space and any timber you favour.
            We&rsquo;ll reply within two working days to talk it through.
          </CommissionSteps.Step>
          <CommissionSteps.Step number="02" title="Measure and draw">
            We visit your home or look over your architect&rsquo;s plans, pick boards at the rack
            and send a 1:10 drawing with a fixed written quote.
          </CommissionSteps.Step>
          <CommissionSteps.Step number="03" title="Build in the workshop">
            Everything is jointed, dry-fitted and hand-oiled at our Hobart bench. You&rsquo;re
            welcome to call in mid-build to check the grain.
          </CommissionSteps.Step>
          <CommissionSteps.Step number="04" title="Deliver and fit">
            We deliver furniture into its room and scribe kitchens, built-ins and hardwood decks on
            site ourselves.
          </CommissionSteps.Step>
        </CommissionSteps.Track>
      </CommissionSteps>

      {/* 6. Visit the workshop — 5/7 kraft timetable + laneway workshop sketch */}
      <VisitWorkshop
        heading="Visit the Hobart workshop"
        intro="Call in by appointment to run a hand over the timber rack, compare oiled sample boards and look over past shop drawings."
        ctaLabel="Start a commission enquiry"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(businessStructuredData()) }}
      />
    </>
  );
}
