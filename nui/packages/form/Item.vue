<template>
  <div
    class="nui-form-item"
    :class="{'nui-form-border':br}">
    <div
      v-if="$slots.before"
      class="nui-form-item-before">
      <slot name="before" />
    </div>
    <div class="nui-form-item-content">
      <slot />
    </div>
    <div
      v-if="$slots.after"
      class="nui-form-item-after">
      <slot name="after" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'NuiFormItem',
  props: {
    br: Boolean
  },
};
</script>