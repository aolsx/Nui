<template>
  <div
    v-if="menu.arr"
    tabindex="-1"
    class="nui-pp-menu"
    :class="menu.line&&'--line'"
    :style="c_Style"
    @blur="blurDestroy(null)">
    <div
      v-for="(im,k) in menu.arr"
      :key="k"
      class="nui-pp-menu-item"
      :class="im.cls"
      @click="blurDestroy(im.name)">
      <i
        v-if="im.icon"
        :class="im.icon" />
      <ins v-if="im.label">{{ im.label }}</ins>
    </div>
  </div>
</template>
<script>
import {handlerMenu} from '../../../handler/popup';
export default {
  name: 'InMenu',
  data(){
    return {
      menu: {
        line: false,
        arr: null,
        pos: false,
      }
    };
  },
  computed: {
    c_Style(){
      const pos = this.menu.pos;
      return pos && {
        top: `${pos.top}px`,
        left: `${pos.left}px`
      };
    }
  },
  created(){
    this.onResolve = handlerMenu._onResolve;
    handlerMenu.setDatas = (arr,pos,line)=>{
      this.menu.arr = arr;
      this.menu.pos = pos;
      this.menu.line = line;
      this.$nextTick(()=>{
        this.$el.focus();
        this.$parent.bindRolling();
      });
    };
  },
  methods: {
    blurDestroy(name){
      this.onResolve(name);
      this.menu.arr = null;
      this.menu.pos = null;
      this.menu.line = false;
      this.$parent.bindDestroy();
    }
  },
};
</script>