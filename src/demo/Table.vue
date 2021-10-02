<template>
  <div class="nui-container --p">
    <h3>数据表格 <code>组件</code> <code>{{ cogTt }}</code> <code>{{ sortTt }}</code></h3>
    <div class="nui-row">
      <div class="nui-col-8">
        <nui-table
          style="height:160px"
          :fields="fields"
          :datas="listData"
          @sort="sortBtn"
          @cog="cogBtn">
          自定义内容 放置分页组件
        </nui-table>
        <div class="p-5" />
        <nui-table
          :fields="fields_a"
          :datas="listData_a"
          @sort="sortBtn"
          @cog="cogBtn">
          自定义内容 放置分页组件
        </nui-table>
        <div class="p-5" />
        <div class="nui-row">
          <div class="nui-col-6">
            <nui-code
              lang="html"
              :code="tableData.html" />
          </div>
          <div class="nui-col-6">
            <nui-code
              :code="tableData.js" />
          </div>
        </div>
      </div>
      <div class="nui-col-4">
        <nui-code :code="tableData.fields" />
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
      // typeList: [
      //   {label: 'OpenId',v: 'OpenId'},
      //   {label: 'UUID',v: 'UUID'},
      //   {label: '昵称',v: 'ncname'},
      //   {label: '手机号',v: 'phone'},
      // ],
      // searchData: {
      //   tt: '',
      //   type: 'UUID'
      // },
      fields: [
        {
          label: '#',
          field: 'id',
          col: 60,
        },
        {
          label: '字符串类型值',
          field: 'a',
          col: 200
        },
        {
          label: '代换值[rep] 排序',
          field: 'b',
          col: '20%',
          tdCls: 'tt-c',
          sort: 'b',
          // 值替换
          rep: [
            {
              v: 0,
              i: 'nicon-times',
              c: 'color-red'
            },
            {
              v: 1,
              i: 'nicon-check',
              c: 'color-gn'
            }
          ],
        },
        {
          label: '附加标签样式',
          field: 'c',
          col: '20%',
          rep: [
            {
              v: 'aaa',
              c: 'nui-label bg-gn'
            },
            {
              v: 'bbb',
              c: 'nui-label bg-bl'
            }
          ],
        },
        {
          label: '设置',
          col: 60,
          cog: [
            {
              icon: 'nicon-ban',
              cls: 'color-red --hover'
            },
            {
              icon: 'nicon-cog',
              cls: 'color-bl --hover'
            },
          ],
        },
      ],
      listData: [
        {id: 1,a: '文字类型',b: 1,c: 'aaa'},
        {id: 2,a: '文字类型文字类型文字类型',b: 0,c: 'bbb'},
        {id: 3,a: '文字类型文字类',b: 0,c: 'ccc'},
        {id: 4,a: '文字类型文字类型文字',b: 1,c: 'ddd'},
      ],
      fields_a: [
        {
          label: '#',
          field: 0,
          col: 60,
        },
        {
          label: '标题标题',
          field: 1,
        },
        {
          label: '代换值[rep] 排序',
          field: 2,
          col: 100,
          tdCls: 'tt-c',
          sort: 'b',
          // 值替换
          rep: [
            {
              v: 0,
              i: 'nicon-times'
            },
            {
              v: 1,
              i: 'nicon-check color-gn'
            }
          ],
        },
        {
          label: '标题标题标题标题',
          field: 3,
          col: 100,
        },
        {
          label: '设置设置',
          col: 60,
          cog: [
            {
              icon: 'nicon-ban',
              cls: 'color-red --hover'
            },
            {
              icon: 'nicon-cog',
              cls: 'color-bl --hover'
            },
          ],
        },
      ],
      listData_a: [
        [1,'文字类型',1,'aaa'],
        [2,'文字类型文字类型文字类型',0,'bbb'],
        [3,'文字类型文字类',0,'ccc'],
        [4,'文字类型文字类型文字',1,'ddd'],
      ],

      sortTt: '',
      cogTt: '',
    };
  },
  methods: {
    sortBtn(e){
      if (e.state){
        this.sortTt = e;
      } else {
        this.sortTt = '';
      }
    },
    cogBtn(e){
      this.cogTt = `[k]${e.k} [data]${e.data.id || e.data[0]}`;
      // console.log(e);
    },
  },
};
</script>