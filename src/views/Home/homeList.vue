<template>
  <div
    class="home-list animate__animated animate__fadeInUp"
    :style="getBg(cardType)"
  >
    <slot name="title"> </slot>
    <p class="home-list-title">
      {{ renderTitle(cardType) }}
    </p>
    <slot name=""> </slot>
    <div
      class="home-list-content"
      :style="{ '--color': cardsInfo['common-color'] }"
    >
      <div
        class="home-list-item-wrap"
        v-for="(cardData, index) in data.cardInfoList"
        :key="index"
        @click="emit(cardData.cardType, cardData.id)"
        :style="`background-image: url(${cardsInfo['list-item-wrap-bg']})`"
      >
        <div
          v-if="cardData.attribute"
          class="home-list-item-wrap-labels"
          :style="
            mixinSetLabelsBg(
              cardType,
              cardData.attribute.length > 2 ? 2 : cardData.attribute.length
            )
          "
        >
          <span v-for="(l, ix) in cardData.attribute" :key="ix">
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
            {{ $t("constants.进行中") }}
            <span v-if="timers">
              {{ timers[index].countdowm }}
            </span>
            <!-- {{ cardData.tt }} -->
          </span>
          <span v-if="cardType === 'will'">
            {{ $t("constants.即将推出") }}
            {{ cardData.countdowm }}
          </span>
          <span v-if="cardType === 'closed'">
            {{ $t("constants.已经结束") }}
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
// import { mapGetters } from "vuex";
import { cloneDeep } from "lodash";
import { countdown } from "@utils/date.js";
// import dayjs from "dayjs";
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
    StartSpace,
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
    if (this.data.cardType === "open" || this.data.cardType === "will") {
      this.timers.map((d) => {
        this.$set(d, "countdowm", 0);
      });
      this.playTimer();
    }
  },
  methods: {
    renderTitle(type) {
      if (type === "open") {
        return this.$t("constants.进行中");
      }
      if (type === "will") {
        return this.$t("constants.即将推出");
      }
      if (type === "closed") {
        return this.$t("constants.已经结束");
      }
    },
    playTimer() {
      this.timer = setInterval(() => {
        for (let key in this.timers) {
          this.timers[key].countdowm = countdown(this.timers[key].time);
        }
      }, 1000);
    },
    emit(cardType, id) {
      console.log("cardType", cardType, "id", id);
      this.$emit("clickMethod", {
        cardType: cardType,
        cardId: id,
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
    console.log("====>");
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
