<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <start-header></start-header>
    <router-view></router-view>
    <!-- <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view> -->
  </div>
</template>
<script>
import StartHeader from "@startUI/StartHeader";
export default {
  components: {
    StartHeader,
  },
};
</script>

<style lang="scss"></style>
