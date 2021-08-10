<template>
  <div
    :set="
      ((cardsInfo = cardTypeColorInfo(detailCardType)),
      (cardInfo = detailCardInfo(detailCardId)))
    "
  >
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
        v-if="stakeStatus === 'stake' && proState === 2"
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
    <p>{{ proState }}</p>
    <start-space :size="12"></start-space>
    <div v-if="stakeStatus === 'unstake'" class="detail-wrap-content-left-info">
      <span>{{ $t("还可解押") }}: {{ renderAmount(stakeAmount) }}</span>
    </div>
    <div
      class="detail-wrap-content-left-info"
      v-if="
        detailCardType === 'open' &&
        (proState === 2 || proState === 3) &&
        stakeStatus === 'stake'
      "
    >
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

    <div
      class="detail-wrap-conent-left-amount-text"
      v-if="
        detailCardType === 'open' && proState === 4 && stakeStatus === 'stake'
      "
    >
      <p>{{ $t("我的份额") }}</p>
      <start-space :size="8"></start-space>
      <p class="detail-wrap-conent-left-amount-text-amount">后端提供接口STC</p>
    </div>
    <div class="detail-wrap-content-left-error" v-if="errorText">
      <p>{{ errorText }}</p>
    </div>
    <start-space :size="12"></start-space>
    <start-button
      class="detail-wrap-content-button"
      :style="`background-image: url(${cardsInfo['detail-wrap-content-button']})`"
    >
      <p
        :style="{ color: cardsInfo['common-color'] }"
        class="detail-wrap-content-button-text"
      >
        <span
          v-if="
            stakeStatus === 'stake' &&
            detailCardType === 'open' &&
            proState === 2
          "
          @click="onStakeClick"
        >
          {{ $t("STAKE") }}
        </span>
        <span
          v-if="
            detailCardType === 'open' &&
            proState === 4 &&
            stakeStatus === 'stake'
          "
          @click="payUSDT"
        >
          {{ $t("待支付") }}
        </span>

        <span v-if="stakeStatus === 'unstake'" @click="onUnstakeClick">
          {{ $t("UNSTAKE") }}
        </span>
      </p>
    </start-button>

    <start-space :size="20"></start-space>
    <p
      class="detail-wrap-content-left-unstake"
      :style="{ color: cardsInfo['common-color'] }"
      @click="changeStakeStatus"
      v-if="stakeStatus === 'stake'"
    >
      {{ $t("UNSTAKE") }}
    </p>
    <start-space :size="35"></start-space>
    <div class="detail-wrap-content-left-rule">
      <p>
        {{ $t("参与规则") }}
      </p>
      <start-space :size="10"></start-space>
      <p class="detail-wrap-content-left-rule-content">
        {{ this.lang === "zh" ? cardInfo.ruleDesc : cardInfo.ruleDescEn }}
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
// import StartInput from '../StartUI/StartInput.vue';
import session from "@utils/session";
import { Wallet } from "@contactLogic";
export default {
  data() {
    return {
      inputValue: "",
      stakeStatus: "stake", // 质押状态 质押stake   解压unstake
      lang: session.getItem("lang"),
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
      this.stakeStatus = "unstake";
      this.errorText = "";
    },
    inputEvent(e) {
      this.errorText = "";
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
        this.inputValue = utilsNumber
          .bigNum(this.stakeAmount)
          .div(STC_PRECISION)
          .toString();
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
      const params = this.getParams();
      const res = await Wallet.stakeWithSTC({
        ...params,
        amount: utilsNumber
          .bigNum(this.inputValue)
          .times(STC_PRECISION)
          .toString(),
      });
      // 质押成功
      if (res) {
        console.log("=====质押成功=====");
        console.log("stake result:", res);
      }
    },
    validteUnstake() {
      if (
        utilsNumber
          .bigNum(this.inputValue)
          .gt(utilsNumber.bigNum(this.stakeAmount).div(STC_PRECISION))
      ) {
        this.errorText = this.$t("可解押量不足");
        return false;
      }
      return true;
    },
    async onUnstakeClick() {
      console.log("A");
      if (!this.validteUnstake()) return;
      const params = this.getParams();
      const res = await Wallet.unstakeWithSTC({
        ...params,
        amount: utilsNumber
          .bigNum(this.inputValue)
          .times(STC_PRECISION)
          .toString(),
      });
      console.log("unstake result:", res);
    },
    async payUSDT() {
      // if (!this.validtePay()) return;
      const params = this.getParams();
      const res = await Wallet.payUSDT({
        ...params,
      });
      console.log("payUSDT result:", res);
    },
  },
  computed: {
    ...mapState("StoreHome", {
      detailCardType: (state) => state.detailCardType,
      colorInfo: (state) => state.colorInfo,
      detailCardId: (state) => state.detailCardId,
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
      proState: (state) => state.proState,
    }),
    ...mapGetters("StoreHome", ["cardTypeColorInfo", "detailCardInfo"]),
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
  .detail-wrap-content-button-text {
    font-weight: 500;
    font-size: 24px;
    -webkit-user-select: none; /*webkit浏览器*/
    -ms-user-select: none; /*IE10*/
    -khtml-user-select: none; /*早期浏览器*/
    user-select: none;
    span {
      display: inline-block;
      width: 100%;
      -webkit-user-select: none; /*webkit浏览器*/
      -ms-user-select: none; /*IE10*/
      -khtml-user-select: none; /*早期浏览器*/
      user-select: none;
    }
  }
  // p {
  // }
}
.detail-wrap-content-left-error {
  font-size: 14px;
  color: $text_error_color;
  font-weight: 500;
  text-align: center;
}
.detail-wrap-conent-left-amount-text {
  text-align: center;
  p:nth-child(1) {
    color: #959fa1;

    font-size: 14px;
  }
  .detail-wrap-conent-left-amount-text-amount {
    color: #fff;
    font-size: 18px;
  }
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
