<template>
  <div :set="(cardsInfo = cardTypeColorInfo(detailCardType))">
    <div
      class="detail-input-wrap"
      :style="`background-image: url(${cardsInfo['detail-input-wrap-bg']})`"
    >
      <start-input
        class="detail-input"
        :precision="9"
        :value="inputValue"
        :maxColor="cardsInfo['common-color']"
        @input="inputEvent"
        @maxEvent="maxEvent"
        v-if="stakeStatus === 'stake'"
      ></start-input>

      <start-input
        class="detail-input"
        v-if="stakeStatus === 'unstake'"
        :precision="9"
        :value="inputValue"
        :maxColor="cardsInfo['common-color']"
        @input="inputEvent"
        @maxEvent="maxEvent"
      >
      </start-input>
    </div>
    <start-space :size="12"></start-space>
    <div class="detail-wrap-content-left-info">
      <div>
        <span>{{ $t("还可质押") }}：</span>
        <span>{{ renderRestAmount() }} STC</span>
      </div>
      <div>
        <span>{{ $t("余额") }}：</span>
        <!-- 钱包的stc -->
        <span>{{ renderAmount(balances.stc) }} STC</span>
      </div>
    </div>
    <start-space :size="24"></start-space>
    <div class="detail-wrap-content-left-error">
      <p>出错了的文案</p>
    </div>
    <start-space :size="12"></start-space>
    <start-button
      class="detail-wrap-content-button"
      :style="`background-image: url(${cardsInfo['detail-wrap-content-button']})`"
    >
      <p :style="{ color: cardsInfo['common-color'] }">
        <span v-if="stakeStatus === 'stake'" @click="onStakeClick">
          {{ $t("STAKE") }}
        </span>
        <span v-if="stakeStatus === 'unstake'">
          {{ $t("UNSTAKE") }}
        </span>
      </p>
    </start-button>

    <start-space :size="20"></start-space>
    <p
      class="detail-wrap-content-left-unstake"
      :style="{ color: cardsInfo['common-color'] }"
      @click="changeStakeStatus"
    >
      <!-- <span v-if="detailCardType === ''">
        {{ $t("UNSTAKE") }}
      </span> -->
      <template v-if="detailCardType === 'open'">
        <template v-if="stakeStatus === 'stake'">
          {{ $t("UNSTAKE") }}
        </template>
        <template v-if="stakeStatus === 'unstake'">
          {{ $t("STAKE") }}
        </template>
      </template>

      <!-- <template v-if="detailCardType === 'open'">
        <template v-if="stakeStatus === 'stake'"> </template>
      </template>
      <template v-if="detailCardType === 'open'">
        <template v-if="stakeStatus === 'stake'"> </template>
      </template>
      <template v-if="detailCardType === 'open'">
        <template v-if="stakeStatus === 'stake'"> </template>
      </template> -->
    </p>
    <start-space :size="35"></start-space>
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
import { mapGetters, mapState } from "vuex";
import utilsNumber from "@utils/number.js";
import { STC_PRECISION } from "@constants/contracts";
import { isNil } from "lodash";
import { Wallet } from "@contactLogic";
export default {
  data() {
    return {
      inputValue: "",
      stakeStatus: "stake", // 质押状态 质押stake   解压unstake
      errorText: "",
    };
  },
  components: { StartInput, StartSpace, StartButton },
  mounted() {},
  methods: {
    getParams() {
      return {
        provider: this.stcProvider,
        account: this.stcAccounts[0],
        chianID: this.stcChianID,
      };
    },
    changeStakeStatus() {
      // if (detailCardType) {
      //
      // }
      this.stakeStatus = "unstake";
    },
    inputEvent(e) {
      this.inputValue = e;
    },
    maxEvent() {
      this.inputValue = 0;
      if (this.stakeStatus === "stake") {
        // 最大质押量、钱包余额做比较
        if (utilsNumber.bigNum(this.restStakeAmount).gte(this.balances.stc)) {
          this.inputValue = utilsNumber
            .bigNum(this.balances.stc)
            .div(STC_PRECISION)
            .toString();
        } else {
          this.inputValue = utilsNumber
            .bigNum(this.restStakeAmount)
            .div(STC_PRECISION)
            .toString();
        }
      }
      if (this.stakeStatus === "unstake") {
        console.log("解压");
      }
    },
    renderRestAmount() {
      if (isNil(this.restStakeAmount)) return "--";
      console.log("==renderRestAmount===", this.restStakeAmount);
      return utilsNumber.formatNumberMeta(
        utilsNumber.bigNum(this.restStakeAmount).div(STC_PRECISION).toString(),
        { grouped: true }
      ).text;
    },
    renderAmount(balance) {
      if (isNil(balance)) return "--";
      console.log("==renderAmount===", balance);
      return utilsNumber.formatNumberMeta(
        utilsNumber.bigNum(balance).div(STC_PRECISION).toString(),
        { grouped: true }
      ).text;
    },
    validteUnstake() {
      if (
        utilsNumber
          .bigNum(this.inputValue)
          .gt(utilsNumber.bigNum(this.balances.stc).div(STC_PRECISION))
      ) {
        this.errorText = this.$t("可解压量不足");
        return false;
      }
    },
    validteStake() {
      if (
        utilsNumber
          .bigNum(this.inputValue)
          .gt(utilsNumber.bigNum(this.balances.stc).div(STC_PRECISION))
      ) {
        this.errorText = this.$t("账户余额不足");
        return false;
      }
      if (
        utilsNumber
          .bigNum(this.inputValue)
          .gt(utilsNumber.bigNum(this.restStakeAmount).div(STC_PRECISION))
      ) {
        this.errorText = this.$t("质押量超出个人额度上限！");
        return false;
      }

      return true;
    },
    async onStakeClick() {
      if (!this.validteStake()) return;
      console.log("A");
      const params = this.getParams();
      console.log(
        "bbbb",
        params,
        utilsNumber.bigNum(this.inputValue).times(STC_PRECISION).toString()
      );
      const res = await Wallet.stakeWithSTC({
        ...params,
        amount: utilsNumber
          .bigNum(this.inputValue)
          .times(STC_PRECISION)
          .toString(),
      });
      console.log("stake result:", res);
    },
    async onUnstakeClick() {
      if (!this.validteUnstake()) return;
    },
    // ...mapState("StoreWallet", ["stcProvider", "stcAccounts", "stcChianID"]),
  },
  computed: {
    ...mapState("StoreHome", {
      detailCardType: (state) => state.detailCardType,
      colorInfo: (state) => state.colorInfo,
    }),
    ...mapState("StoreWallet", {
      balances: (state) => state.balances,
      stcProvider: (state) => state.stcProvider,
      stcAccounts: (state) => state.stcAccounts,
      stcChianID: (state) => state.stcChianID,
    }),
    ...mapState("StoreContracts", {
      restStakeAmount: (state) => state.restStakeAmount,
      stakeAmount: (state) => state.stakeAmount,
    }),
    ...mapGetters("StoreHome", ["cardTypeColorInfo"]),
  },
  beforeDestroy() {},
};
</script>
<style lang="scss" scoped>
@import "~@/styles/variables.scss";
.detail-input-wrap {
  background-repeat: no-repeat;
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
  width: 100%;
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
.detail-wrap-content-left-error {
  font-size: 14px;
  color: $text_error_color;
  font-weight: 500;
  text-align: center;
}
.detail-wrap-content-left-unstake {
  color: $text_light_color;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  -webkit-user-select: none; /*webkit浏览器*/
  -ms-user-select: none; /*IE10*/
  -khtml-user-select: none; /*早期浏览器*/
  user-select: none;
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
