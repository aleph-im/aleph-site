<template>
  <div id="app" class="d-flex flex-column">
      <b-navbar toggleable="md" class="shadow bg-white" id="appnav" sticky>
        <b-container class="align-baseline">
          <b-navbar-brand>
              <h4 class="my-auto mr-4">
                <b-link :to="{name: 'Home'}">
                  <img src="./assets/logo.svg" alt="logo" style="margin-bottom: 0.2em;"><span class="ml-2 d-inline-block align-bottom">aleph</span>
                </b-link>
              </h4>
          </b-navbar-brand>
          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
          <b-collapse is-nav id="nav-collapse">
            <b-navbar-nav class="ml-auto">
              <template v-for="(mitem, idx) in menuItems" >
                <div v-if="mitem.type === 'button'" class="nav-item mx-md-4" :key="menu.length + idx">
                  <a class="btn btn-secondary btn-pill d-block" :href="mitem.link">
                    {{mitem.text}}
                  </a>
                </div>
                <b-nav-item :href="mitem.link" class="align-middle d-block mx-md-2" v-else-if="mitem.link" :key="menu.length + idx">
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
          </b-collapse>
        </b-container>
      </b-navbar>
    <div id="content">
      <router-view></router-view>
    </div>
    <footer id="sticky-footer">
      <b-container>
        <b-row class="my-3">
          <b-col md="6" xl="8">
            <h4 class="my-auto mr-4 brand">
              <img src="./assets/logo.svg" alt="logo" style="margin-bottom: 0.2em;"><span class="ml-2 d-inline-block align-bottom">aleph</span>
            </h4>
          </b-col>
          <b-col md="3" xl="2">
            <h6 class="mt-2 mt-md-0">Resources</h6>
            <ul>
              <li>
                <a href="https://github.com/aleph-im/pyaleph">Github</a>
              </li>
              <li>
                <a href="https://github.com/moshemalawach/aleph-whitepaper/raw/master/aleph-whitepaper.pdf">Whitepaper</a>
              </li>
              <li>
                <a href="https://explorer.aleph.im">Test-net Explorer</a>
              </li>
            </ul>
          </b-col>
          <b-col md="3" xl="2">
            <h6>Social</h6>
            <a href="https://t.me/alephim">
              <i class="fab fa-telegram-plane" />
            </a>&nbsp;<a href="https://www.reddit.com/r/Aleph_im/">
              <i class="fab fa-reddit" />
            </a>&nbsp;<a href="https://twitter.com/aleph_im">
              <i class="fab fa-twitter" />
            </a>&nbsp;<a href="https://medium.com/aleph-im">
              <i class="fab fa-medium" />
            </a>
          </b-col>
        </b-row>
      </b-container>
      <div class="copyright">
        <b-container class="d-flex justify-content-between">
          <p>Copyright ©2019 Aleph Project, all rights reserved.</p>
          <p v-if="!account"><b-link @click="login" href="#">Login</b-link></p>
          <p v-else>{{account.address}} <b-link @click="logout" href="#">Logout</b-link></p>
        </b-container>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import * as nuls from 'aleph-js/src/api/nuls.js'

export default {
  name: 'app',
  data () {
    return {
      logo: require('./assets/logo.svg'),
      fixedMenuItems: [
        {
          type: 'text',
          text: 'Github',
          link: 'https://github.com/aleph-im/pyaleph'
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
      let private_key = prompt("Please enter your private key:")
      private_key = nuls.check_pkey(private_key)
      if (!private_key) {
        alert("Private key is invalid.")
        return
      }
      await this.add_account(private_key)
    },
    async add_account(prv) {
      let private_key = prv
      let prvbuffer = Buffer.from(private_key, 'hex')
      let pub = nuls.private_key_to_public_key(prvbuffer)
      let hash = nuls.public_key_to_hash(pub, {
        chain_id: this.network_id
      })
      let address = nuls.address_from_hash(hash)
      // Vue.set(this, 'public_key', pub);
      let public_key = pub.toString('hex')
      let address_hash = hash.toString('hex')
      this.$store.commit('set_account', {
        'name': address,
        'private_key': private_key,
        'public_key': public_key,
        'address': address
      })
      //await this.fetch_profile(address)
    },
    async logout() {
      this.$store.commit('set_account',  null);
    },
  }
}
</script>

<style lang="scss">
@import 'assets/styles/variables.scss';
@import '~bootstrap/dist/css/bootstrap.min.css';
@import '~bootstrap-vue/dist/bootstrap-vue.css';
@import '~shards-ui/src/scss/shards.scss';
@import 'assets/styles/site.scss';

html, body {
  height: 100%;
}

body {
  background: url('assets/bg.svg') no-repeat center -100px;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}

#content {
  flex: 1 0 auto;
}

#sticky-footer {
  flex-shrink: none;
}

.navbar-brand img .logo {
  fill: #aaa;
}

.navbar-brand a {
  color: inherit;
}

$blueish-grey: #5A6169 !default;

.VueCarousel-pagination {
  z-index: 10;
  margin-top: -2em;
}

.VueCarousel-navigation-button {
  color: #374992 !important;
}


.VueCarousel-navigation-button:before {
  border-color: #374992;
  border-style: solid;
  border-width: 3px 3px 0 0;
  content: ' ';
  display: inline-block;
  height: 10px;
  width: 10px;
  transform: rotate(43deg);
}

.VueCarousel-navigation-prev:before {
  transform: rotate(223deg);
}


.VueCarousel-navigation--disabled {
  opacity: .3 !important;
}

.roadmap h4.card-title {
  font-size: 1.2em;
}

.roadmap .VueCarousel {
}

.roadmap .VueCarousel-slide {
  padding: 0 1em 2em 1em;
}

.roadmap .VueCarousel-wrapper {
  overflow: hidden;
}

.roadmap .card {
  // box-shadow: 0 .46875rem 1.1875rem rgba($blueish-grey, .2),
  //             0 .25rem .53125rem rgba($blueish-grey, .12),
  //             0 .125rem .1875rem rgba($blueish-grey, .1);
  height: calc(100% - 2.75rem);
}

.heading {
  @media (min-width: 992px) {
    margin: 0 20%;
  }
  text-align: center;
}

.CodeMirror {
  border: 1px solid #eee;
  height: auto;
}
</style>
