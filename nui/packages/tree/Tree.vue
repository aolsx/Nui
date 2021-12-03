<template>
  <div
    class="nui-tree"
    :class="line&&'--line'"
    @_vue="()=>this"
    @dragstart.stop="sort && eveDragstart($event)">
    <ul tabindex="-1">
      <in-tree-item
        v-for="(im,kk) in tree"
        :key="kk"
        :item="im"
        :itemkey="kk"
        :hasslot="!!$slots.default">
        <template #default="{data,k}">
          <slot
            :data="data"
            :k="k" />
        </template>
      </in-tree-item>
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
      p_childIcon: this.childIcon,
      p_arrow: this.arrow,
      p_idkey: this.idkey,
      p_labelkey: this.labelkey,
      p_ackeys: this.ackeys,
      p_sort: this.sort,
      p_expand: this.expand,
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
    childIcon: {
      type: Array,
      default: null
    },
    ackeys: {
      type: Array,
      default(){
        return null;
      }
    },
    tree: {
      type: [Array,Object],
      required: true
    },
    line: Boolean,
    arrow: Boolean,
    sort: Boolean,
    expand: Boolean
  },
  emits: ['click','open','rclick'],
  // created(){
  //   console.log();
  // },
  methods: {
    eveDragstart(e){
      TreedragFn(e.target,this.$el,this.child);
      // this.$emit('stor',item);
    }
  },
};
</script>