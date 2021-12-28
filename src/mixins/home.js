import utilsTool from "@utils/tool";
import utilsNumber from "@utils/number.js";
import dayjs from "dayjs";
import * as isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import * as duration from "dayjs/plugin/duration";
dayjs.extend(isSameOrAfter);
dayjs.extend(duration);
export default {
  methods: {
    openURL(url) {
      utilsTool.openNewWindow(url);
    },
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
    cellData(key, currency, currencyB) {
      let name, text;
      if (key === "raiseTotal") {
        name = this.$t("总募资");
        text = `${
          utilsNumber.formatNumberMeta(this.data[key], { grouped: true }).text
        } ${currency}`;
      }
      if (key === "rate") {
        name = this.$t("兑换比例");
        text = `1 ${currency} = ${
          utilsNumber.formatNumberMeta(this.data[key], { grouped: true }).text
        } ${currencyB}`;
      }
      if (key === "capTotal") {
        name = this.$t("总销售量");
        text = `${
          utilsNumber.formatNumberMeta(this.data[key], { grouped: true }).text
        } ${currency}`;
      }
      return {
        title: name,
        text,
      };
    },
  },
};
