import * as types from "../constants/home.js";
import igoApi from "@api/igo.js";
const mapKey = new Map([
  ["processing", "open"],
  ["init", "will"],
  ["finish", "closed"],
]);
const StoreHome = {
  namespaced: true,
  state: {
    status: "home-list",
    detailCardType: "", // 详情页卡片类型,
    detailCardId: null, // 具体卡片的id
    cardData: null,
    // 活动币种信息， 基础币、质押币、支付币
    currencyInfo: {},
  },
  mutations: {
    [types.STORE_HOME_CHANGE_STATUS](state, info) {
      const { cardType, status, cardId, currencyInfo } = info;
      state.detailCardType = cardType;
      state.status = status;
      state.currencyInfo = currencyInfo;
      if (cardId) {
        state.detailCardId = cardId;
      }
    },
    [types.STORE_HOME_SET_DATA_LIST](state, payload) {
      state.cardData = payload;
    },
  },
  actions: {
    /* eslint-disable*/
    async triggerStakeRecord({}, params) {
      const res = await igoApi.triggerStakeRecord(params);
      console.log("=====triggerStakeRecord====", res);
    },
    async getDataList({ commit }) {
      let res = await igoApi.getDataList();
      let results = [];
      const endStates = ["processing", "init", "finish"];
      for (let i = 0; i < endStates.length; i++) {
        const cardInfoList = res.data[endStates[i]].map((d) => {
          const {
            // raiseTotal,
            // rate,
            // pledgeEndTime, // 质押结束时间
            // lockStartTime, // 锁仓开始时间
            // lockEndTime, // 锁仓结束时间
            // pledgeStartTime, // 质押开始时间
            // payStartTime, // 支付开始时间
            // payEndTime, // 支付结束时间
            // assignmentStartTime, // 代币分配开始时间
            // assignmentEndTime, // 代币分配结束时间
            // currencyTotal, //代币发行总量
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
          } = d;
          const capTotal = saleTotal;
          return {
            ...d,
            currencyInfo: {
              stakeCurrency: pledgeCurrency,
              stakePrecision: pledgePrecision,
              stakeAddress: pledgeAddress,
              payCurrency,
              payPrecision,
              payAddress,
              assignCurrency,
              assignPrecision,
              assignAddress,
            },
            cardType: mapKey.get(endStates[i]),
            capTotal,
          };
        });
        let obj = {
          cardType: mapKey.get(endStates[i]),
          cardInfoList,
        };
        results.push(obj);
      }
      results = results.filter((d) => d.cardInfoList.length > 0);
      console.log("results", results);
      commit(types.STORE_HOME_SET_DATA_LIST, results);
    },
  },
};

export default StoreHome;
