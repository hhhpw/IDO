import request from "@utils/request";

function getDataList() {
  return request({
    url: "/v1/ido/dx/product/getAll",
    method: "GET",
  });
}

function getCardInfo(pId) {
  return request({
    url: "/v1/ido/dx/product/get?pId=" + pId,
    method: "GET",
  });
}

function triggerStakeRecord(params) {
  console.log("params", params);
  return;
  // return request({
  //   url: " /v1/ido/dx/user/updteUserRecord",
  //   method: "POST",
  //   data: params,
  // });
}

export default {
  getDataList,
  getCardInfo,
  triggerStakeRecord,
};
