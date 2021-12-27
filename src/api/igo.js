import request from "@utils/request";

const COUNT = "";

function getDataList() {
  return request({
    url: "/v1/ido/dx/product/getAll",
    method: "GET",
  });
}

function getProInfoById(pId) {
  return request({
    url: "/v1/ido/dx/product/get?pId=" + pId,
    method: "GET",
  });
}

function triggerStakeRecord(params) {
  return request({
    url: "/v1/ido/dx/user/updateUserRecord",
    method: "POST",
    data: params,
  });
}

// 合约项目详情
function getContractsProjectInfo({ stakeToken, payToken, assignToken }) {
  if (!stakeToken || !payToken || !assignToken) return;
  let params = {
    id: 101,
    jsonrpc: "2.0",
    method: "contract.get_resource",
    params: [
      process.env.VUE_APP_IGO_CONTRACTS_ADDRESS, //合约地址
      `${process.env.VUE_APP_IGO_CONTRACTS_ADDRESS}::Offering${COUNT}::Offering<${stakeToken},${payToken},${assignToken}>`,
    ],
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

// 获取该活动已质押额度
function getStakeAmount(accountToken, { stakeToken, payToken, assignToken }) {
  if (!stakeToken || !payToken || !assignToken) return;
  let params = {
    id: 101,
    jsonrpc: "2.0",
    method: "contract.get_resource",
    params: [
      accountToken,
      `${process.env.VUE_APP_IGO_CONTRACTS_ADDRESS}::Offering${COUNT}::Staking<${stakeToken},${payToken},${assignToken}>`,
    ],
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
  getDataList,
  getProInfoById,
  getContractsProjectInfo,
  getStakeAmount,
  triggerStakeRecord,
};
