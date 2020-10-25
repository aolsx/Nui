<template>
  <nui-list
    :list="listArr"
    @click="listTo.component = $event" />
</template>
<script>
import {listArr,listTo} from './layout';
export default {
  name: 'VewsList',
  setup(){
    return {
      listArr,
      listTo,
    };
  },
};
</script>