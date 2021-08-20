import i18n from "../../i18n/index";
import session from "@utils/session";
import * as types from "../constants/app";
const StoreApp = {
  namespaced: true,
  state: {
    headerItems: [
      {
        label: i18n.t("项目"),
        value: "/",
        path: "/",
      },
    ],
    activeHeaderItem: "/",
    language: session.getItem("lang"),
  },
  mutations: {
    [types.SET_ACTIVE_ITEM](state, value) {
      state.activeHeaderItem = value;
    },
  },
  actions: {},
};

export default StoreApp;
