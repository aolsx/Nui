<template>
  <in-sidebar-side
    left
    :layout="layout.left" />
  <div
    v-if="layout.main.component"
    class="nui-lut-main">
    <component :is="layout.main.component" />
  </div>
  <in-sidebar-main
    v-else
    :layout="layout.main.panel" />
  <in-sidebar-side
    right
    :layout="layout.right" />
  <in-sidebar-float :layout="layout.float" />
</template>
<script>
import InSidebarFloat from './InSidebarFloat.vue';
import InSidebarSide from './InSidebarSide.vue';
import InSidebarMain from './InSidebarMain.vue';
export default {
  name: 'InSidebar',
  components: {
    InSidebarFloat,
    InSidebarSide,
    InSidebarMain
  },
  props: {
    layout: {
      type: Object,
      required: true
    }
  }
};
</script>