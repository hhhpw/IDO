import request from "@utils/request";

function getDataList() {
  console.log("ye");
  return request({
    url: "/api/v1/ido/dx/product/getAll",
    method: "GET",
  });
}

function getCardInfo() {
  let p = {
    pid: "12323",
    id: "123434",
  };
  return request({
    url: "/api/v1/ido/dx/product/get",
    method: "GET",
    data: JSON.stringify(p),
  });
}

export default {
  getDataList,
  getCardInfo,
};
