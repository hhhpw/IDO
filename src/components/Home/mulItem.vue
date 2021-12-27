<template>
  <div class="home-list-mul-item">
    <div class="home-list-mul-item-rough">
      <div class="home-list-mul-item-rough-header">
        <img :src="data.prdImg" />
        <star-space :size="20"></star-space>

        <star-item-cell cellType="vertical">
          <!-- 项目logo -->
          <!-- <img :src="data.icon" /> -->
          <span>{{ $t(`${data.prdName}`) }}</span>
          <span>({{ $t(`${data.assignCurrency}`) }})</span>
        </star-item-cell>
      </div>
      <star-space :size="20"></star-space>
      <div class="home-list-single-item-label">
        <div
          v-for="(d, i) in data.labels"
          :key="i"
          class="home-list-single-item-label-item"
        >
          {{ d.label }}
        </div>
      </div>
      <star-space :size="10"></star-space>
      <div class="home-list-mul-item-link">
        <svg-icon
          v-for="(d, i) in data.links"
          :key="i"
          class="home-list-mul-item-link-item"
          :name="d.name"
        >
        </svg-icon>
      </div>
      <star-space :size="20"></star-space>
      <div class="home-list-mul-item-rough-infos">
        <div
          v-if="cardType === 'closed'"
          class="home-list-mul-item-rough-infos-closed"
        >
          <star-item-cell :data="cellData('raiseTotal', data.payCurrency)">
          </star-item-cell>
          <star-item-cell
            :data="cellData('rate', data.assignCurrency, data.payCurrency)"
          >
          </star-item-cell>
        </div>
        <!-- <star-item-cell
          :data="cellData('raiseTotal', data.payCurrency)"
          v-if="cardType !== 'will'"
        >
        </star-item-cell>
        <star-item-cell v-if="cardType !== 'will'">
          :data="cellData('rate', data.assignCurrency, data.payCurrency)" >
        </star-item-cell>
        <star-item-cell
          :data="cellData('capTotal', data.assignCurrency)"
          v-if="cardType !== 'closed' && cardType !== 'will'"
        >
        </star-item-cell> -->
      </div>
      <div
        class="home-list-mul-item-rough-countdown"
        v-if="cardType === 'will'"
      >
        <star-space :size="20"> </star-space>
        <span> Registration opens：</span>
        <span>{{ countdown }}</span>
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
      immediate: true,
    },
  },
  mounted() {},
  methods: {
    openURL(url) {
      utilsTool.openNewWindow(url);
    },
    setCountDown(timestamp) {
      const times = this.formateDate(utilsDate.countdown(timestamp));
      if (times) {
        this.countdown = `${times[0] ? times[0] + "D" : times[0]} ${times[1]} ${
          times[2]
        } ${times[3]}`;
      }
      if (!this.countdown) {
        clearTimeout(this.timer);
        return;
      }
      this.timer = setTimeout(() => this.setCountDown(timestamp), 1000);
    },
    cellData(key, currency, currencyB) {
      let name, text;
      if (key === "raiseTotal") {
        name = this.$t("总募资");
        text = `${
          utilsNumber.formatNumberMeta(this.data[key], { grouped: true }).text
        } ${currency}`;
      }
      if (key === "rate") {
        name = this.$t("兑换比例");
        text = `1 ${currency} = ${
          utilsNumber.formatNumberMeta(this.data[key], { grouped: true }).text
        } ${currencyB}`;
      }
      if (key === "capTotal") {
        name = this.$t("总销售量");
        text = `${
          utilsNumber.formatNumberMeta(this.data[key], { grouped: true }).text
        } ${currency}`;
      }
      return {
        title: name,
        text,
      };
    },
  },
  computed: {},
  beforeDestroy() {},
};
</script>
<style lang="scss" scoped>
.home-list-mul-item {
  width: 100%;
  height: 100%;
  position: relative;

  .home-list-mul-item-rough {
    width: 100%;
    position: relative;
    .home-list-mul-item-rough-header {
      img {
        display: block;
        width: 100%;
        height: 140px;
      }
      span {
        color: #fff;
        font-size: 18px;
        font-weight: 600;
      }
    }
    .home-list-single-item-label {
      display: flex;
      .home-list-single-item-label-item {
        padding: 3px 10px;
        color: #d6872d;
        font-size: 12px;
        background: rgba(214, 135, 45, 0.11);
        border-radius: 2px;
        border: 1px solid rgba(214, 135, 45, 0.58);
        &:not(:first-child) {
          margin-left: 10px;
        }
      }
    }
    .home-list-mul-item-link {
      display: flex;
      .home-list-mul-item-link-item {
        width: 24px;
        height: 24px;
        margin-right: 10px;
        :hover {
          opacity: 0.7;
        }
      }
    }
    .home-list-mul-item-rough-infos {
      color: #ffffff;
      font-family: Denmark;
      .home-list-mul-item-rough-infos-closed {
        position: absolute;
        width: 100%;
        top: 280px;
      }
    }
    .home-list-mul-item-rough-countdown {
      color: #fec944;
      font-size: 16px;
      position: absolute;
      top: 350px;
      width: 100%;
      text-align: center;
    }
  }
}
</style>
