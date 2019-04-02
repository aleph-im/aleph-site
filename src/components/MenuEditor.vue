<template>
  <b-container>
    <h1>Edit menu</h1>
    <b-row>
      <b-col cols="6">
        <nestedMenuEditor :items="working_menu" />
      </b-col>
      <b-col cols="6">
        <div
          class="list-group-item"
          v-for="(element, index) in available"
          :key="element.slug"
        >
          {{ element.slug }} <b-link @click="add(element.slug)"><i class="fa fa-plus text-primary"/></b-link>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapState } from 'vuex'
import nestedMenuEditor from './nested-menu-editor'

export default {
  name: 'menu-editor',
  data () {
    return {
      working_menu: []
    }
  },
  components: {
    nestedMenuEditor
  },
  methods: {
    async refresh() {
      await this.$store.dispatch('update_pages') // perhaps only this page?
      await this.$store.dispatch('update_menu')
    },
    add(slug) {
      console.log(slug)
      this.working_menu.push({'slug': slug, 'items': []})
    }
  },
  computed: {
    can_edit() {
      // TODO: support authorized addresses too.
      return this.site_address == this.account.address
    },
    available() {
      let used = this.used_slugs
      let available = []
      for (let page_slug of Object.keys(this.pages)) {
        if (!(page_slug in used))
          available.push({slug: page_slug})
      }
      return available
    },
    used_slugs() {
      let slugs = []
      for (let item of this.menu) {
        slugs.push(item.slug)
      }
      return slugs
    },
    ...mapState({
      pages: state => state.pages,
      menu: state => state.menu,
      site_address: state => state.site_address,
      account: state => state.account,
    })
  },
  async created() {
    await this.refresh()
    this.working_menu = this.menu
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>
