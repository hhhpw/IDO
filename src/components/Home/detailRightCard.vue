<template>
  <div
    class="detail-card"
    :set="
      (((colorsInfo = cardTypeColorInfo(detailCardType)),
      (cardInfo = detailCardInfo(detailCardId))),
      (detailListAmount = changeDisplayList(
        cardInfo.decentralizedList,
        cardInfo.tokenPrecision,
        cardInfo.currency
      )))
    "
  >
    <div
      v-if="cardInfo.attributes"
      class="detail-card-labels-top"
      :style="
        mixinSetLabelsBg(
          detailCardType,
          cardInfo.attributes.length > 2 ? 2 : cardInfo.attributes.length
        )
      "
    >
      <span
        v-for="(l, ix) in cardInfo.attributes.slice(0, 2)"
        :key="ix"
        :style="{ color: colorsInfo['common-color'] }"
      >
        {{ $t(`${l.name}`) }}
      </span>
    </div>
    <div class="detail-card-header">
      <img class="detail-card-header-logo" :src="cardInfo.icon" />
      <!-- <start-space :size="30" :horizontal="true"></start-space> -->
      <div class="detail-card-header-info">
        <div class="detail-card-header-info-currency">
          <span>
            {{ $t(`${cardInfo.prdName}`) }}
          </span>
          <span> ({{ $t(`${cardInfo.currency}`) }}) </span>
        </div>
        <div>
          <span class="detail-card-header-info-hash">
            {{ cardInfo.address }}
          </span>

          <start-tool-tip
            :content="copyContent"
            placement="top"
            class="detail-card-header-info-copy"
          >
            <svg-icon
              :name="`copy-${detailCardType}`"
              @click="clipHash(cardInfo.address)"
            ></svg-icon>
          </start-tool-tip>
        </div>
      </div>
    </div>
    <start-space :size="20"></start-space>
    <div class="detail-card-labels">
      <start-button
        v-for="(d, i) in cardInfo.labels"
        :key="i"
        light
        :style="
          mixinLabelColor(
            colorsInfo['label-text-color'],
            colorsInfo['common-color']
          )
        "
        >{{ $t(`${d.label}`) }}</start-button
      >
    </div>
    <start-space :size="20"></start-space>
    <div class="detail-card-icons">
      <svg-icon
        v-for="(iconkey, index) in cardInfo.links"
        :key="index"
        :name="iconkey.name + '-' + detailCardType"
        class="detail-card-icons-icon"
        @click="handleToPath(iconkey)"
      ></svg-icon>
    </div>
    <start-space :size="20"></start-space>
    <div class="detail-card-tabs">
      <start-tab-bar
        :value="tabCategory"
        @input="hanleTabChange"
        :items="tabItmes"
        :color="colorsInfo['common-color']"
      >
      </start-tab-bar>
      <div class="detail-card-tabs-list">
        <template v-if="tabCategory === 'prodetail'">
          <start-list
            v-for="(d, index) in detailListAmount"
            :key="index"
            :data="d"
            type="prodetail"
            :bgColor="colorsInfo['list-bg-color']"
          >
          </start-list>
        </template>
        <template v-if="tabCategory === 'time'">
          <start-list
            v-for="(d, index) in cardInfo.proTimeList"
            :key="index"
            :data="d"
            type="time"
            :bgColor="colorsInfo['list-bg-color']"
          ></start-list>
        </template>
      </div>
    </div>
    <start-space :size="30"></start-space>
    <div class="detail-card-footer">
      {{ this.lang === "zh" ? cardInfo.prdDesc : cardInfo.prdDescEn }}
    </div>
  </div>
