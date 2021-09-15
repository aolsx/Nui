<template>
  <div class="nui-app-home">
    <div class="nui-app-home-title">
      <slot name="title" />
    </div>
    <div class="nui-app-home-body">
      <slot />
    </div>
  </div>
</template>
<script>
export default {
  name: 'NuiViewHome'
};
</script>