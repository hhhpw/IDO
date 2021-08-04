// import { GET_CURRENCY_DATA_LIST } from "../mutation-type.js";
// import i18n from "../../i18n/index";
import * as types from "../constants/home.js";
const StoreHome = {
  namespaced: true,
  state: {
    status: "home-list",
    detailCardType: "", // 详情页卡片类型,
  },
  mutations: {
    [types.STORE_HOME_CHANGE_STATUS](state, info) {
      const { cardType, status } = info;
      state.detailCardType = cardType || null;
      state.status = status;
    },
  },
  getters: {
    cardTypeColorInfo: () => (type) => {
      console.log("type", type);
      let obj = {};
      if (type === "open") {
        obj = {
          "list-bg-color": "#192A51",
          "common-color": "#2afefe",
          "label-text-color": "#23B0B4",
        };
      }
      if (type === "will") {
        obj = {
          "list-bg-color": "#303244",
          "common-color": "#bbff8a",
          "label-text-color": "#86B66B",
        };
      }
      if (type === "closed") {
        obj = {
          "list-bg-color": "#303352",
          "common-color": "#A6DFE6",
          "label-text-color": "#7DA2B3",
        };
      }
      obj[
        "list-item-wrap-bg"
      ] = require(`../../assets/card/${type}-card-item.png`);
      if (type !== "closed") {
        obj[
          "detail-input-wrap-bg"
        ] = require(`../../assets/home/${type}-input-border.png`);
      }

      obj[
        "detail-wrap-content-button"
      ] = require(`../../assets/home/${type}-button.png`);
      return obj;
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
