<template>
  <div
    v-if="isShow"
    class="nui-pop"
    tabindex="-1"
    :style="pop_style"
    @blur="isShow = false">
    <div class="nui-pop-body">
      <slot />
    </div>
    <span class="nui-pop-arrow" />
  </div>
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
      // this.$el.focus();
      this.$nextTick(()=>{
        this.$el.focus();
      });
      console.log(this);
    }
  },
};
</script>