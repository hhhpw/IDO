<template>
  <div class="start-item-cell">
    <div v-if="cellType === 'horizontal'" class="start-item-cell-horizontal">
      <slot name="default"></slot>
      <p class="start-item-cell-title">{{ $t(data.title) }}</p>
      <start-space :size="5"></start-space>
      <p class="start-item-cell-info">
        <!-- {{ utilsNumber }} -->
        <template v-if="formatOptions">
          {{
            utilsNumber.formatNumberMeta(data.amount, { grouped: true }).text
          }}
          {{ unit || "" }}
        </template>
        <template v-else> {{ data.amount }}</template>
      </p>
      <start-space :size="20"></start-space>
    </div>
    <div v-if="cellType === 'vertical'" class="start-item-cell-vertical">
      <slot name="default"></slot>
    </div>
  </div>
</template>
<script>
import StartSpace from "@startUI/StartSpace.vue";
import utilsNumber from "@utils/number.js";
// import utilsNumber from '@/utils/utilsNumber';
console.log("utilsNumber", utilsNumber);
export default {
  data() {
    return {
      utilsNumber,
    };
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
    formatOptions: {
      type: [Object, null],
      default: null,
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
