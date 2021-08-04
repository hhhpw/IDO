import * as types from "../constants/wallet";

const StoreWallet = {
  namespaced: true,
  moduleName: "StoreWallet",
  state: {
    token: "STC",
    stcProvider: "",
    stcAccounts: [],
    onboarding: "",
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
  },
};

export default StoreWallet;
