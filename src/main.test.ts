import { Grant } from './main';

test('can create a default grant', () => {
  const g = Grant.defaultGrant(600, new Date(2020, 0, 1));
  expect(g.amount).toBe(600);
});

test('returns 0 before default grant cliff', () => {
  const g = Grant.defaultGrant(600, new Date(2020, 0, 1));
  expect(g.getVestedAmountByDate(new Date(2020, 11, 31))).toBe(0);
});

test('returns 1/6 the day of default grant cliff', () => {
  const g = Grant.defaultGrant(600, new Date(2020, 0, 1));
  expect(g.getVestedAmountByDate(new Date(2021, 0, 1))).toBe(100);
});

test('returns 51.3% at 37 months after default grant', () => {
  const g = Grant.defaultGrant(600, new Date(2020, 0, 1));
  expect(g.getVestedAmountByDate(new Date(2023, 1, 1))).toBe(308);
});

test('returns 100% at 72 months after default grant', () => {
  const g = Grant.defaultGrant(600, new Date(2020, 0, 1));
  expect(g.getVestedAmountByDate(new Date(2026, 0, 1))).toBe(600);
});

test('stops after default grant fully vested', () => {
  const g = Grant.defaultGrant(600, new Date(2020, 0, 1));
  expect(g.getVestedAmountByDate(new Date(2030, 0, 1))).toBe(600);
});

test('can create a custom grant', () => {
  const g = new Grant(800, new Date(2020, 0, 1), 0, 96);
  expect(g.amount).toBe(800);
});
