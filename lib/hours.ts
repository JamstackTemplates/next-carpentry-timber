/** Weekly opening-hours model. Time zone stays in site.config.json. */
export const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as const;
export type Day = (typeof DAYS)[number];

export interface OpeningHours {
  /** Every weekday occurs exactly once. */
  day: Day;
  /** Inclusive local HH:MM; omit both times for a closed day. */
  opens?: string;
  /** Exclusive local HH:MM; overnight intervals are deliberately unsupported. */
  closes?: string;
}

export type WorkshopStatusKind = 'open' | 'soon' | 'closed' | 'neutral';

export interface WorkshopStatus {
  kind: WorkshopStatusKind;
  label: string;
}

const clock = /^([01]\d|2[0-3]):[0-5]\d$/;
const minutes = (value: string) => Number(value.slice(0, 2)) * 60 + Number(value.slice(3));

/** Formats 24-hour HH:MM into natural Australian 12-hour workshop time, e.g. "7:30 am", "4:00 pm". */
export function formatClock12(value: string): string {
  const [h, m] = value.split(':').map(Number);
  const period = h >= 12 ? 'pm' : 'am';
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${String(m).padStart(2, '0')} ${period}`;
}

export function validateHours(hours: readonly OpeningHours[]): void {
  for (const day of DAYS) {
    const matches = hours.filter(entry => entry.day === day);
    if (matches.length !== 1) throw new Error(`hours: ${day} must occur exactly once`);
    const { opens, closes } = matches[0];
    if (opens === undefined && closes === undefined) continue;
    if (!opens || !closes || !clock.test(opens) || !clock.test(closes) || minutes(opens) >= minutes(closes)) {
      throw new Error(`hours: ${day} needs HH:MM opening before closing; overnight service is unsupported`);
    }
  }
  if (hours.length !== 7) throw new Error('hours: expected seven weekdays');
}

const OPENING_SOON_MINUTES = 30;

/**
 * Computes the current workshop status in the configured IANA time zone.
 * Browser callers supply the clock; static/no-JS views stay neutral ("Visits by appointment").
 */
export function workshopStatus(hours: readonly OpeningHours[], timeZone: string, now = new Date()): WorkshopStatus {
  const fallback: WorkshopStatus = { kind: 'neutral', label: 'Visits by appointment' };
  if (!timeZone) return fallback;
  validateHours(hours);
  let parts: Intl.DateTimeFormatPart[];
  try {
    parts = new Intl.DateTimeFormat('en-US', {
      timeZone,
      weekday: 'long',
      hour: 'numeric',
      minute: 'numeric',
      hourCycle: 'h23',
    }).formatToParts(now);
  } catch {
    return fallback;
  }
  const part = (type: string) => parts.find(entry => entry.type === type)?.value ?? '';
  const index = DAYS.indexOf(part('weekday') as Day);
  if (index < 0) return fallback;
  const current = Number(part('hour')) * 60 + Number(part('minute'));
  const today = hours.find(entry => entry.day === DAYS[index])!;

  if (today.opens && today.closes && current >= minutes(today.opens) && current < minutes(today.closes)) {
    return { kind: 'open', label: `Workshop open now · until ${formatClock12(today.closes)}` };
  }

  if (today.opens && current < minutes(today.opens) && minutes(today.opens) - current <= OPENING_SOON_MINUTES) {
    return { kind: 'soon', label: `Opening soon · ${formatClock12(today.opens)}` };
  }

  for (let offset = 0; offset <= 7; offset++) {
    const day = DAYS[(index + offset) % 7];
    const entry = hours.find(value => value.day === day)!;
    if (entry.opens && (offset > 0 || current < minutes(entry.opens))) {
      const when = offset === 0 ? 'today' : day;
      return { kind: 'closed', label: `Closed · opens ${when} ${formatClock12(entry.opens)}` };
    }
  }
  return { kind: 'closed', label: 'Closed · visits by appointment' };
}

/** Convenience string wrapper around workshopStatus. */
export function openingLabel(hours: readonly OpeningHours[], timeZone: string, now = new Date()): string {
  return workshopStatus(hours, timeZone, now).label;
}
