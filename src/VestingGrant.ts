import { add, differenceInMonths } from 'date-fns';

type VestingEvent = {
  date: Date;
  amount: number;
};

export class VestingGrant {
  amount: number;
  grantDate: Date;
  cliffInMonths: number;
  vestingInMonths: number;
  endDate?: Date;

  constructor(
    amount: number,
    grantDate: Date,
    cliffInMonths: number,
    vestingInMonths: number,
    endDate?: Date
  ) {
    this.amount = amount;
    this.grantDate = grantDate;
    this.cliffInMonths = cliffInMonths;
    this.vestingInMonths = vestingInMonths;
    this.endDate = endDate;
  }

  getVestedMonths = (date: Date): number =>
    differenceInMonths(date, this.grantDate);

  getVestedAmountByMonthsElapsed = (targetMonths: number): number => {
    const months = Math.min(targetMonths, this.vestingInMonths);
    if (months < this.cliffInMonths) {
      return 0;
    }
    // don't allow fractional vesting, round down
    return Math.round((months / this.vestingInMonths) * this.amount);
  };

  getVestingEvents = (): Array<VestingEvent> => {
    // get cliff vesting event
    const cliffDate = add(this.grantDate, { months: this.cliffInMonths });
    const cliffVestingEvent: VestingEvent = {
      date: cliffDate,
      amount: this.getVestedAmountByMonthsElapsed(this.cliffInMonths)
    };

    // get periodic vesting events
    let periodicEvents = [];
    for (let i = this.cliffInMonths + 1; i <= this.vestingInMonths; i++) {
      const date = add(this.grantDate, { months: i });
      const incrementalAmount =
        this.getVestedAmountByMonthsElapsed(i) -
        this.getVestedAmountByMonthsElapsed(i - 1);
      periodicEvents.push({
        date,
        amount: incrementalAmount
      });
    }

    return [cliffVestingEvent, ...periodicEvents];
  };
}
