<template>
  <div class="start-input">
    dsaas
    <el-input>
      <div slot="suffix">
        <span>MAX</span>
        <span>|</span>
        <span>USDT</span>
      </div>
      <!-- <i slot="suffix" class="el-input__icon el-icon-date" @click="test"></i>
      <i slot="suffix" class="el-input__icon el-icon-search"></i> -->
    </el-input>
    <!-- <el-input placeholder="请输入内容" v-model="input4">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input> -->
  </div>
</template>
<script>
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
