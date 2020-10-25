<template>
  <label class="nui-form-str">
    <i
      v-if="icon[0]"
      :class="icon[0]" />
    <input
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
    }
  },
  emits: ['update:modelValue'],
  methods: {
    eveChange(e){
      this.$emit('update:modelValue',e.target.value.trim());
    }
    // eveInvalid(e){
    // e.preventDefault();
    // e.stopPropagation();
    // this.$refs.input.focus();
    // this.$refs.input.checkValidity();
    // validity willValidate .validationMessage
    // e.target.checkValidity();
    // this.$refs.input.oninvalid = function(){
    //   this.setCustomValidity("请输入合法的1-18位....");
    // };
    // e.target.setCustomValidity('123');
    // console.log('eveInvalid');
    // },
  },
};
</script>