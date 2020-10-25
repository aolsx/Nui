<template>
  <transition name="zoomfade">
    <div
      v-if="proItemArr.length"
      class="nui-popup-mask --am">
      <in-load-pro-item
        v-for="item in proItemArr"
        :key="item.id"
        :params="item.params"
        :open="item.open"
        :pro="item.pro"
        :msg="item.msg" />
    </div>
  </transition>
</template>
<script>
import {ProItemArr} from '../../../handler/load';
import InLoadProItem from './InLoadProItem.vue';
export default {
  name: 'InLoadPro',
  components: {
    InLoadProItem,
  },
  data(){
    return {
      proItemArr: []
    };
  },
  created(){
    ProItemArr.v = this.proItemArr;
  },
};
</script>