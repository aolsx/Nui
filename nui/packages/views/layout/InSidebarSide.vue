<template>
  <div
    class="nui-lut-side"
    lutype="side"
    :class="left?'--left':'--right'"
    @_vue="()=>this">
    <in-sd-group
      v-for="(g,k) in layout"
      :key="k"
      :group="g" />
  </div>
</template>
<script>
import Handler from './InHandler';
import InSdGroup from './InSdGroup.vue';
export default {
  name: 'InSidebarSide',
  components: {
    InSdGroup,
  },
  props: {
    left: Boolean,
    right: Boolean,
    layout: {
      type: Array,
      default(){
        return [];
      }
      // required: true
    }
  },
  setup(){
    const mods = Handler.GetMod();
    return {mods};
  },
  methods: {
    colSize(e,ve,curIndex){
      const ptSize = ve.$el.getBoundingClientRect();
      const colsArr = ve.group.cols;
      Handler.ColSize(e,{ptSize,colsArr,curIndex,vertical: false});
    },
    colSizeSide(e,pos){
      const maxW = this.$el.parentElement.offsetWidth * .4 - this.$el.offsetWidth + pos.w;
      Handler.ColSizeSide(e,pos,{maxW,r: this.right});
    },
    sideWhSize(e,pos,dn){
      Handler.SideWhSize(e,pos,dn);
    },
    dragStart(e){
      Handler.SdDragDrop(e.target);
    },
  }
};
</script>
