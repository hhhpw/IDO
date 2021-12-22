<template>
  <div class="home-list-single-item">
    <div class="home-list-single-item-mask">
      <div class="home-list-single-item-left">
        <p class="home-list-single-item-left-title">
          {{ $t(`${data.prdName}`) }}
        </p>
        <star-space :size="20"></star-space>
        <div class="home-list-single-item-left-label">
          <div
            v-for="(d, i) in data.labels"
            :key="i"
            class="home-list-single-item-left-label-item"
          >
            {{ d.label }}
          </div>
        </div>
        <star-space :size="20"></star-space>
        <div class="home-list-single-item-left-link">
          <svg-icon
            v-for="(d, i) in data.links"
            :key="i"
            class="home-list-single-item-left-link-item"
            :name="d.name"
          >
          </svg-icon>
        </div>
        <div class="home-list-single-item-left-infos">
          <star-item-cell :data="cellData('raiseTotal', data.payCurrency)">
          </star-item-cell>
          <star-item-cell
            :data="cellData('rate', data.assignCurrency, data.payCurrency)"
          >
          </star-item-cell>
          <star-item-cell :data="cellData('capTotal', data.assignCurrency)">
          </star-item-cell>
        </div>
      </div>
      <div
        class="home-list-single-item-right"
        :style="`background-image: url(${data.prdImg})`"
      >
        <div class="home-list-single-item-right-mask"></div>
        <div class="home-list-single-item-right-box">
          <img :src="data.prdImg" />
          <div
            v-if="cardType === 'open'"
            class="home-list-single-item-right-open-box"
          >
            <img src="../../assets/home/home-item-tag-bg.png" />
            <span>ON-GOING</span>
          </div>
          <div
            v-if="cardType === 'will'"
            class="home-list-single-item-right-will-box"
          >
            <span> Registration opens：</span>
            <span>{{ countdown }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import StarSpace from "@StarUI/StarSpace.vue";
import StarButton from "@StarUI/StarButton.vue";
import SvgIcon from "@components/SvgIcon/index.vue";
import StarItemCell from "@StarUI/StarItemCell.vue";
import mixinHome from "@/mixins/home.js";
import utilsNumber from "@utils/number.js";
import utilsTool from "@utils/tool";
import utilsDate from "@utils/date";
export default {
  components: { StarButton, StarSpace, SvgIcon, StarItemCell },
  mixins: [mixinHome],
  data() {
    return {
      countdown: null,
      timer: null,
    };
  },
  props: {
    colorsInfo: { type: Object },
    cardType: {
      type: String,
    },
    data: {
      type: Object,
    },
  },
  watch: {
    data: {
      handler(val) {
        if (val?.startTime) {
          this.setCountDown(val.startTime);
        }
      },
      deep: true,
    },
  },
  methods: {
    setCountDown(timestamp) {
      const times = this.formateDate(utilsDate.countdown(timestamp));
      this.countdown = `${times[0] ? times[0] + "D" : times[0]} ${times[1]} ${
        times[2]
      } ${times[3]}`;
      if (!this.countdown) {
        clearTimeout(this.timer);
        return;
      }
      this.timer = setTimeout(() => this.setCountDown(timestamp), 1000);
    },
    openURL(url) {
      utilsTool.openNewWindow(url);
    },
    cellData(key, currency, currencyB) {
      let name, text;
      if (key === "raiseTotal") {
        name = this.$t("总募资");
        text = this.data[key]
          ? `${
              utilsNumber.formatNumberMeta(this.data[key], { grouped: true })
                .text
            } ${currency}`
          : "- -";
      }
      if (key === "rate") {
        name = this.$t("兑换比例");
        text = this.data[key]
          ? `1 ${currency} = ${
              utilsNumber.formatNumberMeta(this.data[key], { grouped: true })
                .text
            } ${currencyB}`
          : "- -";
      }
      if (key === "capTotal") {
        name = this.$t("总销售量");
        text = this.data[key]
          ? `${
              utilsNumber.formatNumberMeta(this.data[key], { grouped: true })
                .text
            } ${currency}`
          : "- -";
      }
      return {
        title: name,
        text,
      };
    },
  },
  computed: {
    // ...mapGetters("StoreHome", ["cardTypeColorInfo"]),
  },
  beforeDestroy() {},
};
</script>
<style lang="scss" scoped>
.home-list-single-item {
  border: 1px solid #d6872d;
  height: 550px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1px;
  .home-list-single-item-mask {
    border: 5px solid;
    border-image: linear-gradient(
        13deg,
        rgba(214, 135, 45, 1),
        rgba(214, 135, 45, 0)
      )
      5 5;
    height: calc(100% - 20px);
    width: calc(100% - 20px);
    display: flex;
  }
  .home-list-single-item-left {
    margin-left: 30px;
    border: 1px solid red;
    position: relative;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    justify-content: center;
    width: 350px;
    color: #fff;
    .home-list-single-item-left-title {
      font-size: 20px;
    }
    .home-list-single-item-left-label {
      // margin-top: 20px;
      color: red;
      display: flex;
      .home-list-single-item-left-label-item {
        font-size: 12px;
        padding: 3px 10px;
        color: #d6872d;
        background: rgba(214, 135, 45, 0.11);
        border-radius: 2px;
        border: 1px solid rgba(214, 135, 45, 0.58);
        &:not(:first-child) {
          margin-left: 10px;
        }
      }
    }
    .home-list-single-item-left-link {
      display: flex;
      .home-list-single-item-left-link-item {
        width: 24px;
        height: 24px;
        margin-right: 10px;
        :hover {
          opacity: 0.7;
        }
      }
    }
    .home-list-single-item-left-infos {
      margin-top: 20px;
      font-family: Denmark;
    }
  }
  .home-list-single-item-right {
    display: flex;
    align-items: center;
    justify-content: center;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    width: 750px;
    position: relative;
    .home-list-single-item-right-mask {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.2);
      z-index: 2;
    }
    img {
      width: 500px;
      opacity: 1;
      position: relative;
    }
    .home-list-single-item-right-box {
      position: relative;
      z-index: 33;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
    }
    .home-list-single-item-right-open-box {
      position: relative;
      height: 100px;
      img {
        height: 100px;
      }
      span {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        color: #fec944;
        font-family: Denmark;
      }
    }
    .home-list-single-item-right-will-box {
      span {
        display: inline-block;
        margin-top: 40px;
        color: #fec944;
        font-family: Denmark;
      }
    }
  }
}
</style>
