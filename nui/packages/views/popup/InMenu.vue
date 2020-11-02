<template>
  <div
    v-if="menu.arr"
    class="nui-pp-menu"
    tabindex="-1"
    :class="menu.line&&'--line'"
    :style="c_Style"
    @blur="empty()">
    <div
      v-for="(im,k) in menu.arr"
      :key="k"
      class="nui-pp-menu-item"
      :class="im.cls"
      @click="im.fn();empty()">
      <i
        v-if="im.icon"
        :class="im.icon" />
      <ins v-if="im.label">{{ im.label }}</ins>
    </div>
  </div>
</template>
<script>
import {MenuObj} from '../../../handler/popup';
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
  watch: {
    'menu.arr'(v){
      if (v){
        this.$nextTick(()=>{
          console.log(this);
          // this.$el.focus();
        });
      }
    }
  },
  created(){
    MenuObj.v = this.menu;
  },
  methods: {
    empty(){
      this.menu.arr = null;
      this.menu.pos = null;
      this.menu.line = false;
    }
  },
};
</script>