<template>
  <in-sidebar-side
    left
    :layout="layout.left" />
  <div class="nui-lut-main">
    <component :is="layout.main.component" />
  </div>
  <in-sidebar-side
    right
    :layout="layout.right" />
  <in-sidebar-float :layout="layout.float" />
</template>
<script>
import InSidebarFloat from './InSidebarFloat.vue';
import InSidebarSide from './InSidebarSide.vue';
export default {
  name: 'InSidebar',
  components: {
    InSidebarFloat,
    InSidebarSide,
  },
  props: {
    layout: {
      type: Object,
      required: true
    }
  }
};
</script>