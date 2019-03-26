<template>
  <div>
    <b-container>
      <b-row class="my-5">
        <b-col lg="6" class="align-middle">
          <h1>Aleph is an universal layer-2 platform</h1>
          <p class="lead">
            Forget limitiations, delays and costs of traditional
            blockchain-based dApps.
            Aleph enables blazing fast dApps, data intensive and IoT
            applications.
          </p>
          <b-button
            href="https://github.com/moshemalawach/aleph-whitepaper/raw/master/aleph-whitepaper.pdf"
            variant="primary btn-pill" size="lg">GitHub</b-button>
        </b-col>
      </b-row>
    </b-container>
    <b-container class="roadmap" id="roadmap">
        <b-row class="text-center">
            <div class="col-md-10 col-lg-8 mx-auto">
                <h1>Development roadmap<br></h1>
                <p class="lead">Ongoing work on Aleph network will be broken down in a few milestones...<br></p>
            </div>
        </b-row>
        <carousel :scrollPerPage="true" :perPageCustom="[[0, 1], [768, 2], [992, 3], [1200, 4]]"
                  paginationActiveColor="#374992" paginationColor="#cbcbcb"
                  :paginationPadding="3.5" :paginationSize="7"
                  :navigationEnabled="true" navigationPrevLabel=" "
                  navigationNextLabel=" " :navigationClickTargetSize="2">
            <slide>
              <h4 class="text-center">Q1</h4>
              <b-card title="Proof-of-Concept">
                Proof of concept network alive, with first demo dApps available on data-only mode (no virtual machines or smart contracts yet), no native currency live yet.
              </b-card>
            </slide>
            <slide>
              <h4 class="text-center">Q2</h4>
              <b-card title="Cross-chain">
                Proof of concept network alive, with first demo dApps available on data-only mode (no virtual machines or smart contracts yet), no native currency live yet.
              </b-card>
            </slide>
            <slide>
              <h4 class="text-center">Q3</h4>
              <b-card title="Virtual Machines">
                Proof of concept network alive, with first demo dApps available on data-only mode (no virtual machines or smart contracts yet), no native currency live yet.
              </b-card>
            </slide>
            <slide>
              <h4 class="text-center">Q4</h4>
              <b-card title="Next...">
                Proof of concept network alive, with first demo dApps available on data-only mode (no virtual machines or smart contracts yet), no native currency live yet.
              </b-card>
            </slide>
        </carousel>
    </b-container>
  </div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel'
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: {
    Carousel, Slide
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
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
}
</style>
