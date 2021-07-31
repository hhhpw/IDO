<template>
  <div class="start-home-support">
    <p>I PARTNERS</p>
    <div>
      <start-tag
        v-for="(d, i) in supportList"
        :key="i"
        :class="`support-tag-${i + 1}`"
        :style="`background-image: url(${d})`"
      >
      </start-tag>
    </div>
  </div>
</template>
<script>
import StartTag from "@startUI/StartTag.vue";
export default {
  data() {
    return {
      supportList: [
        require("../../assets/home/support-bticoin.png"),
        require("../../assets/home/support-buiness.png"),
        require("../../assets/home/support-hacker.png"),
        require("../../assets/home/support-yahoo.png"),
      ],
    };
  },
  components: {
    StartTag,
  },
  mounted() {},
  methods: {},
  computed: {},
  beforeDestroy() {},
};
</script>
<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";
.start-home-support {
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 146px;
  background: linear-gradient(
      180deg,
      rgba(42, 254, 254, 0.59) 0%,
      rgba(42, 254, 254, 0.56) 28%,
      rgba(42, 254, 254, 0) 100%
    ),
    linear-gradient(180deg, #2afefe 0%, rgba(42, 254, 254, 0) 100%);
  background-repeat: no-repeat;
  background-size: contain;
  @for $i from 1 through 4 {
    .support-tag-#{$i} {
      @if $i == 1 {
        width: 207px;
      }
      @if $i == 2 {
        width: 145px;
      }
      @if $i == 3 {
        width: 225px;
      }
      @if $i == 4 {
        width: 125px;
      }
    }
  }
  p {
    font-size: 35px;
    color: $text_light_color;
    @include fontRigelstar();
  }
}
</style>
