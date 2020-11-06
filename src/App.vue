<template>
  <nui-view-root>
    <nui-view-head
      @win="eveWinDow">
      Tools
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
// import layoutDatasTest from './vews/layoutTest';
export default {
  name: 'App',
  setup(){
    return {
      layout: reactive(layoutDatas.sidebar),
      mods: layoutDatas.mods,
      // layout: reactive(layoutDatasTest.sidebar),
      // layout: reactive(layoutDatasTest.nested),
      // mods: layoutDatasTest.mods,
    };
  },
  methods: {
    eveWinDow(type){
      this.$Nui.msg.i(type);
    },
    eveSave(){
      this.$Nui.msg.s('Lut Save');
    }
  }
};
</script>