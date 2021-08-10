import contractsApi from "@api/contracts.js";
// import { STC_PRECISION } from "@constants/index";
import * as types from "../constants/contracts";
import { getTokenByCurrency } from "@utils/tokens";
import { flatten } from "lodash";

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
    // 当前链上项目详情
    async getContractsProjectInfo({ rootState }, payload) {
      const { currency } = payload;
      const chainID = rootState.StoreWallet.stcChianID;
      const token = getTokenByCurrency(chainID, currency || "STC");
      let data = await contractsApi.getContractsProjectInfo({
        token,
      });

      // data:
      // 0: (2) ["tokens", {…}]
      // 1: (2) ["token_total_amount", {…}]
      // 2: (2) ["usdt_rate", {…}]
      // 3: (2) ["state", {…}]
      // 4: (2) ["offering_addr", {…}]
      // 5: (2) ["stc_staking_amount", {…}]
      // 6: (2) ["token_offering_amount", {…}]
      // 7: (2) ["version", {…}]
      // 8: (2) ["offering_created_event", {…}]
      // 9: (2) ["offering_update_event", {…}]

      if (data.result && data.result.value) {
        const res = flatten(data.result.value);
        console.log("data", res);
      }
      // commit(types.SET_PROJECT_INFO)
    },
  },
};

export default StoreWallet;
