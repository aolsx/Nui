<template>
  <div
    class="nui-tree"
    :class="line&&'--line'"
    @_vue="()=>this"
    @dragstart.stop="sort && eveDragstart($event)">
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
  provide(){
    return {
      dragType: this.dragType,
      p_child: this.child,
      p_click: (item)=>{
        this.$emit('click',item);
      },
      p_open: (item)=>{
        this.$emit('open',item);
      },
      p_rclick: (ptObj)=>{
        this.$emit('rclick',ptObj);
      }
    };
  },
  props: {
    dragType: {
      type: String,
      default: 'tree'
    },
    child: {
      type: String,
      default: 'child'
    },
    tree: {
      type: Array,
      required: true
    },
    line: Boolean,
    sort: {
      type: Boolean,
      default: true
    }
  },
  emits: ['click','open','rclick'],
  methods: {
    eveDragstart(e){
      TreedragFn(e.target,this.$el,this.child);
      // this.$emit('stor',item);
    }
  },
};
</script>