import { differenceInMonths } from 'date-fns';

export class Grant {
  amount: number;
  grantDate: Date;
  cliffInMonths: number;
  durationInMonths: number;

  constructor(
    amount: number,
    grantDate: Date,
    cliffInMonths: number,
    durationInMonths: number
  ) {
    this.amount = amount;
    this.grantDate = grantDate;
    this.cliffInMonths = cliffInMonths;
    this.durationInMonths = durationInMonths;
  }

  static defaultGrant(amount: number, grantDate: Date): Grant {
    return new Grant(amount, grantDate, 12, 72);
  }

  getVestedAmountByDate(date: Date): number {
    const months = Math.min(
      differenceInMonths(date, this.grantDate),
      this.durationInMonths
    );
    if (months < this.cliffInMonths) {
      return 0;
    }
    // don't allow fractional vesting, round down
    return Math.floor((months / this.durationInMonths) * this.amount);
  }
}
