<template>
  <star-loading :data="detailCardInfo" :height="loadingH">
    <div class="star-container">
      <star-space :size="80"></star-space>
      <div class="detail-wrap" v-if="detailCardInfo">
        <star-space :size="30"></star-space>
        <div class="detail-wrap-content">
          <div class="detail-wrap-content-left">
            <detail-left-card
              @eventLoop="eventLoop"
              :detailCardInfo="detailCardInfo"
            >
            </detail-left-card>
          </div>
          <div class="detail-wrap-content-right">
            <detail-right-card :detailCardInfo="detailCardInfo">
            </detail-right-card>
          </div>
        </div>
      </div>
      <star-space :size="200"></star-space>
    </div>
  </star-loading>
</template>
<script>
import StarSpace from "@StarUI/StarSpace.vue";
import DetailRightCard from "@components/ProDetail/detailRightCard.vue";
import DetailLeftCard from "@components/ProDetail/detailLeftCard.vue";
import { mapActions, mapState } from "vuex";
import { Wallet } from "@contactLogic";
import { isNil, isUndefined } from "lodash";
import StarLoading from "@StarUI/StarLoading.vue";
import utilsStyle from "@utils/style";
export default {
  components: {
    StarSpace,
    DetailRightCard,
    DetailLeftCard,
    StarLoading,
  },
  data() {
    return {
      loadingH: utilsStyle.getLoadingHeight(),
    };
  },
  props: ["pid"],
  async mounted() {
    if (!this.pid) return;
    const res = await this.getProInfoById(this.pid);
    if (res === "ok") {
      // if (this.walletStatus !== "connected") {
      //   console.error("wallet not conneceted");
      //   return;
      // }
      this.getBanlance();
      this.loadInfo({
        stakeToken: this.detailCardInfo.currencyInfo.stakeAddress,
        payToken: this.detailCardInfo.currencyInfo.payAddress,
        assignToken: this.detailCardInfo.currencyInfo.assignAddress,
      });
    }
  },
  methods: {
    async getBanlance() {
      const params = {
        provider: this.stcProvider,
        account: this.stcAccounts[0],
        token: this.detailCardInfo.currencyInfo.stakeAddress,
      };
      // 获取钱包下特定币种S额度
      const balance = await Wallet.getAccountBalance(params);
      console.log("balance", balance);
      if (!isNil(balance) || !isUndefined(balance)) {
        this.$store.commit("StoreWallet/SET_WALLET_BALANCE", {
          [this.detailCardInfo.currencyInfo.stakeCurrency]: balance,
        });
      }
    },
    // 支付后轮询查询状态
    eventLoop() {
      // this.timer = setInterval(() => {
      //   this.loadInfo({
      //     stakeToken: this.currencyInfo.stakeAddress,
      //     payToken: this.currencyInfo.payAddress,
      //     assignToken: this.currencyInfo.assignAddress,
      //   });
      // }, 7000);
    },

    ...mapActions("StoreContracts", ["getStakeAmount", "loadInfo"]),
    ...mapActions("StoreProDetail", ["getProInfoById"]),
  },
  computed: {
    ...mapState("StoreProDetail", {
      detailCardInfo: (state) => state.detailCardInfo,
    }),
    ...mapState("StoreWallet", ["stcAccounts", "stcProvider", "walletStatus"]),
  },
  beforeDestroy() {},
};
</script>
<style lang="scss" scoped>
.detail-wrap {
  .detail-wrap-content {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    .detail-wrap-content-left {
      width: 36%;
      padding: 40px 20px 50px;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      background-image: url("../../assets/home/detail-left-bg.png");
    }
    .detail-wrap-content-right {
      width: 55%;
      background-repeat: no-repeat;
      background-image: url("../../assets/home/detail-right-bg.png");
      background-size: 100% 100%;
    }
  }
}
</style>
