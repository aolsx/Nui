<template>
  <div class="nui-app-head">
    <div
      class="nui-app-drag"
      style="-webkit-app-region: drag;" />
    <div class="nui-app-logo">
      <i :class="logo.icon||'nicon-logo'" />
      <ins>{{ logo.label||'NGIDE' }}</ins>
    </div>
    <div
      v-if="$slots.default"
      class="nui-app-dynamic-tools">
      <slot />
    </div>
    <div class="nui-app-window-controls">
      <span
        v-if="reload"
        @click.stop="$emit('win','reload')">
        <i class="nicon-refresh" />
      </span>
      <span @click.stop="$emit('win','min')">
        <i class="nicon-chrome-minimize" />
      </span>
      <span @click.stop="$emit('win','reset')">
        <i class="nicon-chrome-restore" />
      </span>
      <span @click.stop="$emit('win','close')">
        <i class="nicon-chrome-close" />
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
          icon: 'nicon-logo',
          label: 'NGIDE'
        };
      }
    },
    reload: Boolean
  },
  emits: ['win'],
};
</script>