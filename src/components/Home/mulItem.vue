<template>
  <div class="home-list-mul-item">
    <div class="home-list-mul-item-rough">
      <div class="home-list-mul-item-rough-header">
        <star-item-cell cellType="vertical">
          <!-- 项目logo -->
          <img :src="data.icon" />
          <span>{{ $t(`${data.prdName}`) }}</span>
          <span>({{ $t(`${data.assignCurrency}`) }})</span>
        </star-item-cell>
      </div>
      <star-space :size="20"></star-space>
      <!-- <div class="home-list-mul-item-rough-labels">
        <star-button
          v-for="(d, i) in data.labels"
          :key="i"
          light
          :style="
            mixinLabelColor(
              colorsInfo['label-text-color'],
              colorsInfo['label-border-color']
            )
          "
          >{{ $t(`${d.label}`) }}</star-button
        >
      </div> -->
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
.home-list-mul-item {
  width: 100%;
  .home-list-mul-item-rough {
    width: 100%;
    position: relative;
    .home-list-mul-item-rough-header {
      img {
        display: inline-block;
        width: 48px;
        height: 48px;
        border-radius: 50%;
      }
      span {
        color: #fff;
        font-size: 18px;
        font-weight: 600;
        margin-left: 15px;
      }
    }
    .home-list-single-item-label {
      // margin-top: 20px;
      color: red;
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
    .home-list-mul-item-rough-icons {
      .home-list-mul-item-rough-icons-icon {
        width: 24px;
        height: 24px;
        &:hover {
        }
      }
      .home-list-mul-item-rough-icons-icon
        + .home-list-mul-item-rough-icons-icon {
        margin-left: 10px;
      }
    }
    .home-list-mul-item-rough-infos {
      color: #ffffff;
      font-family: Denmark;
    }
  }
}
</style>
