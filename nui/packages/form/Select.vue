<template>
  <div
    class="nui-form-str nui-form-st"
    :class="[(dd||rd)&&'--disabled',up&&'--up']"
    tabindex="-1">
    <input
      ref="input"
      type="text"
      title=""
      autocomplete="off"
      spellcheck="false"
      v-bind="rules"
      :value="modelValue.toString()"
      :disabled="dd"
      :readonly="rd"
      :placeholder="info">
    <i
      v-if="icon[0]"
      :class="icon[0]" />
    <div class="nui-form-input">
      <ins>{{ stLabel }}</ins>
    </div>
    <i :class="up?'nicon-angle-up':'nicon-angle-down'" />
    <span class="nui-form-input-bg" />
    <div class="nui-form-verify">
      {{ errorMsg }}
    </div>
    <div class="nui-form-st-popup">
      <div class="nui-form-st-list">
        <label
          v-for="(im,k) in c_items"
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
    },
    up: Boolean
  },
  emits: ['update:modelValue'],
  data(){
    const type = Array.isArray(this.modelValue) ? 'checkbox' : 'radio';
    return {
      type,
      errorMsg: ''
    };
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
    },
    // 选中的对象
    stLabel(){
      const vv = this.modelValue;
      const items = this.c_items;
      let label = '';
      if (vv){
        if (this.type === 'radio'){
          for (const o of items){
            if (o.v === vv){
              label = o.label;
            }
          }
        } else {
          const arr = [];
          for (const o of items){
            if (vv.includes(o.v)){
              arr.push(o.label);
            }
          }
          label = arr.toString();
        }
      }
      return label;
    },
    c_items(){
      const items = this.items;
      if (items[0] instanceof Object){
        return items;
      }
      const arr = [];
      for (const v of items){
        arr.push({label: v,v});
      }
      return arr;
    }
  }
};
</script>