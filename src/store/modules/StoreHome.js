// import { GET_CURRENCY_DATA_LIST } from "../mutation-type.js";

// import { fetchList } from "@api/currency.js";
// import i18n from "../../i18n/index";
import * as types from "../constants/home.js";
const StoreHome = {
  namespaced: true,
  state: {
    status: "home-list",
  },
  mutations: {
    [types.STORE_HOME_CHANGE_STATUS](state, value) {
      console.log("yes", value);
      state.status = value;
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
