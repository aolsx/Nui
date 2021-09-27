<template>
  <div
    class="nui-pro-box"
    :style="cols">
    <div>
      <div
        class="nui-pro-box-in"
        :class="cls"
        :style="`--pro-num:${proNum}`">
        <div
          v-if="$slots.default"
          class="nui-pro-box-tt">
          <slot />
        </div>
        <div
          v-else
          class="nui-pro-box-tt --in-num">
          <span v-if="label"> {{ label }}</span>
          <span v-else>
            {{ proNum }}%
          </span>
        </div>
        <div class="nui-pro-box-fc --a">
          <div />
        </div>
        <div class="nui-pro-box-fc --b">
          <div />
        </div>
        <div class="nui-pro-box-fc --c">
          <div />
        </div>
        <div class="nui-pro-box-fc --d">
          <div />
        </div>
        <div class="nui-pro-box-fc --e">
          <div />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NuiProBox',
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
    pce: {
      type: Number,
      default: 0
    },
    sz: {
      type: Number,
      default: 0
    },
    bg: {
      type: String,
      default: ''
    }
  },
  computed: {
    cols(){
      let s = '';
      if (this.pce){
        s += `--pce-num:${this.pce}em;`;
      }
      if (this.sz){
        s += `--fz-num:${this.sz}px;`;
      }
      if (this.color){
        s += `--start-color:${this.color[0]};`;
        s += `--end-color:${this.color[1]};`;
      }
      return s;
    },
    cls(){
      let c = this.color ? '--grad' : '--sin';
      if (this.bg){
        c += ` --bg-${this.bg}`;
      }
      if (!this.proNum){
        c += ' --emp';
      }
      return c;
    },
    proNum(){
      if (this.pro <= 0){
        return 0;
      }
      if (this.pro >= 100){
        return 100;
      }
      return this.pro;
    }
  },
};
</script>
