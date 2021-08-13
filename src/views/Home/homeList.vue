<template>
  <div
    class="home-list animate__animated animate__fadeInUp"
    :style="getBg(cardType)"
  >
    <p class="home-list-title">
      {{ renderTitle(cardType) }}
    </p>
    <div
      class="home-list-content"
      :style="{ '--color': cardsInfo['common-color'] }"
    >
      <div
        class="home-list-item-wrap"
        v-for="(cardData, index) in data.cardInfoList"
        :key="index"
        @click="emit(cardData.cardType, cardData.id, cardData.currencyInfo)"
        :style="`background-image: url(${cardsInfo['list-item-wrap-bg']})`"
      >
        <div
          v-if="cardData.attributes"
          class="home-list-item-wrap-labels"
          :style="
            mixinSetLabelsBg(
              cardType,
              cardData.attributes.length > 2 ? 2 : cardData.attributes.length
            )
          "
        >
          <span v-for="(l, ix) in cardData.attributes.slice(0, 2)" :key="ix">
            {{ $t(`${l.name}`) }}
          </span>
        </div>
        <home-list-item
          :cardType="cardType"
          :colorType="colorType"
          :colorsInfo="cardsInfo"
          :data="cardData"
        ></home-list-item>
        <div class="home-list-item-wrap-footer">
          <span v-if="cardType === 'open'">
            {{ $t("进行中") }}
          </span>
          <span v-if="cardType === 'will'">
            {{ $t("即将推出") }}

            {{ timers && timers[index].countdown }}
          </span>
          <span v-if="cardType === 'closed'">
            {{ $t("已经结束") }}
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
import mixinHome from "@mixins/home.js";
import { cloneDeep, isUndefined } from "lodash";
import { countdown } from "@utils/date.js";
export default {
  name: "homelist",
  data() {
    return {
      colorType: "",
      timer: null,
      tt: 0,
      cardList: null,
      timers: null,
    };
  },
  mixins: [mixinHome],
  components: {
    homeListItem,
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
    this.timers = cloneDeep(this.data.cardInfoList);
    if (this.data.cardType === "will") {
      this.timers.map((d) => {
        this.$set(d, "countdown", d.startTime);
      });
      this.playTimer();
    }
  },
  methods: {
    renderTitle(type) {
      if (type === "open") {
        return this.$t("进行中");
      }
      if (type === "will") {
        return this.$t("即将推出");
      }
      if (type === "closed") {
        return this.$t("已经结束");
      }
    },
    formateDate(obj) {
      const { day, hour, minute, second } = obj;
      if (
        isUndefined(day) &&
        isUndefined(hour) &&
        isUndefined(minute) &&
        isUndefined(second)
      ) {
        // window.location.reload();
        return;
      }
      return `${day === 0 ? "" : `${day}D`} ${hour}:${minute}:${second}`;
    },
    playTimer() {
      this.timer = setInterval(() => {
        for (let key in this.timers) {
          this.timers[key].countdown = this.formateDate(
            countdown(this.timers[key].startTime)
          );
        }
      }, 1000);
    },
    emit(cardType, id, currencyInfo) {
      this.$emit("clickMethod", {
        cardType: cardType,
        cardId: id,
        currencyInfo,
        // token: address,
        // currencyName: currency,
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
  beforeDestroy() {
    clearInterval(this.timer);
  },
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
    padding: 30px 48px;
    .home-list-item-wrap {
      border: 3px solid transparent;
      padding: 60px 30px 0px;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      float: left;
      box-sizing: border-box;
      overflow: hidden;
      height: 544px;
      width: 374px;
      margin-bottom: 20px;
      margin-left: 15px;
      position: relative;
      &:hover {
        transition: all ease 0.15s;
        border: 3px solid var(--color);
      }
      .home-list-item-wrap-labels {
        position: absolute;
        top: 0;
        right: 0;
        background-size: 100% 100%;
        height: 26px;
        background-repeat: no-repeat;
        // left: 5px;
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
      text-align: center;
      font-size: 16px;
      position: absolute;
      left: 0;
      bottom: 40px;
      right: 0;
    }
  }
}
</style>
