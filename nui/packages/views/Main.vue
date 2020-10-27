<template>
  <div class="nui-app-views">
    <in-nested
      v-if="layout.cols"
      :key="0"
      root
      :cols="layout.cols"
      :vertical="layout.vertical" />
    <in-sidebar
      v-else-if="layout.main"
      :layout="layout" />
  </div>
  <div
    v-if="!area.hide"
    class="nui-lut-area"
    :style="c_areaStyle" />
</template>
<script>
import NuiLtStateInit from './layout/InHandler/state';
import InNested from './layout/InNested.vue';
import InSidebar from './layout/InSidebar.vue';
export default {
  name: 'NuiViewMain',
  components: {
    InNested,
    InSidebar
  },
  props: {
    // 模块信息
    mods: {
      type: Object,
      required: true
    },
    layout: {
      type: Object,
      required: true
    }
  },
  emits: ['save'],
  data(){
    return {
      area: {
        t: 0,
        l: 0,
        w: 0,
        h: 0,
        op: 0,
        hide: true,
      }
    };
  },
  computed: {
    c_areaStyle(){
      const a = this.area;
      return {
        top: `${a.t}px`,
        left: `${a.l}px`,
        width: `${a.w}px`,
        height: `${a.h}px`,
        opacity: a.op
      };
    }
  },
  created(){
    NuiLtStateInit(this);
  }
};
</script>
