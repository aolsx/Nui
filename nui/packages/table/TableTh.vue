<template>
  <th
    v-if="field.dd === undefined || $parent.ddData[field.field]"
    :class="[field.cog&&'tt-c',field.thCls]">
    <ins>{{ field.label }}</ins>
    <div
      v-if="sortType"
      class="nui-table-sort"
      :class="sortType.state&&`--${sortType.state}`"
      @click="switchSort()">
      <i class="nicon-caret-up" />
      <i class="nicon-caret-down" />
    </div>
  </th>
</template>
<script>
export default {
  name: "InTableTh",
  props: {
    field: {
      type: Object,
      required: true
    },
  },
  data(){
    const sort = this.field.sort;
    let sortType;
    if (sort !== undefined){
      sortType = {sort,state: ''};
    }
    return {sortType};
  },
  methods: {
    switchSort(){
      const sortArr = this.$parent.sortField;
      const sortType = this.sortType;
      const {state,sort} = this.sortType;
      // 直接切换
      if (state == 'asc'){
        sortType.state = 'desc';
        return;
      }
      if (!state){
        sortType.state = 'asc';
        sortArr.push(sortType);
      } else {
        const k = sortArr.findIndex((f)=>f.sort === sort);
        if (k !== -1){
          sortArr.splice(k,1);
        }
        sortType.state = '';
      }
    }
  },
};
</script>