<template>
  <div>dasda</div>
</template>
<script>
import { mapActions, mapState } from "vuex";

export default {
  components: {},
  data() {
    return {
      inputValue: "",
    };
  },
  props: ["pid"],
  mounted() {
    if (!this.pid) return;
    this.getProInfoById(this.pid);
  },
  methods: {
    ...mapActions("StoreProDetail", ["getProInfoById"]),
  },
  computed: {
    ...mapState("StoreHome", {
      detailCardType: (state) => state.detailCardType,
      currencyInfo: (state) => state.currencyInfo,
    }),
    ...mapState("StoreWallet", ["stcAccounts", "stcProvider", "walletStatus"]),
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
      background-repeat: no-repeat;
      background-image: url("../../assets/home/open-right-bg.png");
      background-size: 100% 100%;
    }
  }
}
</style>
