<template>
  <div
    class="nui-paa"
    :class="item.cls"
    :style="{
      top:`${item.pos.y}px`,
      left:`${item.pos.x}px`,
      transitionDuration: `${item.time}ms`
    }"
    @animationend="eveAm"
    @transitionend="eveTra">
    <i
      v-if="item.icon"
      :class="item.icon" />
  </div>
</template>
<script>
export default {
  name: 'InParabolaItem',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
    eveAm(e){
      if (e.animationName === "paaZoomIn"){
        const {to} = this.item;
        this.$el.style.top = `${to.y}px`;
        this.$el.style.left = `${to.x}px`;
      } else {
        this.$parent.delItem(this.item.id);
      }
    },
    eveTra(){
      if (!this.isAdd){
        this.$el.classList.add('--zoom-out');
        this.isAdd = true;
      }
    }
  },
};
</script>