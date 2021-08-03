// import { GET_CURRENCY_DATA_LIST } from "../mutation-type.js";

// import { fetchList } from "@api/currency.js";
// import i18n from "../../i18n/index";
import * as types from "../constants/home.js";
const StoreHome = {
  namespaced: true,
  state: {
    status: "home-list",
    colorInfo: {}, // 配色信息
    detailCardType: "", // 详情页卡片类型,
  },
  mutations: {
    [types.STORE_HOME_CHANGE_STATUS](state, info) {
      const { cardType, status } = info;
      if (cardType === "open") {
        state.colorInfo = {
          "list-bg-color": "#192A51",
          "common-color": "#2afefe",
          "label-text-color": "#23B0B4",
        };
      }
      if (cardType === "will") {
        state.colorInfo = {
          "list-bg-color": "#303244",
          "common-color": "#bbff8a",
          "label-text-color": "#86B66B",
        };
      }
      if (cardType === "closed") {
        state.colorInfo = {
          "list-bg-color": "#303352",
          "common-color": "#A6DFE6",
          "label-text-color": "#7DA2B3",
        };
      }
      state.detailCardType = cardType;
      state.status = status;

      // console.log(
      //   "=====>=====    state.status ",
      //   state.status,
      //   state.detailCardType,
      //   state.colorInfo
      // );
      // home-detail
    },
  },
  actions: {
    // getTableList({ commit }) {
    //   fetchList().then((res) => {
    //     console.log("res", res);
    //   });
    // },
  },
};

export default StoreHome;
