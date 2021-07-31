import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import i18n from "./i18n";
import "./styles/index.scss";
// import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

// // import { Button } from "element-ui";
// // Vue.use(Button);
// Vue.use(ElementUI);

// import {
//   Dropdown,
//   DropdownMenu,
//   DropdownItem,
//   Menu,
//   Submenu,
//   MenuItem,
//   Input,
//   InputNumber,
// } from "element-ui";

// Vue.use(Dropdown);
// Vue.use(DropdownMenu);
// Vue.use(DropdownItem);
// Vue.use(Menu);
// Vue.use(Submenu);
// Vue.use(MenuItem);
// Vue.use(Input);
// Vue.use(InputNumber);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
