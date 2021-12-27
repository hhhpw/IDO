import utilsDate from "@utils/date";
import utilsTool from "@utils/tool";
import utilsNumber from "@utils/number.js";
import { isUndefined } from "lodash";
export default {
  methods: {
    openURL(url) {
      utilsTool.openNewWindow(url);
    },
    formateDate(timeObj) {
      const { day, hour, minute, second } = timeObj;
      if (
        isUndefined(day) &&
        isUndefined(hour) &&
        isUndefined(minute) &&
        isUndefined(second)
      ) {
        return null;
      }
      return [day, hour, minute, second];
    },
    setCountDown(timestamp) {
      const times = this.formateDate(utilsDate.countdown(timestamp));
      if (times) {
        this.countdown = `${times[0] ? times[0] + "D" : times[0]} ${times[1]} ${
          times[2]
        } ${times[3]}`;
      }
      if (!this.countdown) {
        clearTimeout(this.timer);
        return;
      }
      if (times.every((d) => String(d) === "00")) {
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
