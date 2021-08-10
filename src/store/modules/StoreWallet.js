import * as types from "../constants/wallet";
// import contractsApi from "@api/contracts.js";
// import { STC_PRECISION } from "@constants/index";

const StoreWallet = {
  namespaced: true,
  moduleName: "StoreWallet",
  state: {
    token: "STC",
    stcChianID: "",
    stcProvider: "",
    stcAccounts: [],
    onboarding: "",
    precision: {}, // {stc: 1000000000}
    balances: {}, // {stc: bigNumber}
    walletStatus: "unConnected", // 钱包链接状态 "unConnected", "connected"
  },
  mutations: {
    [types.SET_STC_CHIANID](state, chianID) {
      state.stcChianID = chianID;
    },
    [types.SET_STC_ACCOUNTS](state, accounts) {
      state.stcAccounts = accounts;
    },
    [types.SET_STARMASK_ONBOARDING](state, onboarding) {
      state.onboarding = onboarding;
    },
    [types.SET_STARMASK_PROVIDER](state, provider) {
      state.stcProvider = provider;
    },
    [types.SET_WALLET_BALANCE](state, payload) {
      state.balances = Object.assign({}, state.balances, payload);
    },
    [types.SET_WALLET_CONNECT_STATUS](state, payload) {
      state.walletStatus = payload;
    },
  },
  actions: {
    setStcChianID({ commit }, chianID) {
      commit(types.SET_STC_CHIANID, chianID);
    },
    setStcAccounts({ commit }, accounts) {
      commit(types.SET_STC_ACCOUNTS, accounts);
    },
    setOnboarding({ commit }, onboarding) {
      commit(types.SET_STARMASK_ONBOARDING, onboarding);
    },
    setStcProvider({ commit }, provider) {
      commit(types.SET_STARMASK_PROVIDER, provider);
    },
    // 获取币种精度
    // async getCurrencyPrecision() {
    //   let t = await contractsApi.getCurrencyPrecision();
    //   // console.log("t", t);
    // },
    // 当前质押额度
    // async getStakeAmount() {
    //   let amount = await contractsApi.getStakeAmount();
    //   console.log("amount", amount);
    // },
  },
};

export default StoreWallet;
