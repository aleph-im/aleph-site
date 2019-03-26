<template>
  <div id="app">
      <b-navbar toggleable="md" class="shadow bg-white" sticky>
        <b-container class="align-baseline">
          <b-navbar-brand>
              <h4 class="my-auto mr-4">
                <img src="./assets/logo.svg" alt="logo" style="margin-bottom: 0.2em;"><span class="ml-2 d-inline-block align-bottom">aleph</span>
              </h4>
          </b-navbar-brand>
          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

          <b-collapse is-nav id="nav-collapse">
            <b-navbar-nav class="ml-auto">
              <template v-for="mitem in menuItems">
                <div v-if="mitem.type === 'button'" class="nav-item mx-md-4">
                  <a class="btn btn-secondary btn-pill d-block" :href="mitem.link">
                    {{mitem.text}}
                  </a>
                </div>
                <b-nav-item :href="mitem.link" class="align-middle d-block mx-md-2" v-else>
                  {{mitem.text}}
                </b-nav-item>
              </template>
            </b-navbar-nav>
          </b-collapse>
        </b-container>
      </b-navbar>
    <router-view></router-view>
    <footer>
      <b-container>
        <b-row>
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
            </ul>
          </b-col>
          <b-col md="3" xl="2">
            <h6>Social</h6>
            <a href="https://t.me/alephim">
              <i class="fab fa-telegram-plane" />
            </a>
          </b-col>
        </b-row>
      </b-container>
      <div class="copyright">
        <b-container>
          <p>Copyright ©2019 Aleph Project, all rights reserved.</p>
        </b-container>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      logo: require('./assets/logo.svg'),
      menuItems: [
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
  }
}
</script>

<style lang="scss">
@import 'assets/styles/variables.scss';
@import '~shards-ui/src/scss/shards.scss';
@import 'assets/styles/site.scss';

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.navbar-brand img .logo {
  fill: #aaa;
}
</style>
