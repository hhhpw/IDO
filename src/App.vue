<template>
  <div id="app">
    <star-header></star-header>
    <div class="wrap">
      <router-view></router-view>
    </div>
    <star-footer></star-footer>
    <star-wallet-net-work-dialog
      :dialogParams="{
        dialogVisible: netWorkDialogVisible,
      }"
    ></star-wallet-net-work-dialog>
  </div>
</template>
<script>
/* eslint-disable */
import StarHeader from "@StarUI/StarHeader";
import StarFooter from "@StarUI/StarFooter";
// import store from "@store";
import { mapState } from "vuex";
import starMaskWallet from "@starMaskWallet";
import store from "@store";
import StarWalletNetWorkDialog from "@StarUI/StarWalletNetWorkDialog.vue";
import constants_starmask from "@constants/starmask";
export default {
  data() {
    return {
      netWorkDialogVisible: false,
    };
  },
  components: {
    StarHeader,
    StarFooter,
    StarWalletNetWorkDialog,
  },
  computed: {
    ...mapState("StoreWallet", {
      walletStatus: (state) => state.walletStatus,
      stcChianID: (state) => state.stcChianID,
    }),
  },
  watch: {
    stcChianID: {
      handler(val) {
        if (val === constants_starmask.MAIN_CHIA_ID) {
          this.netWorkDialogVisible = false;
        } else {
          this.netWorkDialogVisible = true;
        }
      },
    },
  },
  mounted() {
    const h = this.$createElement;
    const { connectWallet, isStarMaskInstalled, walletInit } = starMaskWallet(
      store,
      h
    );
    const insStalled = isStarMaskInstalled();
    if (!insStalled) return;
    walletInit();
    if (this.walletStatus !== "connected") {
      connectWallet();
    }
  },
};
</script>
<style lang="scss" scoped>
.wrap {
  padding-top: 80px;
}
</style>
