<template>
  <div
    class="nui-lut-col"
    lutype="col"
    :class="`${vertical?'--v':'--h'}${col?' --panel':''}`"
    :style="c_style"
    @_vue="()=>this">
    <template v-if="cols">
      <in-nested
        v-for="(im,key) in cols"
        :key="key"
        v-bind="im"
        :vertical="!vertical" />
    </template>
    <div
      v-else
      class="nui-lut-panel"
      lutype="panel">
      <div
        class="nui-lut-tabs"
        lutype="tabs"
        @_vue="()=>this">
        <div
          v-for="(tab,k) in c_modInfo"
          :key="k"
          class="nui-lut-tab"
          lutype="tab"
          draggable="true"
          :class="col.active==tab.name&&'--active'"
          @_nodeKey="()=>[k]"
          @click.stop="clickTab(tab.name)"
          @dragstart.stop="dragstart($event)">
          <i
            v-if="tab.icon"
            :class="tab.icon" />
          <ins v-if="tab.label">{{ tab.label }}</ins>
        </div>
      </div>
      <div class="nui-lut-content">
        <div
          v-for="(tab,k) in c_modInfo"
          :key="`${tab.component}-${k}`"
          class="nui-lut-component"
          :class="col.active==tab.name&&'--active'">
          <component :is="tab.component" />
        </div>
      </div>
    </div>
    <div
      v-if="$.vnode.key > 0"
      class="nui-lut-line"
      @mousedown.stop.prevent="colSize" />
  </div>
</template>
<script>
import Handler from './InHandler';
export default {
  name: 'InNested',
  props: {
    vertical: Boolean,
    root: Boolean,
    pos: {
      type: Object,
      default(){
        return {flex: 0};
      }
    },
    cols: {
      type: Array,
      default(){
        return null;
      }
    },
    col: {
      type: Object,
      default(){
        return null;
      }
    },
  },
  computed: {
    c_style(){
      const flex = this.pos.flex;
      if (!flex){
        return;
      }
      const value = flex > 1 ? `${flex}px` : `${flex * 100}%`;
      return this.vertical ? `width:${value}` : `height:${value}`;
    },
    c_modInfo(){
      if (this.col){
        const infos = this.getMod();
        return this.col.tabs.map(v=>({...infos[v],name: v}));
      }
      return null;
    }
  },
  methods: {
    getMod(){
      return Handler.GetMod();
    },
    colSize(e){
      const ptSize = this.$parent.$el.getBoundingClientRect();
      const colsArr = this.$parent.cols;
      const curIndex = this.$.vnode.key;
      const vertical = this.vertical;
      Handler.ColSize(e,{ptSize,colsArr,curIndex,vertical});
    },
    dragstart(ve){
      Handler.NdDragDrop(ve);
    },
    clickTab(name){
      const col = this.col;
      col.active = name;
    }
  },
};
</script>