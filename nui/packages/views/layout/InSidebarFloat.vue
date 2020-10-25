<template>
  <div class="nui-lut-float">
    <div
      v-for="(g,k) in layout"
      :key="k"
      class="nui-lut-float-item"
      tabindex="-1"
      :style="`width:${g.pos.w}px;height:${g.pos.h}px;top:${g.pos.t}px;left:${g.pos.l}px`">
      <div
        class="nui-lut-float-item-head"
        @mousedown="sideGroupWhSize($event,g,'move')" />
      <in-sd-group-ft
        :key="k"
        :group="g" />
      <div class="nui-lut-float-item-foot">
        <i @mousedown="sideGroupWhSize($event,g,'ne')" />
        <span @mousedown="sideGroupWhSize($event,g,'n')" />
        <i @mousedown="sideGroupWhSize($event,g,'nw')" />
      </div>
    </div>
  </div>
</template>
<script>
import Handler from './InHandler';
import InSdGroupFt from './InSdGroupFt.vue';
export default {
  name: 'InSidebarFloat',
  components: {
    InSdGroupFt,
  },
  props: {
    layout: {
      type: Array,
      default(){
        return [];
      }
      // required: true
    },
  },
  created(){
    this.floatRoot = true;
    this.mods = Handler.GetMod();
  },
  methods: {
    colSize(e,ve,curIndex){
      const ptSize = ve.$el.getBoundingClientRect();
      const colsArr = ve.group.cols;
      Handler.ColSize(e,{ptSize,colsArr,curIndex,vertical: false});
    },
    sideGroupWhSize(e,g,dn){
      let pm = {
        colsLen: g.cols.length,
        tabLen: 0
      };
      for (const c of g.cols){
        pm.tabLen += c.col.tabs.length;
      }
      Handler.SideWhSize(e,g.pos,dn,pm);
    },
    sideWhSize(e,pos,dn){
      Handler.SideWhSize(e,pos,dn);
    },
    dragStart(e){
      Handler.SdDragDrop(e.target);
    },
  },
};
</script>