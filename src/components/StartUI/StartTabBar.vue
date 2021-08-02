<template>
  <div class="start-tabs">
    <tabs @tab-click="handleClick" :value="value">
      <tab-pane
        v-for="d in items"
        :label="d.label"
        :key="d.value"
        :name="d.value"
      >
        <slot></slot>
      </tab-pane>
    </tabs>
    <!-- <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
      <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
      <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
    </el-tabs> -->
  </div>
</template>
<script>
// import variables from "@styles/variables.scss";
import { Tabs, TabPane } from "element-ui";
export default {
  data() {
    return {
      tabValue: this.value,
      activeName: "second",
    };
  },
  components: {
    Tabs,
    TabPane,
  },
  props: {
    items: {
      type: Array,
    },
    value: null,
    color: {},
  },
  mounted() {},
  methods: {
    handleClick(tab) {
      this.$emit("input", tab.name);
    },
  },
  computed: {},
  beforeDestroy() {},
};
</script>
<style lang="scss" scoped>
@import "~@/styles/variables.scss";
.start-tabs {
  ::v-deep {
    .el-tabs__item.is-active {
      color: green;
    }
    .el-tabs__item {
      color: #fff;
    }
    .el-tabs__active-bar {
      background-color: greenyellow;
    }
    .el-tabs__item:hover {
      color: none;
    }
    .el-tabs__nav-wrap::after {
      display: none;
      // display: none;
      // content: "";
    }
  }
}
</style>
