<template>
  <div class="start-card-item" @click="emit">
    <div v-if="cardDetailTyoe === 'rough'" class="start-card-item-rough">
      <div class="start-card-item-rough-header">
        <start-item-cell cellType="vertical">
          <img :src="data.imgUrl" />
          <span>{{ $t(`${data.currencyPad}`) }}</span>
          <span>{{ $t(`${data.currency}`) }}</span>
        </start-item-cell>
      </div>
      <start-space :size="20"></start-space>
      <div class="start-card-item-rough-labels">
        <start-button
          v-for="(d, i) in data.labels"
          :key="i"
          light
          :style="setStyle"
          >{{ $t(`${d}`) }}</start-button
        >
      </div>
      <start-space :size="30"></start-space>
      <div class="start-card-item-rough-icons">
        <svg-icon
          v-for="(iconkey, index) in data.icons"
          :key="index"
          :name="iconkey + '-' + cardType"
          class="start-card-item-rough-icons-icon"
        ></svg-icon>
      </div>
      <start-space :size="30"></start-space>
      <div class="start-card-item-rough-infos">
        <start-item-cell
          v-for="(d, i) in details"
          :key="i"
          :data="d"
        ></start-item-cell>
      </div>
    </div>
  </div>
</template>
<script>
import StartSpace from "@startUI/StartSpace.vue";
import StartButton from "@startUI/StartButton.vue";
import SvgIcon from "@components/SvgIcon/index.vue";
import StartItemCell from "@startUI/StartItemCell.vue";
// import variables from "@styles/variables.scss";
export default {
  components: { StartButton, StartSpace, SvgIcon, StartItemCell },
  data() {
    return {
      details: [
        {
          title: "AAAA",
          amount: "231231 USDT",
        },
        {
          title: "BBBB",
          amount: "231231 USDT",
        },
        {
          title: "CCCC",
          amount: "231231 USDT",
        },
      ],
    };
  },
  props: {
    cardType: {
      type: String,
    },
    cardDetailTyoe: {
      type: String, // rough、 detail
    },
    colorType: {
      type: String,
    },
    data: {
      type: Object,
    },
  },
  mounted() {},
  methods: {
    emit() {
      this.$emit("clickMethod", {
        cardType: this.cardType,
        colorType: this.colorType,
      });
    },
  },
  computed: {
    setStyle() {
      return {
        color: this.colorType,
        border: `1px solid ${this.colorType}`,
      };
    },
  },
  beforeDestroy() {},
};
</script>
<style lang="scss" scoped>
.xxx {
  position: absolute;
  top: 0;
  right: 0;
}
.start-card-item {
  width: 100%;
  .start-card-item-rough {
    width: 100%;
    position: relative;
    .start-card-item-rough-header {
      img {
        display: inline-block;
        width: 48px;
        height: 48px;
      }
      span {
        color: #fff;
        font-size: 16px;
        font-weight: 500;
        margin-left: 20px;
      }
    }
    .start-card-item-rough-labels {
      .start-button {
        border-radius: 2px;
        padding: 5px 10px;
      }
    }
    .start-card-item-rough-icons {
      .start-card-item-rough-icons-icon {
        width: 24px;
        height: 24px;
      }
      .start-card-item-rough-icons-icon + .start-card-item-rough-icons-icon {
        margin-left: 10px;
      }
    }
    .start-card-item-rough-infos {
      .start-card-item-rough-infos-title {
        font-size: 12px;
        font-weight: 400;
        color: #ffffff;
        opacity: 0.7;
      }
      .start-card-item-rough-infos-amount {
        font-size: 16px;
        font-weight: 500;
        color: #ffffff;
      }
    }
  }
}
</style>
