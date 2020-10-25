<template>
  <div class="nui-app-root">
    <div class="nui-app-bg">
      <i :class="bgIcon" />
    </div>
    <div class="nui-app-head">
      <div
        class="nui-app-drag"
        style="-webkit-app-region: drag;" />
      <div class="nui-app-logo">
        <i :class="logo.icon" />
        <ins>{{ logo.label }}</ins>
      </div>
      <div
        v-if="$slots.tool"
        class="nui-app-dynamic-tools">
        <i class="nui-icon-tools" />
        <div>
          <slot name="tool" />
        </div>
        <i class="nui-icon-chevron-up" />
      </div>
      <div class="nui-app-window-controls">
        <span @click.stop="$emit('win','min')">
          <i class="nui-icon-chrome-minimize" />
        </span>
        <span @click.stop="$emit('win','reset')">
          <i class="nui-icon-chrome-restore" />
        </span>
        <span @click.stop="$emit('win','close')">
          <i class="nui-icon-chrome-close" />
        </span>
      </div>
    </div>
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
  </div>
  <div
    id="ToPopup"
    class="nui-app-popup-root" />
  <in-confirm />
  <in-menu />
  <in-load-pro />
  <in-load-am />
  <in-msg />
</template>
<script>
import NuiLtStateInit from './layout/InHandler/state';
import InNested from './layout/InNested.vue';
import InSidebar from './layout/InSidebar.vue';
import InConfirm from './popup/InConfirm.vue';
import InMsg from './popup/InMsg.vue';
import InMenu from './popup/InMenu.vue';
import InLoadAm from './popup/InLoadAm.vue';
import InLoadPro from './popup/InLoadPro.vue';
export default {
  name: 'NuiViewsRoot',
  components: {
    InNested,
    InSidebar,
    InConfirm,
    InMsg,
    InMenu,
    InLoadAm,
    InLoadPro
  },
  props: {
    bgIcon: {
      type: String,
      default: 'nui-icon-ng-logo'
    },
    logo: {
      type: Object,
      default(){
        return {
          icon: 'nui-icon-ng-logo',
          label: 'NG IDE'
        };
      }
    },
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
  emits: ['win','save'],
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
    // const saveFn = this.$Nui.debounce(()=>{
    //   this.$emit('save');
    // },1000);
    // // const savelayout = ()=>{
    // //   this.$emit('save');
    // // };
    // this.$watch('layout',saveFn,{
    //   deep: true
    // });
  }
};
</script>