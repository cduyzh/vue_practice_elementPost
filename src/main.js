// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import router from "./router";
import ElementUI from "element-ui";
import "element-ui/lib/theme-default/index.css";
import App from "./App";
// 重写element样式方式2:通过引入第三方CSS
import "./assets/css/order.css";
Vue.use(ElementUI);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: "#app",
    router,
    template: "<App/>",
    components: { App }
});