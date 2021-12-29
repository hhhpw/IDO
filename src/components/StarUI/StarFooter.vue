<template>
  <div class="star-footer animate__animated animate__fadeInUp">
    <div class="star-footer-header">
      <div class="star-footer-left">
        <img
          src="../../assets/header/logo.png"
          class="star-footer-left-title"
        />
      </div>
      <div class="star-footer-right">
        <div v-for="(d, index) in data" :key="index">
          <p class="star-footer-right-title">
            {{ $t(d.name) }}
          </p>
          <p
            v-for="(dd, ii) in d.list"
            :key="ii"
            class="star-footer-right-item"
            @click="pushPage(dd)"
          >
            {{ $t(dd.name) }}
          </p>
        </div>
      </div>
    </div>
    <div class="star-footer-bottom">
      <p>
        <span>Terms & Conditions</span>
        <span style="margin-left: 20px">Privacy policy</span>
      </p>
      <!-- <p>Designed by KGStarterTEAM</p> -->
    </div>
  </div>
</template>
<script>
import utilsTool from "@utils/tool";
import { mapState } from "vuex";
export default {
  data() {
    return {
      data: [
        {
          name: "Social",
          list: [
            { name: "Twitter", url: "https://twitter.com/Kiko_verse" },
            { name: "Medium", url: "https://medium.com/@kikoresearch" },
            {
              name: "Telegram",
              url: "https://t.me/kikoswap",
              enURL: "https://t.me/kikoverseEnglish",
            },
            {
              name: "Discord",
              url: "https://discord.gg/rmyQh2ncY7",
            },
          ],
        },
        {
          name: "KGStarter",
          list: [
            {
              name: "Whitepaper",
              url: "https://kiko-verse.gitbook.io/kiko-yuan-yu-zhou/chan-pin/kgstarter",
              enURL:
                "https://kiko-verse.gitbook.io/kiko-verse/products/kgstarter",
            },
          ],
        },
        {
          name: "Get In Touch",
          list: [{ name: "support@kikoverse.com", url: null }],
        },
      ],
    };
  },
  methods: {
    pushPage(item) {
      if (this.language === "zh" && item.url) {
        utilsTool.openNewWindow(item.url);
        return;
      }
      if (this.language === "en" && item.enURL) {
        utilsTool.openNewWindow(item.enURL);
      }
    },
  },
  computed: {
    ...mapState("StoreApp", {
      language: (state) => state.language,
    }),
  },
};
</script>
<style lang="scss" scoped>
@import "~@/styles/variables.scss";
.star-footer {
  background: #292929;
  text-align: center;
  color: #fff;
  padding: 70px 90px 30px;
  position: relative;
  height: 300px;
  animation-duration: 1s;
  .star-footer-header {
    display: flex;
    .star-footer-left {
      flex: 1;
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      align-items: flex-start;
      text-align: left;
      .star-footer-left-title {
        width: 180px;
      }
      .star-footer-left-desc {
        display: flex;
        color: $text_gray_color;
        span {
          font-size: 14px;
        }
        span + span {
          margin-left: 100px;
        }
      }
    }
    .star-footer-right {
      flex: 1;
      display: flex;
      justify-content: space-around;
      .star-footer-right-title {
        margin-bottom: 30px;
        font-size: 20px;
      }
      .star-footer-right-item {
        margin-bottom: 10px;
        font-size: 14px;
        color: $text_gray_color;
        &:hover {
          cursor: pointer;
        }
      }
    }
  }

  .star-footer-bottom {
    margin-top: 100px;
    display: flex;
    justify-content: space-between;
  }
}
</style>
