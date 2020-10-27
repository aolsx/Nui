<template>
  <div class="nui-app-head">
    <div
      class="nui-app-drag"
      style="-webkit-app-region: drag;" />
    <div class="nui-app-logo">
      <i :class="logo.icon" />
      <ins>{{ logo.label }}</ins>
    </div>
    <div
      v-if="$slots.default"
      class="nui-app-dynamic-tools">
      <slot />
    </div>
    <div class="nui-app-window-controls">
      <span @click.stop="$emit('win','min')">
        <i class="nui-icon-chrome-minimize" />
      </span>
      <span @click.stop="$emit('win','reset')">
        <i class="nui-icon-chrome-restore" />
      </span>
      <span @click.stop="$emit('win','close')">
        <i class="nui-icon-chrome-close" />
      </span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'NuiViewHead',
  props: {
    logo: {
      type: Object,
      default(){
        return {
          icon: 'nui-icon-ng-logo',
          label: 'NG IDE'
        };
      }
    },
  },
  emits: ['win'],
};
</script>