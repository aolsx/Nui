<template>
  <div class="nui-lut-main --v">
    <div
      v-if="layout.head"
      class="nui-lut-main-head">
      <component :is="layout.head" />
    </div>
    <div class="nui-lut-main-body">
      <component :is="layout.body" />
    </div>
    <div
      v-if="layout.foot"
      class="nui-lut-main-foot">
      <component :is="layout.foot" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'InSidebarMain',
  props: {
    layout: {
      type: Object,
      default(){
        return {};
      }
    }
  }
};
</script>