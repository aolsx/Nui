<template>
  <in-confirm />
  <div
    id="ToPppMod"
    class="nui-app-ppp-mod" />
  <in-pop-debris />
  <div class="nui-app-ppp-load">
    <in-load-pro />
    <in-load-am />
  </div>
  <in-msg />
  <in-parabola />
  <div
    class="nui-app-root"
    tabindex="-1">
    <div class="nui-app-bg">
      <i :class="bgicon" />
    </div>
    <slot />
  </div>
</template>
<script>
import InConfirm from './popup/InConfirm.vue';
import InMsg from './popup/InMsg.vue';
import InParabola from './popup/InParabola.vue';
import InPopDebris from './popup/InPopDebris.vue';
import InLoadAm from './popup/InLoadAm.vue';
import InLoadPro from './popup/InLoadPro.vue';
export default {
  name: 'NuiViewRoot',
  components: {
    InConfirm,
    InMsg,
    InParabola,
    InPopDebris,
    InLoadAm,
    InLoadPro
  },
  props: {
    bgicon: {
      type: String,
      default: 'nicon-logo'
    },
  }
};
</script>