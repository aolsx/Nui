<template>
  <div
    class="nui-form-str nui-form-st"
    :class="(dd||rd)&&'--disabled'"
    tabindex="-1">
    <i
      v-if="icon[0]"
      :class="icon[0]" />
    <input
      ref="input"
      class="nui-form-input"
      type="text"
      title=""
      autocomplete="off"
      spellcheck="false"
      v-bind="rules"
      :value="modelValue.toString()"
      :disabled="dd"
      :readonly="rd"
      :placeholder="info">
    <i class="nicon-angle-down" />
    <span class="nui-form-input-bg" />
    <div class="nui-form-verify">
      {{ errorMsg }}
    </div>
    <div class="nui-form-st-popup">
      <div class="nui-form-st-list">
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
    </div>
  </div>
</template>
<script>
import mixins from './mixins';
export default {
  name: 'NuiFormSt',
  mixins: [mixins],
  props: {
    modelValue: {
      type: [String,Number,Array],
      required: true
    },
    items: {
      type: Array,
      required: true
    }
  },
  emits: ['update:modelValue'],
  data(){
    const type = Array.isArray(this.modelValue) ? 'checkbox' : 'radio';
    return {type,errorMsg: ''};
  },
  computed: {
    value: {
      get(){
        return this.modelValue;
      },
      set(value){
        this.$emit('update:modelValue',value);
        if (this.type === 'radio'){
          this.$el.focus();
          this.$el.blur();
        }
      }
    }
  }
};
</script>