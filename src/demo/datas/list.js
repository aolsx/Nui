const list = {
  html: `<!-- ac 当前激活 -->
<nui-list
  :list="listArr"
  :ac="ac"
  @click="<to><$event>" />`,
  arr: `const listArr = [
  // 分割栏 无 to
  {
    label:'lineInfo'
  },
  {
    // 图标
    icon:'icon',
    // 文字
    label:'List 1',
    // 唯一标识符 点击返回
    to:'List1'
  }
]`,
};
const tree = {
  html: `<nui-tree
  line='<Boolean> 开关行模式 '
  arrow='<Boolean> 仅箭头开关'
  dragType="<Str> 标识拖拽用"
  child="<Str> 子节点对象名 child"
  childIcon="['close','open']节点展收图标"
  idkey="<Str> 节点对象键名 id"
  labelkey="<Str> 节点对象标签名 id"
  ackeys="<Arr> 活动节点 [<idkey>]"
  sort="<Boolean> 开启排序"
  expand="<Boolean> 默认展开"
  :tree="TreeList 树数组"
  @open="<$event itemObj> 展开节点"
  @rclick="<$event Obj{ptArr,k}> 右键"
  @click="<$event itemObj> 左键">
  <slot /> 自定义
  <template #default="{data,k}"></template>
  </nui-tree> `,
  arr: `const TreeList = [
  {
    icon:'',label:'',
    open:false, // 记忆开关 可选
    [child]: [] // 子节点数组
    ...
}]`
};

const cpe = {
  html: `<nui-cpe>
  <nui-cpe-item>
    <template #head>
      <i class="icon" />
      <ins>Slot分配</ins>
    </template>
    <div>文字内容</div>
  </nui-cpe-item>
  <!-- 默认开启 open -->
  <nui-cpe-item
    open
    icon="nicon-cog"
    label="属性参数">
    <div>文字内容</div>
  </nui-cpe-item>
</nui-cpe>`
};
const panel = {
  html: `<div class="nui-panel -full">
  <div class="nui-panel-head">
    head
  </div>
  <div class="nui-panel-body">
    内容超出滚动
  </div>
  <div class="nui-panel-foot">
    i span.nui-flex-auto i
  </div>
</div>`
};
export default {
  list,
  tree,
  cpe,
  panel
};