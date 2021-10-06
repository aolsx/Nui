<template>
  <div class="nui-table">
    <div
      v-if="ddField.length ||shField.length|| $slots.head"
      class="nui-table-head">
      <slot name="head" />
      <nui-form-item
        v-if="shField.length"
        class="nui-table-search">
        <template #before>
          <nui-form-st
            v-model="shData.field"
            class="bg-none"
            :items="shField" />
        </template>
        <nui-form-str
          v-model="shData.v" />
        <template #after>
          <nui-btn
            icon="nicon-search"
            @click="eveSearch()" />
        </template>
      </nui-form-item>
      <nui-form-st
        v-if="ddField.length"
        v-model="ddData"
        class="nui-table-column bg-none"
        right
        :items="ddField"
        :icon="['nicon-grip-horizontal']"
        :tag="null" />
    </div>
    <div class="nui-table-field">
      <table>
        <in-table-col />
        <thead>
          <tr>
            <in-table-th
              v-for="(field,k) in fields"
              :key="k"
              :field="field" />
          </tr>
        </thead>
      </table>
    </div>
    <div
      v-if="datas && datas.length"
      class="nui-table-body">
      <table>
        <in-table-col />
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
    <div
      v-else
      class="nui-table-body-empty">
      <ins>暂无数据</ins>
    </div>
    <div class="nui-table-foot">
      <slot />
    </div>
    <div
      v-if="load"
      class="nui-table-load" />
  </div>
</template>

<script>
import {toRaw} from 'vue';
import InTableCol from './TableCol.vue';
import InTableTh from './TableTh.vue';
import InTableTd from './TableTd.vue';
export default {
  name: 'NuiTable',
  components: {
    InTableCol,
    InTableTh,
    InTableTd
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
    },
    load: Boolean
  },
  emits: ['sort','cog','search'],
  data(){
    return {
      // 开关字段
      ddField: [],
      ddData: {},
      // 搜索
      shField: [],
      shData: {field: '',v: ''},
      // 排序
      sortField: []
    };
  },
  watch: {
    sortField: {
      deep: true,
      handler(v){
        this.$emit('sort',toRaw(v));
      }
    }
  },
  created(){
    const fields = this.fields;
    for (const f of fields){
      const {label,field,dd,sh} = f;
      // 开启 字段筛选
      if (dd !== undefined){
        this.ddField.push({label,v: field});
        this.ddData[field] = dd;
      }
      if (sh){
        this.shField.push({label,v: field});
      }
    }
  },
  // computed: {},
  methods: {
    eveSearch(){
      const {field,v} = this.shData;
      if (field && v !== ''){
        this.$emit('search',{field,v});
      }
    }
  },
};
</script>