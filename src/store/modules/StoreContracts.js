import contractsApi from "@api/contracts.js";
// import { STC_PRECISION } from "@constants/index";
import * as types from "../constants/contracts";

const StoreWallet = {
  namespaced: true,
  moduleName: "StoreContracts",
  state: {
    // token: "STC",
    stakeAmount: null,
  },
  mutations: {
    [types.SET_STAKE_AMOUNT](state, payload) {
      state.stakeAmount = payload;
    },
  },
  actions: {
    // 获取币种精度
    // async getCurrencyPrecision() {
    //   let t = await contractsApi.getCurrencyPrecision();
    //   // console.log("t", t);
    // },
    // 当前质押额度
    async getStakeAmount({ commit, rootState }) {
      let amount = await contractsApi.getStakeAmount(
        rootState.StoreWallet.stcAccounts[0]
      );
      commit(types.SET_STAKE_AMOUNT, amount);
    },
  },
};

export default StoreWallet;
