<template>
  <div class="home">
    <div class="home-banner">
      <div class="home-banner-content">
        <p class="home-banner-title">ATLASPAD</p>
        <p class="home-banner-subtitle">
          {{ $t("连接stc生态第一步") }}
        </p>
        <div class="home-banner-btns">
          <star-button blborder class="home-banner-btns-btn">
            {{ $t("加入我们") }}
          </star-button>
          <star-button trborder dark class="home-banner-btns-btn">
            {{ $t("购买STC") }}
          </star-button>
        </div>
        <!-- <p class="home-banner-desc">{{ $t("你的第一步stc") }}</p> -->
      </div>
      <support> </support>
    </div>
    <div class="star-container">
      <template v-if="status === 'home-list'">
        <home-list
          v-for="(d, index) in cardData"
          :key="index"
          :cardType="d.cardType"
          :data="d"
          style="margin-top: 70px"
          :cardsInfo="cardTypeColorInfo(d.cardType)"
          @clickMethod="clickMethod"
        ></home-list>
      </template>
      <template v-if="status === 'home-detail'">
        <home-detail></home-detail>
      </template>
    </div>
    <star-space :size="120"></star-space>
  </div>
</template>
<script>
import HomeList from "./homeList.vue";
import StarButton from "@StarUI/StarButton.vue";
import support from "./support.vue";
import { Notification } from "element-ui";
import HomeDetail from "./detail.vue";
import { mapState, mapGetters, mapActions } from "vuex";
import StarSpace from "@StarUI/StarSpace.vue";
export default {
  data() {
    return {
      cardTTTData: null,
      colorInfo: {},
      loading: true,
    };
  },
  components: {
    StarButton,
    support,
    HomeDetail,
    HomeList,
    StarSpace,
  },
  mounted() {
    this.getDataList();
  },
  methods: {
    ...mapActions("StoreHome", ["getDataList"]),
    clickMethod(value) {
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
      this.$store.commit(
        "StoreHome/STORE_HOME_CHANGE_STATUS",
        Object.assign({}, { status: "home-detail" }, { ...value })
      );
    },
  },
  computed: {
    ...mapGetters("StoreHome", ["cardTypeColorInfo"]),
    ...mapState("StoreHome", {
      status: (state) => state.status,
      cardData: (state) => state.cardData,
    }),
    ...mapState("StoreApp", {
      language: (state) => state.language,
    }),
    ...mapState("StoreWallet", {
      walletStatus: (state) => state.walletStatus,
    }),
  },

  beforeDestroy() {},
};
</script>
<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
// .home-banner

.home-banner {
  width: 100%;
  background-image: url("../../assets/home/bg.png");
  background-size: 100% 100%;
  overflow: hidden;
  background-repeat: no-repeat;
  height: 740px;
  background-origin: content-box;
  position: relative;
  .home-banner-content {
    margin-left: 12%;
    margin-top: 130px;
    color: #fff;
    .home-banner-title {
      @include fontRigelstar();
      font-weight: 400;
      font-size: 100px;
    }
    .home-banner-subtitle {
      font-size: 26px;
      margin-top: 25px;
    }
    .home-banner-btns {
      margin-top: 30px;
      .home-banner-btns-btn {
        width: 260px;
        height: 80px;
        line-height: 80px;
        font-size: 30px;
        font-weight: bold;
      }
      .home-banner-btns-btn + .home-banner-btns-btn {
        margin-left: 30px;
      }
    }
    .home-banner-desc {
      font-size: 14px;
      margin-top: 30px;
    }
  }
}
@media screen and (max-width: 1440px) {
  .home-banner {
    height: 600px;
    .home-banner-content {
      .home-banner-title {
        font-size: 80px;
      }
      margin-top: 100px;
      .home-banner-btns {
        .home-banner-btns-btn {
          width: 180px;
          height: 60px;
          line-height: 60px;
        }
      }
    }
  }
}
</style>
