import * as types from "../constants/prodetail";
import { fromPairs } from "lodash";
import utilsNumber from "@utils/number.js";
import dayjs from "dayjs";
import igoApi from "@api/igo.js";
import IGOContract from "@starMaskWallet/igo";
import utilsTool from "@utils/tool";
import CONSTANTS_DIALOG from "@constants/dialog";
const mapKey = new Map([
  ["processing", "open"],
  ["init", "will"],
  ["finish", "closed"],
]);
const StoreProDetail = {
  namespaced: true,
  state: {
    stakeAmount: null, // 个人已质押额度
    personStakeAmount: null, // 个人质押上限
    restStakeAmount: null, // 个人还可质押总额
    proState: null, // 1未开始 2进行中 3质押中 4待支付 5已结束
    stakeTotalAmount: null, // 总质押
    myStakeAmount: null, // 我的质押 列表展示
    payState: false, // 支付状态
    detailCardInfo: null,
    dialogParams: CONSTANTS_DIALOG.WALLET_DIALOG_PARAMS,
  },
  mutations: {
    [types.SET_PRODETAIL_DIALOG_PARAMS](state, payload) {
      state.dialogParams = Object.assign({}, state.dialogParams, payload);
      console.log("  state.dialogParams", state.dialogParams);
    },
    [types.SET_PRODETAIL_INFO](state, payload) {
      state.detailCardInfo = payload;
    },
    [types.SET_STAKE_AMOUNT](state, payload) {
      state.stakeAmount = payload;
    },
    [types.SET_PROJECT_INFO](state, payload) {
      state.personStakeAmount = payload.amount;
      state.proState = payload.proState;
      state.stakeTotalAmount = payload.stakeTotalAmount;
    },
    [types.SET_REST_STAKE_AMOUNT](state, payload) {
      state.restStakeAmount = payload;
    },
    [types.SET_STAKE_MY_AMOUNT](state, payload) {
      state.myStakeAmount = payload;
    },
    [types.SET_PAY_STATE](state, payload) {
      state.payState = payload;
    },
  },
  actions: {
    async loadInfo({ rootState, commit, state }, payload) {
      Promise.allSettled([
        // 获取质押额度
        igoApi.getStakeAmount(rootState.StoreWallet.stcAccounts[0], payload),
        // 获取项目详情
        igoApi.getContractsProjectInfo(payload),
      ])
        .then((result) => {
          console.log("result", result);
          if (result[0].status === "fulfilled") {
            if (result[0].value.result) {
              let res = fromPairs(result[0].value.result.value);
              let value =
                res["staking_tokens"]["Struct"]["value"][0][1]["U128"];
              let myStake = res["staking_token_amount"]["U128"];
              let payState = res["is_pay_off"]["Bool"];
              commit(types.SET_STAKE_AMOUNT, value);
              commit(types.SET_STAKE_MY_AMOUNT, myStake);
              commit(types.SET_PAY_STATE, payState);
            }
          }
          if (result[1].status === "fulfilled") {
            if (result[1].value.result) {
              let res = fromPairs(result[1].value.result.value);
              let amount = res.personal_staking_token_amount_limit.U128;
              let proState = res.state.U8;
              let stakeTotalAmount = res.staking_token_amount.U128;
              commit(types.SET_PROJECT_INFO, {
                amount,
                proState,
                stakeTotalAmount,
              });
            }
          }
          if (
            result[0].status === "fulfilled" &&
            result[1].status === "fulfilled"
          ) {
            const restStakeAmount = utilsNumber
              .bigNum(state.personStakeAmount)
              .minus(state.stakeAmount || 0)
              .toString();
            commit(types.SET_REST_STAKE_AMOUNT, restStakeAmount);
          }
        })
        .catch((e) => {
          console.error("项目详情失败:", e);
        });
    },
    async getProInfoById({ commit }, pid) {
      // let pId = state.detailCardId;
      let res = await igoApi.getProInfoById(pid);
      if (res.code === 200 && res.data) {
        const {
          raiseTotal,
          rate,
          pledgeEndTime, // 质押结束时间
          lockStartTime, // 锁仓开始时间
          lockEndTime, // 锁仓结束时间
          pledgeStartTime, // 质押开始时间
          payStartTime, // 支付开始时间
          payEndTime, // 支付结束时间
          assignmentStartTime, // 代币分配开始时间
          assignmentEndTime, // 代币分配结束时间
          currencyTotal, //代币发行总量
          payCurrency,
          payPrecision,
          payAddress,
          assignCurrency,
          assignPrecision,
          assignAddress,
          pledgeCurrency,
          pledgePrecision,
          pledgeAddress,
          saleTotal,
          state,
        } = res.data;
        const capTotal = saleTotal;
        const currencyInfo = {
          stakeCurrency: pledgeCurrency,
          stakePrecision: pledgePrecision,
          stakeAddress: pledgeAddress,
          payCurrency,
          payPrecision,
          payAddress,
          assignCurrency,
          assignPrecision,
          assignAddress,
        };
        const proTimeList = [
          {
            title: "质押时间",
            startDate: dayjs(pledgeStartTime).format("YYYY/MM/DD HH:mm:ss"),
            endDate: dayjs(pledgeEndTime).format("YYYY/MM/DD HH:mm:ss"),
          },
          {
            title: "锁仓时间",
            startDate: dayjs(lockStartTime).format("YYYY/MM/DD HH:mm:ss"),
            endDate: dayjs(lockEndTime).format("YYYY/MM/DD HH:mm:ss"),
          },
          {
            title: "支付时间",
            startDate: dayjs(payStartTime).format("YYYY/MM/DD HH:mm:ss"),
            endDate: dayjs(payEndTime).format("YYYY/MM/DD HH:mm:ss"),
          },
          {
            title: "代币分配时间",
            startDate: dayjs(assignmentStartTime).format("YYYY/MM/DD HH:mm:ss"),
            endDate: dayjs(assignmentEndTime).format("YYYY/MM/DD HH:mm:ss"),
          },
        ];
        const decentralizedList = [
          0,
          capTotal,
          currencyTotal,
          0,
          rate,
          raiseTotal,
        ];
        const cardType = mapKey.get(state);

        const result = Object.assign({}, res.data, {
          cardType,
          decentralizedList,
          proTimeList,
          currencyInfo,
          capTotal,
        });
        commit(types.SET_PRODETAIL_INFO, result);
        return "ok";
      }
    },

    async contractFunc({ commit, rootState }, payload) {
      commit(types.SET_PRODETAIL_DIALOG_PARAMS, {
        dialogVisible: true,
      });
      console.log("=====payload====", payload);
      const provider = rootState.StoreWallet.stcProvider;
      const params = {
        provider,
        tokenCode: payload.tokenCode,
        amount: payload.amount,
      };
      try {
        let txnHash;
        if (payload.type === "stake") {
          txnHash = await IGOContract.stakeFunc(params);
        } else if (payload.type === "unstake") {
          txnHash = await IGOContract.unStakeFunc(params);
        } else if (payload.type === "pay") {
          txnHash = await IGOContract.payFunc(params);
        }
        console.log("====txnHash=====", txnHash);
        if (txnHash === "error") {
          throw new Error(`${payload.type}-error`);
        } else {
          const reloadEvent = () => {
            window.location.reload();
          };
          commit(types.SET_PRODETAIL_DIALOG_PARAMS, {
            phase1: "succeed",
          });
          console.log("transactionHash", txnHash);
          utilsTool
            .getChainTransactionInfo({ txnHash, resolveCallBack: null })
            .then((res) => {
              console.log("=====res=======", res);
              if (res.status === "Executed") {
                commit(types.SET_PRODETAIL_DIALOG_PARAMS, {
                  phase2: "succeed",
                });
                setTimeout(() => {
                  commit(types.SET_PRODETAIL_DIALOG_PARAMS, {
                    status: "succeed",
                    handleSucceed: reloadEvent,
                  });
                }, 1500);
              } else {
                throw new Error(`${payload.type}-error`);
              }
            });
        }
      } catch (e) {
        commit(types.SET_PRODETAIL_DIALOG_PARAMS, {
          status: "failed",
          handleFailed: () => {
            window.location.reload();
          },
          dialogVisible: true,
        });
      }
    },
  },
};

export default StoreProDetail;
