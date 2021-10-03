const fields = `// 字段设置
const fields = [
  {
    label: '字段名称',
    field: 'id',   // 对象 'k' 或 数组位 0
    col: 10,       // 宽度 数值 或 百分比 '20%'[尽量]
    thCls:'tt-c',  // th 表头 class
    tdCls: 'tt-c', // td 单元格 class
    // 开启排序功能 state[''|'asc'|'desc']
    // 事件 @sort="fn($event{sort:'aa',state})"
    // 数组类型数据 field 为 index 这里另定义标识
    sort: 'aa',
    rep: [ // 数据值匹配替换
      { v: '匹配值',
        // 替换成图标 字符串
        i: 'icon-*',
        t: '是/否',
        // class 附加
        c:'nui-label'
      }, //...
    ],
    // 自定义字段 按钮组 [field] 互斥
    // 事件 @cog="fn($event{k:[index],data})"
    cog: [
      { // nui-btn 属性
        icon: 'app-icon-trash-alt',
        cls: 'color-red --hover'
      }, //...
    ],
  },// ...
];`;
const html = `<nui-table
  :fields="fields"  // 字段设置
  :datas="listData" // 数据
  // 自定义按钮事件
  @cog="fn($event{k:[index],data})"
  // 排序事件 state[''|'asc'|'desc']
  @sort="fn($event{sort:'aa',state})">
  <slot>
  自定义内容 放置分页组件
</nui-table>`;

const js = `// 数组对象数据 fields{field:'id'}
const ObjData=[
  {id: 1,a: '文字类型',b: 1,c: 'aaa'},
  {id: 2,a: '文字类型文字',b: 0,c: 'bbb'}
];
// 纯数组 fields{field:0}
const ArrData = [
  [1,'文字类型',1,'aaa'],
  [2,'文字类型文',0,'bbb']
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