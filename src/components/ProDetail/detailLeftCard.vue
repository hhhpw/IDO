<template>
  <div
    :set="
      ((detailCardType = detailCardInfo.cardType),
      (currencyInfo = detailCardInfo.currencyInfo),
      (cardCountDown = detailCardInfo.startTime))
    "
  >
    <div style="color: red">
      {{ proState }} {{ detailCardType }} {{ stakeStatus }}
    </div>
    <div
      class="detail-input-wrap"
      :style="
        isFocus
          ? `background-image: url(${require(`../../assets/home/detail-left-input-actived.png`)})`
          : ''
      "
    >
      <star-input
        class="detail-input"
        :precision="9 || currencyInfo.stakePrecision"
        :value="inputValue"
        maxColor="#FEC944"
        @input="inputEvent"
        @maxEvent="maxEvent"
        @focusEvent="isFocus = true"
        @blurEvent="isFocus = false"
        :stakeCurrency="currencyInfo.stakeCurrency"
        v-if="stakeStatus === 'stake' && proState === 2"
      ></star-input>

      <star-input
        class="detail-input"
        v-if="stakeStatus === 'unstake'"
        :precision="currencyInfo.stakePrecision"
        :value="inputValue"
        maxColor="#FEC944"
        @input="inputEvent"
        :stakeCurrency="currencyInfo.stakeCurrency"
        @maxEvent="maxEvent"
        @focusEvent="isFocus = true"
        @blurEvent="isFocus = false"
      >
      </star-input>
    </div>
    <star-space :size="12"></star-space>
    <div v-if="stakeStatus === 'unstake'" class="detail-wrap-content-left-info">
      <span>{{ $t("还可解押") }}：{{ renderAmount(stakeAmount) }}</span>
    </div>
    <div
      class="detail-wrap-content-left-info"
      v-if="
        detailCardType === 'open' && proState === 2 && stakeStatus === 'stake'
      "
    >
      <div>
        <span>{{ $t("还可质押") }}：</span>
        <span
          >{{ renderAmount(restStakeAmount) }}
          {{ currencyInfo.stakeCurrency }}</span
        >
      </div>
      <div>
        <span>{{ $t("余额") }}：</span>
        <!-- 钱包的stc -->
        <span
          >{{ renderAmount(balances[currencyInfo.stakeCurrency]) }}
          {{ currencyInfo.stakeCurrency }}</span
        >
      </div>
    </div>
    <star-space
      :size="24"
      v-if="
        detailCardType === 'open' &&
        proState !== 3 &&
        proState !== 4 &&
        proState !== 5
      "
    ></star-space>

    <div
      class="detail-wrap-conent-left-amount-text"
      v-if="detailCardType === 'open' && (proState === 4 || proState === 3)"
    >
      <template v-if="proState === 3 && stakeStatus !== 'unstake'">
        <p class="detail-wrap-conent-left-amount-text-ttile">
          {{ $t("我的质押") }}
        </p>
        <star-space :size="8"></star-space>
        <p class="detail-wrap-conent-left-amount-text-amount">
          {{ renderAmount(stakeAmount) }} {{ currencyInfo.stakeCurrency }}
        </p>
      </template>
      <template v-if="proState === 4 && stakeStatus !== 'unstake'">
        <p class="detail-wrap-conent-left-amount-text-ttile">
          {{ $t("我的份额") }}
        </p>
        <star-space :size="8"></star-space>
        <p class="detail-wrap-conent-left-amount-text-amount">
          {{
            getCurrencyShare(
              detailCardInfo.capTotal,
              detailCardInfo.assignPrecision
            )
          }}
          {{ detailCardInfo.assignCurrency }}
        </p>
      </template>
    </div>
    <div class="detail-wrap-content-left-error" v-if="errorText">
      <p>{{ errorText }}</p>
    </div>
    <star-space :size="12"></star-space>
    <star-button
      v-if="showRule('closed', payState)"
      class="detail-wrap-content-button"
      :class="{
        noPointer:
          (proState === 3 || proState === 1) && stakeStatus === 'stake',
      }"
    >
      <p class="detail-wrap-content-button-text">
        <span
          v-if="
            stakeStatus === 'stake' &&
            detailCardType === 'open' &&
            proState === 2
          "
          @click="onStakeClick"
        >
          {{ $t("质押") }}
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
          @click="payFunc"
        >
          {{
            isPaying
              ? `${$t("支付中")}...`
              : `${$t("待支付")} ${getPayAmount()} ${currencyInfo.payCurrency}`
          }}
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
          {{ $t("解押") }}
        </span>
      </p>
    </star-button>
    <div v-if="!payState && proState !== 1">
      <star-space :size="20"></star-space>
      <span
        class="detail-wrap-content-left-unstake"
        @click="changeStakeStatus('unstake')"
        v-if="stakeStatus === 'stake' && proState !== 1"
      >
        {{ $t("解押") }}
      </span>
      <span
        v-if="stakeStatus === 'unstake' && proState !== 3 && proState !== 4"
        style="margin-left: 5px"
        class="detail-wrap-content-left-unstake"
        @click="changeStakeStatus('stake')"
      >
        {{ $t("质押") }}
      </span>
      <span
        v-if="stakeStatus === 'unstake' && proState === 3"
        style="margin-left: 5px"
        class="detail-wrap-content-left-unstake"
        @click="changeStakeStatus('stake')"
      >
        {{ $t("锁仓") }}
      </span>
      <span
        v-if="stakeStatus === 'unstake' && proState === 4 && !payState"
        style="margin-left: 5px"
        class="detail-wrap-content-left-unstake"
        @click="changeStakeStatus('stake')"
      >
        {{ $t("待支付") }}
      </span>
    </div>
    <!-- 支付成功 -->
    <div
      class="detail-wrap-content-left-paysuccess"
      v-if="payState && proState === 4"
    >
      <div class="detail-wrap-content-left-paysuccess-wrap">
        <img src="../../assets/home/pay-succeed.png" />
        <span class="detail-wrap-content-left-paysuccess-title">{{
          $t("支付成功")
        }}</span>
      </div>
      <star-space :size="10"></star-space>
      <p class="detail-wrap-content-left-paysuccess-detail">
        {{
          $t("支付成功文案", {
            assign: currencyInfo.assignCurrency,
            stake: currencyInfo.stakeCurrency,
          })
        }}
      </p>
    </div>
    <star-space :size="35"></star-space>
    <div class="detail-wrap-content-left-rule">
      <p>
        {{ $t("参与规则") }}
      </p>
      <star-space :size="10"></star-space>
      <p class="detail-wrap-content-left-rule-content">
        {{
          this.language === "zh"
            ? detailCardInfo.ruleDesc
            : detailCardInfo.ruleDescEn
        }}
      </p>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import StarButton from "@StarUI/StarButton.vue";
