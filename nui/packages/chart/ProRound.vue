<template>
  <div class="nui-pro-round">
    <svg
      :width="sz"
      :height="sz">
      <defs v-if="color">
        <linearGradient
          id="ProRoundColor"
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%">
          <stop
            offset="0%"
            :stop-color="color[0]" />
          <stop
            offset="100%"
            :stop-color="color[1]" />
        </linearGradient>
      </defs>
      <circle
        class="nui-pro-round-in-circle"
        cx="50%"
        cy="50%"
        :r="c_r"
        :stroke-width="sw"
        fill="none" />
      <circle
        class="nui-pro-round-pro-circle"
        cx="50%"
        cy="50%"
        :style="color&&'stroke:url(#ProRoundColor)'"
        :r="c_r"
        :stroke-width="sw"
        :stroke-dasharray="c_pr"
        :stroke-dashoffset="c_dasharray"
        fill="none" />
    </svg>
    <div
      v-if="$slots.default"
      class="nui-pro-round-tt">
      <slot />
    </div>
    <div
      v-else
      class="nui-pro-round-tt --in-num">
      <div :style="{fontSize:`${sz/4}px`}">
        {{ pro }}
      </div>
      <span v-if="label">
        {{ label }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NuiProRound',
  props: {
    pro: {
      type: Number,
      default: 0
    },
    label: {
      type: String,
      default: ''
    },
    color: {
      type: Array,
      default: null
    },
    sz: {
      type: Number,
      default: 120
    },
    sw: {
      type: Number,
      default: 3
    }
  },
  computed: {
    // Radius 半径
    c_r(){
      return this.sz / 2 - this.sw / 2;
    },
    // 周长
    c_pr(){
      return 2 * Math.PI * this.c_r;
    },
    // 进度换算成线条长度
    c_dasharray(){
      let pro = this.pro || 0;
      if (pro >= 100){
        pro = 100;
      } else if (pro <= 0){
        pro = 0;
      }
      return this.c_pr - pro / 100 * this.c_pr;
    }
  }
};
</script>
