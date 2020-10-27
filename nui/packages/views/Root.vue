<template>
  <div class="nui-app-root">
    <div class="nui-app-bg">
      <i :class="bgicon" />
    </div>
    <slot />
  </div>
  <div
    id="ToPopup"
    class="nui-app-popup-root" />
  <in-confirm />
  <in-menu />
  <in-load-pro />
  <in-load-am />
  <in-msg />
</template>
<script>
import InConfirm from './popup/InConfirm.vue';
import InMsg from './popup/InMsg.vue';
import InMenu from './popup/InMenu.vue';
import InLoadAm from './popup/InLoadAm.vue';
import InLoadPro from './popup/InLoadPro.vue';
export default {
  name: 'NuiViewRoot',
  components: {
    InConfirm,
    InMsg,
    InMenu,
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