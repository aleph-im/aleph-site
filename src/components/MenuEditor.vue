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
    <div class="clearfix float-right">
      <b-button variant="success" @click="save" :disabled="processing">
        {{processing ? 'Please wait...' : 'Save'}}
      </b-button>
    </div>
  </b-container>
</template>

<script>
import { mapState } from 'vuex'
import nestedMenuEditor from './nested-menu-editor'
import { aggregates } from 'aleph-js'

export default {
  name: 'menu-editor',
  data () {
    return {
      working_menu: [],
      processing: false
    }
  },
  components: {
    nestedMenuEditor
  },
  methods: {
    async refresh() {
      await this.$store.dispatch('update_pages') // perhaps only this page?
      await this.$store.dispatch('update_menu')
      this.working_menu = this.menu
    },
    add(slug) {
      this.working_menu.push({'slug': slug, 'items': []})
    },
    async save() {
      let values = {
        items: this.working_menu
      }

      this.processing = true
      let message = await aggregates.submit(
        this.site_address, 'menu', values, {
          api_server: this.api_server,
          channel: 'FOUNDATION', account: this.account
        }
      )
      function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
      await sleep(200)
      await this.refresh()
      this.processing = false
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
      channel: state => state.channel
    })
  },
  async created() {
    await this.refresh()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>
