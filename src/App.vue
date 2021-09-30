<template>
  <div id="app" class="d-flex flex-column">
      <b-navbar toggleable="lg" class="shards-navbar navbar-light" id="appnav">
        <b-container>
          <b-link :to="{name: 'Home'}" class="navbar-brand">
            <img src="./assets/logo-wide.svg" alt="aleph.im" style="max-height: 2rem">
          </b-link>
          <b-navbar-toggle target="nav-collapse" class="sidebar-toggler"></b-navbar-toggle>
          <b-collapse is-nav id="nav-collapse">
            <b-navbar-nav class="ml-auto">
              <template v-for="(mitem, idx) in menu" >
                <b-nav-item :href="mitem.link" class="align-middle d-block mx-md-2" v-if="mitem.link" :key="menu.length + idx">
                  {{mitem.text}}
                </b-nav-item>
                <b-nav-item-dropdown :to="{name: 'Page', params: {slug: mitem.slug}}" :key="menu.length + idx"
                            :text="mitem.text||mitem.slug"
                            class="align-middle d-block mx-md-2" v-else-if="mitem.items && mitem.items.length">
                  <b-dropdown-item v-for="(sitem, idx2) of mitem.items" :key="idx+idx2"
                                   :to="{name: 'Page', params: {slug: sitem.slug}}">
                      {{sitem.text||sitem.slug}}
                  </b-dropdown-item>
                </b-nav-item-dropdown>
                <b-nav-item :to="{name: 'Page', params: {slug: mitem.slug}}" :key="menu.length + idx"
                            class="align-middle d-block mx-md-2" v-else-if="mitem.slug">
                  {{mitem.text||mitem.slug}}
                </b-nav-item>
              </template>
            </b-navbar-nav>
            <b-navbar-nav class="ml-auto">
              <template v-for="(mitem, idx) in fixedMenuItems" >
                <li v-if="mitem.type === 'button'" class="nav-item mx-md-2 my-auto" :key="menu.length + idx">
                  <b-btn :href="mitem.link" size="sm" variant="outline-black">
                    {{mitem.text}}
                  </b-btn>
                </li>
                <b-nav-item :href="mitem.link" class="align-middle d-block mx-md-2" v-else-if="mitem.link" :key="menu.length + idx">
                  {{mitem.text}}
                </b-nav-item>
                <b-nav-item :to="{name: 'Page', params: {slug: mitem.slug}}" :key="menu.length + idx"
                            class="align-middle d-block mx-md-2" v-else-if="mitem.slug">
                  {{mitem.text||mitem.slug}}
                </b-nav-item>
              </template>
            </b-navbar-nav>
          </b-collapse>
        </b-container>
      </b-navbar>
    <div id="content">
      <router-view></router-view>
      <div class="container px-3">
        <small class="px-3"><em>Hosted on aleph.im!</em></small>
      </div>
    </div>
    <nav class="shards-footer shards-footer--6 navbar navbar-expand-md shards-navbar shards-navbar--responsive navbar-dark py-5 shards-navbar--slide-visible" style="background-color: #F8F8F8;">
      <div class="container">
        <div class="navbar__content-left mb-4 mb-md-0">
          <div class="col-md-12 col-xl-8">
            <a class="navbar-brand mb-4 pt-0" href="#">
              <img class="navbar-brand__image" src="./assets/logo-wide.svg" alt="aleph.im logo">
            </a>
            <small class="text-black opacity-6 d-block mb-4 mb-sm-0">
              © Copyright ©2019-2021 aleph.im Project, all rights reserved.
              <a href="#/legal-mentions" class="text-muted">legal mentions</a> 
              &nbsp;
              <span v-if="!account"><b-link @click="login" href="#">Login</b-link></span>
              <span v-else><b-link @click="logout" href="#">Logout</b-link> {{account.address}}</span>
            </small>
          </div>
        </div>
        <div class="navbar__content-right pl-md-3">
          <div class="col">
            <strong class="text-black d-inline-block mb-2">aleph.im</strong>
            <ul class="list-unstyled">
              <li>
                <b-link class="text-black opacity-6" :to="{name: 'Page', params: {slug: 'chains'}}">
                  <small>Supported Blockchains</small>
                </b-link>
              </li>
              <li>
                <b-link class="text-black opacity-6" :to="{name: 'Page', params: {slug: 'team'}}">
                  <small>Team</small>
                </b-link>
              </li>
              <li>
                <b-link class="text-black opacity-6" :to="{name: 'Page', params: {slug: 'jobs'}}">
                  <small>Work With Us</small>
                </b-link>
              </li>
            </ul>
          </div>
          <div class="col">
            <strong class="text-black d-inline-block mb-2">Resources</strong>
            <ul class="list-unstyled">
              <li>
                <b-link class="text-black opacity-6" :to="{name: 'Page', params: {slug: 'developers'}}">
                  <small>Developers</small>
                </b-link>
              </li>
              <li>
                <a class="text-black opacity-6" href="https://github.com/aleph-im/aleph-whitepaper/raw/master/aleph-whitepaper.pdf">
                  <small>Whitepaper</small>
                </a>
              </li>
              <li>
                <b-link class="text-black opacity-6" :to="{name: 'Page', params: {slug: 'token'}}">
                  <small>Token</small>
                </b-link>
              </li>
            </ul>
          </div>
          <div class="col">
            <strong class="text-black d-inline-block mb-2">Social</strong>
          
            <div class="row no-gutters" style="margin-left: -.5rem;">
              <div class="col">
                <ul class="p-0">
                  <li class="d-inline-block mx-2">
                    <a href="https://t.me/alephim" class="text-black">
                      <i class="fab fa-telegram-plane"></i>
                    </a>
                  </li>
                  <li class="d-inline-block mx-2">
                    <a href="https://twitter.com/aleph_im" class="text-black">
                      <i class="fab fa-twitter"></i>
                    </a>
                  </li>
                  <li class="d-inline-block mx-2">
                    <a href="https://www.reddit.com/r/Aleph_im/" class="text-black">
                      <i class="fab fa-reddit-alien"></i>
                    </a>
                  </li>
                  <li class="d-inline-block mx-2">
                    <a href="https://medium.com/aleph-im" class="text-black">
                      <i class="fab fa-medium-m"></i>
                    </a>
                  </li>
                  <li class="d-inline-block mx-2">
                    <a href="https://www.linkedin.com/company/aleph-im/" class="text-black">
                      <i class="fab fa-linkedin"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import {ethereum} from 'aleph-js'

