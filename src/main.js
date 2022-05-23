import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./components/router/CoustomRoute.js";
import toastify from "vue-toastify"

Vue.config.productionTip = false;
Vue.use(toastify,{my:"settings",position:"top-right"});
new Vue({
  vuetify,
  router,
  render: (h) => h(App),
}).$mount("#app");
