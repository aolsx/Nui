<template>
  <span class="nui-drag-line" />
</template>
<script>
export default {
  name: 'NuiDragLine',
  props: {
    modelValue: {
      type: Number,
      default: 0
    },
    min: {
      type: Number,
      default: 20
    },
    max: {
      type: Number,
      default: 1000
    },
    cy: Boolean,
    re: Boolean
  },
  emits: ['update:modelValue'],
  mounted(){
    if (this.cy){
      this.$el.onmousedown = this.setYvalue;
    } else {
      this.$el.onmousedown = this.setXvalue;
    }
  },
  methods: {
    setXvalue(e){
      const v = this.modelValue;
      const oldv = e.clientX;
      let newv = 0;
      const re = this.re ? 1 : -1;
      const setFn = (x)=>{
        newv = re * (oldv - x) + v;
        if (newv <= this.min){
          newv = this.min;
        } else if (newv >= this.max){
          newv = this.max;
        }
        this.$emit('update:modelValue',newv);
      };
      this.$Nui.dragSize(setFn,'col-resize');
    },
    setYvalue(e){
      const v = this.modelValue;
      const oldv = e.clientY;
      let newv = 0;
      const re = this.re ? 1 : -1;
      const setFn = (x,y)=>{
        newv = re * (oldv - y) + v;
        if (newv <= this.min){
          newv = this.min;
        } else if (newv >= this.max){
          newv = this.max;
        }
        this.$emit('update:modelValue',newv);
      };
      this.$Nui.dragSize(setFn,'row-resize');
    }
  }
};
</script>