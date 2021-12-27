import * as types from "../constants/wallet";
import CONSTANTS_STARMASK from "@constants/starmask.js";
import Cookies from "js-cookie";

const StoreWallet = {
  namespaced: true,
  moduleName: "StoreWallet",
  state: {
    stcProvider: "",
    stcAccounts: [],
    onboarding: "",
    precision: {}, // {stc: 1000000000}
    balances: {}, // {stc: bigNumber}
    walletStatus: "unConnected", // 钱包链接状态 "unConnected", "connected"
    stcChianID: CONSTANTS_STARMASK.MAIN_CHIA_ID,
  },
  mutations: {
    [types.SET_STC_CHAINID](state, chianID) {
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
      if (payload === "connected") {
        Cookies.set("connect-status", "connected", { expires: 7 });
      }
      state.walletStatus = payload;
    },
  },
  actions: {},
};

export default StoreWallet;
