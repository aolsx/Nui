<template>
  <div class="nui-container --p">
    <div class="nui-row">
      <div class="nui-col-7">
        <div class="p-b-15">
          <span class="h3">数据表格</span>
          排序 <code
            class="-link"
            @click.stop="sortTt = ''">@st {{ sortTt }}</code>
          搜索 <code
            class="-link"
            @click.stop="searchTt = ''">@sh {{ searchTt }}</code>
          分页 <code
            class="-link"
            @click.stop="pageTt = ''">@pg {{ pageTt }}</code>
        </div>
        <nui-table
          class="r-5"
          style="height:240px"
          empty="暂无数据"
          :label="{icon:'nicon-home',label:'数据表'}"
          :fields="fields"
          :datas="listData"
          :paging="{
            total:131,
            pgSzOpt:[10,30,100]
          }"
          @sh="searchBtn"
          @st="sortBtn"
          @pg="toPage">
          <template #id="{value}">
            <b>[{{ value }}]</b>
          </template>
          <template #cog>
            <nui-btn icon="nicon-cog" />
          </template>
        </nui-table>
        <div class="nui-row">
          <div class="nui-col-6">
            <nui-code
              lang="html"
              :code="tableData.html" />
          </div>
          <div class="nui-col-6">
            <nui-code
              :code="tableData.fields" />
          </div>
        </div>
      </div>
      <div class="nui-col-5">
        <div class="p-b-15">
          <span class="h3">分页组件</span>
          @pg <code
            class="-link"
            @click.stop="tobb = ''">{{ tobb }}</code>
        </div>
        <nui-paging
          class="color-og"
          :total="131"
          :pg-sz-opt="[10,30,100]"
          @pg="toBtn" />
        <div class="p-5" />
        <nui-code
          lang="html"
          :code="tableData.paging" />
        <div class="p-5" />
        <nui-code
          :code="tableData.js" />
      </div>
    </div>
  </div>
</template>

<script>
import tableData from './datas/table';
export default {
  name: 'DemoTable',
  setup(){
    return {tableData};
  },
  data(){
    return {
      fields: [
        {
          label: '编号',
          field: 'id', // 字段
          col: 60, // 宽度 必须有一项不定义
          st: 'id', // 可排序
          sh: true, // 可搜索
          dd: true, // 可隐藏
          slot: 'id',// 自定义插槽
          cls: 'tt-c', // 附加样式
          clsTd: 'color-bl',
          clsTh: 'color-og',
        },
        {
          label: '表单项A',
          field: 'a',
          st: 'a',
          dd: true,
        },
        {
          label: '表单项B',
          field: 'b',
          st: 'b',
          sh: true,
          dd: false,
        },
        {
          label: '表单项C',
          field: 'c',
          col: '20%',
          sh: true
        },
        {
          label: '设置',
          field: 'cog',
          col: '60px',
          cls: 'tt-c',
          slot: 'cog'
        }
      ],

      searchTt: '',
      sortTt: '',
      pageTt: '',

      tobb: '',

      listData: [
        {id: 1,a: '文字类型',b: 1,c: 'aaa'},
        {id: 2,a: '文字类型文字类型文字类型',b: 0,c: 'bbb'},
        {id: 3,a: '文字类型文字类',b: 0,c: 'ccc'},
        {id: 4,a: '文字类型文字类型文字',b: 1,c: 'ddd'},
        {id: 5,a: '文型文字',b: 1,c: 'eee'},
        {id: 6,a: '文字文字文字文字',b: 1,c: 'fff'},
      ],

    };
  },
  methods: {
    searchBtn(e){
      this.searchTt = e;
      this.pageTt = '';
      this.sortTt = '';
    },
    sortBtn(e){
      this.pageTt = '';
      this.searchTt = '';
      if (e.length){
        this.sortTt = e;
      } else {
        this.sortTt = '';
      }
    },
    toPage(e){
      this.sortTt = '';
      this.searchTt = '';
      this.pageTt = e;
    },
    toBtn(e){
      this.tobb = e;
    }
  },
};
</script>