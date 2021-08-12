<template>
  <div class="detail-wrap animate__animated animate__fadeInUp">
    <star-space :size="30"></star-space>
    <div class="detail-wrap-content">
      <div
        class="detail-wrap-content-left"
        :style="`background-image: url(${require(`../../assets/home/${detailCardType}-left-bg.png`)})`"
      >
        <detail-left-card @eventLoop="eventLoop"> </detail-left-card>
      </div>
      <div
        class="detail-wrap-content-right"
        :style="`background-image: url(${require(`../../assets/home/${detailCardType}-right-bg.png`)})`"
      >
        <detail-right-card> </detail-right-card>
      </div>
    </div>
  </div>
</template>
<script>
import StarSpace from "@StarUI/StarSpace.vue";
import DetailRightCard from "@components/Home/detailRightCard.vue";
import DetailLeftCard from "@components/Home/detailLeftCard.vue";
import { mapActions, mapState } from "vuex";
export default {
  components: {
    StarSpace,
    DetailRightCard,
    DetailLeftCard,
  },
  data() {
    return {
      inputValue: "",
    };
  },
  // props: {
  //   cardInfo: Object,
  // },
  mounted() {
    // console.log("cardInfo", this.cardInfo);
    // this.loadInfo();
    // this.getStakeAmount();
    // this.getContractsProjectInfo("STC");
    // this.loadInfo({ currency: "DUMMY" });
    this.loadInfo({ token: this.currencyToken });
    // console.log("stcAccounts", this.stcAccounts);
    // if (!this.stcAccounts || this.stcAccounts.length < 1) {
    //   console.error("账号不存在");
    // } else {
    //   this.getStakeAmount(this.stcAccounts[0]);
    // }
  },
  methods: {
    // 支付后轮询查询状态
    eventLoop() {
      this.timer = setInterval(() => {
        this.loadInfo({ token: this.currencyToken });
      }, 7000);
    },
    inputEvent(e) {
      this.inputValue = e;
    },
    ...mapActions("StoreContracts", [
      "getStakeAmount",
      "getContractsProjectInfo",
      "loadInfo",
    ]),
  },
  computed: {
    ...mapState("StoreHome", {
      detailCardType: (state) => state.detailCardType,
      currencyToken: (state) => state.currencyToken,
    }),
    // ...mapState("StoreWallet", {
    //   stcAccounts: (state) => state.stcAccounts,
    // }),
  },
  beforeDestroy() {},
};
</script>
<style lang="scss" scoped>
.detail-wrap {
  padding-top: 40px;
  .detail-wrap-content {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    .detail-wrap-content-left {
      width: 36%;
      padding: 40px 20px 50px;
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
    .detail-wrap-content-right {
      width: 55%;
      // height: 600px;
      background-repeat: no-repeat;
      background-image: url("../../assets/home/open-right-bg.png");
      background-size: 100% 100%;
    }
  }
  // color: red;
  // font-size: 100x;
}
</style>
