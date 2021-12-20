<template>
  <div class="home-list-single-item">
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
    <div class="home-list-single-item-right">21323</div>
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
export default {
  components: { StarButton, StarSpace, SvgIcon, StarItemCell },
  mixins: [mixinHome],
  data() {
    return {};
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
  mounted() {
    this.isHoverList =
      this.data &&
      this.data.links &&
      this.data.links.length &&
      this.data.links.map(() => {
        return false;
      });
  },
  methods: {
    openURL(url) {
      utilsTool.openNewWindow(url);
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
  .home-list-single-item-left {
    border: 1px solid red;
    position: relative;
    left: 100px;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    justify-content: center;
    width: 300px;
    color: #fff;
    .home-list-single-item-left-title {
      font-size: 20px;
    }
    .home-list-single-item-left-label {
      // margin-top: 20px;
      color: red;
      display: flex;
      .home-list-single-item-left-label-item {
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
    }
  }
  .home-list-single-item-right {
    border: 1px solid pink;
    color: red;
    width: calc(100% - 400px);
    position: relative;
    left: 100px;
  }
}
</style>
