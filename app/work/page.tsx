import type { Metadata } from 'next';
import { PageHead } from '../../components/page-head';
import { WorkGallery } from '../../components/work-gallery';
import { ClosingGrainCta, JoinerySection } from '../../components/work-sections';
import { projects } from '../../content/projects';
import { timbers } from '../../content/timbers';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Custom furniture, kitchens, hardwood decks and built-in joinery drawn, cut and finished at our Hobart workshop.',
  alternates: { canonical: absoluteUrl('/work/') },
};

export default function WorkPage() {
  const timberNames = Object.fromEntries(timbers.map(item => [item.id, item.name]));

  return (
    <>
      <PageHead pencilNote="bench archive · 2022–2025" title="The work" art="work">
        <p>Every piece here was drawn, cut and finished at our bench.</p>
      </PageHead>

      <WorkGallery projects={projects} timberNames={timberNames} />

      <JoinerySection>
        <JoinerySection.Heading>Joinery details we stand behind</JoinerySection.Heading>
        <JoinerySection.Intro>
          Solid timber expands across Hobart winters and contracts through dry summers. Good joints
          work with that movement rather than fighting it with brackets and glue.
        </JoinerySection.Intro>

        <JoinerySection.Rows>
          <JoinerySection.Row kind="through-dovetail" note="drawer boxes & blanket chests" title="Through dovetail">
            Sawn at a 1:8 hardwood slope so the mechanical wedge resists pulling loose every time a
            heavy drawer is opened. We leave through dovetails proudly exposed on blanket chests and
            solid-timber drawer fronts.
          </JoinerySection.Row>

          <JoinerySection.Row
            kind="mortise-tenon"
            note="table bases & chair frames"
            title="Drawbored mortise and tenon"
            reverse
          >
            Deep shouldered tenons pinned with slightly offset timber pegs pull the joint dead tight
            even before glue sets. It gives dining tables and sideboards lateral rigidity that lasts
            generations.
          </JoinerySection.Row>

          <JoinerySection.Row kind="breadboard-end" note="wide solid tabletops" title="Breadboard end">
            The centre tenon is glued and pinned fast while the outer tenons ride inside elongated
            slots. That keeps a wide blackwood or oak tabletop flat through decades of seasonal
            humidity shifts without splitting.
          </JoinerySection.Row>

          <JoinerySection.Row
            kind="hidden-deck-fixing"
            note="spotted gum & silvertop ash"
            title="Hidden deck fixing"
            reverse
          >
            Grooved board edges lock onto 316 marine-grade stainless clips screwed into the joists
            below, keeping water out of screw holes and leaving a clean, splinter-free surface for
            bare feet.
          </JoinerySection.Row>
        </JoinerySection.Rows>
      </JoinerySection>

      <ClosingGrainCta
        pencilNote="one-off commissions"
        heading="Have a piece in mind?"
        body="Tell us what you're imagining — rough sizes, the room or outdoor space, and any timber you love. We'll reply within two working days to talk it through."
        actionLabel="Start a commission enquiry"
      />
    </>
  );
}
