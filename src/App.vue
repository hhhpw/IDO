<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <start-header></start-header>
    <router-view></router-view>
    <start-footer></start-footer>
    <!-- <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view> -->
  </div>
</template>
<script>
import StartHeader from "@startUI/StartHeader";
import StartFooter from "@startUI/StartFooter";
export default {
  components: {
    StartHeader,
    StartFooter,
  },
};
</script>

<style lang="scss"></style>
