import StarMaskOnboarding from "@starcoin/starmask-onboarding";
import { providers, utils, bcs } from "@starcoin/starcoin";
import { arrayify, hexlify } from "@ethersproject/bytes";
import { getTokenBySymbol } from "./tokens";

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
  console.log("currentUrl", currentUrl);
  const forwarderOrigin =
    currentUrl.hostname === "localhost" ? "http://localhost:9032" : undefined;

  let onboarding;
  console.log("forwarderOrigin", forwarderOrigin);
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
 * Get chianID
 *
 * */
const getStcChianID = async () => {
  let chianID;
  try {
    const { id } = await window.starcoin.request({
      method: "chain.id",
    });
    chianID = id;
  } catch (error) {
    console.error(error);
  }
  return chianID;
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
    balance = result.token.value;
  } catch (error) {
    console.error(error);
  }
  getPrecision(provider);
  // console.log("provider", provider, provider.getResource);
  return balance;
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

const getPrecision = async (provider) => {
  let precisions;
  try {
    precisions = await provider.contract.call_v2({
      // method: "contract.call_v2",
    });
  } catch (err) {
    console.log("err");
  }
  return precisions;
};

/**
 * stake STC
 *
 * */
const stakeSTC = async ({ provider, chianID, symbol = "STC", amount }) => {
  const token = getTokenBySymbol(chianID, symbol);
  try {
    const functionId = `${token.address}::OfferingScript2::staking`;
    const strTypeArgs = ["0x1::STC::STC"];
    const tyArgs = utils.tx.encodeStructTypeTags(strTypeArgs);

    const amountHex = (function () {
      const se = new bcs.BcsSerializer();
      se.serializeU128(amount);
      return hexlify(se.getBytes());
    })();

    const args = [arrayify(amountHex)];

    const scriptFunction = utils.tx.encodeScriptFunction(
      functionId,
      tyArgs,
      args
    );

    const payloadInHex = (function () {
      const se = new bcs.BcsSerializer();
      scriptFunction.serialize(se);
      return hexlify(se.getBytes());
    })();

    const txhash = await provider.getSigner().sendUncheckedTransaction({
      data: payloadInHex,
      gasLimit: 100000,
      gasPrice: 1,
    });

    return txhash;
  } catch (error) {
    console.error(error);
  }
  return false;
};

/**
 * unstake STC
 *
 * */
const unstakeSTC = async ({ provider, chianID, symbol = "STC", amount }) => {
  const token = getTokenBySymbol(chianID, symbol);
  try {
    const functionId = `${token.address}::OfferingScript2::unstaking`;
    const strTypeArgs = ["0x1::STC::STC"];
    const tyArgs = utils.tx.encodeStructTypeTags(strTypeArgs);

    const amountHex = (function () {
      const se = new bcs.BcsSerializer();
      se.serializeU128(amount.toString(10));
      return hexlify(se.getBytes());
    })();

    const args = [arrayify(amountHex)];

    const scriptFunction = utils.tx.encodeScriptFunction(
      functionId,
      tyArgs,
      args
    );

    const payloadInHex = (function () {
      const se = new bcs.BcsSerializer();
      scriptFunction.serialize(se);
      return hexlify(se.getBytes());
    })();

    const txhash = await provider.getSigner().sendUncheckedTransaction({
      data: payloadInHex,
      gasLimit: 100000,
      gasPrice: 1,
    });

    return txhash;
  } catch (error) {
    console.error(error);
  }
  return false;
};

export default {
  createStcProvider,
  connect,
  createStarMaskOnboarding,
  checkStarMaskInstalled,
  getStcChianID,
  getAccountBalance,
  setPermissions,
  getPermissions,
  getPrecision,
  stakeSTC,
  unstakeSTC,
};
