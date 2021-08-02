<template>
  <div class="detail-wrap">
    <div class="start-container">
      <start-space :size="30"></start-space>
      <div class="detail-wrap-content">
        <div class="detail-wrap-content-left">
          <!-- <start-space :size="20"></start-space> -->
          <div class="detail-input-wrap">
            <start-input class="detail-input"></start-input>
          </div>
          <start-space :size="20"></start-space>
          <div class="detail-wrap-content-left-info">
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
          <start-button class="detail-wrap-content-button">
            <p>dasda</p>
          </start-button>
          <start-space :size="20"></start-space>
          <p class="detail-wrap-content-left-unstake">{{ $t("UNSTAKE") }}</p>
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
        <div class="detail-wrap-content-right">
          <detail-card> </detail-card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import StartButton from "@startUI/StartButton.vue";
import StartInput from "@startUI/StartInput.vue";
import StartSpace from "@startUI/StartSpace.vue";
import DetailCard from "@components/Detail/card.vue";
export default {
  components: { StartInput, StartSpace, StartButton, DetailCard },
  data() {
    return {};
  },
  mounted() {},
  methods: {},
  computed: {},
  beforeDestroy() {},
};
</script>
<style lang="scss" scoped>
@import "~@/styles/variables.scss";
.detail-wrap {
  padding-top: 40px;
  .detail-wrap-content {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    .detail-wrap-content-left {
      width: 36%;
      // flex: 1;
      padding: 40px 20px 50px;
      background-repeat: no-repeat;
      background-image: url("../../assets/detail/open-left-bg.png");
      background-size: 100% 100%;
      .detail-input-wrap {
        background-repeat: no-repeat;
        background-image: url("../../assets/detail/open-input-border.png");
        background-size: 100% 100%;
        .detail-input {
          width: 100%;
          // border: 1px solid red;
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
        width: calc(100% - 40px);
        background-image: url("../../assets/detail/open.png");
        background-repeat: no-repeat;
        background-size: cover;
        background-color: transparent;
        line-height: 54px;
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
    }
    .detail-wrap-content-right {
      width: 50%;
      // height: 600px;
      background-repeat: no-repeat;
      background-image: url("../../assets/detail/open-right-bg.png");
      background-size: 100% 100%;
    }
  }
  // color: red;
  // font-size: 100x;
}
</style>
