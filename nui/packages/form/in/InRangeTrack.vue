<template>
  <div
    class="nui-form-range-track"
    :class="$parent.color">
    <div
      class="nui-form-range-pro"
      :style="{width:`${width}%`}">
      <div
        class="nui-form-range-thumb"
        :class="errType && 'nui-form-range-err-'+errType">
        <span>{{ errType==1?'NaN':$parent.modelValue }}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'InRangeTrack',
  data(){
    const {max = 100,min = 0} = this.$parent.rules || {};
    return {
      width: 0,
      max,
      min,
      errType: 0,
    };
  },
  watch: {
    '$parent.modelValue'(v){
      this.validityNum(v);
    }
  },
  mounted(){
    this.validityNum(this.$parent.modelValue);
  },
  methods: {
    validityNum(v){
      if (!Number.isFinite(v)){
        this.errType = 1;
        this.width = 0;
        this.$parent.$refs.input.setCustomValidity('Value is not Number!');
        return;
      }
      if (v > this.max){
        this.width = 100;
        this.errType = 2;
        this.$parent.$refs.input.setCustomValidity(`Limit MaxNum: ${this.max}`);
      } else if (v < this.min){
        this.width = 0;
        this.errType = 2;
        this.$parent.$refs.input.setCustomValidity(`Limit MinNum: ${this.min}`);
      } else {
        this.width = (v - this.min) / (this.max - this.min) * 100;
        this.errType = 0;
      }
    }
  },
};
</script>