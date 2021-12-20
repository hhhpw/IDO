<template>
  <Dialog :visible="true">
    <!-- <div
      :class="renderColorStyle(props.dialogParams.phase1)"
      class="star-wallet-dialog-content-feedback-phase1"
      v-if="props.dialogParams.phase1"
    >
      <img
        :src="renderPhaseStatus(props.dialogParams.phase1)"
        alt=""
        :style="{ marginLeft: setDiaglogStyle.loadingMarLeft }"
        :class="rotateAni(props.dialogParams.phase1)"
      />
      <span>{{ $t("在钱包确认操作") }}</span>
    </div>
    <div
      class="star-wallet-dialog-content-feedback-phase2"
      :class="renderColorStyle(props.dialogParams.phase2)"
    >
      <img
        :src="renderPhaseStatus(props.dialogParams.phase2)"
        alt=""
        :style="{ marginLeft: setDiaglogStyle.loadingMarLeft }"
        :class="rotateAni(props.dialogParams.phase2)"
      />
      <span>{{ $t("请耐心等待网络确认") }}</span>
    </div> -->
  </Dialog>
</template>
<script>
import { Dialog } from "element-ui";
export default {
  data() {
    return {};
  },
  components: {
    Dialog,
  },
  props: {
    dialogParams: {},
  },
  mounted() {},
  methods: {},
  computed: {},
  beforeDestroy() {},
};
</script>
<style lang="scss" scoped></style>
