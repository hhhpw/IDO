/* eslint-disable */

import CONSTANTS_TOKENS from "@constants/tokens.js";
import starmask from "./starmask";
import { PLUGIN_URL } from "@constants/starmask";
import { Notification } from "element-ui";
import utilsTool from "@utils/tool";
import StarButton from "@StarUI/StarButton.vue";
import { isNil } from "lodash";
// import { $createElement } from "vue";
import i18n from "../i18n";
export default function connectLogic(store, h) {
  const handleChainIdChange = (id) => {
    store.commit("StoreWallet/SET_STC_CHAINID", id);
  };

  const walletState = (store) => {
    return { ...store.state.StoreWallet };
  };
  // 账户切换
  const handleAccountsChange = (account) => {
    // clearInterval(state.walletTimer);
    store.commit("StoreWallet/CHANGE_WALLET_TIMER_STATUS", null);
    window.location.reload();
    // account为空数组则认为是断开链接
    if (account.length === 0) {
      store.commit("StoreWallet/SET_WALLET_CONNECT_STATUS", "unConnected");
      // utilsRouter.push("/");
    } else {
      console.log("====handleAccountsChange====", state.accounts);
      store.commit("StoreWallet/SET_STC_ACCOUNTS", []);
      store.commit("StoreWallet/SET_STC_ACCOUNTS", account);
      getSTCBalance(state.provider);
      // let timer = setInterval(() => getSTCBalance(state.provider), 10000);
      // store.commit("StoreWallet/CHANGE_WALLET_TIMER_STATUS", timer);
    }
  };

  const getSTCBalance = async (provider) => {
    const params = {
      provider: provider,
      account: walletState(store).stcAccounts[0],
    };
    const balance = await starmask.getAccountBalance(params);
    if (!isNil(balance)) {
      store.commit("StoreWallet/SET_WALLET_BALANCE", {
        [CONSTANTS_TOKENS.STC]: balance,
      });
    }
  };

  const isStarMaskInstalled = () => starmask.checkStarMaskInstalled();

  const walletInit = async () => {
    const onboarding = walletState(store).onboarding;
    if (!onboarding) {
      const onboard = starmask.createStarMaskOnboarding();
      if (onboard) {
        store.commit("StoreWallet/SET_STARMASK_ONBOARDING", onboard);
      }
    }
    const stcProvider = starmask.createStcProvider();
    store.commit("StoreWallet/SET_STARMASK_PROVIDER", stcProvider);
    if (isStarMaskInstalled) {
      const chainId = await starmask.getNetworkChainId();
      handleChainIdChange(chainId);
      window.starcoin &&
        window.starcoin.on("accountsChanged", (account) => {
          handleAccountsChange(account);
        });
      window.starcoin &&
        window.starcoin.on("chainChanged", (chainId) => {
          handleChainIdChange(chainId);
        });
    }
  };

  const connectWallet = async () => {
    const isStalled = isStarMaskInstalled();
    if (!isStalled) {
      unInstalled(h);
      return;
    }
    if (isStalled && walletState(store).walletStatus === "connected") {
      // 防止重复链接,以免导致网站连接多个account,出现余额和账户的变化跳动
      return;
    }
    const accounts = await starmask.connect();
    console.log("===accounts====", accounts);
    store.commit("StoreWallet/SET_STC_ACCOUNTS", accounts);
    const isStarMaskConnected = accounts && accounts.length > 0;
    if (isStarMaskConnected) {
      const permissions = await starmask.getPermissions();
      const stcProvider = starmask.createStcProvider();
      store.commit("StoreWallet/SET_STARMASK_PROVIDER", stcProvider);
      getSTCBalance(stcProvider);
      // clearInterval(state.walletTimer);
      // store.commit("StoreWallet/CHANGE_WALLET_TIMER_STATUS", null);
      // let timer = setInterval(() => getSTCBalance(state.provider), 10000);
      // store.commit("StoreWallet/CHANGE_WALLET_TIMER_STATUS", timer);
      // 由于某些操作会导致账户余额发生改变，且变化不是及时的
      // 但目前starmask没有提供监听的方法
      // 只能前端去定时去查询
      store.commit("StoreWallet/SET_WALLET_CONNECT_STATUS", "connected");
    }
  };

  const unInstalled = (h) => {
    Notification({
      message: h(
        "div",
        {
          style: {
            position: "relative",
            "font-size": "14px",
            color: "#FFFFFF",
          },
        },
        [
          h("p", i18n.t("wallet.download-tip")),
          h(
            "star-button",
            {
              props: {
                light: true,
              },
              style: {
                padding: "5px",
                "margin-left": "200px",
                "margin-top": "20px",
              },
              on: {
                click: () => {
                  utilsTool.openNewWindow(PLUGIN_URL);
                },
              },
            },
            i18n.t("前去下载")
          ),
        ]
      ),
      duration: 3000,
      offset: 100,
      showClose: false,
    });
    return;
  };

  return {
    connectWallet,
    getSTCBalance,
    walletInit,
    isStarMaskInstalled,
    unInstalled,
  };
}
