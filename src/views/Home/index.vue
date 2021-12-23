<template>
  <div class="home">
    <div class="home-banner">
      <div class="home-banner-wrap star-container">
        <screen></screen>
      </div>
      <!-- <support> </support> -->
    </div>
    <star-loading :data="cardData">
      <div class="star-container">
        <home-list
          v-for="(d, index) in cardData"
          :key="index"
          :cardType="d.cardType"
          :data="d"
          style="margin-top: 70px"
        ></home-list>
      </div>
    </star-loading>

    <star-space :size="120"></star-space>

    <star-wallet-dialog></star-wallet-dialog>
  </div>
</template>
<script>
// import HomeList from "./homeList.vue";
import HomeList from "@components/Home/homeList.vue";
// import StarButton from "@StarUI/StarButton.vue";
import { mapState, mapActions } from "vuex";
import StarSpace from "@StarUI/StarSpace.vue";
import StarLoading from "@StarUI/StarLoading.vue";
import Screen from "./screen.vue";
import StarWalletDialog from "@StarUI/StarWalletDialog.vue";
export default {
  data() {
    return {
      cardTTTData: null,
      colorInfo: {},
      loading: true,
    };
  },
  components: {
    Screen,
    HomeList,
    StarSpace,
    StarLoading,
    StarWalletDialog,
  },
  mounted() {
    this.getDataList();
  },
  methods: {
    ...mapActions("StoreHome", ["getDataList", "setDetailProjectInfo"]),
  },
  computed: {
    ...mapState("StoreHome", {
      status: (state) => state.status,
      cardData: (state) => state.cardData,
    }),
    ...mapState("StoreApp", {
      language: (state) => state.language,
    }),
    ...mapState("StoreWallet", {
      walletStatus: (state) => state.walletStatus,
      stcProvider: (state) => state.stcProvider,
    }),
  },

  beforeDestroy() {},
};
</script>
<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
.home-banner {
  z-index: 998;
  width: 100%;
  background-image: url("../../assets/home/nbg.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  overflow: hidden;
  height: 600px;
  position: relative;
  padding: 20px;
  .home-banner-wrap {
    border: 1px solid red;
    height: 100%;
    margin: 0 auto;
    align-items: center;
    display: flex;
    justify-content: space-between;
    background-image: url("../../assets/home/content-wrap.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: center center;
  }
}
@media screen and (max-width: 1440px) {
  .home-banner {
    height: 600px;
    .home-banner-content {
      margin-top: -40px;
      .home-banner-btns {
        .home-banner-btns-btn {
          font-size: 26px !important;
        }
      }
    }
  }
}
</style>
