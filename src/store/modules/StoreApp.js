// import i18n from "../../i18n/index";
import session from "@utils/session";
import * as types from "../constants/app";
const StoreApp = {
  namespaced: true,
  state: {
    headerItems: [
      {
        label: "项目",
        value: "/",
        path: "/",
      },
    ],
    activeHeaderItem: "/",
    language: session.getItem("language") || "en",
  },
  mutations: {
    [types.SET_ACTIVE_ITEM](state, value) {
      state.activeHeaderItem = value;
    },
    [types.SET_APP_LANGUAGE](state, value) {
      state.language = value;
      session.setItem("language", value);
    },
  },
  actions: {},
};

export default StoreApp;
