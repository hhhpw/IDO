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
          {{ $t(`constants.${d.label}`) }}
        </MenuItem>
      </Menu>
    </div>

    <div class="start-header-right">
      <div style="color: red">{{ walletStatus }}</div>
      <start-button dark class="start-header-right-btn">
        <span @click="onClickConnect">
          <span v-if="walletStatus !== 'Connected'">
            {{ $t("constants.连接钱包") }}
          </span>
          <!-- {{
            walletStatus === "Connected"
              ? format.shortAddress(this.stcAccounts[0])
              : walletStatus
          }} -->
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
// import { }
import { Notification } from "element-ui";
// import StoreApp from "@store/StoreApp"
import { Wallet } from "@contactLogic";
import format from "@utils/format";
import utilsTool from "@utils/tool";

export default {
  name: "StartHeader",
  data() {
    return {
      // activeIndex: "home",
      walletStatus: "Connect",
      currLang: null,
      langs: [
        { text: "中文", value: "zh" },
        { text: "ENG", value: "en" },
      ],
      format,
      // 如果用户没下载插件  https://chrome.google.com/webstore/category/extensions?hl=zh-CN
      pluginUrl:
        "https://chrome.google.com/webstore/category/extensions?hl=zh-CN",
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
    ...mapActions("StoreWallet", [
      "setOnboarding",
      "setStcAccounts",
      "setStcProvider",
      "getCurrencyPrecision",
    ]),
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
    // onClickInstallStarMask() {
    //   this.onboarding.startOnboarding();
    // },
    async loadData() {
      const permissions = await Wallet.getPermissions();
      if (!permissions.length) {
        this.setPermissions();
      }
      this.getAccountBalance();
    },
    async getAccountBalance() {
      console.log("stcAccounts", this.stcAccounts);
      if (this.stcProvider) {
        const params = {
          provider: this.stcProvider,
          account: this.stcAccounts[0], // 默认取STC
        };
        const balance = await Wallet.getAccountBalance(params);
        console.log("balance", balance, typeof balance);
        this.getCurrencyPrecision();
      }
    },
    async setPermissions() {
      const permArr = await Wallet.setPermissions();
      console.log("permissions:", permArr);
    },
    async onClickConnect() {
      // 检查是否下载
      const isStarMaskInstalled = Wallet.checkStarMaskInstalled();
      if (!isStarMaskInstalled) {
        const h = this.$createElement;
        Notification({
          message: h(
            "div",
            {
              style: {
                position: "relative",
                "font-size": "14px",
                color: "#FFFFFF",
              },
            },
            [
              h("p", this.$t("wallet.download-tip")),
              h(
                "p",
                {
                  style: {
                    color: "#29F3F6",
                    cursor: "pointer",
                    "word-break": "break-all",
                    "margin-top": "8px",
                  },
                  on: {
                    click: () => utilsTool.openNewWindow(this.pluginUrl),
                  },
                },
                this.pluginUrl
              ),
              h(
                "start-button",
                {
                  props: {
                    light: true,
                  },
                  style: {
                    padding: "5px",
                    "margin-left": "200px",
                    "margin-top": "20px",
                  },
                  on: {
                    click: () => utilsTool.openNewWindow(this.pluginUrl),
                  },
                },
                this.$t("前去下载")
              ),
            ]
          ),
          duration: 0,
          offset: 100,
          showClose: false,
        });

        this.walletStatus = "Install StarMask";
        this.onboarding.startOnboarding();
        return;
      }
      console.log("=====isStarMaskInstalled====", isStarMaskInstalled);
      // 连接状态
      // 账户一定会存在？
      const isStarMaskConnected =
        this.stcAccounts && this.stcAccounts.length > 0;
      // this.walletStatus = "";
      // 如果用户没下载插件  https://chrome.google.com/webstore/category/extensions?hl=zh-CN
      // 需要提示
      // 下载完成后需要用户手动去链接
      // 不然会报错
      // 考虑更好的交互提示
      // 连接成功后如何交互
      // if (!isStarMaskInstalled) {
      //   this.walletStatus = "Install StarMask";
      //   this.onboarding.startOnboarding();
      // } else if (isStarMaskConnected) {
      //   this.walletStatus = "Connected";
      //   if (this.onboarding) this.onboarding.stopOnboarding();
      //   this.loadData();
      // } else {
      //   this.walletStatus = "Connect";
      //   const accounts = await Wallet.connect();
      //   this.setStcAccounts(accounts);
      // }

      if (isStarMaskConnected) {
        this.walletStatus = "Connected";
        if (this.onboarding) this.onboarding.stopOnboarding();
        this.loadData();
      } else {
        this.walletStatus = "Connect";
        const accounts = await Wallet.connect();
        this.setStcAccounts(accounts);
      }
    },
  },
  watch: {
    stcAccounts(value) {
      if (value && value.length) {
        this.walletStatus = "Connected";
        this.loadData();
      }
    },
  },
  computed: {
    ...mapState("StoreApp", ["headerItems", "activeHeaderItem", "language"]),
    ...mapState("StoreWallet", ["stcAccounts", "onboarding", "stcProvider"]),
  },
  beforeDestroy() {},
  created() {
    if (!this.onboarding) {
      const onboarding = Wallet.createStarMaskOnboarding();
      if (onboarding) this.setOnboarding(onboarding);
    }
    const stcProvider = Wallet.createStcProvider();
    this.setStcProvider(stcProvider);

    const isStarMaskInstalled = Wallet.checkStarMaskInstalled();
    if (!isStarMaskInstalled) {
      this.walletStatus = "Install StarMask";
    }
  },
};
</script>
<style lang="scss" scoped>
@import "~@/styles/variables.scss";
.start-header {
  height: 80px;
  width: calc(100% - 80px);
  display: flex;
  align-items: center;
  background-image: url("../../assets/header/header.png");
  background-repeat: no-repeat;
  background-size: cover;
  padding: 0px 30px;
  padding-left: 50px;
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
