<template>
  <span
    class="nui-btn"
    :class="[cls,{'--ac':ac,'--dd':dd,'--b-none':bnone}]"
    @click.stop="$emit('click',$event)">
    <i
      v-if="icon"
      :class="icon" />
    <ins v-if="label">{{ label }}</ins>
    <slot />
  </span>
</template>
<script>
export default {
  name: 'NuiBtn',
  props: {
    ac: Boolean,
    dd: Boolean,
    bnone: Boolean,
    icon: {
      type: String,
      default: null
    },
    cls: {
      type: String,
      default: null
    },
    label: {
      type: String,
      default: null
    },
  },
  emits: ['click']
};
</script>