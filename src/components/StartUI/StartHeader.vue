<template>
  <div class="start-header">
    <div class="start-header-left">
      <img src="../../assets/header/logo.png" />
      <Menu
        :default-active="activeHeaderItem"
        mode="horizontal"
        class="start-menu"
        @select="handleSelect"
      >
        <MenuItem
          index="home"
          class="start-menu-item"
          v-for="(d, index) in headerItems"
          :key="index"
          :class="{ 'start-menu-item-active': activeHeaderItem === d.value }"
        >
          {{ $t(d.label) }}
        </MenuItem>
      </Menu>
    </div>

    <div class="start-header-right">
      <start-button dark class="start-header-right-btn">
        <span v-if="!isStarMaskInstalled" @click="onClickInstallStarMask">
          Click here to install StarMask!
        </span>
        <span v-else @click="onClickConnect">
          {{
            this.stcAccounts.length
              ? format.shortAddress(this.stcAccounts[0])
              : $t("constants.连接钱包")
          }}
        </span>
      </start-button>
      <start-drop-down
        trigger="click"
        :itemList="langs"
        @handleClick="hanldeChangeLang"
        :activeValue="currLang"
      >
        <template #tag>
          <start-button light>
            {{ $t("constants.切换语言") }}
          </start-button>
        </template>
      </start-drop-down>
    </div>
  </div>
</template>
<script>
import { Menu, MenuItem } from "element-ui";
import StartButton from "@startUI/StartButton.vue";
import StartDropDown from "@startUI/StartDropDown.vue";
import session from "@utils/session.js";
import { mapState, mapActions } from "vuex";
// import StoreApp from "@store/StoreApp"
import { Wallet } from "@contactLogic";
import format from "@utils/format";

export default {
  name: "StartHeader",
  data() {
    return {
      // activeIndex: "home",
      isStarMaskInstalled: false,
      currLang: null,
      langs: [
        { text: "中文", value: "zh" },
        { text: "ENG", value: "en" },
      ],
      format,
    };
  },
  components: {
    Menu,
    MenuItem,
    StartButton,
    StartDropDown,
  },
  mounted() {
    const currLang = session.getItem("lang");
    this.currLang = currLang;
  },
  methods: {
    ...mapActions("StoreWallet", ["setOnboarding", "setStcAccounts"]),
    handleSelect(key) {
      this.$store.commit("StoreHome/STORE_HOME_CHANGE_STATUS", {
        status: "home-list",
      });
      window.scrollTo(0, 0);
      this.activeIndex = key;
    },
    hanldeChangeLang(value) {
      let currLang = this.language;
      if (currLang === value) return;
      if (currLang !== value) {
        session.setItem("lang", value);
        window.location.reload();
      }
    },
    onClickInstallStarMask() {
      this.onboarding.startOnboarding();
    },
    async onClickConnect() {
      if (this.isStarMaskInstalled) {
        if (this.stcAccounts && this.stcAccounts.length) {
          if (this.onboarding) this.onboarding.stopOnboarding();
        } else {
          const accounts = await Wallet.connect();
          this.setStcAccounts(accounts);
        }
      }
    },
  },
  watch: {
    isStarMaskInstalled(value) {
      if (value) this.onClickConnect();
    },
  },
  computed: {
    ...mapState("StoreApp", ["headerItems", "activeHeaderItem", "language"]),
    ...mapState("StoreWallet", ["stcAccounts", "onboarding"]),
  },
  beforeDestroy() {},
  created() {
    this.isStarMaskInstalled = Wallet.checkStarMaskInstalled();
    if (!this.onboarding) {
      const onboarding = Wallet.createStarMaskOnboarding();
      if (onboarding) this.setOnboarding(onboarding);
    }
  },
};
</script>
<style lang="scss" scoped>
@import "~@/styles/variables.scss";
.start-header {
  height: 80px;
  width: calc(100% - 60px);
  display: flex;
  align-items: center;
  background-image: url("../../assets/header/header.png");
  background-repeat: no-repeat;
  background-size: cover;
  padding: 0px 30px;
  box-sizing: content-box;
  display: flex;
  justify-content: space-between;
  .start-menu {
    background-color: transparent;
    border-bottom: none;
    margin-left: 50px;
  }
  .start-menu-item {
    width: 100px;
    height: 80px;
    line-height: 80px;
    color: #fff;
    text-align: center;
    font-size: 14px;
    &:hover {
      background-color: transparent !important;
      color: $text_light_color !important;
    }
  }
  .el-menu-item.is-active {
    background-color: transparent !important;
    border-bottom: 2px solid $light_bordercolor;
    color: $text_light_color !important;
  }
  .el-menu-item.is-active.start-menu-item-active {
    background: linear-gradient(
      180deg,
      rgba(84, 255, 255, 0) 0%,
      rgba(42, 254, 254, 0.21) 100%
    );
  }
  .start-header-left {
    display: flex;
    align-items: center;
    img {
      margin-right: 10px;
    }
  }
  .start-header-right {
    display: flex;
    align-items: center;
    .start-header-right-btn {
      margin-right: 20px;
    }
  }
}
</style>
