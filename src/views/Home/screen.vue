<template>
  <div class="home-banner-content">
    <img
      src="../../assets/home/banner-logo.png"
      class="home-banner-content-logo"
    />
    <p>{{ $t("通往Starcoin游戏元宇宙的第一站") }}</p>
    <div class="home-banner-btns">
      <star-button
        blborder
        class="home-banner-btns-btn"
        @click="utilsTool.openNewWindow('https://discord.gg/qUgmuQNzgF')"
      >
        {{ $t("关注我们") }}
      </star-button>
      <star-button
        trborder
        dark
        class="home-banner-btns-btn"
        @click="
          () => {
            language === 'en'
              ? utilsTool.openNewWindow(
                  'https://kiko-verse.gitbook.io/kiko-verse/products/kgstarter'
                )
              : utilsTool.openNewWindow(
                  'https://kiko-verse.gitbook.io/kiko-yuan-yu-zhou/chan-pin/kgstarter'
                );
          }
        "
      >
        {{ $t("了解更多") }}
      </star-button>
    </div>

    <div class="home-banner-content-item-wrap">
      <div
        v-for="(d, i) in new Array(3)"
        :key="i"
        class="home-banner-content-item"
      >
        <img :src="require(`../../assets/home/home-item-${i + 1}.png`)" />
        <p>{{ $t(`home-item-${i + 1}-desc`) }}</p>
      </div>
    </div>
  </div>
</template>
<script>
import StarButton from "@StarUI/StarButton.vue";
import utilsTool from "@utils/tool";
import { mapState } from "vuex";
export default {
  data() {
    return {
      utilsTool,
    };
  },
  computed: {
    ...mapState("StoreApp", {
      language: (state) => state.language,
    }),
  },
  components: {
    StarButton,
  },
};
</script>
<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
.home-banner-content {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  .home-banner-content-logo {
    width: 180px;
    margin-top: 100px;
    margin-bottom: 20px;
  }

  color: #fff;
  .home-banner-title {
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
      height: 30px;
      line-height: 30px;
      font-size: 22px;
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
  .home-banner-content-item-wrap {
    display: flex;
    justify-content: space-around;
    width: calc(100% - 100px);
    .home-banner-content-item {
      background-image: url("../../assets/home/home-item.png");
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center center;
      height: 200px;
      width: 280px;
      display: flex;
      align-items: center;
      padding: 0px 20px;
      img {
        width: 80px;
        height: 80px;
      }
      p {
        font-size: 14px;
        padding: 0px 10px;
      }
    }
  }
}
</style>
