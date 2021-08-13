import {
  SMART_CONTRACTS_API,
  SMART_CONTRACTS_TEST_API,
  CONTRACTS_TEST_ADDRESS,
  CONTRACTS_ADDRESS,
} from "@constants/contracts";
// 合约相关接口
import request from "@utils/request";
const COUNT = 10;

let CONTRACTS_URL, CONTRACTS_ADD;
if (process.env.NODE_ENV !== "development") {
  // 线上
  CONTRACTS_URL = SMART_CONTRACTS_API;
  CONTRACTS_ADD = CONTRACTS_ADDRESS;
} else {
  // 开发
  CONTRACTS_URL = SMART_CONTRACTS_TEST_API;
  CONTRACTS_ADD = CONTRACTS_TEST_ADDRESS;
}

// 合约项目详情
function getContractsProjectInfo({ token }) {
  console.log("====getContractsProjectInfo====", token);
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
      // <stakeToken,payToken,offeringToken>
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

export default {
  getContractsProjectInfo,
  getStakeAmount,
};
