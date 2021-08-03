<template>
  <div class="detail-card">
    <div class="detail-card-header">
      <img class="detail-card-header-logo" src="../../assets/header/logo.png" />
      <!-- <start-space :size="30" :horizontal="true"></start-space> -->
      <div class="detail-card-header-info">
        <div class="detail-card-header-info-currency">
          <span>
            {{ $t("StartPad") }}
          </span>
          <span> ({{ $t("STP") }}) </span>
        </div>
        <div>
          <span class="detail-card-header-info-hash">
            0x123131311331321313131999023x0012
          </span>
          <svg-icon
            :name="`copy-${detailCardType}`"
            @click="clipHash('====我复制了啊====')"
          ></svg-icon>
        </div>
      </div>
    </div>
    <start-space :size="20"></start-space>
    <div class="detail-card-labels">
      <start-button
        v-for="(d, i) in labels"
        :key="i"
        light
        :style="setStyle(colorInfo)"
        >{{ $t(`${d}`) }}></start-button
      >
    </div>
    <start-space :size="40"></start-space>
    <div class="detail-card-icons">
      <start-button
        v-for="(d, i) in labels"
        :key="i"
        light
        :style="setStyle(colorInfo)"
        >{{ $t(`${d}`) }}></start-button
      >
    </div>
    <start-space :size="20"></start-space>
    <div class="detail-card-tabs">
      <start-tab-bar
        :value="tabCategory"
        @input="hanleTabChange"
        :items="tabItmes"
        :color="colorInfo['common-color']"
      >
      </start-tab-bar>
      <div class="detail-card-tabs-list">
        <start-list
          v-for="(d, index) in listpro"
          :key="index"
          :data="d"
          :type="tabCategory"
          :bgColor="colorInfo['list-bg-color']"
        >
        </start-list>
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
// import clipboard from "clipboard-polyfill";
import * as clipboard from "clipboard-polyfill/text";
import { listpro } from "@startUI/mock.js";
import { mapState } from "vuex";
export default {
  data() {
    return {
      labels: ["label one", "label two", "label three"],
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
  components: {
    StartSpace,
    SvgIcon,
    StartButton,
    StartTabBar,
    StartList,
  },
  mounted() {},
  methods: {
    hanleTabChange(val) {
      this.tabCategory = val;
    },
    clipHash(val) {
      clipboard.writeText(val).then(
        () => {
          console.log("yes");
        },
        () => {
          console.log("err0r");
        }
      );
    },
  },
  computed: {
    setStyle() {
      return function (colors) {
        // console.log("colors", colors);
        return {
          color: colors["label-text-color"],
          border: `1px solid ${colors["common-color"]}`,
        };
      };
    },
    ...mapState("StoreHome", {
      colorInfo: (state) => state.colorInfo,
      detailCardType: (state) => state.detailCardType,
    }),
  },
  beforeDestroy() {},
};
</script>
<style lang="scss" scoped>
@import "~@/styles/variables.scss";
.detail-card {
  padding: 40px 20px;
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
