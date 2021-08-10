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

export default {
  getDataList,
  getCardInfo,
};
