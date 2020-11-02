<template>
  <teleport to="#ToPppDbs">
    <div
      v-if="isShow"
      ref="pop"
      class="nui-pop"
      :style="pop_style"
      tabindex="-1"
      @focusin="isInFocus = true"
      @focusout="eveFocusout">
      <div
        class="nui-pop-body">
        <slot />
      </div>
      <span class="nui-pop-arrow" />
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
        aLeft: null
      }
    };
  },
  computed: {
    pop_style(){
      const {top,left} = this.pos;
      return {
        top: `${top}px`,
        left: `${left}px`,
      };
    }
  },
  methods: {
    show(e){
      // 触发元素的坐标参数
      const targetPos = e.target.getBoundingClientRect().toJSON();
      let top = targetPos.bottom;
      let left = targetPos.left + targetPos.width / 2;
      this.pos.left = left;
      this.pos.top = top;
      this.isShow = true;
      this.$nextTick(()=>{
        this.$refs.pop.parentElement.__vueParentComponent.ctx.bindRolling();
        this.$refs.pop.focus();
        this.isInFocus = false;
      });
    },
    eveFocusout(){
      setTimeout(()=>{
        if (!this.isInFocus){
          this.$refs.pop.parentElement.__vueParentComponent.ctx.bindDestroy();
          this.isShow = false;
        }
        this.isInFocus = false;
      },1);
    }
  },

};
</script>