// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import vueButtonEffect from 'vue-button-effect'
import '@fortawesome/fontawesome-free-webfonts/css/fontawesome.css'
import './plugins/firebase'
var validator = require("vue-validator");

Vue.use(validator);

Vue.use(vueButtonEffect)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})
