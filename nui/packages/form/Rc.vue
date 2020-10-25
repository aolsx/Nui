<template>
  <div
    class="nui-form-rc"
    :class="sw&&'--switch'">
    <label
      v-for="(im,k) in items"
      :key="k">
      <input
        v-model="value"
        :value="im.v"
        :disabled="im.dd"
        :readonly="im.rd"
        :type="type">
      <span>{{ im.label || im.v }}</span>
    </label>
  </div>
</template>
<script>
export default {
  name: 'NuiFormRc',
  props: {
    modelValue: {
      type: [String,Number,Array],
      required: true
    },
    items: {
      type: Array,
      required: true
    },
    sw: Boolean
  },
  emits: ['update:modelValue'],
  data(){
    const type = Array.isArray(this.modelValue) ? 'checkbox' : 'radio';
    return {type};
  },
  computed: {
    value: {
      get(){
        return this.modelValue;
      },
      set(value){
        this.$emit('update:modelValue',value);
      }
    }
  }
};
</script>