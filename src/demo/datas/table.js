const fields = `// 字段设置
const fields = [
  {
    label: '表单项',
    // 字段键名 对象或数组 数据
    field: 'id',
    // 宽度 必须有一项不定义才有效
    // 固定值 或百分比
    col: 10, // [10 | 10%]
    // 可排序 数组Key不易识别 自定别名
    st: 'id', // 可排序
    sh: true, // 可搜索
    // 可隐藏 初始值 [false|true]
    dd: false,
    // <template #id="{value,item}">
    slot: 'id', // 自定义插槽
    cls: 'tt-c', // 附加样式
    clsTd: 'color-bl',
    clsTh: 'color-og',
  },// ...
];`;
const html = `<nui-table
  class="r-5"
  style="height:200px"
  empty="暂无数据"
  :label="{icon,label}"
  :fields="fields"
  :datas="listData"
  // 分页 可选
  :paging="{total,pgSzOpt}"
  @sh="search" // 搜索
  @st="sort" // 排序
  @pg="page">  // 分页
  // 自定义 TD 内容 值、列值
  // fields:{slot:id} 定义
  <template #id="{value,item}">
    <b>[{{ value }}]</b>
  </template>
  <template #cog>
    <nui-btn @click=""/>
  </template>
</nui-table>`;

const js = `// 数组对象数据 fields[{field:'id'}]
const ObjData=[
  {id: 1,a: '文字类型',b: 1,c: 'aaa'},
  {id: 2,a: '文字类型文字',b: 0,c: 'bbb'}
  ...
];
// 纯数组 fields[{field:[index]]}]
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
  @pg="to($event{page:1,size:10})"
/>
`;
export default {
  // fields: JSON.stringify(fields,null,2)
  fields,html,js,paging
};