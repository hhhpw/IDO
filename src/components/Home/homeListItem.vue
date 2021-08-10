<template>
  <div class="home-list-item">
    <div class="home-list-item-rough">
      <div class="home-list-item-rough-header">
        <start-item-cell cellType="vertical">
          <!-- 项目logo -->
          <img :src="data.icon" />
          <span>{{ $t(`${data.prdName}`) }}</span>
          <span>{{ $t(`${data.currency}`) }}</span>
        </start-item-cell>
      </div>
      <start-space :size="20"></start-space>
      <div class="home-list-item-rough-labels">
        <start-button
          v-for="(d, i) in data.label"
          :key="i"
          light
          :style="
            mixinLabelColor(
              colorsInfo['label-text-color'],
              colorsInfo['common-color']
            )
          "
          >{{ $t(`${d}`) }}</start-button
        >
      </div>
      <start-space :size="30"></start-space>
      <div class="home-list-item-rough-icons">
        <svg-icon
          v-for="(iconkey, index) in data.links"
          :key="index"
          :name="iconkey.name + '-' + cardType"
          class="home-list-item-rough-icons-icon"
        ></svg-icon>
      </div>
      <start-space :size="30"></start-space>
      <div class="home-list-item-rough-infos">
        <start-item-cell :data="cellData('raiseTotal')"> </start-item-cell>
        <start-item-cell :data="cellData('rate')"> </start-item-cell>
        <start-item-cell :data="cellData('capTotal')"> </start-item-cell>
      </div>
    </div>
  </div>
</template>
<script>
import StartSpace from "@startUI/StartSpace.vue";
import StartButton from "@startUI/StartButton.vue";
import SvgIcon from "@components/SvgIcon/index.vue";
import StartItemCell from "@startUI/StartItemCell.vue";
import { mapGetters } from "vuex";
import mixinHome from "@/mixins/home.js";
export default {
  components: { StartButton, StartSpace, SvgIcon, StartItemCell },
  mixins: [mixinHome],
  data() {
    return {};
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
  mounted() {},
  methods: {
    cellData(key) {
      /////  这里写key
      return { title: key, amount: this.data[key] };
      // return data.
    },
    // emit() {
    //   this.$emit("clickMethod", {
    //     cardType: this.cardType,
    //     // id: this.data.id,
    //   });
    // },
  },
  computed: {
    ...mapGetters("StoreHome", ["cardTypeColorInfo"]),
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
.home-list-item {
  width: 100%;
  .home-list-item-rough {
    width: 100%;
    position: relative;
    .home-list-item-rough-header {
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
    .home-list-item-rough-labels {
      .start-button {
        border-radius: 2px;
        padding: 5px 10px;
      }
    }
    .home-list-item-rough-icons {
      .home-list-item-rough-icons-icon {
        width: 24px;
        height: 24px;
      }
      .home-list-item-rough-icons-icon + .home-list-item-rough-icons-icon {
        margin-left: 10px;
      }
    }
    .home-list-item-rough-infos {
      .home-list-item-rough-infos-title {
        font-size: 12px;
        font-weight: 400;
        color: #ffffff;
        opacity: 0.7;
      }
      .home-list-item-rough-infos-amount {
        font-size: 16px;
        font-weight: 500;
        color: #ffffff;
      }
    }
  }
}
</style>
