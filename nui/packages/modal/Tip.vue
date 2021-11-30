<template>
  <div
    class="nui-tip-block"
    tabindex="-1">
    <slot name="in" />
    <div
      class="nui-tip"
      :class="[{'--l':lt,'--r':rt,'--t':tp,'--ws':w},$attrs.class]"
      :style="{width:w+'px',height:h+'px'}">
      <div class="nui-tip-body">
        <slot :close="close" />
        <slot
          :close="close"
          name="pop" />
      </div>
      <span class="nui-tip-arrow" />
    </div>
  </div>
</template>
<script>
// @focusin @mousedown
export default {
  name: 'NuiTip',
  inheritAttrs: false,
  props: {
    lt: Boolean,
    rt: Boolean,
    tp: Boolean,
    w: {
      type: Number,
      default: null
    },
    h: {
      type: Number,
      default: null
    }
  },
  methods: {
    close(){
      document.activeElement?.blur();
      // document.body.blur();
      // this.$refs.tip.blur();
    },
  }
};
</script>