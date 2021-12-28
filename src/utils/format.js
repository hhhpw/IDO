import utilsNumber from "./number.js";
import BigNumber from "bignumber.js";
/**
 * 9000000000 => 90....
 * @param {*} balance
 * @param {*} precision
 * @returns BigNumber
 */
const formatBalance = (balance, precision = 9) => {
  return utilsNumber.bigNum(balance).div(BigNumber(10).pow(precision));
};

/**
 * 90 => 90000000000
 * @param {*} amount
 * @param {*} precision
 * @returns
 */
const decimalBalance = (amount, precision = 9) => {
  return utilsNumber.bigNum(amount).times(BigNumber(10).pow(precision));
};

export default { formatBalance, decimalBalance };
