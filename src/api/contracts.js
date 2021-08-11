import {
  SMART_CONTRACTS_API,
  SMART_CONTRACTS_TEST_API,
  CONTRACTS_TEST_ADDRESS,
  CONTRACTS_ADDRESS,
} from "@constants/contracts";
// import session from "@utils/session.js";
// 合约相关接口
import request from "@utils/request";
const COUNT = 8;
// import { getTokenByCurrency } from "@utils/tokens";

// setTimeout(() => {
//   console.log("store", store);
// });

let CONTRACTS_URL, CONTRACTS_ADD;
if (process.env.NODE_ENV !== "development") {
  // 开发
  CONTRACTS_URL = SMART_CONTRACTS_API;
  CONTRACTS_ADD = CONTRACTS_ADDRESS;
} else {
  // 线上
  CONTRACTS_URL = SMART_CONTRACTS_TEST_API;
  CONTRACTS_ADD = CONTRACTS_TEST_ADDRESS;
}

// 获取币种精度
// stc 1000000000
function getCurrencyPrecision() {
  let v = {
    id: 101,
    jsonrpc: "2.0",
    method: "contract.call_v2",
    params: [
      {
        function_id: "0x1::Token::scaling_factor",
        type_args: ["0x1::STC::STC"], // 币种token
        args: [],
      },
    ],
  };
  return request({
    headers: {
      "content-type": "application/json",
    },
    url: CONTRACTS_URL,
    method: "POST",
    data: JSON.stringify(v),
  });
}

// 合约项目详情
function getContractsProjectInfo({ token }) {
  console.log("====t0ken====", token);
  if (!token) return;
  // const token = getTokenByCurrency(chainID, currency);
  // console.log("token", token);
  let params = {
    id: 101,
    jsonrpc: "2.0",
    method: "contract.get_resource",
    params: [
      CONTRACTS_ADD, //合约地址
      // "0xd501465255d22d1751aae83651421198::Offering::Offering<0x00000000000000000000000000000001::STC::STC>",
      // Offering3 也是个变量？
      `${CONTRACTS_ADD}::Offering${COUNT}::Offering<${token}>`,
    ],
  };
  console.log("params", params);
  return request({
    headers: {
      "content-type": "application/json",
    },
    url: CONTRACTS_URL,
    method: "post",
    data: JSON.stringify(params),
  });
}

// 获取币种(如STC/ETH，STC/BTC不同活动下STC)已质押额度
function getStakeAmount(accountToken, token) {
  let params = {
    id: 101,
    jsonrpc: "2.0",
    method: "contract.get_resource",
    params: [
      accountToken,
      `${CONTRACTS_ADD}::Offering${COUNT}::Staking<${token}>`,
    ],
  };
  return request({
    headers: {
      "content-type": "application/json",
    },
    url: CONTRACTS_URL,
    method: "post",
    data: JSON.stringify(params),
  });
}

//

export default {
  getCurrencyPrecision,
  getContractsProjectInfo,
  getStakeAmount,
};
