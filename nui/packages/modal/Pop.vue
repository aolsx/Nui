<template>
  <teleport to="#ToPppDbs">
    <div
      v-if="isShow"
      ref="pop"
      class="nui-pop"
      :class="isTop&&'--t'"
      :style="pop_style"
      tabindex="-1"
      @focusin="isInFocus = true"
      @focusout="eveFocusout">
      <div
        class="nui-pop-body">
        <slot />
      </div>
      <span
        class="nui-pop-arrow"
        :style="pos.mLeft&&`margin-left:${pos.mLeft}px`" />
    </div>
  </teleport>
</template>
<script>
export default {
  name: 'NuiPop',
  props: {
    w: {
      type: Number,
      default: null,
    },
    h: {
      type: Number,
      default: null,
    },
  },
  data(){
    return {
      isShow: false,
      isTop: false,
      isInFocus: false,
      pos: {
        left: 0,
        top: 0,
        mLeft: 0,
      },
    };
  },
  computed: {
    pop_style(){
      const {top,left} = this.pos;
      const style = {
        top: `${top}px`,
        left: `${left}px`,
      };
      style.width = `${500}px`;
      // if (this.w){
      //   style.width = `${this.w}px`;
      // }
      if (this.h){
        style.height = `${this.h}px`;
      }
      return style;
    }
  },
  methods: {
    show(e){
      // 触发元素的坐标参数
      const pos = e.target.getBoundingClientRect().toJSON();
      this.pos.left = pos.left + pos.width / 2;
      this.pos.top = pos.bottom;
      this.pos.mLeft = 0;
      this.isTop = false;
      this.isShow = true;
      this.$nextTick(()=>{
        this.$refs.pop.parentElement?.__vueParentComponent?.ctx?.bindRolling?.();
        this.$refs.pop.focus();
        this.isInFocus = false;
        this.checkPos(pos.top);
      });
    },
    // 检查
    checkPos(tgTop){
      const {offsetHeight: H,offsetWidth: W} = document.body;
      const pos = this.$refs.pop.getBoundingClientRect().toJSON();
      if (pos.left <= 0){
        const nl = this.pos.left - pos.left;
        this.pos.left = nl;
        this.pos.mLeft = pos.left;
      } else if (pos.right >= W){
        const nl = this.pos.left - (pos.right - W);
        this.pos.left = nl;
        this.pos.mLeft = pos.right - W;
      }
      if (pos.bottom > H){
        this.isTop = true;
        this.pos.top = tgTop - pos.height;
      }
    },
    eveFocusout(){
      setTimeout(()=>{
        if (!this.isInFocus){
          this.$refs.pop.parentElement?.__vueParentComponent?.ctx?.bindDestroy?.();
          this.isShow = false;
        }
        this.isInFocus = false;
      },1);
    }
  },

};
</script>