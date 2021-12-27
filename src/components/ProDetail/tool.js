import utilsNumber from "@utils/number.js";
import { isNil } from "lodash";
export default {
  methods: {
    showRule(type, paystate) {
      console.log("type", type, "paystate", paystate);
      if (type === "open") {
        if (paystate) {
          return false;
        }
        return true;
      }
      if (type === "closed" || type === "will") {
        return true;
      }
    },
    isNilCheck(val) {
      if (val === "NaN") {
        return "0";
      }
      return val;
    },
    getPayAmount() {
      if (!this.currencyShareAmount) return "0";
      return utilsNumber.formatNumberMeta(
        utilsNumber
          .bigNum(this.currencyShareAmount)
          .times(this.detailCardInfo.rate),
        {
          precision: 2,
          grouped: true,
          round: "ceil",
        }
      ).text;
    },
    renderAmount(balance) {
      if (isNil(balance)) return "0";
      return utilsNumber.formatNumberMeta(
        utilsNumber
          .bigNum(balance)
          .div(Math.pow(10, this.detailCardInfo.currencyInfo.stakePrecision))
          .toString(),
        { grouped: true }
      ).text;
    },
    getParams() {
      const { stakeAddress, payAddress, assignAddress } =
        this.detailCardInfo.currencyInfo;
      return {
        tokenCode: [stakeAddress, payAddress, assignAddress],
      };
    },
    validatePay() {
      if (this.proState === 4) {
        if (this.currencyShareAmount === "0") {
          // 待支付状态但是没参与或者没有额度
          this.errorText = this.$t("errors.您未获得该活动额度");
          return false;
        }
      }
      return true;
    },
    // 质押合法性
    validateStake() {
      if (!utilsNumber.bigNum(this.inputValue).gt(0)) {
        return false;
      }
      if (!utilsNumber.bigNum(this.inputValue).gte(100)) {
        this.errorText = this.$t("errors.最小质押100", {
          currency: this.detailCardInfo.currencyInfo.stakeCurrency,
        });
        return false;
      }
      if (
        utilsNumber
          .bigNum(this.inputValue)
          .gt(
            utilsNumber
              .bigNum(
                this.balances[this.detailCardInfo.currencyInfo.stakeCurrency]
              )
              .div(
                Math.pow(10, this.detailCardInfo.currencyInfo.stakePrecision)
              )
          )
      ) {
        this.errorText = this.$t("errors.账户余额不足");
        return false;
      }
      if (
        utilsNumber
          .bigNum(this.inputValue)
          .gt(
            utilsNumber
              .bigNum(this.restStakeAmount)
              .div(
                Math.pow(10, this.detailCardInfo.currencyInfo.stakePrecision)
              )
          )
      ) {
        this.errorText = this.$t("errors.质押量超出个人额度上限");
        return false;
      }

      return true;
    },
    // 解押合法性
    validateUnstake() {
      if (!utilsNumber.bigNum(this.inputValue).gt(0)) {
        return false;
      }
      if (
        utilsNumber
          .bigNum(this.inputValue)
          .gt(
            utilsNumber
              .bigNum(this.stakeAmount)
              .div(
                Math.pow(10, this.detailCardInfo.currencyInfo.stakePrecision)
              )
          )
      ) {
        this.errorText = this.$t("errors.可解押量不足");
        return false;
      }
      return true;
    },
  },
};
