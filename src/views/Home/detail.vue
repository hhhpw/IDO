<template>
  <div class="detail-wrap animate__animated animate__fadeInUp">
    <start-space :size="30"></start-space>
    <div class="detail-wrap-content">
      <div
        class="detail-wrap-content-left"
        :style="`background-image: url(${require(`../../assets/home/${detailCardType}-left-bg.png`)})`"
      >
        <detail-left-card> </detail-left-card>
      </div>
      <div
        class="detail-wrap-content-right"
        :style="`background-image: url(${require(`../../assets/home/${detailCardType}-right-bg.png`)})`"
      >
        <detail-right-card> </detail-right-card>
      </div>
    </div>
  </div>
</template>
<script>
import StartSpace from "@startUI/StartSpace.vue";
import DetailRightCard from "@components/Home/detailRightCard.vue";
import DetailLeftCard from "@components/Home/detailLeftCard.vue";
import { mapState } from "vuex";
export default {
  components: {
    // StartInput,
    StartSpace,
    // StartButton,
    DetailRightCard,
    DetailLeftCard,
  },
  data() {
    return {
      inputValue: "",
    };
  },
  props: {
    cardInfo: Object,
  },
  mounted() {},
  methods: {
    inputEvent(e) {
      this.inputValue = e;
    },
  },
  computed: mapState("StoreHome", {
    detailCardType: (state) => state.detailCardType,
    colorInfo: (state) => state.colorInfo,
  }),
  beforeDestroy() {},
};
</script>
<style lang="scss" scoped>
.detail-wrap {
  padding-top: 40px;
  .detail-wrap-content {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    .detail-wrap-content-left {
      width: 36%;
      padding: 40px 20px 50px;
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
    .detail-wrap-content-right {
      width: 55%;
      // height: 600px;
      background-repeat: no-repeat;
      background-image: url("../../assets/home/open-right-bg.png");
      background-size: 100% 100%;
    }
  }
  // color: red;
  // font-size: 100x;
}
</style>
