<template>
  <div class="home-list-single-item">
    <img
      src="../../assets/home/home-item-square.png"
      alt=""
      class="home-list-single-item-square"
    />
    <star-space :size="20"></star-space>
    <div class="home-list-single-item-mask">
      <div class="home-list-single-item-left">
        <p class="home-list-single-item-left-title">
          {{ data.prdName }}
        </p>
        <star-space :size="20"></star-space>
        <div class="home-list-single-item-left-label">
          <div
            v-for="(d, i) in data.labels"
            :key="i"
            class="home-list-single-item-left-label-item"
          >
            {{ d.label }}
          </div>
        </div>
        <star-space :size="20"></star-space>
        <div class="home-list-single-item-left-link">
          <svg-icon
            v-for="(d, i) in data.links"
            :key="i"
            class="home-list-single-item-left-link-item"
            :name="d.name"
            @click.prevent.stop="openURL(d.url)"
          >
          </svg-icon>
        </div>
        <div class="home-list-single-item-left-infos">
          <star-item-cell
            :data="cellData('raiseTotal', data.payCurrency) || '- -'"
          >
          </star-item-cell>
          <star-item-cell
            :data="
              cellData('rate', data.assignCurrency, data.payCurrency) || '- -'
            "
          >
          </star-item-cell>
          <star-item-cell
            :data="cellData('capTotal', data.assignCurrency) || '- -'"
          >
          </star-item-cell>
        </div>
      </div>
      <div
        class="home-list-single-item-right"
        :style="`background-image: url(${data.prdImg})`"
      >
        <div class="home-list-single-item-right-mask"></div>
        <div class="home-list-single-item-right-box">
          <img :src="data.prdImg" style="margin-top: 40px" />
          <div
            v-if="cardType === 'open'"
            class="home-list-single-item-right-open-box"
          >
            <img src="../../assets/home/home-item-tag-bg.png" />
            <span>ON-GOING</span>
          </div>
          <div
            v-if="cardType === 'will'"
            class="home-list-single-item-right-will-box"
          >
            <span> {{ $t("项目开始") }}：</span>
            <span>{{ countdown }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import StarSpace from "@StarUI/StarSpace.vue";
import SvgIcon from "@components/SvgIcon/index.vue";
import StarItemCell from "@StarUI/StarItemCell.vue";
import mixinHome from "@/mixins/home.js";
export default {
  components: { StarSpace, SvgIcon, StarItemCell },
  mixins: [mixinHome],
  data() {
    return {
      countdown: null,
      timer: null,
    };
  },
  props: {
    colorsInfo: { type: Object },
    cardType: {
      type: String,
    },
    data: {
      type: Object,
    },
  },
  watch: {
    data: {
      handler(val) {
        if (val?.startTime && this.cardType === "will") {
          this.setCountDown(val.startTime);
        }
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>
<style lang="scss" scoped>
.home-list-single-item {
  border: 1px solid #d6872d;
  height: 380px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1px;
  position: relative;
  .home-list-single-item-square {
    position: absolute;
    top: 0;
    right: 0;
    width: 87px;
    height: 20px;
    z-index: 88;
  }
  .home-list-single-item-mask {
    border: 5px solid;
    border-image: linear-gradient(
        13deg,
        rgba(214, 135, 45, 1),
        rgba(214, 135, 45, 0)
      )
      5 5;
    height: calc(100% - 20px);
    width: calc(100% - 20px);
    display: flex;
  }
  .home-list-single-item-left {
    margin-left: 30px;
    position: relative;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    justify-content: center;
    width: 350px;
    color: #fff;
    .home-list-single-item-left-title {
      font-size: 20px;
    }
    .home-list-single-item-left-label {
      display: flex;
      .home-list-single-item-left-label-item {
        font-size: 12px;
        padding: 3px 10px;
        color: #d6872d;
        background: rgba(214, 135, 45, 0.11);
        border-radius: 2px;
        border: 1px solid rgba(214, 135, 45, 0.58);
        &:not(:first-child) {
          margin-left: 10px;
        }
      }
    }
    .home-list-single-item-left-link {
      display: flex;
      .home-list-single-item-left-link-item {
        width: 28px;
        height: 28px;
        margin-right: 10px;
        :hover {
          opacity: 0.7;
        }
      }
    }
    .home-list-single-item-left-infos {
      margin-top: 20px;
    }
  }
  .home-list-single-item-right {
    display: flex;
    align-items: center;
    justify-content: center;
    background-position: left top;
    background-size: cover;
    // background-repeat: no-repeat;
    // background-origin: center center;
    // background-size: cover;
    width: 750px;
    position: relative;
    .home-list-single-item-right-mask {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.6);
      z-index: 2;
    }
    img {
      width: 500px;
      opacity: 1;
      position: relative;
    }
    .home-list-single-item-right-box {
      position: relative;
      z-index: 33;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
    }
    .home-list-single-item-right-open-box {
      position: relative;
      height: 80px;
      img {
        height: 80px;
      }
      span {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        color: #fec944;
      }
    }
    .home-list-single-item-right-will-box {
      span {
        display: inline-block;
        margin-top: 40px;
        color: #fec944;
        // font-family: Denmark;
      }
    }
  }
}
</style>
