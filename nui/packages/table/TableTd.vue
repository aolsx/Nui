<template>
  <td :class="[field.tdCls,field.cog&&'tt-c p-none']">
    <template v-if="field.cog">
      <nui-btn
        v-for="(btn,k) in field.cog"
        :key="k"
        v-bind="btn"
        bnone
        @click="$parent.$emit('cog',{k,data:item})" />
    </template>
    <span
      v-else
      :class="c_value.c">
      <i
        v-if="c_value.i"
        :class="c_value.i" />
      <ins v-if="c_value.v !== undefined"> {{ c_value.v }}</ins>
    </span>
  </td>
</template>

<script>
// {field,cog,rep}
export default {
  name: 'InTableTd',
  props: {
    item: {
      type: Object,
      required: true
    },
    field: {
      type: Object,
      required: true
    },
  },
  computed: {
    c_value(){
      let val = this.item[this.field.field];
      if (this.field.rep){
        for (const {v,t,i,c} of this.field.rep){
          if (v === val){
            if (!t && !i){
              return {v: val,c};
            }
            return {v: t,i,c};
          }
        }
      }
      return {v: val};
    }
  },
};
</script>
