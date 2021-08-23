import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import i18n from "./i18n";
import "./styles/index.scss";
import "element-ui/lib/theme-chalk/index.css";

import SvgIcon from "@components/SvgIcon/index.vue";
Vue.use(SvgIcon);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
