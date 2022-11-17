<template>
  <div
    class="nui-form-str nui-form-st"
    :class="{'nui-form-border':br,'--disabled':dd||rd,'--up':up,'--pop-right':right}"
    tabindex="-1">
    <input
      ref="input"
      autocomplete="off"
      v-bind="rules"
      :disabled="dd"
      :placeholder="info"
      :readonly="rd"
      spellcheck="false"
      title=""
      type="text"
      :value="modelValue.toString()">
    <i
      v-if="icon[0]"
      :class="icon[0]" />
    <div
      v-if="tag!==null"
      class="nui-form-input">
      <ins class="nui-flex-auto">{{ stLabel.t }}</ins>
      <span
        v-if="stLabel.m"
        class="nui-badge color-it">{{ stLabel.m }}</span>
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
            v-if="isObj"
            v-model="value[im.v]"
            :disabled="im.dd"
            :readonly="im.rd"
            type="checkbox"
            :value="im.v">
          <input
            v-else
            v-model="value"
            :disabled="im.dd"
            :readonly="im.rd"
            :type="type"
            :value="im.v">
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
      type: [String,Number,Array,Object],
      required: true
    },
    items: {
      type: [Array,Object],
      required: true
    },
    up: Boolean,
    tag: {
      type: Number,
      default: 3
    },
    right: Boolean,
    br: Boolean
  },
  emits: ['update:modelValue'],
  data(){
    const mv = this.modelValue;
    let type = 'radio';
    let isObj = false;
    if (mv instanceof Object){
      type = 'checkbox';
      isObj = !Array.isArray(mv);
    }
    return {
      type,
      isObj,
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
      const vv = this.value;
      const items = this.c_items;
      const label = {t: '',m: 0};

      if (this.type === 'radio'){
        for (const o of items){
          if (o.v === vv){
            label.t = o.label;
          }
        }
        return label;
      }

      let arr = [];
      if (this.isObj){
        for (const o of items){
          if (vv[o.v]){
            arr.push(o.label);
          }
        }
      } else {
        for (const o of items){
          if (vv.includes(o.v)){
            arr.push(o.label);
          }
        }
      }
      // 最大显示
      if (!this.tag){
        label.m = arr.length;
      } else {
        if (arr.length > this.tag){
          label.m = arr.length;
          arr = arr.splice(0,this.tag);
          label.t = `${arr.toString()},...`;
        } else {
          label.t = arr.toString();
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