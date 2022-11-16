<template>
  <label
    class="nui-form-str"
    :class="{'nui-form-border':br}">
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
      :type="rg?'range':'number'"
      :value="modelValue"
      :disabled="dd"
      :readonly="rd"
      :placeholder="info"
      @input="eveChange"
      @change="eveChange">
    <i
      v-if="icon[1]"
      :class="icon[1]" />
    <in-range-track
      v-if="rg" 
      :class="showNum?'-show-thumb':''"/>
    <span
      v-else
      class="nui-form-input-bg" />
    <div class="nui-form-verify">{{ errorMsg }}</div>
  </label>
</template>
<script>
import mixins from './mixins';
import InRangeTrack from './in/InRangeTrack.vue';
export default {
  name: 'NuiFormNum',
  components: {
    InRangeTrack,
  },
  mixins: [mixins],
  props: {
    modelValue: {
      type: Number,
      required: true
    },
    color: {
      type: String,
      default: '',
    },
    showNum:Boolean,
    rg: Boolean,
    br: Boolean,
  },
  emits: ['update:modelValue'],
  methods: {
    eveChange(e){
      this.$emit('update:modelValue',e.target.valueAsNumber);
    }
  }
};
</script>