<template>
  <div
    class="detail-card"
    :set="
      ((detailCardType = detailCardInfo.cardType),
      (detailListAmount = changeDisplayList(detailCardInfo.decentralizedList)))
    "
  >
    <!-- <div v-if="detailCardInfo.attributes" class="detail-card-labels-top">
      <span v-for="(l, ix) in detailCardInfo.attributes.slice(0, 2)" :key="ix">
        {{ $t(`${l.name}`) }}
      </span>
    </div> -->
    <img :src="detailCardInfo.prdImg" class="detail-card-img" />
    <star-space :size="20"></star-space>
    <div class="detail-card-header">
      <img class="detail-card-header-logo" :src="detailCardInfo.icon" />
      <!-- <star-space :size="30" :horizontal="true"></star-space> -->
      <div class="detail-card-header-info">
        <div class="detail-card-header-info-currency">
          <span>
            {{ detailCardInfo.prdName }}
          </span>
          <span>
            ({{ $t(`${detailCardInfo.currencyInfo.assignCurrency}`) }})
          </span>
        </div>
        <div>
          <span class="detail-card-header-info-hash">
            {{ detailCardInfo.currencyInfo.assignAddress }}
          </span>

          <star-tool-tip
            :content="copyContent"
            placement="top"
            class="detail-card-header-info-copy"
          >
            <svg-icon
              class="detail-card-header-info-copy-icon"
              name="copy"
              @click="clipHash(detailCardInfo.currencyInfo.assignAddress)"
            ></svg-icon>
          </star-tool-tip>
        </div>
      </div>
    </div>
    <star-space :size="20"></star-space>
    <div class="detail-card-labels">
      <div
        v-for="(d, i) in detailCardInfo.labels"
        :key="i"
        class="detail-card-labels-item"
      >
        {{ d.label }}
      </div>
    </div>
    <star-space :size="20"></star-space>
    <div class="detail-card-icons">
      <svg-icon
        v-for="(iconkey, index) in detailCardInfo.links"
        :key="index"
        :name="iconkey.name"
        class="detail-card-icons-icon"
        @click="handleToPath(iconkey)"
      ></svg-icon>
    </div>
    <star-space :size="20"></star-space>
    <div class="detail-card-tabs">
      <star-tab-bar
        :value="tabCategory"
        @input="hanleTabChange"
        :items="tabItems"
      >
      </star-tab-bar>
      <div class="detail-card-tabs-list">
        <template v-if="tabCategory === 'prodetail'">
          <star-list
            v-for="(d, index) in detailListAmount"
            :key="index"
            :data="d"
            type="prodetail"
          >
          </star-list>
        </template>
        <template v-if="tabCategory === 'time'">
          <star-list
            v-for="(d, index) in detailCardInfo.proTimeList"
            :key="index"
            :data="d"
            type="time"
          ></star-list>
        </template>
      </div>
    </div>
    <star-space :size="30"></star-space>
    <div
      class="detail-card-footer"
      v-html="
        language === 'zh' ? detailCardInfo.prdDesc : detailCardInfo.prdDescEn
      "
    ></div>
  </div>
