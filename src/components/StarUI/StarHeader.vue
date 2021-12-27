<template>
  <div class="star-header">
    <div class="star-header-left">
      <img src="../../assets/header/logo.png" /> -
      <Menu
        :default-active="activeHeaderItem"
        mode="horizontal"
        class="star-menu"
      >
        <MenuItem
          :index="d.value"
          class="star-menu-item"
          v-for="(d, index) in headerItems"
          :key="index"
          :class="{ 'star-menu-item-active': activeHeaderItem === d.value }"
          @click="pushRouter(d.path)"
        >
          {{ $t(`${d.label}`) }}
        </MenuItem>
      </Menu>
    </div>
    <div class="star-header-right">
      <star-connect-wallet class="star-header-right-btn"></star-connect-wallet>
      <star-drop-down
        trigger="click"
        :itemList="langs"
        @handleClick="handleLangChange"
        :activeValue="language"
      >
        <template #tag>
          <star-button light class="star-header-right-lang">
            {{ $t("语言") }}
          </star-button>
        </template>
      </star-drop-down>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import { Menu, MenuItem } from "element-ui";
import StarButton from "@StarUI/StarButton.vue";
import StarDropDown from "@StarUI/StarDropDown.vue";
import session from "@utils/session.js";
import { mapState } from "vuex";
import StarConnectWallet from "./StarConnectWallet.vue";
import i18n from "@/i18n";

export default {
  name: "StarHeader",
  data() {
    return {
      currLang: null,
      langs: [
        { text: "中文", value: "zh" },
        { text: "ENG", value: "en" },
      ],
      isStarMaskInstalled: null,
      session,
    };
  },
  components: {
    Menu,
    MenuItem,
    StarButton,
    StarDropDown,
    StarConnectWallet,
  },
  methods: {
    pushRouter(path) {
      this.$router.push({
        path: path,
      });
    },
    changeTab() {
      const path = this.$route.path;
      if (path !== `${this.activeHeaderItem}`) {
        window.scrollTo(0, 0);
        this.$store.commit("StoreApp/SET_ACTIVE_ITEM", path);
      }
    },
    handleLangChange(value) {
      if (value === this.language) return;
      this.$store.commit("StoreApp/SET_APP_LANGUAGE", value);
      i18n.locale = value;
    },
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    $route: "changeTab",
  },
  computed: {
    ...mapState("StoreApp", ["headerItems", "activeHeaderItem", "language"]),
  },
};
</script>
<style lang="scss" scoped>
@import "~@/styles/variables.scss";
.star-header {
  position: fixed;
  top: 0;
  z-index: 999;
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
  background-position: center center;
  .star-menu {
    background-color: transparent;
    border-bottom: none;
    margin-left: 50px;
  }
  .star-menu-item {
    height: 80px;
    line-height: 80px;
    color: #fff;
    text-align: center;
    font-size: 18px;
    padding: 0px 20px;
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
  .el-menu-item.is-active.star-menu-item-active {
    background: linear-gradient(
      180deg,
      rgba(84, 255, 255, 0) 0%,
      rgba(254, 201, 68, 0.54) 100%
    );
  }
  .star-header-left {
    font-family: Denmark;
    display: flex;
    align-items: center;
    img {
      margin-right: 10px;
    }
  }
  .star-header-right {
    display: flex;
    align-items: center;
    font-family: Denmark;
    .star-button {
      padding: 8px 20px;
      box-sizing: border-box;
      height: 36px;
    }
    .star-header-right-btn {
      margin-right: 20px;
      margin-left: 20px;
    }
    .star-header-right-lang {
      width: 110px;
    }
  }
}
</style>
