<template>
  <div class="start-card" :style="getBg(cardType)">
    <slot name="title"> </slot>
    <p class="start-card-title">{{ $t("我要买") }}</p>
    <slot name=""> </slot>
    <div class="start-card-content">
      <div
        class="start-card-item"
        :style="`background-image: url(${require(`../../assets/card/${cardType}-card-item.png`)})`"
      ></div>
      <div
        class="start-card-item"
        :style="`background-image: url(${require(`../../assets/card/${cardType}-card-item.png`)})`"
      ></div>
      <div
        class="start-card-item"
        :style="`background-image: url(${require(`../../assets/card/${cardType}-card-item.png`)})`"
      ></div>
      <div
        class="start-card-item"
        :style="`background-image: url(${require(`../../assets/card/${cardType}-card-item.png`)})`"
      ></div>
      <div
        class="start-card-item"
        :style="`background-image: url(${require(`../../assets/card/${cardType}-card-item.png`)})`"
      ></div>
    </div>
  </div>
</template>
<script>
const OPEN_BG = require("../../assets/card/open-wrap.png");
const WILL_BG = require("../../assets/card/will-wrap.png");
const CLOSED_BG = require("../../assets/card/closed-wrap.png");
import variables from "@styles/variables.scss";
export default {
  name: "StartCard",
  data() {
    return {
      OPEN_BG: OPEN_BG,
    };
  },
  props: {
    cardType: {
      type: String,
    },
  },
  // 'background-image': 'url(' require('../../assets/card/' + `${cardType}` +'-card-item') + ')'
  // 'background-image': url()
  // `url(${require(`../../assets/card/${t}-card-item`)})`
  mounted() {},
  methods: {},
  computed: {
    getBg() {
      return function (type) {
        let bg = null,
          color = null;
        switch (type) {
          case "open":
            bg = OPEN_BG;
            color = variables.openColor;
            break;
          case "will":
            bg = WILL_BG;
            color = variables.willColor;
            break;
          case "closed":
            bg = CLOSED_BG;
            color = variables.closedColor;
            break;
          default:
            break;
        }
        console.log("bg", bg);
        return {
          "background-image": `url(${bg})`,
          color,
        };
      };
    },
  },
  beforeDestroy() {},
};
</script>
<style lang="scss" scoped>
.start-card {
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 580px;
  width: 100%;
  overflow: hidden;
  padding: 30px 20px 40px;
  .start-card-title {
    font-size: 32px;
  }
  .start-card-content {
    overflow: hidden;
    margin-top: 50px;
    .start-card-item {
      background-size: 100% 100%;
      background-repeat: no-repeat;
      float: left;
      overflow: hidden;
      height: 500px;
      width: 30%;
      margin-bottom: 30px;
      margin-left: 3%;
    }
    .start-card-item:nth-child(3n + 1) {
      margin-left: 2%;
    }
  }
}
</style>
