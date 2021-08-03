<template>
  <div class="start-list">
    <div
      class="start-list-item prodetail"
      v-if="type === 'prodetail'"
      :style="setStyle()"
    >
      <span class="title">
        {{ data.title }}
      </span>
      <span class="amount">
        {{ data.amount }}
      </span>
    </div>
    <div
      class="start-list-item time"
      v-if="type === 'time'"
      :style="setStyle()"
    >
      <span class="title">
        {{ data.title }}
      </span>
      <div class="time-info">
        <p>
          <span>
            {{ $t("始") }}
          </span>
          <span>{{ data.startDate }}</span>
        </p>
        <p>
          <span>
            {{ $t("至") }}
          </span>
          <!-- <span> 2021 08 12 / 12:00:00 </span> -->
          <span>{{ data.endDate }}</span>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: {
    data: {
      type: Object,
    },
    bgColor: null,
    type: String,
  },
  mounted() {},
  methods: {
    setStyle() {
      console.log("(this.bgColor", this.bgColor);
      if (this.bgColor) {
        return { "background-color": this.bgColor };
      }
    },
  },
  computed: {},
  beforeDestroy() {},
};
</script>
<style lang="scss" scoped>
@import "~@/styles/variables.scss";
.start-list {
  width: 100%;
  &.start-list {
    margin-top: 3px;
  }
  .start-list-item {
    width: 100%;
    padding: 15px;
    // background-color: red;
    &.prodetail {
      display: flex;
      font-size: 14px;
      .title {
        display: flex;
        flex: 1;
        color: $text_gray_color;
      }
      .amount {
        display: flex;
        flex: 3;
        font-weight: 500;
        color: #fff;
      }
    }
    &.time {
      display: flex;
      font-size: 14px;
      align-items: center;
      .title {
        display: flex;
        flex: 1;
        color: $text_gray_color;
      }
      .time-info {
        display: flex;
        flex: 3;
        flex-direction: column;
        justify-content: center;
        color: #fff;
        // flex: 3;
        // font-weight: 500;
        // color: #fff;
      }
    }
  }
}
// .start-list + .start-list {
//   margin-top: 20px;
// }
</style>
