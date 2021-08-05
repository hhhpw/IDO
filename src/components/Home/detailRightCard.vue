<template>
  <div
    class="detail-card"
    :set="
      ((colorsInfo = cardTypeColorInfo(detailCardType)),
      (cardInfo = detailCardInfo(detailCardId)))
    "
  >
    <div>{{ cardInfo.proTimeList }}</div>
    <div
      v-if="cardInfo.attribute"
      class="detail-card-labels-top"
      :style="
        mixinSetLabelsBg(
          detailCardType,
          cardInfo.attribute.length > 2 ? 2 : cardInfo.attribute.length
        )
      "
    >
      <span
        v-for="(l, ix) in flags"
        :key="ix"
        :style="{ color: colorsInfo['common-color'] }"
      >
        {{ $t(`${l}`) }}
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
        v-for="(d, i) in cardInfo.label"
        :key="i"
        light
        :style="
          mixinLabelColor(
            colorsInfo['label-text-color'],
            colorsInfo['common-color']
          )
        "
        >{{ $t(`${d}`) }}></start-button
      >
    </div>
    <start-space :size="20"></start-space>
    <div class="detail-card-icons">
      <svg-icon
        v-for="(iconkey, index) in cardInfo.links"
        :key="index"
        :name="iconkey.name + '-' + detailCardType"
        class="detail-card-icons-icon"
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
            v-for="(d, index) in listpro"
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
      Starcoin是一个为分布式金融而设计的区块链项目，获得了币信、星辰资本、币印、Linkvc、嘉楠耘智等知名机构投资。
      Starcoin继承了比特币卓越的安全机制，采用新PoW算法极大地增强了网络和智能合约的安全性和效率，目标是建立为普通用户提供服务的金融基础设施。Starcoin是一个为分布式金融而设计的区块链项目，
      获得了币信、星辰资本、币印、Linkvc、嘉楠耘智等知名机构投资。Starcoin继承了比特币卓越的安全机制，采用新PoW算法极大地
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
// import clipboard from "clipboard-polyfill";
import * as clipboard from "clipboard-polyfill/text";
import { listpro } from "@startUI/mock.js";
import { mapState, mapGetters } from "vuex";
import mixinHome from "@mixins/home.js";
// import i18n from "../../i18n/index.js";
export default {
  data() {
    return {
      copyContent: this.$t("复制"),
      // disabledCopy: false,
      labels: ["label one", "label two", "label three"],
      flags: ["AA", "bb"],
      colorType: "red",
      tabCategory: "prodetail",
      listpro: listpro,
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
  watch: {
    // disabledCopy(val) {
    //   if (!val) {
    //     this.copyContent = this.$t("复制");
    //   }
    //   // if (val) {
    //   //   this.copyContent = "";
    //   // } else {
    //   //   this.copyContent = "das";
    //   //   // i18n.$t("复制");
    //   // }
    // },
  },
  mounted() {},
  methods: {
    // renderTip() {
    //   if (this.disabledCopy) {
    //     return "";
    //   }
    //   return this.$t("复制");
    //   // return "复制";
    // },
    hanleTabChange(val) {
      this.tabCategory = val;
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
          console.log("err0r");
        }
      );
    },
  },
  computed: {
    ...mapState("StoreHome", {
      detailCardType: (state) => state.detailCardType,
      detailCardId: (state) => state.detailCardId,
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
      width: 24px;
      height: 24px;
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
