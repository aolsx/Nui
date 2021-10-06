const fields = `// 字段设置
const fields = [
  {
    label: '字段名称',
    field: 'id',   // 对象 'k' 或 数组位 0
    dd:true,// 启用显示隐藏字段 true/false/undefined
    sh:true,// 启用搜索 开启搜索栏
    // 启用排序
    // 事件 @sort="fn($event[{sort,state}])"
    // 数组类型数据 field 为 index 这里另定义标识
    sort: 'aa',
    col: 10,       // 宽度 数值 或 百分比 '20%'[尽量]
    thCls:'tt-c',  // th 表头 class
    tdCls: 'tt-c', // td 单元格 class,
    rep: [ // 数据值匹配替换
      { v: '匹配值',
        // 替换成图标/字符串
        i: 'icon-*', t: '是/否',
        c:'nui-label'  // class 附加
      }, //...
    ],
    // 自定义无字段 按钮组 [field] 互斥
    // 事件 @cog="fn($event{type,data})"
    cog: [
      {
        type:'del', // 类型
        btn:{ // nui-btn 属性
          icon: 'app-icon-trash-alt',
          cls: 'color-red --hover',
        },
      }, //...
    ],
  },// ...
];`;
const html = `<nui-table
  :fields="fields"  // 字段设置
  :datas="listData" // 数据
  :load='true' // 加载动画
  // 自定义按钮事件
  @cog="fn($event{type,data})"
  // 排序事件 state[''|'asc'|'desc']
  @sort="fn($event[{sort,state}])"
  // 搜索
  @search="fn($event[{field,v}])">
  <slot #head>
  <slot> //foot 自定义内容 放置分页组件
</nui-table>`;

const js = `// 数组对象数据 fields{field:'id'}
const ObjData=[
  {id: 1,a: '文字类型',b: 1,c: 'aaa'},
  {id: 2,a: '文字类型文字',b: 0,c: 'bbb'}
  ...
];
// 纯数组 fields{field:[index]]}
// 字段 index 索引值
const ArrData = [
  [12,'文字类型',false,'aaa'],
  ['123','文字类型文',true,'bbb']
  ...
];`;
const paging = `<nui-paging
  class="color-og"
  :total="131" // 总数
  :icon="icon" // 总数图标
  :pgSz="10"   // 每页显示
  :pgSzOpt="[5,10,40]"  // 每页显示设置
  // 事件 页面:1 / 条数:10
  @to="fn($event{page:1,size:10})"
/>
`;
export default {
  // fields: JSON.stringify(fields,null,2)
  fields,html,js,paging
};