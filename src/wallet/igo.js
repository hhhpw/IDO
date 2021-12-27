/* eslint-disable */
import StarMaskOnboarding from "@starcoin/starmask-onboarding";
import { providers, utils, bcs } from "@starcoin/starcoin";
import { arrayify, hexlify } from "@ethersproject/bytes";
import utilsNumber from "@utils/number.js";

const stakeFunc = async ({ provider, tokenCode, amount }) => {
  try {
    const functionId = process.env.VUE_APP_IGO_STAKE_STC_FUNCTION_ID;
    const strTypeArgs = tokenCode;
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
    });

    return txhash;
  } catch (error) {
    console.error("stake", error);
    return "error";
  }
};

const unStakeFunc = async ({ provider, tokenCode, amount }) => {
  try {
    const functionId = process.env.VUE_APP_IGO_UNSTAKE_STC_FUNCTION_ID;
    const strTypeArgs = tokenCode;
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
    });
    return txhash;
  } catch (error) {
    console.error("unstake", error);
    return "error";
  }
};

const payFunc = async ({ provider, tokenCode }) => {
  try {
    const functionId = process.env.VUE_APP_IGO_PAY_FUNCTION_ID;
    const strTypeArgs = tokenCode;
    const tyArgs = utils.tx.encodeStructTypeTags(strTypeArgs);
    const args = [];
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
    });

    return txhash;
  } catch (error) {
    console.error("pay", error);
    return "error";
  }
};

export default {
  stakeFunc,
  unStakeFunc,
  payFunc,
};
