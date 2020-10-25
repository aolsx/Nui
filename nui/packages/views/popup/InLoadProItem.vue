<template>
  <transition
    name="zoomfade"
    appear>
    <div
      v-if="open"
      class="nui-loadpro">
      <svg
        :width="c_pm.sz"
        :height="c_pm.sz">
        <circle
          class="nui-loadpro-bgcircle"
          cx="50%"
          cy="50%"
          :r="c_r"
          :stroke-width="c_pm.sw"
          :stroke="c_pm.bc"
          :stroke-dasharray="`0 ${c_pr/3}`"
          stroke-linecap="round"
          fill="none">
          <animate
            attributeName="stroke-dasharray"
            :from="`0 ${c_pr/3}`"
            :to="`${c_pr/3} 0`"
            begin="0s"
            dur=".3s"
            fill="freeze" />
        </circle>
        <circle
          cx="50%"
          cy="50%"
          :r="c_r"
          :stroke-width="c_pm.sw"
          :stroke="c_pm.pc"
          :stroke-dasharray="c_pr"
          :stroke-dashoffset="c_dasharray"
          stroke-linecap="round"
          fill="none" />
      </svg>
      <div class="nui-loadpro-num">
        <span
          :style="{fontSize:`${c_pm.sz/3}px`,color:c_pm.pc}">{{ pro }}</span>
      </div>
      <div
        v-if="msg"
        class="nui-loadpro-msg">
        <ins>{{ msg }}</ins>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'InLoadProItem',
  props: {
    params: {
      type: Object,
      default(){
        return null;
      }
    },
    pro: {
      type: Number,
      default: 0
    },
    msg: {
      type: String,
      default: ''
    },
    open: Boolean,
  },
  computed: {
    c_pm(){
      return {
        sz: 120, // 尺寸
        sw: 3, // 边宽
        bc: '#292c37', // 轨道颜色
        pc: '#8152ff', // 进度颜色
        ...this.params
      };
    },
    // Radius 半径
    c_r(){
      return this.c_pm.sz / 2 - this.c_pm.sw / 2;
    },
    // 周长
    c_pr(){
      return 2 * Math.PI * this.c_r;
    },
    // 进度换算成线条长度
    c_dasharray(){
      let pro = this.pro || 0;
      if (pro > 100){
        pro = 100;
      } else if (pro < 0){
        pro = 0;
      }
      return this.c_pr - pro / 100 * this.c_pr;
    }
  }
};
</script>