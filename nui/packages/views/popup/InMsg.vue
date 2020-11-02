<template>
  <transition-group
    name="msg"
    class="nui-app-ppp-msg"
    :duration="1000"
    tag="div"
    @after-enter="startTime">
    <in-msg-item
      v-for="item in msgArr"
      :key="item.id"
      :params="item.pm" />
  </transition-group>
</template>
<script>
import {MsgArr} from '../../../handler/popup';
import InMsgItem from './InMsgItem.vue';
export default {
  name: 'InMsg',
  components: {
    InMsgItem,
  },
  data(){
    return {
      msgArr: [],
    };
  },
  created(){
    MsgArr.v = this.msgArr;
  },
  methods: {
    startTime(e){
      e.__vueParentComponent.ctx.startTime();
    },
    eveDel(id){
      const i = this.msgArr.findIndex((o)=>o.id == id);
      if (i === -1){
        return;
      }
      this.msgArr.splice(i,1);
    }
  }
};
</script>