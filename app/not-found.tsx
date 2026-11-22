import { SawnShort404 } from '../components/art/workshop-art';
import { SiteLink } from '../components/site-link';

export default function NotFound() {
  return (
    <section className="surface-graph py-16 md:py-24">
      <div className="wrap text-center">
        <SawnShort404 />
        <p className="pencil-note mt-4 text-pencil">offcut #404</p>
        <h1 className="mt-1 font-display text-[clamp(2.4rem,5.5vw,4rem)] font-bold text-ink">
          Measure twice, cut once
        </h1>
        <p className="mx-auto mt-3 max-w-md text-lg text-muted">
          This page came up 404 mm short. Head back to the bench, browse the work or send us a
          commission note.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <SiteLink href="/" className="button">
            Back to Home
          </SiteLink>
          <SiteLink href="/work/" className="button button-quiet">
            See the work
          </SiteLink>
          <SiteLink href="/contact/" className="button button-quiet">
            Contact the workshop
          </SiteLink>
        </div>
      </div>
    </section>
  );
}
