import request from "../utils/request";
// 查询上链信息
function getTransactionInfo(txnHash) {
  let params = {
    id: 101,
    jsonrpc: "2.0",
    method: "chain.get_transaction_info",
    params: [txnHash],
  };
  return request({
    headers: {
      "content-type": "application/json",
    },
    url: process.env.VUE_APP_CONTRACTS_URL,
    method: "post",
    data: JSON.stringify(params),
  });
}

export default {
  getTransactionInfo,
};
