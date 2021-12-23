import * as types from "../constants/prodetail";
import dayjs from "dayjs";
import homeApi from "../../api/home.js";
const mapKey = new Map([
  ["processing", "open"],
  ["init", "will"],
  ["finish", "closed"],
]);
const StoreProDetail = {
  namespaced: true,
  state: {
    detailCardInfo: null,
  },
  mutations: {
    [types.SET_PRODETAIL_INFO](state, payload) {
      state.detailCardInfo = payload;
    },
  },
  getters: {
    detailCardInfo: (state) => (id) => {
      return state.cardData
        .filter((d) => d.cardType === state.detailCardType)[0]
        .cardInfoList.filter((dd) => dd.id === id)[0];
    },
  },
  actions: {
    /* eslint-disable*/
    async triggerStakeRecord({}, params) {
      const res = await homeApi.triggerStakeRecord(params);
      console.log("=====triggerStakeRecord====", res);
    },
    async getProInfoById({ commit }, pid) {
      // let pId = state.detailCardId;
      let res = await homeApi.getProInfoById(pid);
      console.log(res);
      if (res.code === 200 && res.data) {
        const {
          raiseTotal,
          rate,
          pledgeEndTime, // 质押结束时间
          lockStartTime, // 锁仓开始时间
          lockEndTime, // 锁仓结束时间
          pledgeStartTime, // 质押开始时间
          payStartTime, // 支付开始时间
          payEndTime, // 支付结束时间
          assignmentStartTime, // 代币分配开始时间
          assignmentEndTime, // 代币分配结束时间
          currencyTotal, //代币发行总量
          payCurrency,
          payPrecision,
          payAddress,
          assignCurrency,
          assignPrecision,
          assignAddress,
          pledgeCurrency,
          pledgePrecision,
          pledgeAddress,
          saleTotal,
          state,
        } = res.data;
        const capTotal = saleTotal;
        const currencyInfo = {
          stakeCurrency: pledgeCurrency,
          stakePrecision: pledgePrecision,
          stakeAddress: pledgeAddress,
          payCurrency,
          payPrecision,
          payAddress,
          assignCurrency,
          assignPrecision,
          assignAddress,
        };
        const proTimeList = [
          {
            title: "质押时间",
            startDate: dayjs(pledgeStartTime).format("YYYY/MM/DD HH:mm:ss"),
            endDate: dayjs(pledgeEndTime).format("YYYY/MM/DD HH:mm:ss"),
          },
          {
            title: "锁仓时间",
            startDate: dayjs(lockStartTime).format("YYYY/MM/DD HH:mm:ss"),
            endDate: dayjs(lockEndTime).format("YYYY/MM/DD HH:mm:ss"),
          },
          {
            title: "支付时间",
            startDate: dayjs(payStartTime).format("YYYY/MM/DD HH:mm:ss"),
            endDate: dayjs(payEndTime).format("YYYY/MM/DD HH:mm:ss"),
          },
          {
            title: "代币分配时间",
            startDate: dayjs(assignmentStartTime).format("YYYY/MM/DD HH:mm:ss"),
            endDate: dayjs(assignmentEndTime).format("YYYY/MM/DD HH:mm:ss"),
          },
        ];
        const decentralizedList = [
          0,
          capTotal,
          currencyTotal,
          0,
          rate,
          raiseTotal,
        ];
        const cardType = mapKey.get(state);

        const result = Object.assign({}, res.data, {
          cardType,
          decentralizedList,
          proTimeList,
          currencyInfo,
          capTotal,
        });
        commit(types.SET_PRODETAIL_INFO, result);
        return "ok";
      }
    },
  },
};

export default StoreProDetail;
