<template>
  <nui-view-root>
    <nui-view-head
      @win="eveWinDow">
      13
    </nui-view-head>
    <nui-view-main
      :mods="mods"
      :layout="layout"
      @save="eveSave" />
  </nui-view-root>
</template>
<script>
import {reactive} from 'vue';
import layoutDatas from './vews/layout';
export default {
  name: 'App',
  setup(){
    return {
      layout: reactive(layoutDatas.sidebar),
      mods: layoutDatas.mods,
    };
  },
  methods: {
    eveWinDow(type){
      this.$Nui.msg.i(type);
    },
    eveSave(){
      this.$Nui.msg.s('触发保存 Save');
    }
  }
};
</script>