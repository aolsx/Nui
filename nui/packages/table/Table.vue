<template>
  <div class="nui-table">
    <div class="nui-table-head">
      <div
        v-if="label"
        class="nui-label">
        <i :class="label.icon" />
        <ins>{{ label.label }}</ins>
      </div>
      <slot name="head" />
      <div class="nui-table-head-tools">
        <nui-form-item
          v-if="fSearch.length"
          class="nui-table-search">
          <template #before>
            <nui-form-st
              v-model="shData.field"
              class="bg-none"
              :items="fSearch" />
          </template>
          <nui-form-str
            v-model="shData.v"
            class="bg-none"
            type="search" />
          <template #after>
            <nui-btn
              class="color-bl"
              icon="nicon-search"
              bnone
              :dd="!shData.v"
              @click="eveSearch(shData)" />
          </template>
        </nui-form-item>
        <nui-form-st
          v-if="fSwitch.length"
          v-model="swData"
          class="nui-table-column bg-none"
          right
          :items="fSwitch"
          :icon="['nicon-grip-horizontal']"
          :tag="null" />
      </div>
    </div>
    <div class="nui-table-field">
      <table>
        <in-table-col thead />
      </table>
    </div>
    <div class="nui-table-body">
      <table v-if="datas && datas.length">
        <in-table-col />
        <tbody>
          <tr
            v-for="(im,k) in datas"
            :key="k">
            <template
              v-for="({field,slot,cls,clsTd},kk) in fields"
              :key="kk">
              <template v-if="swData[field]!==false">
                <td
                  v-if="slot"
                  :class="[cls,clsTd]">
                  <slot
                    :name="field"
                    :value="im[field]"
                    :item="im" />
                </td>
                <td
                  v-else
                  :class="[cls,clsTd]">
                  <ins>{{ im[field] }}</ins>
                </td>
              </template>
            </template>
          </tr>
        </tbody>
      </table>
      <div
        v-else
        class="nui-table-body-empty">
        <span>{{ empty }}</span>
      </div>
    </div>
    <div class="nui-table-foot">
      <nui-paging
        v-if="paging"
        v-bind="paging"
        @pg="toPages" />
      <slot name="foot" />
    </div>
    <div
      v-if="load"
      class="nui-table-load" />
  </div>
</template>

<script>
import {toRaw} from 'vue';
import InTableCol from './Col.vue';
export default {
  name: 'NuiTable',
  components: {
    InTableCol
  },
  props: {
    label: {
      type: Object,
      default: null
    },
    fields: {
      type: Array,
      default(){
        return [];
      }
    },
    datas: {
      type: Array,
      default: null
    },
    empty: {
      type: String,
      default: 'Not Datas'
    },
    paging: {
      type: Object,
      default: null
    },
    // 加载动画
    load: Boolean
  },
  emits: ['sh','st','pg'],
  data(){
    return {
      fSwitch: [],
      swData: {},
      fSearch: [],
      shData: {field: '',v: ''},
      fSort: {},
      stData: []
    };
  },
  created(){
    // 通过 slots "NuiTableField 创配置
    // const slots = this.$slots.default();
    // const fields = this.fields;
    // // 字段开关
    // const fSwitch = this.fSwitch;
    // const swData = this.swData;
    // // 搜索
    // const fSearch = this.fSearch;
    // const shData = this.shData;
    // // 排序
    // const fSort = this.fSort;
    const {fields,fSwitch,swData,fSearch,shData,fSort} = this;
    // const stData = this.stData;
    for (const f of fields){
      const {label,field,dd,sh,st} = f;
      if (field !== undefined){
        // 可隐藏
        if (dd !== undefined){
          fSwitch.push({label,v: field});
          swData[field] = dd === '' ? true : dd;
        } else {
          swData[field] = true;
        }
        // 可搜索
        if (sh){
          fSearch.push({label,v: field});
        }
        // 可排序
        if (st !== undefined){
          fSort[field] = {field: st || field,state: ''};
        }
      }
    }
    if (fSearch.length){
      shData.field = fSearch[0].v;
    }
  },
  methods: {
    eveSearch({field,v}){
      if (field && v){
        this.$emit('sh',{field,v});
      }
    },
    eveSort(fd){
      const sortArr = this.stData;
      const sortType = this.fSort[fd];
      const {field,state} = sortType;
      // 直接切换
      if (state == 'asc'){
        sortType.state = 'desc';
      } else {
        if (!state){
          sortType.state = 'asc';
          sortArr.push(sortType);
        } else {
          const k = sortArr.findIndex((f)=>f.field === field);
          if (k !== -1){
            sortArr.splice(k,1);
          }
          sortType.state = '';
        }
      }
      this.$emit('st',toRaw(sortArr));
    },
    toPages(obj){
      this.$emit('pg',obj);
    }
  }
};
</script>