import StarInput from "@StarUI/StarInput.vue";
import StarSpace from "@StarUI/StarSpace.vue";
import { mapState, mapActions } from "vuex";
import utilsNumber from "@utils/number.js";
import { isNil, isUndefined } from "lodash";
import { countdown } from "@utils/date.js";
import { Message } from "element-ui";
import mixinTool from "./tool";
export default {
  data() {
    return {
      inputValue: "",
      stakeStatus: "stake", // 质押状态 质押stake   解压unstake
      // lang: session.getItem("lang"),
      errorText: "",
      countdowntime: null,
      currencyShareAmount: "0", // 为0没有份额，说明没有参与活动
      isPaying: false,
      timer: null,
      isFocus: false,
      isHoverBtn: false,
    };
  },
  mixins: [mixinTool],
  props: ["detailCardInfo"],
  components: { StarInput, StarSpace, StarButton },
  mounted() {
    if (this.detailCardInfo.cardType === "will") {
      let time = this.detailCardInfo(this.detailCardId).startTime;
      this.timer = setInterval(() => {
        this.countdowntime = this.formateDate(countdown(time));
      }, 1000);
    }
  },
  methods: {
    ...mapActions("StoreProDetail", ["contractFunc"]),
    ...mapActions("StoreHome", ["triggerStakeRecord"]),
    formateDate(obj) {
      const { day, hour, minute, second } = obj;
      if (
        isUndefined(day) &&
        isUndefined(hour) &&
        isUndefined(minute) &&
        isUndefined(second)
      ) {
        window.location.reload();
        return;
      }
      return `${day === 0 ? "" : `${day}D`} ${hour}:${minute}:${second}`;
    },

    // 获取代币份额
    getCurrencyShare(capTotal, precision) {
      if (!this.myStakeAmount) {
        this.currencyShareAmount = "0";
        return "0";
      }
      let amount = utilsNumber.formatNumberMeta(
        utilsNumber
          .bigNum(this.myStakeAmount)
          .times(capTotal)
          .div(this.stakeTotalAmount)
          .toString(),
        {
          precision,
          trailingZero: false,
          round: "floor",
        }
      ).text;
      if (isNil(amount) || !this.myStakeAmount) {
        amount = "0";
      }
      this.currencyShareAmount = amount;
      return amount;
    },
    changeStakeStatus(state) {
      this.stakeStatus = state;
      this.inputValue = "";
      this.errorText = "";
    },
    inputEvent(e) {
      if (this.detailCardInfo.cardType === "will") {
        return;
      }
      this.errorText = "";
      this.inputValue = e;
    },

    maxEvent() {
      if (this.detailCardInfo.cardType === "will") {
        return;
      }
      if (
        this.detailCardInfo.currencyInfo.stakeCurrency === "STC" &&
        this.stakeStatus === "stake"
      ) {
        const cname =
          this.detailCardInfo.cardType === "open"
            ? "open-toast"
            : this.detailCardInfo.cardType === "will"
            ? "will-toast"
            : "closed-toast";
        Message({
          message: this.$t("STC预留"),
          duration: 5000,
          customClass: cname,
        });
        return;
      }
      if (this.stakeStatus === "stake") {
        // 最大质押量、钱包余额做比较
        if (
          utilsNumber
            .bigNum(this.restStakeAmount)
            .gte(this.balances[this.detailCardInfo.currencyInfo.stakeCurrency])
        ) {
          this.inputValue = this.isNilCheck(
            utilsNumber
              .bigNum(
                this.balances[this.detailCardInfo.currencyInfo.stakeCurrency]
              )
              .div(
                Math.pow(10, this.detailCardInfo.currencyInfo.stakePrecision)
              )
              .toString()
          );
        } else {
          this.inputValue = this.isNilCheck(
            utilsNumber
              .bigNum(this.restStakeAmount)
              .div(
                Math.pow(10, this.detailCardInfo.currencyInfo.stakePrecision)
              )
              .toString()
          );
        }
      }
      if (this.stakeStatus === "unstake") {
        if (isNil(this.stakeAmount)) {
          return;
        }
        this.inputValue = this.isNilCheck(
          utilsNumber
            .bigNum(this.stakeAmount)
            .div(Math.pow(10, this.detailCardInfo.currencyInfo.stakePrecision))
            .toString()
        );
      }
    },

    async onStakeClick() {
      if (!this.validateStake()) return;
      let params = this.getParams();
      const amount = utilsNumber
        .bigNum(this.inputValue)
        .times(Math.pow(10, this.detailCardInfo.currencyInfo.stakePrecision))
        .toString();
      params = {
        ...params,
        amount,
        type: "stake",
      };
      console.log("====params====", params);
      this.contractFunc(params);
      this.triggerStakeRecord({
        userAddress: this.stcAccounts[0],
        prdAddress: this.detailCardInfo.currencyInfo.assignAddress,
        userPledgeType: 1,
        currency: this.detailCardInfo.currencyInfo.assignCurrency,
        amount: this.inputValue,
      });
      this.inputValue = "";
    },

    async onUnstakeClick() {
      if (this.detailCardInfo.cardType === "will" || this.isPaying === true) {
        return;
      }
      if (!this.validateUnstake()) return;
      let params = this.getParams();
      const amount = utilsNumber
        .bigNum(this.inputValue)
        .times(Math.pow(10, this.detailCardInfo.currencyInfo.stakePrecision))
        .toString();
      params = {
        ...params,
        amount,
        type: "unstake",
      };
      this.contractFunc(params);
      this.triggerStakeRecord({
        userAddress: this.stcAccounts[0],
        prdAddress: this.detailCardInfo.currencyInfo.assignAddress,
        userPledgeType: 2,
        currency: this.detailCardInfo.currencyInfo.assignCurrency,
        amount: this.inputValue,
      });
      this.inputValue = "";
    },

    async payFunc() {
      if (!this.validatePay()) return;
      if (this.isPaying) return;
      this.isPaying = true;
      const params = this.getParams();
      this.contractFunc({
        ...params,
        type: "pay",
      });
      // const res = await Wallet.payUSDT({
      // ...params,
      // });
      // if (res) {
      // console.log("=====支付成功=====");
      // this.$emit("eventLoop");
      // }
    },
  },
  computed: {
    ...mapState("StoreApp", {
      language: (state) => state.language,
    }),
    ...mapState("StoreWallet", {
      balances: (state) => state.balances,
      stcProvider: (state) => state.stcProvider,
      stcAccounts: (state) => state.stcAccounts,
    }),
    ...mapState("StoreContracts", {
      restStakeAmount: (state) => state.restStakeAmount,
      stakeAmount: (state) => state.stakeAmount,
      proState: (state) => state.proState,
      myStakeAmount: (state) => state.myStakeAmount,
      stakeTotalAmount: (state) => state.stakeTotalAmount,
      payState: (state) => state.payState,
    }),
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
};
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";
@import "~@/styles/mixin.scss";
.noPointer {
  cursor: default;
}
.detail-input-wrap {
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-image: url("../../assets/home/detail-left-input.png");
  &:hover {
    background-image: url("../../assets/home/detail-left-input-hover.png");
  }
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
  background-color: transparent;
  background-image: url("../../assets/home/detail-left-btn.png");
  color: #fec944;
  height: 54px;
  text-align: center;
  width: 100%;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100% 100%;
  line-height: 54px;
  padding: 0;
  &:hover {
    background-image: url("../../assets/home/detail-left-btn-hover.png");
  }
  .detail-wrap-content-button-text {
    font-weight: 500;
    font-size: 24px;
    z-index: 999;
    position: relative;
    span {
      display: inline-block;
      width: 100%;
      @include userNoSelect();
    }
  }
}
.detail-wrap-content-left-error {
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
  display: inline-block;
  @include userNoSelect();
}
.detail-wrap-content-left-paysuccess {
  color: #fec944;
  .detail-wrap-content-left-paysuccess-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    .detail-wrap-content-left-paysuccess-title {
      font-size: 24px;
      margin-left: 5px;
    }
  }
  .detail-wrap-content-left-paysuccess-detail {
    font-size: 14px;
    font-weight: 500;
  }
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
