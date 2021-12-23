<template>
  <div class="star-tool-tip">
    <Tooltip v-bind="$attrs" class="star-tool-tip">
      <slot></slot>
    </Tooltip>
  </div>
</template>

<script>
import { Tooltip } from "element-ui";
export default {
  props: {},
  components: {
    Tooltip,
  },
};
</script>

<style lang="scss">
.star-tool-tip {
  .el-tooltip__popper.is-dark {
    border-radius: 0px;
    padding: 6px;
    background-color: #2d2d2d;
    // background-color: rgba(0, 0, 0, 0.3);
    // background-color: #170c39;
    color: #fff !important;
  }
  .el-tooltip__popper[x-placement^="top"] .popper__arrow::after {
    // border-top-color: #170c39 !important;
  }
}
</style>
