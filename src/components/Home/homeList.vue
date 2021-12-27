<template>
  <div class="home-list-wrap wow animate__animated animate__fadeInUp">
    <div class="home-list-wrap-title">
      <p class="home-list-title">
        {{ renderTitle(cardType) }}
      </p>
    </div>
    <div class="home-list">
      <div class="home-list-content">
        <div v-for="(cardData, index) in data.cardInfoList" :key="index">
          <div v-if="data.cardInfoList.length === 1" @click="emit(cardData.id)">
            <single-item :cardType="cardType" :data="cardData"></single-item>
          </div>

          <div
            class="home-list-content-mul-item-wrap"
            @click="emit(cardData.id)"
            v-if="data.cardInfoList.length > 1"
          >
            <img
              src="../../assets/home/home-item-square.png"
              alt=""
              class="home-list-content-mul-item-wrap-square"
            />
            <mul-item
              :colorsInfo="cardsInfo"
              :cardType="cardType"
              :data="cardData"
            ></mul-item>
          </div>
        </div>
      </div>
    </div>
    <img class="banner-img" src="../../assets/home/homelist-bottom.png" />
  </div>
</template>
<script>
import mixinHome from "@mixins/home.js";
// import { cloneDeep, isUndefined } from "lodash";
import { WOW } from "wowjs";
/* eslint-disable*/
import animated from "animate.css";
import { Notification } from "element-ui";
import { mapState } from "vuex";
import mulItem from "./mulItem.vue";
import singleItem from "./singleItem.vue";

export default {
  name: "homelist",
  data() {
    return {
      timer: null,
      cardList: null,
      timers: null,
    };
  },
  mixins: [mixinHome],
  components: {
    mulItem,
    singleItem,
  },
  props: {
    cardsInfo: Object,
    cardType: {
      type: String,
    },
    data: {
      type: Object,
    },
  },
  mounted() {
    new WOW({
      live: false,
    }).init();
  },
  methods: {
    renderTitle(type) {
      if (type === "open") {
        // return "OPEN NOW";
        return this.$t("进行中");
      }
      if (type === "will") {
        return this.$t("即将推出");
      }
      if (type === "closed") {
        // return "CLOSED";
        return this.$t("已经结束");
      }
    },
    emit(cardId) {
      if (this.walletStatus !== "connected") {
        const h = this.$createElement;
        Notification({
          message: h(
            "div",
            {
              style: {
                position: "relative",
                "font-size": "14px",
                color: "#FFFFFF",
              },
            },
            [h("p", this.$t("wallet.connect-tip"))]
          ),
          duration: 2000,
          offset: 80,
          showClose: false,
        });
        return;
      }
      // 防止footer展露出来
      window.scrollTo(0, 500);
      this.$router.push({
        path: `/prodetail?pid=${cardId}`,
      });
    },
  },
  computed: {
    ...mapState("StoreWallet", {
      walletStatus: (state) => state.walletStatus,
    }),
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
};
</script>
<style lang="scss" scoped>
.banner-img {
  width: 100%;
  display: block;
}
.home-list-wrap {
  width: 100%;
  .home-list-content-mul-item-wrap-square {
    position: absolute;
    top: 0;
    right: 0;
    width: 87px;
    height: 20px;
    z-index: 88;
  }
  .home-list-title {
    font-size: 32px;
    padding-top: 20px;
    padding-left: 48px;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    height: 80px;
    color: #d6872d;
    font-family: Denmark;
    // color: var(--color);
    background-image: url("../../assets/home/homelist-top.png");
  }
}
.home-list {
  background-image: url("../../assets/home/homelist-middle.png");
  background-size: 100% 100%;
  background-repeat: repeat-y;
  min-height: 550px;
  width: 100%;
  overflow: hidden;
  // color: var(--color);
  .home-list-content {
    cursor: pointer;
    overflow: hidden;
    padding: 0px 48px;
    .home-list-content-mul-item-wrap:nth-child(3n + 1) {
      margin-left: 0px;
    }
    .home-list-content-mul-item-wrap {
      background-image: url("../../assets/home/home-mul-bg.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      border: 1px solid transparent;
      padding: 30px 30px 0px;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      float: left;
      box-sizing: border-box;
      overflow: hidden;
      height: 464px;
      width: 350px;
      margin-bottom: 20px;
      margin-left: 24px !important;
      position: relative;
      &:hover {
        transition: all ease 0.15s;
        border: 1px solid #d6872d;
      }
    }

    .home-list-item-wrap-footer {
      text-align: center;
      font-size: 16px;
      position: absolute;
      left: 0;
      bottom: 40px;
      right: 0;
      color: #d6872d;
    }
  }
}
</style>
