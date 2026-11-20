import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import ts from 'typescript';
const source = readFileSync(new URL('../data/promotions.ts', import.meta.url), 'utf8');
const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ES2022 } });
const { getCampaignClock: clock, getOfferStatus: status } = await import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`);
const at = (date) => clock(new Date(date));

test('upcoming countdown and no obsolete monthly offers', () => {
  assert.equal(at('2026-11-20T12:00:00Z').daysUntil, 7);
  assert.equal(at('2026-11-20T12:00:00Z').active, null);
  assert.equal(at('2026-10-22T12:00:00Z').active, null);
});
test('Friday and Saturday switch at Eastern midnight', () => {
  assert.equal(at('2026-11-27T04:59:00Z').active, null);
  const friday = at('2026-11-27T05:00:00Z');
  assert.equal(friday.active, 'black-friday');
  assert.equal(status('black-friday', friday), 'Today');
  assert.equal(status('saturday', friday), 'Coming up');
  assert.equal(at('2026-11-28T04:59:00Z').active, 'black-friday');
  const saturday = at('2026-11-28T05:00:00Z');
  assert.equal(saturday.active, 'saturday');
  assert.equal(status('black-friday', saturday), 'Ended');
  assert.equal(status('saturday', saturday), 'Today');
  assert.equal(saturday.seasonEnded, false);
});
test('both offers end on Sunday and never recur next year', () => {
  for (const date of ['2026-11-29T05:00:00Z', '2027-11-27T12:00:00Z']) {
    const ended = at(date);
    assert.equal(ended.active, null);
    assert.equal(ended.seasonEnded, true);
    assert.equal(ended.daysUntil, 0);
    assert.equal(status('black-friday', ended), 'Ended');
    assert.equal(status('saturday', ended), 'Ended');
  }
});
test('countdown drops at Eastern midnight and expiration waits until Saturday finishes', () => {
  assert.equal(at('2026-11-21T04:59:59Z').daysUntil, 7);
  assert.equal(at('2026-11-21T05:00:00Z').daysUntil, 6);
  assert.equal(at('2026-11-29T04:59:59Z').seasonEnded, false);
  assert.equal(at('2026-11-29T05:00:00Z').seasonEnded, true);
});
