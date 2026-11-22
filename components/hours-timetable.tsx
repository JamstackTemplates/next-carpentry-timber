import { formatClock12, type OpeningHours } from '../lib/hours';

/** Groups consecutive weekdays that share identical hours for clean timetable reading. */
function compactHours(hours: readonly OpeningHours[]) {
  const rows: { label: string; value: string }[] = [];
  for (const entry of hours) {
    const value =
      entry.opens && entry.closes
        ? `${formatClock12(entry.opens)} – ${formatClock12(entry.closes)}`
        : 'Closed';
    const prev = rows.at(-1);
    if (prev && prev.value === value && entry.day !== 'Saturday' && entry.day !== 'Sunday') {
      const start = prev.label.split('–')[0];
      prev.label = `${start}–${entry.day.slice(0, 3)}`;
    } else {
      rows.push({
        label: entry.day === 'Saturday' || entry.day === 'Sunday' ? entry.day : entry.day.slice(0, 3),
        value,
      });
    }
  }
  return rows;
}

export function HoursTimetable({
  hours,
  tone = 'default',
}: {
  hours: readonly OpeningHours[];
  tone?: 'default' | 'dark';
}) {
  const rows = compactHours(hours);
  const borderClass = tone === 'dark' ? 'border-fumed-line/70' : 'border-line/80';
  const mutedClass = tone === 'dark' ? 'text-fumed-muted' : 'text-muted';

  return (
    <dl className="divide-y text-sm">
      {rows.map(row => (
        <div
          key={row.label}
          className={`flex items-baseline justify-between gap-4 py-1.5 ${borderClass}`}
        >
          <dt className="font-semibold">{row.label}</dt>
          <dd className={row.value === 'Closed' ? mutedClass : ''}>{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}
