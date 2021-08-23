<template>
  <div class="home">
    <div class="home-banner">
      <div class="red-wrap">
        <img src="../../assets/home/red.png" class="light-img" />
      </div>
      <div class="home-banner-wrap star-container">
        <div class="home-banner-content">
          <p class="home-banner-title">ATLASPAD</p>
          <p class="home-banner-subtitle">
            {{ $t("连接stc生态第一步") }}
          </p>
          <div class="home-banner-btns">
            <star-button
              blborder
              class="home-banner-btns-btn"
              @click="utilsTool.openNewWindow('https://t.me/atlaspad')"
            >
              {{ $t("加入我们") }}
            </star-button>
            <star-button
              trborder
              dark
              class="home-banner-btns-btn"
              @click="
                utilsTool.openNewWindow(
                  'https://medium.com/@atlaspad/how-to-acquire-stc-e1139df4d77a'
                )
              "
            >
              {{ $t("购买STC") }}
            </star-button>
          </div>
        </div>
        <img src="../../assets/home/man.png" />
      </div>
      <div class="green-wrap">
        <img src="../../assets/home/green.png" class="light-img" />
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
          :cardsInfo="cardTypeColorInfo(d.cardType)"
        ></home-list>
      </div>
    </star-loading>

    <star-space :size="120"></star-space>
  </div>
</template>
<script>
import HomeList from "./homeList.vue";
import StarButton from "@StarUI/StarButton.vue";
import { mapState, mapGetters, mapActions } from "vuex";
import StarSpace from "@StarUI/StarSpace.vue";
import StarLoading from "@StarUI/StarLoading.vue";
import utilsTool from "@utils/tool";

export default {
  data() {
    return {
      cardTTTData: null,
      colorInfo: {},
      loading: true,
      utilsTool,
    };
  },
  components: {
    StarButton,
    HomeList,
    StarSpace,
    StarLoading,
  },
  mounted() {
    this.getDataList();
  },
  methods: {
    ...mapActions("StoreHome", ["getDataList", "setDetailProjectInfo"]),
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
      stcProvider: (state) => state.stcProvider,
    }),
  },

  beforeDestroy() {},
};
</script>
<style>
@keyframes myani {
  0% {
    opacity: 1;
  }
  25% {
    opacity: 0.6;
  }
  50% {
    opacity: 0.3;
  }
  70% {
    opacity: 0.6;
  }
  100% {
    opacity: 0.9;
  }
}

@keyframes myaniGreen {
  0% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
  70% {
    opacity: 0.5;
  }
  100% {
    opacity: 0.3;
  }
}

.red-wrap {
  animation-name: myani;
  animation-duration: 3s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
  position: absolute;
  left: 0;
  top: 0;
}

.green-wrap {
  animation-name: myaniGreen;
  animation-duration: 3s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
  position: absolute;
  right: 0;
  bottom: 0;
}
</style>
<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
.light-img {
  width: 100%;
  height: 100%;
}

.home-banner {
  z-index: 998;
  width: 100%;
  background-image: url("../../assets/home/nbg.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
  overflow: hidden;
  height: 600px;
  position: relative;
  .home-banner-wrap {
    height: 100%;
    margin: 0 auto;
    align-items: center;
    display: flex;
    justify-content: space-between;
  }

  .home-banner-content {
    display: inline-block;

    color: #fff;
    .home-banner-title {
      @include fontRigelstar();
      font-weight: 400;
      font-size: 70px;
    }
    .home-banner-subtitle {
      font-size: 22px;
      margin-top: 25px;
    }
    .home-banner-btns {
      margin-top: 30px;
      .home-banner-btns-btn {
        width: 150px;
        height: 50px;
        line-height: 50px;
        font-size: 26px;
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
