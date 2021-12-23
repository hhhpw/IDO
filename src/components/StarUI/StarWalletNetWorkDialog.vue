<template>
  <Dialog
    :visible="dialogParams.dialogVisible"
    class="star-wallet-network-dialog"
  >
    <div class="star-wallet-network-dialog-body">
      <img src="../../assets/wallet/wallet-network-error.png" />
      <star-space :size="30"></star-space>
      <p class="star-wallet-network-dialog-title">
        {{ $t("wallet.网络错误") }}
      </p>
      <star-space :size="10"></star-space>
      <p class="star-wallet-network-dialog-desc">
        {{ $t("wallet.网络错误，请切换钱包网络") }}
      </p>
    </div>
  </Dialog>
</template>
<script>
import { Dialog } from "element-ui";
import StarSpace from "@StarUI/StarSpace.vue";

export default {
  data() {
    return {};
  },
  components: {
    Dialog,
    StarSpace,
  },
  props: {
    dialogParams: {
      default() {
        return {
          dialogVisible: false,
        };
      },
    },
  },
};
</script>

<style lang="scss">
.star-wallet-network-dialog {
  background-color: transparent;
  .el-dialog {
    background-color: transparent;
    margin: 0 auto;
  }
  .el-dialog__header {
    display: none !important;
  }
  .el-dialog__body {
    background-image: url("../../assets/wallet/wallet-bg.png");
    background-size: 100% 100%;
    height: 270px;
    background-position: center center;
    padding: 0px 0px;
    width: 400px;
    margin: 0 auto;
  }
}
</style>
<style lang="scss" scoped>
.star-wallet-network-dialog {
  .star-wallet-network-dialog-body {
    height: 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    .star-wallet-network-dialog-title {
      font-weight: 600;
      color: #ffffff;
      font-size: 18px;
    }
    .star-wallet-network-dialog-desc {
      font-weight: 600;
      color: #b9b7b6;
      font-size: 14px;
    }
  }
}
</style>
