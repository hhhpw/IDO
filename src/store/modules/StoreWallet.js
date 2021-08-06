import * as types from "../constants/wallet";
import contractsApi from "@api/contracts.js";

const StoreWallet = {
  namespaced: true,
  moduleName: "StoreWallet",
  state: {
    token: "STC",
    stcProvider: "",
    stcAccounts: [],
    onboarding: "",
    precision: {}, // {STC: 1000000000}
    balancesList: {}, // {STC: 21321312}
  },
  mutations: {
    [types.SET_STC_ACCOUNTS](state, accounts) {
      state.stcAccounts = accounts;
    },
    [types.SET_STARMASK_ONBOARDING](state, onboarding) {
      state.onboarding = onboarding;
    },
    [types.SET_STARMASK_PROVIDER](state, provider) {
      state.stcProvider = provider;
    },
  },
  actions: {
    setStcAccounts({ commit }, accounts) {
      commit(types.SET_STC_ACCOUNTS, accounts);
    },
    setOnboarding({ commit }, onboarding) {
      commit(types.SET_STARMASK_ONBOARDING, onboarding);
    },
    setStcProvider({ commit }, provider) {
      commit(types.SET_STARMASK_PROVIDER, provider);
    },
    async getCurrencyPrecision() {
      let t = await contractsApi.getCurrencyPrecision();
      console.log("t", t);
    },
  },
};

export default StoreWallet;
