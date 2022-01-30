<template>
  <div
    class="nui-form-rc"
    :class="{'--switch':sw||isBoolean,'--rd':rd}">
    <template v-if="isBoolean">
      <label
        v-for="(im,k) in items"
        :key="k"
        :class="im.c?`${im.c}`:'color-it'">
        <i
          v-if="im.icon"
          :class="im.icon" />
        <input
          v-model="value"
          :disabled="im.dd"
          :readonly="im.rd"
          :type="type">
        <span>{{ im.label || im.v }}</span>
      </label>
    </template>
    <template v-else>
      <label
        v-for="(im,k) in items"
        :key="k"
        :class="im.c?`${im.c}`:'color-it'">
        <i
          v-if="im.icon"
          :class="im.icon" />
        <input
          v-model="value"
          :value="im.v"
          :disabled="im.dd"
          :readonly="im.rd"
          :type="type">
        <span>{{ im.label || im.v }}</span>
      </label>
    </template>
  </div>
</template>
<script>
export default {
  name: 'NuiFormRc',
  props: {
    modelValue: {
      type: [String,Number,Array,Boolean],
      required: true
    },
    items: {
      type: [Array,Object],
      required: true
    },
    sw: Boolean,
    rd: Boolean,
  },
  emits: ['update:modelValue'],
  data(){
    let type,isBoolean;
    // 数组多选
    if (Array.isArray(this.modelValue)){
      type = 'checkbox';
    }
    // 单项 布尔值切换 开关样式
    else if (typeof this.modelValue === 'boolean'){
      type = 'checkbox';
      isBoolean = true;
    }
    // 字符串或者数字单选
    else {
      type = 'radio';
    }
    // const type = Array.isArray(this.modelValue) ? 'checkbox' : 'radio';
    return {type,isBoolean};
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