<template>
  <div class="nui-table">
    <div class="nui-table-head">
      <table>
        <colgroup>
          <col
            v-for="({col},k) in fields"
            :key="k"
            :width="col">
        </colgroup>
        <thead>
          <tr>
            <th
              v-for="({label,cog,sort,thCls},k) in fields"
              :key="k"
              :class="[cog&&'tt-c',thCls]">
              <ins>{{ label }}</ins>
              <div
                v-if="sort!==undefined"
                class="nui-table-sort"
                :class="'--'+sortK[sort]"
                @click="sortBtn(sort)">
                <i class="nicon-caret-up" />
                <i class="nicon-caret-down" />
              </div>
            </th>
          </tr>
        </thead>
      </table>
    </div>
    <div class="nui-table-body">
      <table>
        <colgroup>
          <col
            v-for="({col},k) in fields"
            :key="k"
            :width="col">
        </colgroup>
        <tbody>
          <tr
            v-for="(im,k) in datas"
            :key="k">
            <in-table-td
              v-for="(field,kk) in fields"
              :key="kk"
              :item="im"
              :field="field" />
          </tr>
        </tbody>
      </table>
    </div>
    <div class="nui-table-foot">
      <slot />
    </div>
  </div>
</template>

<script>
import InTableTd from './TableTd.vue';
export default {
  name: 'NuiTable',
  components: {
    InTableTd,
  },
  props: {
    // 字段设置
    fields: {
      type: Array,
      required: true
    },
    datas: {
      type: Array,
      required: true
    }
  },
  emits: ['sort','cog'],
  data(){
    return {
      sortK: {}
    };
  },
  methods: {
    sortBtn(k){
      // asc desc
      let s = this.sortK[k];
      if (!s){
        s = 'asc';
      } else if (s == 'asc'){
        s = 'desc';
      } else {
        s = '';
      }
      this.sortK[k] = s;
      this.$emit('sort',{sort: k,state: s});
    }
  },
  // computed: {
  //   c_class(){
  //     let cls = '';
  //     if (this.sp){
  //       cls += '--b-none';
  //     }
  //     return cls;
  //   }
  // },
};
</script>