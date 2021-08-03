<template>
  <div class="start-home">
    <div class="start-home-banner">
      <div class="start-home-banner-content">
        <p class="start-home-banner-title">STATPAD</p>
        <p class="start-home-banner-subtitle">{{ $t("你的第一步stc") }}</p>
        <div class="start-home-banner-btns">
          <start-button blborder class="start-home-banner-btns-btn">
            {{ $t("加入我们") }}
          </start-button>
          <start-button trborder dark class="start-home-banner-btns-btn">
            {{ $t("购买STC") }}
          </start-button>
        </div>
        <p class="start-home-banner-desc">{{ $t("你的第一步stc") }}</p>
      </div>
      <support> </support>
    </div>
    <div class="start-container">
      <template v-if="status === 'home-list'">
        <start-card
          v-for="(d, index) in cardData"
          :key="index"
          :cardType="d.cardType"
          :data="d"
          style="margin-top: 70px"
          @clickMethod="clickMethod"
        ></start-card>
      </template>
      <template v-if="status === 'home-detail'">
        <home-detail></home-detail>
      </template>
    </div>
    <start-space :size="120"></start-space>
  </div>
</template>
<script>
import StartCard from "@startUI/StartCard.vue";
import StartButton from "@startUI/StartButton.vue";
import support from "./support.vue";
import { cardData } from "@startUI/mock.js";
import HomeDetail from "./detail.vue";
import { mapState } from "vuex";
import StartSpace from "@startUI/StartSpace.vue";
export default {
  data() {
    return {
      cardData,
      // cardInfo: {},
      colorInfo: {},
      // stautus: "home-list",
    };
  },
  components: {
    StartCard,
    StartButton,
    support,
    HomeDetail,
    StartSpace,
  },
  mounted() {},
  methods: {
    clickMethod(value) {
      this.$store.commit(
        "StoreHome/STORE_HOME_CHANGE_STATUS",
        Object.assign(
          {},
          { status: "home-detail" },
          { cardType: value.cardType }
        )
      );
    },
  },
  computed: {
    ...mapState("StoreHome", {
      status: (state) => state.status,
    }),
    ...mapState("StoreApp", {
      language: (state) => state.language,
    }),
  },

  beforeDestroy() {},
};
</script>
<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
.ddd {
  padding: 10px;
  background: #000;
  display: flex;
  justify-content: center;
}
.aa {
  font-family: Rigelstar;
  color: red;
}

.start-home-banner {
  width: 100%;
  background-image: url("../../assets/home/bg.png");
  background-size: 100% 100%;
  // background-color: green;
  // border: 2px solid yellow;
  overflow: hidden;
  background-repeat: no-repeat;
  height: 740px;
  background-origin: content-box;
  position: relative;
  .start-home-banner-content {
    margin-left: 12%;
    margin-top: 130px;
    color: #fff;
    .start-home-banner-title {
      @include fontRigelstar();
      font-weight: 400;
      font-size: 100px;
    }
    .start-home-banner-subtitle {
      font-size: 26px;
      margin-top: 25px;
    }
    .start-home-banner-btns {
      margin-top: 30px;
      .start-home-banner-btns-btn {
        width: 260px;
        height: 80px;
        line-height: 80px;
        font-size: 30px;
        font-weight: bold;
      }
      .start-home-banner-btns-btn + .start-home-banner-btns-btn {
        margin-left: 30px;
      }
    }
    .start-home-banner-desc {
      font-size: 14px;
      margin-top: 30px;
    }
  }
}
</style>
