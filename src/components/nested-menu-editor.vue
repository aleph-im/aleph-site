<template>
  <b-list-group>
    <draggable class="dragArea" tag="ul" :list="items" :group="{ name: 'g1' }">
      <b-list-group-item v-for="(el, idx) in items" :key="idx + el.slug + el.text">
        <p>
          {{ idx }}. {{el.text}} <small>{{ el.slug }}</small>
          <b-link :to="{name: 'Page', params: {slug: el.slug}}"><i class="fa fa-eye text-primary" v-b-tooltip.hover title="View page" /></b-link>
          <b-link @click="edit_text(idx)"><i class="fa fa-edit text-primary" v-b-tooltip.hover title="Edit menu title" /></b-link>
          <b-link @click="remove(idx)"><i class="fa fa-minus text-primary" v-b-tooltip.hover title="Remove from menu"/></b-link>
        </p>

        <nested-menu-editor :items="el.items" />
      </b-list-group-item>
    </draggable>
  </b-list-group>
</template>
<script>
import draggable from "vuedraggable";
export default {
  props: {
    items: {
      required: true,
      type: Array
    }
  },
  components: {
    draggable
  },
  methods: {
    remove(idx){
      this.items.splice(idx, 1)
    },
    edit_text(idx) {
      let text = prompt("Please select a text for this entry:", this.items[idx].text)
      if (text) {
        this.items[idx].text = text
        this.items[idx] = this.items[idx]
      }
    }
  },
  name: "nested-menu-editor"
};
</script>
<style scoped>
.dragArea
{
  min-height: 50px;
}
</style>
