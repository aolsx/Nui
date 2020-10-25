<template>
  <component :is="listTo.component" />
</template>
<script>
import {listTo} from './layout';
export default {
  name: 'VewsDemo',
  setup(){
    return {
      listTo
    };
  }
};
</script>