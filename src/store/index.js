import Vue from "vue";
import Vuex from "vuex";

import StoreApp from "./modules/StoreApp.js";
import StoreHome from "./modules/StoreHome.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // StoreApp,
  },
  mutations: {},
  actions: {},
  modules: {
    StoreApp,
    StoreHome,
  },
});
