'use client';

import { useEffect, useState } from 'react';
import { workshopStatus, type OpeningHours, type WorkshopStatus } from '../lib/hours';
import { site } from '../lib/site';

/**
 * Workshop status badge. Renders neutral static copy ("Visits by appointment")
 * during SSR and without JavaScript, then computes live Hobart local status
 * in the browser and refreshes every minute.
 */
export function OpenBadge({
  hours,
  tone = 'default',
}: {
  hours: readonly OpeningHours[];
  tone?: 'default' | 'dark';
}) {
  const [status, setStatus] = useState<WorkshopStatus>({
    kind: 'neutral',
    label: 'Visits by appointment',
  });

  useEffect(() => {
    const update = () => setStatus(workshopStatus(hours, site.timeZone));
    update();
    const timer = setInterval(update, 60_000);
    return () => clearInterval(timer);
  }, [hours]);

  const dotColor =
    status.kind === 'open'
      ? 'bg-accent ring-2 ring-brass/40'
      : status.kind === 'soon'
        ? 'bg-brass'
        : status.kind === 'closed'
          ? 'bg-pencil/80'
          : 'bg-brass/70';

  const pillClasses =
    tone === 'dark'
      ? 'border-fumed-line bg-fumed-surface text-fumed-ink'
      : 'border-line bg-paper text-ink';

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-ui border px-2.5 py-1 text-sm font-medium ${pillClasses}`}
      data-workshop-status={status.kind}
    >
      <span className={`size-2.5 shrink-0 rounded-full ${dotColor}`} aria-hidden="true" />
      <span>{status.label}</span>
    </span>
  );
}
