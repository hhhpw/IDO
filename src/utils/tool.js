import commonApi from "@api/common";
const JWT = require("jsonwebtoken");
import dayjs from "dayjs";
const openNewWindow = (url) => {
  window.open(url, "_blank");
};

/**
 * 轮询查上链hash信息
 * @param {txnHash, delay}
 * @returns
 */
const getChainTransactionInfo = ({
  txnHash,
  resolveCallBack,
  delay = 1000,
} = {}) => {
  return new Promise((resolve) => {
    commonApi.getTransactionInfo(txnHash).then((res) => {
      if (res.result && res.result.status === "Executed") {
        if (typeof resolveCallBack === "function") {
          console.log("=====A======");
          const data = resolveCallBack(res.result.status);
          resolve({ data, status: "Executed" });
        } else {
          console.log("=====B======");
          resolve({ status: "Executed" });
        }
      } else {
        setTimeout(() => {
          resolve(getChainTransactionInfo({ txnHash, resolveCallBack }));
        }, delay);
      }
    });
  });
};
const setJWT = () => {
  const token = JWT.sign(
    { iss: "kiko", exp: dayjs().add(10, "m").valueOf() },
    "4858BAe65490df199FE8D76aC9087620",
    {
      algorithm: "HS256",
    }
  );
  return token;
};

export default {
  openNewWindow,
  setJWT,
  getChainTransactionInfo,
};
