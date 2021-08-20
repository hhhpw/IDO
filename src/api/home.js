import request from "@utils/request";

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

export default {
  getDataList,
  getProInfoById,
  triggerStakeRecord,
};
