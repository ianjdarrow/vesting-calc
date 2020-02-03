"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var date_fns_1 = require("date-fns");
var Grant = /** @class */ (function () {
    function Grant(amount, grantDate, cliffInMonths, durationInMonths) {
        this.amount = amount;
        this.grantDate = grantDate;
        this.cliffInMonths = cliffInMonths;
        this.durationInMonths = durationInMonths;
    }
    Grant.defaultGrant = function (amount, grantDate) {
        return new Grant(amount, grantDate, 12, 72);
    };
    Grant.prototype.getVestedAmountByDate = function (date) {
        var months = Math.min(date_fns_1.differenceInMonths(date, this.grantDate), this.durationInMonths);
        if (months < this.cliffInMonths) {
            return 0;
        }
        // don't allow fractional vesting, round down
        return Math.floor((months / this.durationInMonths) * this.amount);
    };
    return Grant;
}());
exports.Grant = Grant;
