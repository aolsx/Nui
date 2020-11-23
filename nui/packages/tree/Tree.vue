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
      p_arrow: this.arrow,
      p_idkey: this.idkey,
      p_labelkey: this.labelkey,
      p_ackeys: this.ackeys,
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
    idkey: {
      type: String,
      default: 'id'
    },
    labelkey: {
      type: String,
      default: 'label'
    },
    child: {
      type: String,
      default: 'child'
    },
    ackeys: {
      type: Array,
      default(){
        return null;
      }
    },
    tree: {
      type: Array,
      required: true
    },
    line: Boolean,
    arrow: Boolean,
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