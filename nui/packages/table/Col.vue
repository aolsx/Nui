<template>
  <colgroup>
    <template
      v-for="({col,field},k) in $parent.fields"
      :key="k">
      <col
        v-if="$parent.swData[field]"
        :width="col">
    </template>
  </colgroup>
  <thead v-if="thead">
    <tr>
      <template
        v-for="({field,label,clsTh,cls},k) in $parent.fields"
        :key="k">
        <th
          v-if="$parent.swData[field]!==false"
          :class="[cls,clsTh]">
          <div
            v-if="$parent.fSort[field]"
            class="nui-table-sort"
            :class="`--${$parent.fSort[field].state}`"
            @click="$parent.eveSort(field)">
            <i class="nicon-caret-up" />
            <i class="nicon-caret-down" />
          </div>
          <ins>{{ label }}</ins>
        </th>
      </template>
    </tr>
  </thead>
</template>

<script>
export default {
  name: "InTableCol",
  props: {
    thead: {
      type: Boolean,
      default: false
    }
  },
};
</script>