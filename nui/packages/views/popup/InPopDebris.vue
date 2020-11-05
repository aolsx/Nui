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
      document.onwheel = function(){
        document.onwheel = null;
        document.activeElement?.blur();
      };
    },
    bindDestroy(){
      document.onwheel = null;
    }
  },
};
</script>