<template>
  <div class="container">
    <b-button
      class="float-right mr-4"
      v-if="this.account && (this.site_address === this.account.address)"
      :to="{name: 'PageEdit', params: {slug: slug}}">
      Edit
    </b-button>
    <p v-if="page === undefined" class="text-center my-4">
      Page loading.
    </p>
    <markdown-it-vue class="md-body" :content="page.content" v-else />
  </div>
</template>

<script>
// import { Carousel, Slide } from 'vue-carousel'
import { mapState } from 'vuex'
import MarkdownItVue from './markdown-it-vue'
export default {
  name: 'page',
  props: ['slug'],
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: {
    // Carousel, Slide,
    MarkdownItVue
  },
  computed: {
    page() {
      return this.pages[this.slug]
    },
    can_edit() {
      // TODO: support authorized addresses too.
      return this.site_address == this.account.address
    },
    ...mapState({
      pages: state => state.pages,
      site_address: state => state.site_address,
      account: state => state.account,
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>
