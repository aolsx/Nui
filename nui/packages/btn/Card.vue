<template>
  <div class="nui-card">
    <div
      v-if="$slots.head"
      class="nui-card-head">
      <slot name="head" />
    </div>
    <div class="nui-card-body">
      <i
        v-if="icon"
        ref="icon"
        :class="`nui-card-iconbg ${icon}`" />
      <div
        v-if="title"
        class="nui-card-title">
        {{ title }}
      </div>
      <div
        v-if="sub"
        class="nui-card-subtitle">
        {{ sub }}
      </div>
      <slot />
    </div>
    <div
      v-if="$slots.foot"
      class="nui-card-foot">
      <slot name="foot" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'NuiCard',
  props: {
    title: {
      type: [Number,String],
      default: null
    },
    sub: {
      type: [Number,String],
      default: null
    },
    icon: {
      type: String,
      default: null
    }
  },
  mounted(){
    if (this.icon){
      const h = this.$refs.icon.offsetHeight * .8;
      this.$refs.icon.style.fontSize = `${h}px`;
    }
  },
};
</script>