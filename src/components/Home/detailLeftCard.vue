<template>
  <div>
    <div
      v-if="detailCardType !== 'closed'"
      class="detail-input-wrap"
      :style="`background-image: url(${require(`../../assets/home/${detailCardType}-input-border.png`)})`"
    >
      <start-input
        class="detail-input"
        :precision="9"
        :value="inputValue"
        :maxColor="colorInfo['common-color']"
        @input="inputEvent"
      ></start-input>
    </div>
    <start-space :size="20"></start-space>
    <div
      class="detail-wrap-content-left-info"
      v-if="detailCardType !== 'closed'"
    >
      <div>
        <span>{{ $t("还可以质押") }}</span>
        <span>12--321312STC</span>
      </div>
      <div>
        <span>{{ $t("余额") }}</span>
        <span>12--321312STC</span>
      </div>
    </div>
    <start-space :size="20"></start-space>
    <start-button
      class="detail-wrap-content-button"
      :style="`background-image: url(${require(`../../assets/home/${detailCardType}-button.png`)})`"
    >
      <p :style="{ color: colorInfo['common-color'] }">购买啊</p>
    </start-button>
    <start-space :size="20"></start-space>
    <p
      class="detail-wrap-content-left-unstake"
      :style="{ color: colorInfo['common-color'] }"
    >
      {{ $t("UNSTAKE") }}
    </p>
    <start-space :size="40"></start-space>
    <div class="detail-wrap-content-left-rule">
      <p>
        {{ $t("参与规则") }}
      </p>
      <start-space :size="10"></start-space>
      <p class="detail-wrap-content-left-rule-content">
        Starcoin是一个为分布式金融而设计的区块链项目，获得了币信、
        星辰资本、币印、Linkvc、嘉楠耘智等知名机构投资。Starcoin继承了比特币卓越的安全机制，
        采用新PoW算法极大地增强了网络和智能合约的安全性和效率，目标是建立为普通用户提供服务的金融基础设施。
        Starcoin是一个为分布式金融而设计的区块链项目，获得了币信、星辰资本、币印、Linkvc、嘉楠耘智等知名机构投资。
        Starcoin继承了比特币卓越的安全机制，采用新PoW算法极大地
      </p>
    </div>
  </div>
</template>
<script>
import StartButton from "@startUI/StartButton.vue";
import StartInput from "@startUI/StartInput.vue";
import StartSpace from "@startUI/StartSpace.vue";
import { mapState } from "vuex";
export default {
  data() {
    return {
      inputValue: "",
    };
  },
  components: { StartInput, StartSpace, StartButton },
  mounted() {},
  methods: {
    inputEvent(e) {
      this.inputValue = e;
    },
  },
  computed: mapState("StoreHome", {
    detailCardType: (state) => state.detailCardType,
    colorInfo: (state) => state.colorInfo,
  }),
  beforeDestroy() {},
};
</script>
<style lang="scss" scoped>
@import "~@/styles/variables.scss";
.detail-input-wrap {
  background-repeat: no-repeat;
  // background-image: url("../../assets/home/open-input-border.png");
  background-size: 100% 100%;
  .detail-input {
    width: 100%;
  }
}

.detail-wrap-content-left-info {
  color: #fff;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
}
.detail-wrap-content-button {
  color: $btn_base_bgcolor;
  height: 54px;
  text-align: center;
  // width: calc(100% - 40px);
  width: 100%;
  // background-image: url("../../assets/detail/open-button.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-color: transparent;
  line-height: 54px;
  padding: 0;
  p {
    font-weight: 500;
    font-size: 24px;
  }
}
.detail-wrap-content-left-unstake {
  color: $text_light_color;
  font-size: 16px;
  font-weight: 500;
}
.detail-wrap-content-left-rule {
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  .detail-wrap-content-left-rule-content {
    color: $text_gray_color;
    font-size: 14px;
    font-weight: 500;
  }
}
</style>
