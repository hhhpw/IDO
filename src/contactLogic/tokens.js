import tokenList from "@constants/token.json";

const getTokenByCurrency = (chainID, currency) => {
  console.log("chainID", chainID, "symbol", currency);
  const token = (tokenList.tokens[chainID] || []).find((token) => {
    return token.currency === currency;
  });
  console.log("token", token);
  return token || {};
};

export default {
  getTokenByCurrency,
};
