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
@import '~bootstrap/dist/css/bootstrap.min.css';
@import '~bootstrap-vue/dist/bootstrap-vue.css';
@import '~shards-ui/src/scss/shards.scss';
@import 'assets/styles/site.scss';

html, body {
  height: 100%;
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
  box-shadow: 0 .46875rem 1.1875rem rgba($blueish-grey, .2),
              0 .25rem .53125rem rgba($blueish-grey, .12),
              0 .125rem .1875rem rgba($blueish-grey, .1);
  height: calc(100% - 2.75rem);
}
</style>
