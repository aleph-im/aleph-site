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
            href="https://github.com/aleph-im/pyaleph"
            variant="primary btn-pill" size="lg">GitHub</b-button>
        </b-col>
      </b-row>
    </b-container>
    <b-container class="roadmap" id="roadmap">
        <b-row class="text-center my-5">
            <div class="col-md-10 col-lg-8 mx-auto">
                <h1>Development roadmap<br></h1>
                <p class="lead">Ongoing work on Aleph network will be broken down in a few milestones...<br></p>
            </div>
        </b-row>
        <carousel :scrollPerPage="true" :perPageCustom="[[0, 1], [768, 2], [992, 3], [1200, 4]]"
                  paginationActiveColor="#374992" paginationColor="#cbcbcb"
                  :paginationPadding="3.5" :paginationSize="7"
                  :navigationEnabled="true" navigationPrevLabel=" "
                  navigationNextLabel=" " :navigationClickTargetSize="2"
                  class="my-5">
            <slide>
              <h4 class="text-center">
                Q1 <i class="fa fa-check-circle text-primary"/>
              </h4>
              <b-card title="Proof-of-Concept">
                Proof of concept network alive, with first demo dApps available on data-only mode (no virtual machines or smart contracts yet), no native currency live yet.
              </b-card>
            </slide>
            <slide>
              <h4 class="text-center">
                Q2 <i class="fa fa-check-circle text-muted"/>
              </h4>
              <b-card title="Cross-chain">
                Tokens living on multiple blockchains, multiple type of addresses usable on the network.
                <ul>
                  <li>NULS</li>
                  <li>Ethereum</li>
                  <li>NEO...</li>
                </ul>
              </b-card>
            </slide>
            <slide>
              <h4 class="text-center">
                Q3 <i class="fa fa-check-circle text-muted"/>
              </h4>
              <b-card title="Virtual Machines">
                The "Smart Apps" virtual machine will be developed for this milestone, allowing the Aleph native token to live in a virtual machine by itself. A token swap will take place from the NRC-20 (and ERC-20 if issued) token to the native token.
              </b-card>
            </slide>
            <slide>
              <h4 class="text-center">
                Q4 <i class="fa fa-check-circle text-muted"/>
              </h4>
              <b-card title="Next...">
                <ul>
                  <li>Specialized nodes</li>
                  <li>Sharding</li>
                  <li>...</li>
                </ul>
              </b-card>
            </slide>
        </carousel>
    </b-container>
  </div>
</template>

<script>
// import { Carousel, Slide } from 'vue-carousel'
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
</style>
