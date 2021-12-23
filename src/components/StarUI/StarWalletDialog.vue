<template>
  <Dialog :visible="false" class="star-wallet-dialog">
    <div
      class="star-wallet-dialog-body"
      :style="{ width: setDiaglogStyle.dialogWidth }"
    >
      <div v-if="dialogParams.status === 'ongoing'">
        <div class="star-wallet-dialog-body-feedback">
          <div class="star-wallet-dialog-body-feedback-phase1">
            <img
              :src="renderPhaseStatus(dialogParams.phase1)"
              :style="{ marginLeft: setDiaglogStyle.loadingMarLeft }"
              alt=""
              :class="rotateAni(dialogParams.phase1)"
            />
            <span>{{ $t("在钱包确认操作") }}</span>
          </div>
          <div class="star-wallet-dialog-body-feedback-phase2">
            <img
              :src="renderPhaseStatus(dialogParams.phase2)"
              alt=""
              :class="rotateAni(dialogParams.phase2)"
              :style="{ marginLeft: setDiaglogStyle.loadingMarLeft }"
            />
            <span>{{ $t("请耐心等待网络确认") }}</span>
          </div>
        </div>
      </div>
      <div
        class="star-wallet-dialog-body-cb"
        v-if="
          dialogParams.status === 'succeed' || dialogParams.status === 'failed'
        "
      >
        <img :src="renderCbImg(dialogParams.status)" />
        <star-space :size="20"></star-space>
        <p>{{ $t("操作成功") }}</p>
        <star-space :size="30"></star-space>
        <div
          class="star-wallet-dialog-body-cb-button"
          :class="{ [dialogParams.status]: true }"
          @click="
            () => {
              dialogParams.status === 'succeed'
                ? dialogParams.succeedEvent()
                : dialogParams.status === 'failed'
                ? dialogParams.failedEvent()
                : '';
            }
          "
        >
          {{ $t("确认") }}
        </div>
      </div>
    </div>
  </Dialog>
</template>
<script>
/* eslint-disable */
import { Dialog } from "element-ui";
import { mapState } from "vuex";
import dialogSucceedCbImg from "../../assets/wallet/succeed-cb.png";
import dialogFailedCbImg from "../../assets/wallet/failed-cb.png";
import dialogLoadingImg from "../../assets/wallet/loading.png";
import dialogSucceedImg from "../../assets/wallet/succeed.png";
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
          phase1: "loading",
          dialogVisible: false,
          phase2: "succeed",
          status: "succeed", // ongoing  succeed failed
          failedEvent: () => {
            alert("failedEvent");
          },
          succeedEvent: () => {
            alert("succeedEvent");
          },
        };
      },
    },
    // dialogParams: {
    // phase1: "loading",
    // phase2: "loading",
    // },
  },

  mounted() {},
  methods: {
    renderPhaseStatus(type) {
      const obj = {
        loading: dialogLoadingImg,
        succeed: dialogSucceedImg,
      };
      return obj[type];
    },
    renderCbImg(type) {
      const obj = {
        failed: dialogFailedCbImg,
        succeed: dialogSucceedCbImg,
      };
      return obj[type];
    },
    rotateAni(type) {
      if (type === "loading") {
        return "loading-img";
      }
    },
  },
  computed: {
    ...mapState("StoreApp", {
      language: (state) => state.language,
    }),
    setDiaglogStyle() {
      console.log("language", this.language);
      if (this.language === "en") {
        return {
          dialogWidth: "500px",
          feedBackWith: "440px",
          loadingMarLeft: "20px",
        };
      }
      return {
        dialogWidth: "400px",
      };
    },
  },
  beforeDestroy() {},
};
</script>

<style lang="scss">
.star-wallet-dialog {
  background-color: transparent;
  .el-dialog {
    background-color: transparent;
    height: 400px;
    margin: 0 auto;
    // width: 440px;
  }
  .el-dialog__header {
    display: none !important;
  }
  .el-dialog__body {
    background-image: url("../../assets/wallet/wallet-bg.png");
    background-size: 100% 100%;
    height: 400px;
    background-position: center center;
    padding: 0px 0px;
    width: 600px;
    margin: 0 auto;
  }
}
</style>
<style lang="scss" scoped>
@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  50% {
    transform: rotate(200deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.star-wallet-dialog {
  .star-wallet-dialog-body {
    height: 100%;
    // border: 1px solid red;
    margin: 0 auto;
  }
  .star-wallet-dialog-body-feedback {
    width: 323px;
    height: 109px;
    border-radius: 16px;
    margin: 0 auto;
    margin-top: 20px;
    overflow: hidden;
    // display: flex;
    // justify-content: center;
    // flex-direction: column;
    div {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      &.loading-div {
        color: #8b8b8b;
      }
      img {
        width: 20px;
        height: 20px;
        margin-left: 60px;
        display: inline-block;
      }
      span {
        color: #fff;
        margin-left: 10px;
        font-size: 16px;
        font-weight: 600;
      }
    }
    .loading-img {
      transition: 0.5s;
      animation: rotate 1s linear infinite;
    }
    .star-wallet-dialog-body-feedback-phase1 {
      margin-top: 30px;
    }
    .star-wallet-dialog-body-feedback-phase2 {
      margin-top: 10px;
    }
  }
  .star-wallet-dialog-body-cb {
    text-align: center;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    img {
      width: 160px;
    }
    p {
      font-size: 16px;
      color: #ffffff;
    }
    .star-wallet-dialog-body-cb-button {
      width: 155px;
      height: 40px;
      color: #191d28;
      font-size: 16px;
      line-height: 40px;
      font-weight: 500;
      cursor: pointer;
      &:hover {
        opacity: 0.8;
      }
      &.succeed {
        background: #fec944;
      }
      &.failed {
        background: #f36346;
      }
    }
  }
}
</style>
