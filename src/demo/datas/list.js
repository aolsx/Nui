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
  html: `<!-- line 行模式 -->
<nui-tree
  line
  :tree="treeList"
  @click="<to><$event>" />`,
  arr: `const treeList = [
  {icon:'',label:'',to:''，
    // 包含子类
    tree: [],open: false
  }
]`,
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
    icon="nui-icon-home"
    label="属性参数">
    <div>文字内容</div>
  </nui-cpe-item>
</nui-cpe>`,
  arr: `const treeList = [
  {icon:'',label:'',to:''，
    // 包含子类
    tree: [],open: false
  }
]`,
};

export default {
  list,
  tree,
  cpe,
};