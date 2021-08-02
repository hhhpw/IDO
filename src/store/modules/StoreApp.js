// import { GET_CURRENCY_DATA_LIST } from "../mutation-type.js";

// import { fetchList } from "@api/currency.js";
import i18n from "../../i18n/index";
const StoreApp = {
  namespaced: true,
  state: {
    // loginState: false,
    headerItems: [
      {
        label: i18n.t("项目"),
        path: "home",
        value: "home",
      },
    ],
    activeHeaderItem: "home",
  },
  mutations: {
    SET_LOGIN_STATE(state, flag) {
      state.loginState = flag;
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

export default StoreApp;