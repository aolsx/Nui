<template>
  <in-confirm-item
    v-for="item in confirmArr"
    :key="item.id"
    :item="item" />
</template>
<script>
import {ConfirmArr} from '../../../handler/popup';
import InConfirmItem from './InConfirmItem.vue';
export default {
  name: 'InConfirm',
  components: {
    InConfirmItem,
  },
  data(){
    return {
      confirmArr: [],
    };
  },
  created(){
    ConfirmArr.v = this.confirmArr;
  },
  methods: {
    eveDel(id){
      const arr = this.confirmArr;
      const i = arr.findIndex((o)=>o.id == id);
      if (i === -1){
        return;
      }
      arr.splice(i,1);
    }
  }
};
</script>