</template>
<script>
import StartSpace from "@startUI/StartSpace.vue";
import SvgIcon from "@components/SvgIcon/index.vue";
import StartButton from "@startUI/StartButton.vue";
import StartTabBar from "@startUI/StartTabBar.vue";
import StartList from "@startUI/StartList.vue";
import StartToolTip from "@startUI/StartToolTip.vue";
import * as clipboard from "clipboard-polyfill/text";
import { mapState, mapGetters } from "vuex";
import mixinHome from "@mixins/home.js";
import { mapActions } from "vuex";
import session from "@utils/session";
import { cloneDeep } from "lodash";
import utilsNumber from "@utils/number.js";
import { STC_PRECISION } from "@constants/contracts";
export default {
  data() {
    return {
      copyContent: this.$t("复制"),
      tabCategory: "prodetail",
      tabItmes: [
        {
          label: this.$t("项目详情"),
          value: "prodetail",
        },
        {
          label: this.$t("时间"),
          value: "time",
        },
      ],
      lang: session.getItem("lang"),
    };
  },
  mixins: [mixinHome],
  components: {
    StartToolTip,
    StartSpace,
    SvgIcon,
    StartButton,
    StartTabBar,
    StartList,
  },
  watch: {},
  mounted() {
    this.getCardInfo();
  },
  methods: {
    changeDisplayList(val, precision, currency) {
      // 需要再次组合下数据
      let list = cloneDeep(val);
      list = list.map((d, i) => {
        if (i === 0) {
          return {
            ...d,
            amount: this.myStakeAmount
              ? utilsNumber
                  .bigNum(this.myStakeAmount)
                  .div(STC_PRECISION)
                  .toString()
              : 0,
            unit: "STC",
          };
        }
        if (i === 1) {
          return {
            ...d,
            amount: utilsNumber
              .bigNum(this.currencyTotalAmount)
              .div(Math.pow(10, precision)), // 还需要除币种精度
            unit: currency,
          };
        }
        if (i === 2) {
          return {
            ...d,
            unit: currency,
          };
        }
        if (i === 3) {
          return {
            ...d,
            amount: utilsNumber
              .bigNum(this.stakeTotalAmount)
              .div(STC_PRECISION)
              .toString(),
            unit: "STC",
          };
        }
        if (i === 4) {
          return {
            ...d,
            amount: utilsNumber
              .bigNum(this.currencyTotalAmount)
              .div(Math.pow(10, precision)), // 还需要除币种精度
            unit: currency,
          };
        }
        if (i === 4) {
          return {
            ...d,
            unit: "USDT",
          };
        }
      });
      // list[0].amount = this.myStakeAmount
      //   ? utilsNumber.bigNum(this.myStakeAmount).div(STC_PRECISION).toString()
      //   : 0;
      // list[1].amount = utilsNumber
      //   .bigNum(this.currencyTotalAmount)
      //   .div(Math.pow(10, precision)); // 还需要除币种精度
      // list[3].amount = utilsNumber
      //   .bigNum(this.stakeTotalAmount)
      //   .div(STC_PRECISION)
      //   .toString();
      return list;
    },
    hanleTabChange(val) {
      this.tabCategory = val;
    },
    handleToPath(val) {
      window.open(val.url, "_blank");
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
    ...mapActions("StoreHome", ["getCardInfo"]),
  },
  computed: {
    ...mapState("StoreHome", {
      detailCardType: (state) => state.detailCardType,
      detailCardId: (state) => state.detailCardId,
    }),
    ...mapState("StoreContracts", {
      stakeAmount: (state) => state.stakeAmount,
      currencyTotalAmount: (state) => state.currencyTotalAmount,
      myStakeAmount: (state) => state.myStakeAmount,
      stakeTotalAmount: (state) => state.stakeTotalAmount,
    }),

    ...mapGetters("StoreHome", ["cardTypeColorInfo", "detailCardInfo"]),
  },
  beforeDestroy() {},
};
</script>
<style lang="scss" scoped>
@import "~@/styles/variables.scss";
.detail-card {
  padding: 40px 20px;
  position: relative;
  .detail-card-labels-top {
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
  .detail-card-header {
    display: flex;
    .detail-card-header-logo {
      width: 48px;
      height: 48px;
      display: inline-block;
    }
    .detail-card-header-info {
      // display: flex;
      margin-left: 20px;
      .detail-card-header-info-currency {
        color: #fff;
      }
      .detail-card-header-info-hash {
        color: $text_gray_color;
        margin-right: 5px;
      }
      .detail-card-header-info-copy {
        display: inline-block;
      }
    }
  }
  .detail-card-labels {
    .start-button {
      border-radius: 2px;
      padding: 5px 10px;
    }
  }
  .detail-card-icons {
    .detail-card-icons-icon {
      width: 32px;
      height: 32px;
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
