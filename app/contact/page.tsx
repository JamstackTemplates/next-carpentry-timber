import type { Metadata } from 'next';
import { ContactWorkspace } from '../../components/contact-sections';
import { JamstacksSupportForm } from '../../components/jamstacks-support-form';
import { PageHead } from '../../components/page-head';
import { business } from '../../content/business';
import { absoluteUrl } from '../../lib/paths';
import { site } from '../../lib/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: business.enquiries.introduction,
  alternates: { canonical: absoluteUrl('/contact/') },
};

export default function ContactPage() {
  const hosted = Boolean(site.jamstacksSite && site.jamstacksEmbedUrl);

  return (
    <>
      <PageHead
        pencilNote="furniture · kitchens · decks · site measures"
        title={business.enquiries.title}
        art="contact"
      >
        <p>{business.enquiries.introduction}</p>
      </PageHead>

      <ContactWorkspace
        checklistHeading="What to put in your message"
        enquiryNote={business.enquiries.replyPromise}
        formContent={
          hosted ? (
            <>
              <p className="pencil-note text-pencil">commission &amp; quote enquiry</p>
              <h2 className="mt-1 mb-5 font-display text-2xl font-bold text-ink">
                Tell us about your piece
              </h2>
              <JamstacksSupportForm
                siteId={site.jamstacksSite}
                embedUrl={site.jamstacksEmbedUrl}
                email={business.email}
              />
            </>
          ) : (
            <div className="space-y-4">
              <p className="pencil-note text-pencil">direct workshop email</p>
              <h2 className="font-display text-2xl font-bold text-ink">Write to us directly</h2>
              <p className="text-base text-muted">
                The online enquiry form is not connected on this preview. Send your commission
                enquiry straight to{' '}
                <a className="text-link font-semibold" href={`mailto:${business.email}`}>
                  {business.email}
                </a>{' '}
                or call{' '}
                <a
                  className="text-link font-semibold"
                  href={`tel:${business.phone.replace(/[^\d+]/g, '')}`}
                >
                  {business.phone}
                </a>{' '}
                — it reaches the same two makers at the bench.
              </p>
              <div className="rounded-ui border border-dashed border-line bg-bg/65 p-4 text-sm text-muted">
                Tip: use the checklist beside this sheet so we can give you a helpful ballpark
                &ldquo;from&rdquo; guide and lead time in our first reply.
              </div>
            </div>
          )
        }
      />
    </>
  );
}
