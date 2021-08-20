<template>
  <div class="star-loadig">
    <div
      class="star-loadig-loading"
      v-if="!data"
      :style="{
        height: `${height}px`,
      }"
    >
      <img src="../../assets/loading/loading.gif" />
    </div>
    <slot v-else></slot>
  </div>
</template>

<script>
export default {
  props: {
    data: [Object, Array],
    height: Number,
  },
};
</script>

<style lang="scss" scoped>
.star-loadig-loading {
  width: 100%;
  height: 800px;
  font-size: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
