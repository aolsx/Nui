<template>
  <div
    class="nui-code"
    :class="[`--${lang||codeObj.lang}`,{'--string-wrap':wrap}]">
    <slot />
    <div class="_block">
      <span class="_lang">{{ lang||codeObj.lang }}</span>
      <pre
        class="_pre tt-copy"
        @click.stop="$Nui.copy(code)"
        v-html="codeObj.html" />
    </div>
  </div>
</template>
<script>
import formatCode from './format';
export default {
  name: 'NuiCode',
  props: {
    lang: {
      type: String,
      default: ''
    },
    code: {
      type: String,
      default: ''
    },
    wrap: Boolean,
  },
  computed: {
    codeObj(){
      return formatCode(this.code,this.lang);
    }
  }
};
</script>
