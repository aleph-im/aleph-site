<template>
  <div>
    <b-container>
      <b-tabs class="my-2" lazy>
        <b-tab title="Write" active>
          <!-- <b-form-textarea id="textarea1"
                   v-model="content"
                   placeholder="Your page content"
                   class="form-inherit mt-4"
                   :rows="10"
                   :max-rows="20"
                   required>
          </b-form-textarea> -->
          <codemirror v-model="content" :options="cmOptions"></codemirror>
        </b-tab>
        <b-tab title="Preview" lazy>
          <markdown-it-vue class="md-body" :content="content"/>
        </b-tab>
      </b-tabs>
      <div class="clearfix float-right">
        <b-button :variant="(content) ? 'primary' : 'danger'" @click="save" :disabled="(!(content))||processing">
          {{processing ? 'Please wait...' : 'Save and stay'}}
        </b-button>
        <b-button :variant="(content) ? 'success' : 'danger'" @click="save_close" :disabled="(!(content))||processing">
          {{processing ? 'Please wait...' : 'Save'}}
        </b-button>
      </div>
    </b-container>
  </div>
</template>

<script>
// import { Carousel, Slide } from 'vue-carousel'
import { mapState } from 'vuex'
import MarkdownItVue from './markdown-it-vue'

import { codemirror } from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/gfm/gfm.js'
// import 'codemirror/theme/cobalt.css'
import * as nuls from 'aleph-js/src/api/nuls.js'
import * as aggregates from 'aleph-js/src/api/aggregates.js'
import { broadcast } from 'aleph-js/src/api/create.js'


export default {
  name: 'page',
  props: ['slug'],
  data () {
    return {
      content: '',
      processing: false,
      cmOptions: {
          tabSize: 2,
          styleActiveLine: true,
          lineNumbers: true,
          lineWrapping: false,
          line: true,
          mode: 'text/x-gfm',
          // theme: 'cobalt'
      }
    }
  },
  components: {
    // Carousel, Slide,
    MarkdownItVue, codemirror
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
      api_server: state => state.api_server,
    })
  },
  methods: {
    async refresh() {
      await this.$store.dispatch('update_pages') // perhaps only this page?
      if (this.pages[this.slug] != undefined)
        this.content = this.pages[this.slug].content
      else
        this.content = ''
    },
    async save() {
      let values = {}
      values[this.slug] = {
        content: this.content
      }

      let message = await aggregates.submit(
        this.site_address, 'pages', values, {
          chain: 'NULS', api_server: this.api_server,
          channel: 'FOUNDATION', inline: false
        }
      )
      // this.$store.commit('sign_tx', {
      //   'tx': tx,
      //   'reason': 'Profile modification for ' + this.account.address
      // })
      nuls.sign(Buffer.from(this.account.private_key, 'hex'), message)
      await broadcast(message, {api_server: this.api_server})
      this.processing = true
      function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
      await sleep(200)
      this.processing = false
    },
    async save_close() {
      await this.save()
      await this.$store.dispatch('update_pages')
      this.$router.push({ name: "Page", params: {slug: this.slug} })
    }
  },
  watch: {
    async slug() {
      await this.refresh()
    }
  },
  async created() {
    await this.refresh()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">


.CodeMirror {
  border: 1px solid #eee;
  height: auto;
}
</style>
