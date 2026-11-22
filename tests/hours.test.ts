import assert from 'node:assert/strict';
import { test } from 'node:test';
import { business } from '../content/business.ts';
import { DAYS, openingLabel, validateHours, workshopStatus } from '../lib/hours.ts';

const HOBART = 'Australia/Hobart';
const at = (isoUtc: string, zone = HOBART) => openingLabel(business.hours, zone, new Date(isoUtc));

test('Hobart workshop open/close boundaries, opening soon and Sunday closed', () => {
  // July is AEST (UTC+10): Monday 2026-07-06
  // 06:59 AEST = 2026-07-05T20:59:00Z (more than 30 min before 07:30)
  assert.equal(at('2026-07-05T20:59:00Z'), 'Closed · opens today 7:30 am');
  // 07:05 AEST = 2026-07-05T21:05:00Z (within 30 min -> Opening soon)
  assert.equal(at('2026-07-05T21:05:00Z'), 'Opening soon · 7:30 am');
  // 07:30 AEST inclusive = 2026-07-05T21:30:00Z
  assert.equal(at('2026-07-05T21:30:00Z'), 'Workshop open now · until 4:00 pm');
  // 15:59 AEST = 2026-07-06T05:59:00Z
  assert.equal(at('2026-07-06T05:59:00Z'), 'Workshop open now · until 4:00 pm');
  // 16:00 AEST exclusive = 2026-07-06T06:00:00Z
  assert.equal(at('2026-07-06T06:00:00Z'), 'Closed · opens Tuesday 7:30 am');

  // Saturday 2026-07-11 (AEST UTC+10): 09:00–12:00
  assert.equal(at('2026-07-10T22:45:00Z'), 'Opening soon · 9:00 am');
  assert.equal(at('2026-07-10T23:00:00Z'), 'Workshop open now · until 12:00 pm');
  assert.equal(at('2026-07-11T01:59:00Z'), 'Workshop open now · until 12:00 pm');
  // Saturday 12:00 exclusive skips Sunday closed and rolls to Monday 7:30 am
  assert.equal(at('2026-07-11T02:00:00Z'), 'Closed · opens Monday 7:30 am');

  // Sunday 2026-07-12 midday AEST -> Closed · opens Monday 7:30 am
  assert.equal(at('2026-07-12T02:00:00Z'), 'Closed · opens Monday 7:30 am');
});

test('Hobart DST transitions (first Sunday in April and October) preserve local opening times from UTC', () => {
  // 2026-04-05 is first Sunday in April: AEDT (UTC+11) ends -> AEST (UTC+10)
  // Saturday 2026-04-04 09:00 AEDT = 2026-04-03T22:00:00Z
  assert.equal(at('2026-04-03T21:59:00Z'), 'Opening soon · 9:00 am');
  assert.equal(at('2026-04-03T22:00:00Z'), 'Workshop open now · until 12:00 pm');
  // Saturday 2026-04-04 12:00 AEDT = 2026-04-04T01:00:00Z
  assert.equal(at('2026-04-04T01:00:00Z'), 'Closed · opens Monday 7:30 am');

  // Monday 2026-04-06 is now AEST (UTC+10): 07:30 AEST = 2026-04-05T21:30:00Z
  assert.equal(at('2026-04-05T21:29:00Z'), 'Opening soon · 7:30 am');
  assert.equal(at('2026-04-05T21:30:00Z'), 'Workshop open now · until 4:00 pm');

  // 2026-10-04 is first Sunday in October: AEST (UTC+10) ends -> AEDT (UTC+11)
  // Saturday 2026-10-03 09:00 AEST = 2026-10-02T23:00:00Z
  assert.equal(at('2026-10-02T22:59:00Z'), 'Opening soon · 9:00 am');
  assert.equal(at('2026-10-02T23:00:00Z'), 'Workshop open now · until 12:00 pm');

  // Monday 2026-10-05 is now AEDT (UTC+11): 07:30 AEDT = 2026-10-04T20:30:00Z
  assert.equal(at('2026-10-04T20:29:00Z'), 'Opening soon · 7:30 am');
  assert.equal(at('2026-10-04T20:30:00Z'), 'Workshop open now · until 4:00 pm');
});

test('missing/invalid zones stay neutral and closed week stays safe', () => {
  assert.deepEqual(workshopStatus(business.hours, '', new Date('2026-07-06T00:00:00Z')), {
    kind: 'neutral',
    label: 'Visits by appointment',
  });
  assert.equal(at('2026-07-06T00:00:00Z', 'Mars/Base'), 'Visits by appointment');
  assert.equal(openingLabel(DAYS.map(day => ({ day })), 'UTC'), 'Closed · visits by appointment');
});

test('invalid/incomplete/overnight intervals name the weekday to fix', () => {
  assert.doesNotThrow(() => validateHours(business.hours));
  for (const opens of ['24:00', '9:00', '18:00']) {
    assert.throws(
      () => validateHours(business.hours.map(x => (x.day === 'Tuesday' ? { ...x, opens } : x))),
      /Tuesday/,
    );
  }
  assert.throws(() => validateHours(business.hours.slice(1)), /Monday/);
  assert.throws(
    () => validateHours(business.hours.map(x => (x.day === 'Tuesday' ? { ...x, closes: undefined } : x))),
    /Tuesday/,
  );
});
