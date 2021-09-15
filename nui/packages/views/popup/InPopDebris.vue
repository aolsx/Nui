<template>
  <div
    id="ToPppDbs"
    class="nui-app-ppp-debris"
    @_bindRolling="bindRolling"
    @_bindDestroy="bindDestroy">
    <in-menu />
  </div>
</template>
<script>
import InMenu from './InMenu.vue';
export default {
  name: 'InPopDebris',
  components: {
    InMenu,
  },
  methods: {
    bindRolling(){
      // 滚动时 焦点元素取消焦点 一次性
      document.onwheel = function(){
        document.activeElement?.blur();
        document.onwheel = null;
      };
    },
    bindDestroy(){
      document.onwheel = null;
    }
  },
};
</script>