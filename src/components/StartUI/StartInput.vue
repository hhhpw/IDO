<template>
  <div class="start-input">
    <el-input v-bind="{ ...$attrs }" @input="inputEvent">
      <div slot="suffix" class="start-input-suffix">
        <span class="start-input-suffix-max">MAX</span>
        <span>|</span>
        <span class="start-input-suffix-usdt">USDT</span>
      </div>
    </el-input>
  </div>
</template>
<script>
export default {
  data() {
    return {
      inputValue: "",
    };
  },
  components: {},
  props: {
    inputType: {
      type: String,
      default: "number",
    },
    precision: {
      type: Number, // 小数点后精度
      default: 0,
    },
    type: {
      type: String,
      default: "number",
    },
  },
  methods: {
    inputEvent(val) {
      if (this.type === "number" && this.precision > 0) {
        val = val.toString();
        val = val
          .replace(/[^\d^\\.]+/g, "") // 把不是数字，不是小数点的过滤掉
          .replace(/^0+(\d)/, "$1") // 第一位0开头，0后面为数字，则过滤掉，取后面的数字
          .replace(/^\./, "0."); // 如果输入的第一位为小数点，则替换成 0. 实现自动补全
        let reg = new RegExp("^\\d*(\\.?\\d{0," + this.precision + "})", "g");
        this.value = val.match(reg)[0] || ""; // 最终匹配得到结果 以数字开头，只有一个小数点，而且小数点后面只能有0到2位小数
      }
      this.$emit("input", this.value);
    },
  },
};
</script>

<style lang="scss" scoped>
.start-input {
  color: #fff;
  height: 54px;
  ::v-deep {
    .el-input,
    .el-input__inner {
      height: 54px;
    }
    .el-input__inner {
      width: 80%;
    }
  }
  .start-input-suffix {
    display: flex;
    align-items: center;
    height: 100%;
    .start-input-suffix-max {
      margin-right: 10px;
    }
    .start-input-suffix-usdt {
      margin-left: 10px;
      margin-right: 5px;
    }
  }
}
</style>
