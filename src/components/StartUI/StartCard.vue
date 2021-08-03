<template>
  <div class="start-card" :style="getBg(cardType)">
    <slot name="title"> </slot>
    <p class="start-card-title">{{ $t("我要买") }}</p>
    <slot name=""> </slot>
    <div class="start-card-content" :style="{ '--color': colorType }">
      <div
        class="start-card-item-wrap"
        v-for="(cardData, index) in data.cardInfoList"
        :key="index"
        :style="`background-image: url(${require(`../../assets/card/${cardType}-card-item.png`)})`"
        @click="emit"
      >
        {{ cardData && cardData.flags && cardData.flags.length }}
        <div
          v-if="cardData.flags"
          class="start-card-item-wrap-labels"
          :style="
            setLabelsBg(
              cardType,
              cardData && cardData.flags && cardData.flags.length
            )
          "
        >
          <span v-for="(l, ix) in cardData.flags" :key="ix">
            {{ $t(`${l}`) }}
          </span>
          <!-- <img src="../../assets/home/33.png" class="xxx" /> -->
          <!-- :style="`background-image: url(${require(`../../assets/home/${cardType}-card-label-${cardData.flags.length}.png`)})`" -->
        </div>

        <start-card-item
          cardDetailTyoe="rough"
          :cardType="cardType"
          :colorType="colorType"
          :data="cardData"
        ></start-card-item>
        <start-space :size="40"></start-space>
        <div class="start-card-item-wrap-footer">on-going</div>
      </div>
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
    setLabelsBg() {
      return function (type, len) {
        if (len && Number(len) > 0)
          return {
            "background-image": `url(${require(`../../assets/home/${type}-card-label-${len}.png`)})`,
          };
      };
    },
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
  background-size: 100% 100%;
  min-height: 550px;
  width: 100%;
  overflow: hidden;
  .start-card-title {
    font-size: 32px;
    margin-top: 30px;
    margin-left: 40px;
  }
  .start-card-content {
    cursor: pointer;
    overflow: hidden;
    margin-top: 20px;
    padding: 30px 40px;
    .start-card-item-wrap {
      padding: 60px 30px 0px;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      float: left;
      box-sizing: border-box;
      overflow: hidden;
      height: 550px;
      width: 380px;
      margin-bottom: 20px;
      margin-left: 14px;
      position: relative;
      &:hover {
        border: 4px solid var(--color);
      }
      .start-card-item-wrap-labels {
        position: absolute;
        top: 0;
        right: 0;
        background-size: 100% 100%;
        height: 26px;
        background-repeat: no-repeat;
        span {
          position: relative;
          top: -2px;
          height: 100%;
          display: inline-block;
          width: 94px;
          text-align: center;
          font-size: 12px;
        }
      }
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
