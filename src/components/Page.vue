<template>
  <div>
    <b-button
      class="float-right mr-4"
      :to="{name: 'PageEdit', params: {slug: slug}}">
      Edit
    </b-button>
    <p v-if="page === undefined" class="text-center my-4">
      ERROR 404, No page here.
    </p>
    <div v-else>
      {{page.content}}
    </div>
  </div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel'
import { mapState } from 'vuex'
export default {
  name: 'page',
  props: ['slug'],
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: {
    Carousel, Slide
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
