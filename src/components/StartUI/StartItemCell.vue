<template>
  <div class="start-item-cell">
    <div v-if="cellType === 'horizontal'" class="start-item-cell-horizontal">
      <slot name="default"></slot>
      <p class="start-item-cell-title">{{ data.title }}</p>
      <start-space :size="5"></start-space>
      <p class="start-item-cell-info">{{ data.amount }}</p>
      <start-space :size="20"></start-space>
    </div>
    <div v-if="cellType === 'vertical'" class="start-item-cell-vertical">
      <slot name="default"></slot>
    </div>
  </div>
</template>
<script>
import StartSpace from "@startUI/StartSpace.vue";
export default {
  data() {
    return {};
  },
  components: {
    StartSpace,
  },
  props: {
    cellType: {
      type: String,
      default: "horizontal",
    },
    data: {
      type: Object,
    },
  },
  mounted() {},
  methods: {},
  computed: {},
  beforeDestroy() {},
};
</script>
<style lang="scss" scoped>
.start-item-cell {
  color: #ffffff;
  .start-item-cell-horizontal {
    .start-item-cell-title {
      font-size: 12px;
      font-weight: 400;
      opacity: 0.7;
    }
    .start-item-cell-info {
      font-size: 16px;
      font-weight: 500;
    }
  }
  .start-item-cell-vertical {
    display: flex;
    align-items: center;
  }
}
</style>
