<template>
  <div id="app">
    <star-header></star-header>
    <div class="wrap">
      <router-view></router-view>
    </div>
    <star-footer></star-footer>
  </div>
</template>
<script>
import StarHeader from "@StarUI/StarHeader";
import StarFooter from "@StarUI/StarFooter";
export default {
  components: {
    StarHeader,
    StarFooter,
  },
};
</script>
<style lang="scss" scoped>
.wrap {
  padding-top: 80px;
}
</style>
