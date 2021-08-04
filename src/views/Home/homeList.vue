<template>
  <div
    class="home-list animate__animated animate__fadeInUp"
    :style="getBg(cardType)"
    :set="(cardsInfo = cardTypeColorInfo(cardType))"
  >
    <slot name="title"> </slot>
    <p class="home-list-title">{{ $t("我要买") }} {{ cardType }}</p>
    <slot name=""> </slot>
    <div
      class="home-list-content"
      :style="{ '--color': cardsInfo['common-color'] }"
    >
      <div
        class="home-list-item-wrap"
        v-for="(cardData, index) in data.cardInfoList"
        :key="index"
        @click="emit"
        :style="`background-image: url(${cardsInfo['list-item-wrap-bg']})`"
      >
        <div
          v-if="cardData.flags"
          class="home-list-item-wrap-labels"
          :style="
            mixinSetLabelsBg(
              cardType,
              cardData && cardData.flags && cardData.flags.length
            )
          "
        >
          <span v-for="(l, ix) in cardData.flags" :key="ix">
            {{ $t(`${l}`) }}
          </span>
        </div>
        <home-list-item
          :cardType="cardType"
          :colorType="colorType"
          :colorsInfo="cardsInfo"
          :data="cardData"
        ></home-list-item>
        <start-space :size="40"></start-space>
        <div class="home-list-item-wrap-footer">
          <span v-if="cardType === 'open'">
            {{ $t("正在进行中") }}
            <!-- {{ countDown(1628070041834, data.cardInfoList).start() }} -->
          </span>
          <span v-if="cardType === 'will'">
            {{ $t("敬请期待") }}
          </span>
          <span v-if="cardType === 'closed'">
            {{ $t("已结束") }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
const OPEN_BG = require("../../assets/card/open-wrap.png");
const WILL_BG = require("../../assets/card/will-wrap.png");
const CLOSED_BG = require("../../assets/card/closed-wrap.png");
import variables from "@styles/variables.scss";
import homeListItem from "@components/Home/homeListItem.vue";
import StartSpace from "@startUI/StartSpace.vue";
import mixinHome from "@mixins/home.js";
import { mapGetters } from "vuex";
import dayjs from "dayjs";
export default {
  name: "homelist",
  data() {
    return {
      colorType: "",
      dayjs,
    };
  },
  mixins: [mixinHome],
  components: {
    homeListItem,
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
      });
    },
  },
  computed: {
    ...mapGetters("StoreHome", ["cardTypeColorInfo"]),
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
.home-list {
  background-repeat: no-repeat;
  background-size: 100% 100%;
  min-height: 550px;
  width: 100%;
  overflow: hidden;
  .home-list-title {
    font-size: 32px;
    margin-top: 30px;
    margin-left: 40px;
  }
  .home-list-content {
    cursor: pointer;
    overflow: hidden;
    margin-top: 20px;
    padding: 30px 40px;
    .home-list-item-wrap {
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
        transition: border ease 0.15s;
        border: 4px solid var(--color);
      }
      .home-list-item-wrap-labels {
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
    .home-list-item-wrap:nth-child(3n + 1) {
      margin-left: 0%;
    }
    .home-list-item-wrap-footer {
      margin-top: 8px;
      text-align: center;
      font-size: 16px;
    }
  }
}
</style>
