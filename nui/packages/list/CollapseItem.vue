<template>
  <div
    class="nui-collapse-item"
    :class="isActive && '--open'">
    <div
      class="nui-collapse-head"
      :class="left&&'--l'"
      @click.stop="isActive=!isActive">
      <div>
        <i
          v-if="icon"
          :class="icon" />
        <ins v-if="label">{{ label }}</ins>
        <slot name="head" />
      </div>
      <i :class="`nicon-chevron-${isActive?'down':left?'right':'left'}`" />
    </div>
    <div class="nui-collapse-body">
      <slot />
    </div>
  </div>
</template>
<script>
export default {
  name: 'NuiCpeItem',
  props: {
    icon: {
      type: String,
      default: null
    },
    label: {
      type: String,
      default: null
    },
    open: Boolean,
    left: Boolean,
  },
  data(){
    return {
      isActive: this.open
    };
  },
  // created(){
  //   this.isActive = ;
  // },
};
</script>