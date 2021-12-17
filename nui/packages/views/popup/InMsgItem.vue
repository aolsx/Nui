<template>
  <div
    class="nui-msg-item"
    @_startTime="startTime">
    <div
      class="nui-msg-body"
      :class="`${params.color}`"
      @mouseenter.stop.prevent="stopTime()">
      <div class="nui-msg-icon">
        <div
          class="nui-msg-auto"
          :style="c_style_auto" />
        <i
          :class="params.icon"
          :style="c_style_color" />
      </div>
      <div class="nui-msg-info">
        <span>{{ params.msg }}</span>
      </div>
      <div
        class="nui-msg-close"
        @click.stop.prevent="delItem()">
        <i class="nicon-times" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'InMsgItem',
  props: {
    params: {
      type: Object,
      default(){
        return {
          icon: 'nicon-info',
          color: 'color-gy',
          msg: 'Show Infos...',
          time: 3000,
        };
      }
    }
  },
  emits: ['del'],
  data(){
    return {
      isStart: false,
      show: true
    };
  },
  computed: {
    c_style_auto(){
      if (this.isStart){
        return {
          transform: 'translateY(100%)',
          transitionDuration: `${this.params.time}ms`
        };
      }
      return null;
    },
    c_style_color(){
      if (this.isStart){
        return {
          color: 'inherit',
          transitionDuration: `${this.params.time}ms`
        };
      }
      return null;
    },
  },
  methods: {
    // 开始计时
    startTime(){
      if (this.params.time){
        this.isStart = true;
        this.autoCloseTimer = setTimeout(()=>{
          this.delItem();
        },this.params.time);
      }
    },
    // 停止并重置计时器;
    stopTime(){
      if (this.autoCloseTimer){
        this.isStart = false;
        clearTimeout(this.autoCloseTimer);
        this.autoCloseTimer = null;
      }
    },
    delItem(){
      this.stopTime();
      this.$parent.$parent.eveDel(this.$.vnode.key);
    }
  },
};
</script>