<template>
  <div
    :set="
      (((cardsInfo = cardTypeColorInfo(detailCardType)),
      (cardContent = detailCardInfo(detailCardId))),
      (cardCountDown = cardContent.startTime))
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
    <p style="color: red">{{ proState }}</p>
    <start-space :size="12"></start-space>
    <div v-if="stakeStatus === 'unstake'" class="detail-wrap-content-left-info">
      <span>{{ $t("还可解押") }}: {{ renderAmount(stakeAmount) }}</span>
    </div>
    <div
      class="detail-wrap-content-left-info"
      v-if="
        detailCardType === 'open' && proState === 2 && stakeStatus === 'stake'
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
    <start-space
      :size="24"
      v-if="
        detailCardType === 'open' &&
        stakeStatus === 'stake' &&
        proState !== 3 &&
        proState !== 4 &&
        proState !== 5
      "
    ></start-space>

    <div
      class="detail-wrap-conent-left-amount-text"
      v-if="
        detailCardType === 'open' &&
        (proState === 4 || proState === 3) &&
        stakeStatus === 'stake'
      "
    >
      <template v-if="proState === 3">
        <p class="detail-wrap-conent-left-amount-text-ttile">
          {{ $t("我的质押") }}
        </p>
        <start-space :size="8"></start-space>
        <p class="detail-wrap-conent-left-amount-text-amount">
          {{ renderAmount(stakeAmount) }} STC
        </p>
      </template>
      <template v-if="proState === 4">
        <p class="detail-wrap-conent-left-amount-text-ttile">
          {{ $t("我的份额") }}
        </p>
        <start-space :size="8"></start-space>
        <p class="detail-wrap-conent-left-amount-text-amount">
          {{ getCurrencyShare(cardContent.tokenPrecision) }}
          {{ cardContent.currency }}
        </p>
      </template>
    </div>
    <div class="detail-wrap-content-left-error" v-if="errorText">
      <p>{{ errorText }}</p>
    </div>
    <div
      class="detail-wrap-content-left-unstake-tips"
      v-if="stakeStatus === 'unstake'"
    >
      <start-space :size="8"></start-space>
      <p>{{ $t("现在全部解押将会失去您的额度") }}</p>
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
            proState === 3 &&
            stakeStatus === 'stake'
          "
        >
          {{ $t("锁仓中") }}
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
        <span v-if="proState === 5 && stakeStatus === 'stake'">
          {{ $t("已结束") }}
        </span>
        <span
          v-if="
            proState === 1 &&
            stakeStatus === 'stake' &&
            detailCardType === 'will'
          "
        >
          {{ $t("未开始") }}: {{ countdowntime }}
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
        {{ this.lang === "zh" ? cardContent.ruleDesc : cardContent.ruleDescEn }}
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
import session from "@utils/session";
import { Wallet } from "@contactLogic";
import { countdown } from "@utils/date.js";
export default {
  data() {
    return {
      inputValue: "",
      stakeStatus: "stake", // 质押状态 质押stake   解压unstake
      lang: session.getItem("lang"),
      errorText: "",
      countdowntime: null,
    };
  },
  components: { StartInput, StartSpace, StartButton },
  mounted() {
    if (this.detailCardType === "will") {
      let time = this.detailCardInfo(this.detailCardId).startTime;
      this.timer = setInterval(() => {
        this.countdowntime = this.formateDate(countdown(time));
      }, 1000);
    }
  },
  methods: {
    formateDate(obj) {
      const { day, hour, minute, second } = obj;
      return `${day}D ${hour}:${minute}:${second}`;
    },
    getParams() {
      return {
        provider: this.stcProvider,
        account: this.stcAccounts[0],
        chianID: this.stcChianID,
      };
    },
    // 获取代币份额
    getCurrencyShare(precision) {
      return utilsNumber
        .bigNum(this.myStakeAmount)
        .times(this.currencyTotalAmount)
        .div(this.stakeTotalAmount)
        .div(Math.pow(10, precision)) // 这里需要动态换
        .toString();
    },
    changeStakeStatus() {
      this.stakeStatus = "unstake";
      this.errorText = "";
    },
    inputEvent(e) {
      if (this.detailCardType === "will") {
        return;
      }
      this.errorText = "";
      this.inputValue = e;
    },
    maxEvent() {
      if (this.detailCardType === "will") {
        return;
      }
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
        this.inputValue = "";
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
      if (this.detailCardType === "will") {
        return;
      }
      if (!this.validteUnstake()) return;
      const params = this.getParams();
      const res = await Wallet.unstakeWithSTC({
        ...params,
        amount: utilsNumber
          .bigNum(this.inputValue)
          .times(STC_PRECISION)
          .toString(),
      });
      if (res) {
        this.inputValue = "";
        console.log("=====解押成功=====");
        console.log("unstake result:", res);
      }
    },
    async payUSDT() {
      // if (!this.validtePay()) return;
      const params = this.getParams();
      const res = await Wallet.payUSDT({
        ...params,
      });
      if (res) {
        console.log("=====支付成功=====");
        console.log("payUSDT result:", res);
      }
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
.detail-wrap-content-left-error,
.detail-wrap-content-left-unstake-tips {
  font-size: 14px;
  color: $text_error_color;
  font-weight: 500;
  text-align: center;
}
.detail-wrap-conent-left-amount-text {
  text-align: center;
  .detail-wrap-conent-left-amount-text-ttile {
    color: #959fa1;
    font-size: 14px;
  }
  .detail-wrap-conent-left-amount-text-amount {
    color: #fff;
    font-size: 22px;
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
