<template>
  <div class="start-card" :style="getBg(cardType)">
    {{ $listeners }}
    <slot name="title"> </slot>
    <p class="start-card-title">{{ $t("我要买") }}</p>
    <slot name=""> </slot>
    <div class="start-card-content">
      <div
        class="start-card-item-wrap"
        v-for="(cardData, index) in data.cardInfoList"
        :key="index"
        :style="`background-image: url(${require(`../../assets/card/${cardType}-card-item.png`)})`"
        @click="emit"
      >
        <start-card-item
          cardDetailTyoe="rough"
          :cardType="cardType"
          :colorType="colorType"
          :data="cardData"
        ></start-card-item>
        <start-space :size="50"></start-space>
        <div class="start-card-item-wrap-footer">on-going</div>
      </div>
      <!-- <div
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
      ></div> -->
    </div>
  </div>
</template>
<script>
const OPEN_BG = require("../../assets/card/open-wrap.png");
const WILL_BG = require("../../assets/card/will-wrap.png");
const CLOSED_BG = require("../../assets/card/closed-wrap.png");
import variables from "@styles/variables.scss";
import StartCardItem from "@startUI/StartCardItem.vue";
import StartSpace from "@startUI/StartSpace.vue";
export default {
  name: "StartCard",
  data() {
    return {
      colorType: "",
    };
  },
  components: {
    StartCardItem,
    StartSpace,
  },
  props: {
    cardType: {
      type: String,
    },
    data: {
      type: Object,
    },
  },
  // 'background-image': 'url(' require('../../assets/card/' + `${cardType}` +'-card-item') + ')'
  // 'background-image': url()
  // `url(${require(`../../assets/card/${t}-card-item`)})`
  mounted() {},
  methods: {
    emit() {
      this.$emit("clickMethod", {
        cardType: this.cardType,
        colorType: this.colorType,
      });
    },
  },
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
        this.colorType = color;
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
  padding-left: 45px;
  // border: 2px solid red;
  .start-card-title {
    font-size: 32px;
  }
  .start-card-content {
    overflow: hidden;
    margin-top: 50px;
    .start-card-item-wrap {
      padding-left: 30px;
      padding-top: 60px;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      float: left;
      box-sizing: content-box;
      overflow: hidden;
      height: 500px;
      width: 29%;
      margin-bottom: 30px;
      margin-left: 2%;
    }
    .start-card-item-wrap:nth-child(3n + 1) {
      margin-left: 0%;
    }
    .start-card-item-wrap-footer {
      text-align: center;
      font-size: 16px;
      margin-left: -10%;
    }
  }
}
</style>
