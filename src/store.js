import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import VuexPersistence from 'vuex-persist'
import {aggregates} from 'aleph-js'

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
    ],
    pages: {},
    menu: []
  },
  mutations: {
    set_account(state, account) {
      state.account = account
    },
    set_pages(state, pages) { // TODO: handle per-page mutation
      state.pages = pages
    },
    set_menu(state, menu_items) { // TODO: handle per-page mutation
      state.menu = menu_items
    },
    store_profile(state, payload) {
      state.profiles[payload.address] = payload.profile
    },
    set_network(state, payload) {
      state.network_id = payload.network_id
      state.api_server = payload.api_server
      state.profiles = {}
      state.pages = {}
      state.address_alias = {}
      state.alias_address = {}
      state.last_broadcast = null
    }
  },
  actions: {
    async update_pages({ state, commit }) {
      let pages = await aggregates.fetch(
        state.site_address, 'pages', {
        'api_server': state.api_server
      })
      if (pages === null)
        pages = {}

      await commit('set_pages', pages)
    },
    async update_menu({ state, commit }) {
      let menu_obj = await aggregates.fetch(
        state.site_address, 'menu', {
        'api_server': state.api_server
      })
      let items = []
      if ((menu_obj !== null) && menu_obj.items)
        items = menu_obj.items

      await commit('set_menu', items)
    }
  },
  plugins: [vuexLocal.plugin]
})
