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
        {{ $t("constants.连接钱包") }}
        <!-- {{ $t("constant.name") }} -->
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
import { mapState } from "vuex";
// import StoreApp from "@store/StoreApp"
export default {
  name: "StartHeader",
  data() {
    return {
      // activeIndex: "home",
      currLang: null,
      langs: [
        { text: "中文", value: "zh" },
        { text: "ENG", value: "en" },
      ],
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
  },
  computed: {
    ...mapState("StoreApp", {
      headerItems: (state) => state.headerItems,
      activeHeaderItem: (state) => state.activeHeaderItem,
      language: (state) => state.language,
    }),
  },
  beforeDestroy() {},
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
