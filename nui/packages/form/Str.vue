<template>
  <label
    class="nui-form-str"
    :class="{'nui-form-border':br,'--textarea':type === 'textarea'}">
    <i
      v-if="icon[0]"
      :class="icon[0]" />
    <textarea
      v-if="type == 'textarea'"
      ref="input"
      class="nui-form-input"
      title=""
      autocomplete="off"
      spellcheck="false"
      v-bind="rules"
      :value="modelValue"
      :disabled="dd"
      :readonly="rd"
      :placeholder="info"
      @input="eveChange"
      @change="eveChange" />
    <input
      v-else
      ref="input"
      class="nui-form-input"
      title=""
      autocomplete="off"
      spellcheck="false"
      v-bind="rules"
      :type="type"
      :value="modelValue"
      :disabled="dd"
      :readonly="rd"
      :placeholder="info"
      @input="eveChange"
      @change="eveChange">
    <i
      v-if="icon[1]"
      :class="icon[1]" />
    <div class="nui-form-input-bg" />
    <div class="nui-form-verify">{{ errorMsg }}</div>
  </label>
</template>
<script>
import mixins from './mixins';
export default {
  name: 'NuiFormStr',
  mixins: [mixins],
  props: {
    modelValue: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'text',
    },
    br: Boolean
  },
  emits: ['update:modelValue'],
  methods: {
    eveChange(e){
      this.$emit('update:modelValue',e.target.value.trim());
    }
  },
};
</script>