import StarMaskOnboarding from "@starcoin/starmask-onboarding";
import { providers } from "@starcoin/starcoin";
import utilsNumber from "@utils/number.js";

/**
 *  StarMaskOnboarding 实例化
 * */
const createStcProvider = () => {
  let stcProvider;
  try {
    if (window.starcoin) {
      // We must specify the network as 'any' for starcoin to allow network changes
      stcProvider = new providers.Web3Provider(window.starcoin, "any");
    }
  } catch (error) {
    console.error(error);
  }
  return stcProvider;
};

/**
 *  StarMaskOnboarding 实例化
 * */
const createStarMaskOnboarding = () => {
  const currentUrl = new URL(window.location.href);
  // console.log("currentUrl", currentUrl);
  const forwarderOrigin =
    currentUrl.hostname === "localhost" ? "http://localhost:9032" : undefined;

  let onboarding;
  // console.log("forwarderOrigin", forwarderOrigin);
  try {
    onboarding = new StarMaskOnboarding({ forwarderOrigin });
  } catch (error) {
    console.error(error);
  }
  return onboarding;
};

/**
 * Check Starmask Installed
 * */
const checkStarMaskInstalled = () => {
  const { isStarMaskInstalled } = StarMaskOnboarding;
  return isStarMaskInstalled();
};

/**
 * Connect Wallet
 * */
const connect = async () => {
  let newAccounts = [];
  try {
    newAccounts = await window.starcoin.request({
      method: "stc_requestAccounts",
    });
  } catch (error) {
    console.error(error);
  }
  return newAccounts;
};

/**
 * Get getNetworkChainId
 *
 * */
const getNetworkChainId = async () => {
  try {
    const chainInfo = await window.starcoin.request({
      method: "chain.id",
    });
    return `0x${chainInfo.id.toString(16)}`;
  } catch (error) {
    console.error(error);
  }
};
/**
 * Get account balance
 *
 * */
const getAccountBalance = async ({ provider, account, token }) => {
  let balance;
  try {
    if (token === undefined) {
      token = "0x1::STC::STC";
    }
    const result = await provider.getResource(
      account,
      `0x1::Account::Balance<${token}>`
    );
    if (result) {
      balance = utilsNumber.bigNum(result.token.value).toString();
      return balance;
    } else {
      balance = "0";
      return balance;
    }
  } catch (error) {
    console.error(error);
    return "0";
  }
};

/**
 * Set Account permissions
 *
 * */
const setPermissions = async () => {
  let permissionsArray;
  try {
    permissionsArray = await window.starcoin.request({
      method: "wallet_requestPermissions",
      params: [{ stc_accounts: {} }],
    });
  } catch (err) {
    console.error(err);
  }
  return permissionsArray.map((perm) => perm.parentCapability);
};

/**
 * Get permissions
 *
 * */
const getPermissions = async () => {
  let permissionsArray;
  try {
    permissionsArray = await window.starcoin.request({
      method: "wallet_getPermissions",
    });
  } catch (err) {
    console.error(err);
  }
  return permissionsArray.map((perm) => perm.parentCapability);
};

export default {
  createStcProvider,
  connect,
  createStarMaskOnboarding,
  checkStarMaskInstalled,
  getNetworkChainId,
  getAccountBalance,
  setPermissions,
  getPermissions,
};
