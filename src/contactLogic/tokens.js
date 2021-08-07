import tokenList from "@constants/token.json";

export const getTokenBySymbol = (chainID, symbol) => {
  const token = tokenList.tokens.find((token) => {
    return chainID === token.chainId && token.symbol === symbol;
  });
  return token || {};
};
