import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

// import bus from './bus.js'

export default new Vuex.Store({
  state: {
    api_server: 'https://apitest.aleph.im',
    site_chain: 'NULS',
    site_address: 'TTatYAULiEfV6e7Tqt9z8YCr7dz2KkbJ',
    network_id: 261,
    ipfs_gateway: 'https://ipfs.io/ipfs/',
    account: null,
    profiles: {},
    last_broadcast: null,
    categories: [ // categories are hard-coded for now...
    ]
  },
  mutations: {
    set_account(state, account) {
      state.account = account
    },
    store_profile(state, payload) {
      state.profiles[payload.address] = payload.profile
    },
    set_network(state, payload) {
      state.network_id = payload.network_id
      state.api_server = payload.api_server
      state.profiles = {}
      state.address_alias = {}
      state.alias_address = {}
      state.last_broadcast = null
    }
  },
  plugins: [vuexLocal.plugin]
})
