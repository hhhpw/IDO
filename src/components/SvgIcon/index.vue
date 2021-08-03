<template>
  <svg
    :class="svgClass"
    aria-hidden="true"
    v-bind="$attrs"
    :style="{ color: color }"
    v-on="$listeners"
  >
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
// doc: https://panjiachen.github.io/vue-element-admin-site/feature/component/svg-icon.html#usage
const req = require.context("../../icons", true, /\.svg$/);

const map = {};

for (const key of req.keys()) {
  map[key] = req(key);
  // const keyArr = key.split('/');
  // keyArr.shift(); // 移除.
  // map[keyArr.join('.').replace(/\.svg$/g, '')] = context(key);
}

export default {
  name: "SvgIcon",
  props: {
    name: {
      type: String,
      required: true,
    },
    className: {
      type: String,
      default: "",
    },
    color: {
      type: String,
      default: "",
    },
  },
  computed: {
    iconName() {
      return `#icon-${this.name}`;
    },
    svgClass() {
      if (this.className) {
        return "svg-icon " + this.className;
      } else {
        return "svg-icon";
      }
    },
  },
};
</script>

<style scoped lang="scss">
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  cursor: pointer;
  .rect {
    fill: rectColor;
  }
}
</style>
