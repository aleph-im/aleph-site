// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import BootstrapVue from "bootstrap-vue"
import App from './App'
import router from './router'
import store from './store'
import { mapState } from 'vuex'
//import ShardsVue from 'shards-vue'

Vue.use(BootstrapVue)
//Vue.use(ShardsVue)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store: store,
  router,
  template: '<App/>',
  components: { App },
  computed: mapState({
    account: state => state.account,
    api_server: state => state.api_server
  }),
})
