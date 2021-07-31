import Vue from "vue";
import VueI18n from "vue-i18n";
import session from "@utils/session";

// 国际化
Vue.use(VueI18n);

function loadMessages() {
  const context = require.context("../lang", true, /[a-z0-9-_]+\.js$/i);
  const messages = context
    .keys()
    .map((key) => ({ key, locale: key.match(/[a-z0-9-_]+/i)[0] }))
    .reduce(
      (messages, { key, locale }) => ({
        ...messages,
        [locale]: context(key),
      }),
      {}
    );
  return { context, messages };
}

const { messages } = loadMessages();

const i18n = new VueI18n({
  locale: session.getItem("lang") || "zh", // 语言标识
  fallbackLocale: "en", // 找不到语言包默认
  messages,
  silentTranslationWarn: true,
});

// 延迟加载翻译
//

// $t('key')
// 动态切换语言
// this.$i18n.locale = cn | us

// todo 动态加载语言包
Vue.use(i18n);

export default i18n;
