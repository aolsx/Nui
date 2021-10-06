<template>
  <colgroup>
    <template
      v-for="({col,dd,field},k) in $parent.fields"
      :key="k">
      <col
        v-if="dd === undefined || $parent.ddData[field]"
        :width="col">
    </template>
  </colgroup>
</template>

<script>
export default {
  name: 'InTableCol'
};
</script>