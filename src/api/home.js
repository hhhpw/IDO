import request from "@utils/request";

function getDataList() {
  console.log("ye");
  return request({
    url: "/api/public/currencies/",
    method: "get",
  });
}

export default { getDataList };