export default {
  name: 'app',
  data () {
    return {
      logo: require('./assets/logo.svg'),
      fixedMenuItems: [
        {
          type: 'text',
          text: 'Developers',
          slug: 'developers'
        },
        // {
        //   type: 'text',
        //   text: 'Roadmap',
        //   link: '#roadmap'
        // },
        // {
        //   type: 'text',
        //   text: 'Press',
        //   link: '/press'
        // },
        {
          type: 'button',
          text: 'Whitepaper',
          link: 'https://github.com/moshemalawach/aleph-whitepaper/raw/master/aleph-whitepaper.pdf'
        }
      ]
    }
  },
  computed: {
    menuItems() {
      return this.menu.concat(this.fixedMenuItems)
    },
    ...mapState({
      account: state => state.account,
      api_server: state => state.api_server,
      network_id: state => state.network_id,
      menu: state => state.menu
    })
  },
  methods: {
    async login() {
      let private_key = prompt("Please enter your mnemonics:")
      let account = await ethereum.import_account({mnemonics: private_key})
      // private_key = nuls.check_pkey(private_key)
      // if (!private_key) {
      //   alert("Private key is invalid.")
      //   return
      // }
      if (account)
        await this.$store.commit('set_account', account)
    },
    async logout() {
      this.$store.commit('set_account',  null);
    },
  }
}
</script>

<style lang="scss">
@import '~bootstrap/dist/css/bootstrap.min.css';
@import '~bootstrap-vue/dist/bootstrap-vue.css';
@import 'assets/styles/main.scss';

.CodeMirror {
  border: 1px solid #eee;
  height: auto;
}

body {
  color: #000;
}
</style>
