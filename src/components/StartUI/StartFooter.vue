<template>
  <div class="start-footer animate__animated animate__fadeInUp">
    <div class="start-footer-left">
      <p class="start-footer-left-title">ATLASPAD</p>
      <p class="start-footer-left-desc">
        <span>
          {{ $t("Terms") }}
        </span>
        <span>
          {{ $t("法律") }}
        </span>
      </p>
    </div>
    <div class="start-footer-right">
      <div v-for="(d, index) in data" :key="index">
        <p class="start-footer-right-title">
          {{ $t(d.name) }}
        </p>
        <p v-for="(dd, ii) in d.list" :key="ii" class="start-footer-right-item">
          {{ $t(dd.name) }}
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: [
        {
          name: "Social",
          list: [
            { name: "Twitter", url: "" },
            { name: "Medium", url: "" },
            { name: "Telegram", url: "" },
            { name: "Github", url: "" },
          ],
        },
        {
          name: "AtlasPad",
          list: [{ name: "Whitepaper", url: "" }],
        },
        {
          name: "Get in Touch",
          list: [{ name: "12321313@qq.com", url: "" }],
        },
      ],
    };
  },
  mounted() {},
  methods: {},
  computed: {},
  beforeDestroy() {},
};
</script>
<style lang="scss" scoped>
@import "~@/styles/variables.scss";
.start-footer {
  background: #2e345b;
  text-align: center;
  color: #fff;
  padding: 70px 90px 30px;
  position: relative;
  height: 300px;
  animation-duration: 1s;
  display: flex;
  .start-footer-left {
    flex: 1;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    text-align: left;
    .start-footer-left-title {
      font-family: Rigelstar;
      font-size: 28px;
    }
    .start-footer-left-desc {
      display: flex;
      color: $text_gray_color;
      span {
        font-size: 14px;
      }
      span + span {
        margin-left: 100px;
      }
    }
  }
  .start-footer-right {
    flex: 1;
    display: flex;
    justify-content: space-around;
    .start-footer-right-title {
      margin-bottom: 30px;
      font-size: 20px;
    }
    .start-footer-right-item {
      margin-bottom: 10px;
      font-size: 14px;
      color: $text_gray_color;
      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>
