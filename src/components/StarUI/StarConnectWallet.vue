<template>
  <star-button dark>
    <span @click="connectToWallet">
      <span v-if="walletStatus === 'unConnected'">
        {{ $t("连接钱包") }}
      </span>
      <span v-if="walletStatus === 'connected'">
        <!-- <transition name="slide-fade"> -->
        <span
          v-if="balances && balances[CONSTANTS_TOKENS.STC]"
          style="margin-right: 10px"
        >
          {{ renderBalance(balances) }}
        </span>
        <!-- </transition> -->
        <span class="">{{ renderAccount }}</span>
      </span>
    </span>
  </star-button>
</template>

<script>
import StarButton from "@StarUI/StarButton.vue";
import CONSTANTS_TOKENS from "@constants/tokens.js";
import { mapState } from "vuex";
import utilsFormat from "@utils/format";
import store from "@store";
import starMaskWallet from "@starMaskWallet";
export default {
  name: "StarConnectWallet",
  data() {
    return {
      CONSTANTS_TOKENS,
      utilsFormat,
    };
  },
  components: {
    StarButton,
  },
  computed: {
    ...mapState("StoreWallet", [
      "stcAccounts",
      "onboarding",
      "stcProvider",
      "walletStatus",
      "balances",
    ]),
    renderAccount() {
      if (this.stcAccounts && this.stcAccounts.length > 0) {
        const account = this.stcAccounts[0];
        return `${account.slice(0, 3)}...${account.slice(-3)}`;
      }
      return "";
    },
  },
  methods: {
    connectToWallet() {
      const h = this.$createElement;
      const { connectWallet } = starMaskWallet(store, h);
      connectWallet();
    },
    renderBalance(balances) {
      if (!balances[CONSTANTS_TOKENS.STC]) return;
      return utilsFormat
        .formatBalance(balances[CONSTANTS_TOKENS.STC], 9)
        .toString();
    },
  },
};
</script>
