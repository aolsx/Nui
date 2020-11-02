<template>
  <div class="nui-app-root">
    <div class="nui-app-bg">
      <i :class="bgicon" />
    </div>
    <slot />
  </div>
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
</template>
<script>
import InConfirm from './popup/InConfirm.vue';
import InMsg from './popup/InMsg.vue';
import InPopDebris from './popup/InPopDebris';
import InLoadAm from './popup/InLoadAm.vue';
import InLoadPro from './popup/InLoadPro.vue';
export default {
  name: 'NuiViewRoot',
  components: {
    InConfirm,
    InMsg,
    InPopDebris,
    InLoadAm,
    InLoadPro
  },
  props: {
    bgicon: {
      type: String,
      default: 'nui-icon-ng-logo'
    },
  }
};
</script>