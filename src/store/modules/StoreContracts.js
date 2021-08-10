import contractsApi from "@api/contracts.js";
// import { STC_PRECISION } from "@constants/index";
import * as types from "../constants/contracts";
import { getTokenByCurrency } from "@utils/tokens";
import { fromPairs } from "lodash";
import utilsNumber from "@utils/number.js";

const StoreWallet = {
  namespaced: true,
  moduleName: "StoreContracts",
  state: {
    // token: "STC",
    stakeAmount: null, // 个人已质押额度
    personStakeAmount: null, // 个人质押上限
    restStakeAmount: null, // 个人还可质押总额
    currencyTotalAmount: null, // 代币销售数量
    proState: null, // 1未开始 2进行中 3质押中 4待支付 5已结束
    stakeTotalAmount: null, // 总质押
    myStakeAmount: null, // 我的质押 列表展示
  },
  mutations: {
    [types.SET_STAKE_AMOUNT](state, payload) {
      state.stakeAmount = payload;
    },
    [types.SET_PROJECT_INFO](state, payload) {
      state.personStakeAmount = payload.amount;
      state.proState = payload.proState;
      state.currencyTotalAmount = payload.currencyTotalAmount;
      state.stakeTotalAmount = payload.stakeTotalAmount;
    },
    [types.SET_REST_STAKE_AMOUNT](state, payload) {
      state.restStakeAmount = payload;
    },
    [types.SET_STAKE_MY_AMOUNT](state, payload) {
      state.myStakeAmount = payload;
    },
  },
  actions: {
    async loadInfo({ rootState, commit, state }, payload) {
      let currency = payload.currency || "DUMMY";
      const chainID = rootState.StoreWallet.stcChianID;
      const token = getTokenByCurrency(chainID, currency);
      Promise.allSettled([
        // 获取质押额度
        contractsApi.getStakeAmount(
          rootState.StoreWallet.stcAccounts[0],
          token
        ),
        // 获取项目详情
        contractsApi.getContractsProjectInfo({
          token,
        }),
      ])
        .then((result) => {
          console.log("result", result);
          if (result[0].status === "fulfilled") {
            let res = fromPairs(result[0].value.result.value);
            let value = res["stc_staking"]["Struct"]["value"][0][1]["U128"];
            let myStake = res["stc_staking_amount"]["U128"];
            commit(types.SET_STAKE_AMOUNT, value);
            commit(types.SET_STAKE_MY_AMOUNT, myStake);
          }
          if (result[1].status === "fulfilled") {
            let res = fromPairs(result[1].value.result.value);
            let amount = res.personal_stc_staking_limit.U128;
            let proState = res.state.U8;
            let currencyTotalAmount = res.token_offering_amount.U128;
            let stakeTotalAmount = res.stc_staking_amount.U128;
            commit(types.SET_PROJECT_INFO, {
              amount,
              proState,
              currencyTotalAmount,
              stakeTotalAmount,
            });
          }
          if (
            result[0].status === "fulfilled" &&
            result[1].status === "fulfilled"
          ) {
            const restStakeAmount = utilsNumber
              .bigNum(state.personStakeAmount)
              .minus(state.stakeAmount)
              .toString();
            commit(types.SET_REST_STAKE_AMOUNT, restStakeAmount);
          }
        })
        .catch((e) => {
          console.error("项目详情失败:", e);
        });
    },
    // 获取币种精度
    // async getCurrencyPrecision() {
    //   let t = await contractsApi.getCurrencyPrecision();
    //   // console.log("t", t);
    // },
    // 当前质押额度
    // async getStakeAmount({ commit, rootState }) {
    //   let data = await contractsApi.getStakeAmount(
    //     rootState.StoreWallet.stcAccounts[0]
    //   );
    //   let res = fromPairs(data.result.value);
    //   let value = res["stc_staking"]["Struct"]["value"][0][1]["U128"];
    //   commit(types.SET_STAKE_AMOUNT, value);
    // },
    // // 当前链上项目详情
    // async getContractsProjectInfo({ rootState }, payload) {
    //   const { currency } = payload;
    //   const chainID = rootState.StoreWallet.stcChianID;
    //   const token = getTokenByCurrency(chainID, currency || "DUMMY");
    //   let data = await contractsApi.getContractsProjectInfo({
    //     token,
    //   });

    //   // data:
    //   // 0: (2) ["tokens", {…}]
    //   // 1: (2) ["token_total_amount", {…}]
    //   // 2: (2) ["usdt_rate", {…}]
    //   // 3: (2) ["state", {…}]
    //   // 4: (2) ["offering_addr", {…}]
    //   // 5: (2) ["stc_staking_amount", {…}]
    //   // 6: (2) ["token_offering_amount", {…}]
    //   // 7: (2) ["version", {…}]
    //   // 8: (2) ["offering_created_event", {…}]
    //   // 9: (2) ["offering_update_event", {…}]
    //   if (data.result && data.result.value) {
    //     const res = fromPairs(data.result.value);
    //     console.log("data", res.personal_stc_staking_limit.U128);
    //   }
    // },
  },
};

export default StoreWallet;
