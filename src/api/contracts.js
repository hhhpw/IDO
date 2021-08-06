import { SMART_CONTRACTS_API } from "@constants";
// 合约相关接口
import request from "@utils/request";

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
    url: SMART_CONTRACTS_API,
    method: "POST",
    data: JSON.stringify(v),
  });
}

// 合约项目详情
function getProjectInfo() {
  let t = {
    id: 101,
    jsonrpc: "2.0",
    method: "contract.get_resource",
    params: [
      "0xd501465255d22d1751aae83651421198",
      "0xd501465255d22d1751aae83651421198::Offering::Offering<0x00000000000000000000000000000001::STC::STC>",
    ],
  };
  return request({
    headers: {
      "content-type": "application/json",
    },
    url: SMART_CONTRACTS_API,
    method: "post",
    data: JSON.stringify(t),
  });
}

export default {
  getCurrencyPrecision,
  getProjectInfo,
};
