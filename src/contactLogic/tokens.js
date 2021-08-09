import tokenList from "@constants/token.json";

export const getTokenByCurrency = (chainID, currency) => {
  // console.log("chainID", chainID, "symbol", currency);
  const token = (tokenList.tokens[chainID] || []).find((token) => {
    return token.symbol === currency;
  });
  console.log("token", token);
  return token || {};
};
