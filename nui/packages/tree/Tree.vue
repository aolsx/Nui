<template>
  <div
    class="nui-tree"
    :class="line&&'--line'"
    @dragstart.stop="eveDragstart"
    @click.stop.prevent="eveClick">
    <ul tabindex="-1">
      <in-tree-item
        v-for="(item,k) in tree"
        :key="k"
        :item="item" />
    </ul>
  </div>
</template>
<script>
import TreedragFn from './drag';
import InTreeItem from './TreeItem.vue';
export default {
  name: 'NuiTree',
  components: {
    InTreeItem
  },
  props: {
    tree: {
      type: Array,
      required: true
    },
    line: Boolean
  },
  emits: ['click'],
  methods: {
    eveClick(e){
      const item = e.target.__vueParentComponent.ctx.item;
      if (!item){
        return;
      }
      if (item.tree){
        item.open = !item.open;
      } else {
        this.$emit('click',item.to);
      }
    },
    eveDragstart(e){
      TreedragFn(e.target,this.$el);
    },
  },
};
</script>