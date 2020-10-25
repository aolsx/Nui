<template>
  <div
    class="nui-poptip-block"
    tabindex="-1">
    <slot name="in" />
    <div
      class="nui-poptip"
      :class="{'--l':lt,'--r':rt,'--t':tp}"
      :style="{width:w+'px',height:h+'px'}">
      <slot />
    </div>
    <span class="nui-poptip-arrow" />
  </div>
</template>
<script>
// @focusin @mousedown
export default {
  name: 'NuiTip',
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
};
</script>