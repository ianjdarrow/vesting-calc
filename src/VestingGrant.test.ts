import { VestingGrant } from './VestingGrant';

test('can create a grant', () => {
  const g = new VestingGrant(600, new Date(2020, 0, 1), 12, 72);
  expect(g.amount).toBe(600);
});

test('can calculate cliff vesting', () => {
  const g = new VestingGrant(600, new Date(2020, 0, 1), 12, 72);
  expect(g.getVestingEvents()[0].amount).toBe(100);
});

test('can calculate periodic vesting events', () => {
  const amount = 25000;
  const g = new VestingGrant(amount, new Date(2020, 3, 13), 12, 72);

  const vestingEvents = g.getVestingEvents();
  expect(vestingEvents.length).toEqual(61);

  const total = vestingEvents.map(e => e.amount).reduce((a, b) => a + b, 0);
  expect(total).toEqual(amount);
});
