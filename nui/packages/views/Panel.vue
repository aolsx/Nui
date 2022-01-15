<template>
  <div
    class="nui-panel"
    :class="c_class"
    :style="attr&&`${attr}:${isSet[2]}px`">
    <nui-drag-line
      v-if="!!isSet && !be"
      v-model="isSet[2]"
      :min="isSet[0]"
      :max="isSet[1]"
      :cy="attr=='height'"
      re />
    <div
      v-if="$slots.head"
      class="nui-panel-head">
      <slot name="head" />
    </div>
    <div
      v-if="$slots.body"
      class="nui-panel-body">
      <slot name="body" />
    </div>
    <div
      v-if="$slots.foot"
      class="nui-panel-foot">
      <slot name="foot" />
    </div>
    <slot />
    <nui-drag-line
      v-if="!!isSet && be"
      v-model="isSet[2]"
      :min="isSet[0]"
      :max="isSet[1]"
      :cy="attr=='height'" />
  </div>
</template>
<script>
export default {
  name: 'NuiPanel',
  props: {
    wv: {
      type: Array,
      default: null
    },
    hv: {
      type: Array,
      default: null
    },
    be: Boolean
  },
  data(){
    let v = this.wv || this.hv;
    let attr = '';
    if (v){
      v = [...v];
      attr = this.wv ? 'width' : 'height';
    }
    return {
      attr,
      isSet: v
    };
  },
  computed: {
    c_class(){
      const attr = this.attr;
      if (!attr){
        return null;
      }
      let cls = '--adjust';
      if (attr == 'width'){
        cls += ' --adw';
      }
      return cls;
    }
  },
};
</script>
