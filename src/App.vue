<template>
  <div id="app">
    <star-header></star-header>
    <div style="padding-top: 80px">
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
