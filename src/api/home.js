import request from "@utils/request";

function getDataList() {
  console.log("ye");
  return request({
    url: "/api/v1/ido/dx/product/getAll",
    method: "GET",
  });
}

function getCardInfo(pId) {
  return request({
    url: "/api/v1/ido/dx/product/get?pId=" + pId,
    method: "GET",
  });
}

export default {
  getDataList,
  getCardInfo,
};
