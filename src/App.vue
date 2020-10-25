<template>
  <nui-views-root
    :mods="mods"
    :layout="layout"
    @save="eveSave"
    @win="eveWinDow">
    <template #tool>
      <div>工具栏</div>
    </template>
  </nui-views-root>
</template>
<script>
import {reactive} from 'vue';
import layoutDatas from './vews/layout';
export default {
  name: 'App',
  setup(){
    // nested sidebar
    return {
      layout: reactive(layoutDatas.sidebar),
      mods: layoutDatas.mods,
    };
  },
  methods: {
    eveWinDow(){
      // console.log(type);
    },
    eveSave(){
      // console.log('触发保存 Save');
    }
  }
};
</script>