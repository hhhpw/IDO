import utilsNumber from "./number.js";

const formatBalance = (balance, precision = 9) => {
  return utilsNumber.bigNum(balance).div(Math.pow(10, precision)).toString();
};

export default { formatBalance };
