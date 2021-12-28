import { isNil } from "lodash";
import utilsNumber from "@utils/number.js";
import utilsFormat from "@utils/format";
import dayjs from "dayjs";
import * as isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import * as duration from "dayjs/plugin/duration";
dayjs.extend(isSameOrAfter);
dayjs.extend(duration);
export default {
  methods: {
    setCountDown(timestamp) {
      const diffTime = dayjs.duration(timestamp - dayjs());
      const day = diffTime.days();
      const hours =
        diffTime.hours() < 10 ? `0${diffTime.hours()}` : diffTime.hours(); //小时
      const minutes =
        diffTime.minutes() < 10 ? `0${diffTime.minutes()}` : diffTime.minutes(); //分钟
      const seconds =
        diffTime.seconds() < 10 ? `0${diffTime.seconds()}` : diffTime.seconds(); //秒
      this.countdown = `${day}D ${hours}:${minutes}:${seconds}`;
      if (!this.countdown) {
        clearTimeout(this.timer);
        return;
      }
      if (dayjs().isSameOrAfter(dayjs(timestamp))) {
        window.location.reload();
      }
      this.timer = setTimeout(() => this.setCountDown(timestamp), 1000);
    },
    showRule(type, paystate) {
      // console.log("type", type, "paystate", paystate);
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
      console.log("     this.restStakeAmount", this.restStakeAmount);
      console.log("     this.stakeAmount", this.stakeAmount);
      if (!this.stakeAmount && !utilsNumber.bigNum(this.inputValue).gte(100)) {
        this.errorText = this.$t("errors.最小质押100", {
          currency: this.detailCardInfo.currencyInfo.stakeCurrency,
        });
        return false;
      }
      if (this.stakeAmount && this.restStakeAmount) {
        if (
          utilsNumber
            .bigNum(this.inputValue)
            .gt(
              utilsFormat.formatBalance(
                this.restStakeAmount,
                this.detailCardInfo.currencyInfo.stakePrecision
              )
            )
        ) {
          this.errorText = this.$t("errors.最小质押100", {
            currency: this.detailCardInfo.currencyInfo.stakeCurrency,
          });
        }
      }
      if (
        utilsNumber
          .bigNum(this.inputValue)
          .gt(
            utilsFormat.formatBalance(
              this.balances[this.detailCardInfo.currencyInfo.stakeCurrency],
              this.detailCardInfo.currencyInfo.stakePrecision
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
            utilsFormat.formatBalance(
              this.restStakeAmount,
              this.detailCardInfo.currencyInfo.stakePrecision
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
            utilsFormat.formatBalance(
              this.stakeAmount,
              this.detailCardInfo.currencyInfo.stakePrecision
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