</template>
<script>
/* eslint-disable */
import StarSpace from "@StarUI/StarSpace.vue";
import SvgIcon from "@components/SvgIcon/index.vue";
import StarButton from "@StarUI/StarButton.vue";
import StarTabBar from "@StarUI/StarTabBar.vue";
import StarList from "@StarUI/StarList.vue";
import StarToolTip from "@StarUI/StarToolTip.vue";
import * as clipboard from "clipboard-polyfill/text";
import { mapState } from "vuex";
import mixinHome from "@mixins/home.js";
import session from "@utils/session";
import { cloneDeep } from "lodash";
import utilsNumber from "@utils/number.js";
import utilsTool from "@utils/tool";
import i18n from "../../i18n";
export default {
  data() {
    return {
      isHover: false,
      copyContent: this.$t("复制"),
      tabCategory: "prodetail",
    };
  },
  mixins: [mixinHome],
  components: {
    StarToolTip,
    StarSpace,
    SvgIcon,
    StarButton,
    StarTabBar,
    StarList,
  },
  watch: {},
  props: ["detailCardInfo"],
  methods: {
    changeDisplayList(val) {
      // 需要再次组合下数据
      let list = cloneDeep(val);
      list = list.map((d, i) => {
        if (i === 0) {
          return {
            name: this.$t(`我的质押`),
            text: `${
              this.myStakeAmount
                ? utilsNumber.formatNumberMeta(
                    utilsNumber
                      .bigNum(this.myStakeAmount)
                      .div(
                        Math.pow(
                          10,
                          this.detailCardInfo.currencyInfo.stakePrecision
                        )
                      )
                      .toString(),
                    { grouped: true }
                  ).text
                : 0
            } ${this.detailCardInfo.currencyInfo.stakeCurrency}`,
          };
        }
        if (i === 1) {
          return {
            name: this.$t(`总销售量`),
            text: `${utilsNumber.formatNumberMeta(d, { grouped: true }).text} ${
              this.detailCardInfo.currencyInfo.assignCurrency
            }`,
          };
        }
        if (i === 2) {
          const showText =
            String(d) === "0"
              ? i18n.t("无上限")
              : utilsNumber.formatNumberMeta(d, { grouped: true }).text;
          const showCurrency =
            String(d) === "0"
              ? ""
              : `${this.detailCardInfo.currencyInfo.assignCurrency}`;
          return {
            name: this.$t(`代币发行总量`),
            text: showText + " " + showCurrency,
          };
        }
        if (i === 3) {
          return {
            name: this.$t("总质押"),
            text: `${
              this.stakeTotalAmount
                ? utilsNumber.formatNumberMeta(
                    utilsNumber
                      .bigNum(this.stakeTotalAmount)
                      .div(
                        Math.pow(
                          10,
                          this.detailCardInfo.currencyInfo.stakePrecision
                        )
                      )
                      .toString(),
                    { grouped: true }
                  ).text
                : 0
            } ${this.detailCardInfo.currencyInfo.stakeCurrency}`,
          };
        }
        if (i === 4) {
          return {
            name: this.$t("兑换比例"),
            text: `1 ${this.detailCardInfo.currencyInfo.assignCurrency} = ${
              utilsNumber.formatNumberMeta(d, { grouped: true }).text
            } ${this.detailCardInfo.currencyInfo.payCurrency}`,
          };
        }
        if (i === 5) {
          return {
            name: this.$t("总募资"),
            text: `${utilsNumber.formatNumberMeta(d, { grouped: true }).text} ${
              this.detailCardInfo.currencyInfo.payCurrency
            }`,
          };
        }
      });
      return list;
    },
    hanleTabChange(val) {
      this.tabCategory = val;
    },
    handleToPath(val) {
      utilsTool.openNewWindow(val?.url);
    },
    clipHash(val) {
      clipboard.writeText(val).then(
        () => {
          this.copyContent = this.$t("复制成功");
          setTimeout(() => {
            this.copyContent = this.$t("复制");
          }, 1500);
        },
        () => {
          console.log("error");
        }
      );
    },
  },
  computed: {
    ...mapState("StoreApp", {
      language: (state) => state.language,
    }),
    ...mapState("StoreProDetail", {
      stakeAmount: (state) => state.stakeAmount,
      myStakeAmount: (state) => state.myStakeAmount,
      stakeTotalAmount: (state) => state.stakeTotalAmount,
    }),
    tabItems() {
      return [
        {
          label: this.$t("项目详情"),
          value: "prodetail",
        },
        {
          label: this.$t("时间"),
          value: "time",
        },
      ];
    },
  },
};
</script>
<style lang="scss" scoped>
@import "~@/styles/variables.scss";
.detail-card {
  padding: 40px 20px;
  position: relative;
  .detail-card-img {
    height: 273px;
    width: 100%;
  }
  .detail-card-header {
    display: flex;
    .detail-card-header-logo {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      display: inline-block;
    }
    .detail-card-header-info {
      // display: flex;
      margin-left: 20px;
      .detail-card-header-info-currency {
        color: #fff;
        font-size: 18px;
        font-weight: 600;
      }
      .detail-card-header-info-hash {
        color: $text_gray_color;
        margin-right: 5px;
      }
      .detail-card-header-info-copy {
        display: inline-block;
        .detail-card-header-info-copy-icon {
          width: 16px;
          height: 16px;
          &:hover {
            opacity: 0.7;
          }
        }
      }
    }
  }

  .detail-card-labels {
    display: flex;
    .detail-card-labels-item {
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
  .detail-card-icons {
    .detail-card-icons-icon {
      width: 28px;
      height: 28px;
      &:hover {
        opacity: 0.7;
      }
    }
    .detail-card-icons-icon + .detail-card-icons-icon {
      margin-left: 10px;
    }
  }
  .detail-card-tabs-list {
    width: 100%;
    overflow: hidden;
  }
  .detail-card-footer {
    color: $text_gray_color;
  }
}
</style>
