<template>
  <div class="start-input">
    <el-input v-model="inputValue">
      <div slot="suffix" class="start-input-suffix">
        <span class="start-input-suffix-max">MAX</span>
        <span>|</span>
        <span class="start-input-suffix-usdt">USDT</span>
      </div>
    </el-input>
    <!-- <el-input placeholder="请输入内容" v-model="input4">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input> -->
  </div>
</template>
<script>
// import StartSpace from "@startUI/StartSpace.vue";
// <el-input
//    style="width:200px;"
//    v-model="relationForm.fee"
//    oninput="value=value.replace(/[^0-9.]/g,'')"
//    :placeholder="代理费"
//  ></el-input>

export default {
  data() {
    return {
      inputValue: "",
    };
  },
  components: {
    // StartSpace,
  },
  props: {
    inputType: {
      type: String,
      default: "number",
    },
  },
  methods: {
    inputLimit(val) {
      console.log("val", val);
    },
    test() {
      alert("ss");
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
