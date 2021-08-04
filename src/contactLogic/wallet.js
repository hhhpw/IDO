import StarMaskOnboarding from "@starcoin/starmask-onboarding";

/**
 *  StarMaskOnboarding 实例化
 * */
const createStarMaskOnboarding = () => {
  const currentUrl = new URL(window.location.href);
  const forwarderOrigin =
    currentUrl.hostname === "localhost" ? "http://localhost:9032" : undefined;

  let onboarding;
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

export default {
  connect,
  createStarMaskOnboarding,
  checkStarMaskInstalled,
};
