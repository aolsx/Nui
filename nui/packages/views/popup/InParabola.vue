<template>
  <div class="nui-app-ppp-paa">
    <in-parabola-item
      v-for="pa in paaArr"
      :key="pa.id"
      :item="pa" />
  </div>
</template>
<script>
import InParabolaItem from './InParabolaItem';
import {ParabolaArr} from '../../../handler/popup';
export default {
  name: 'InParabola',
  components: {
    InParabolaItem,
  },
  data(){
    return {
      paaArr: []
    };
  },
  created(){
    ParabolaArr.v = this.paaArr;
  },
  methods: {
    delItem(id){
      const delK = this.paaArr.findIndex((im)=>im.id == id);
      if (delK !== -1){
        this.paaArr.splice(delK,1);
      }
    }
  },
};
</script>