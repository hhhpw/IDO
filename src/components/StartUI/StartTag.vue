<template>
  <div class="start-tag">
    <slot name="default"></slot>
  </div>
</template>
<script>
export default {
  name: "StartTag",
  data() {
    return {};
  },
  props: {
    img: {
      type: String,
    },
  },
  mounted() {},
  methods: {},
  computed: {},
  beforeDestroy() {},
};
</script>
<style lang="scss" scoped>
.start-tag {
  // padding: 10px;
  // width: 100px;
  // height: 60px;
  display: inline-block;
  cursor: pointer;
}
.start-tag + .start-tag {
  margin-left: 10px;
}
</style>
