import tokenList from "@constants/token.json";

export const getTokenBySymbol = (chainID, symbol) => {
  const token = (tokenList.tokens[chainID] || []).find((token) => {
    return token.symbol === symbol;
  });
  return token || {};
};
