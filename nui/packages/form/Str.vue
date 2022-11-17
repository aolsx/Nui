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
      autocomplete="off"
      class="nui-form-input"
      v-bind="rules"
      :disabled="dd"
      :placeholder="info"
      :readonly="rd"
      spellcheck="false"
      title=""
      :value="modelValue"
      @change="eveChange"
      @input="eveInput" />
    <input
      v-else
      ref="input"
      autocomplete="off"
      class="nui-form-input"
      v-bind="rules"
      :disabled="dd"
      :placeholder="info"
      :readonly="rd"
      spellcheck="false"
      title=""
      :type="type"
      :value="modelValue"
      @change="eveChange"
      @input="eveInput">
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
    br: Boolean,
    noipteve: Boolean,
  },
  emits: ['update:modelValue'],
  methods: {
    eveInput(e){
      if (!this.noipteve && this.notErr()){
        this.$emit('update:modelValue',e.target.value.trim());
      }
    },
    eveChange(e){
      if (this.notErr()){
        this.$emit('update:modelValue',e.target.value.trim());
      }
    }
  },
};
</script>