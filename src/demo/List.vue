<template>
  <div class="nui-container --p">
    <h3 class="m-none">
      列表类组件
    </h3>
    <div class="nui-row">
      <div class="nui-col-3">
        <h5>基础列表 <span class="h6">To: </span><code>{{ list.ac }}</code></h5>
        <nui-list
          class="bg-atom --dk"
          :list="list.arr"
          :ac="list.ac"
          @click="list.ac = $event" />
        <br>
        <nui-code
          lang="html"
          :code="codes.list.html" />
        <br>
        <nui-code
          :code="codes.list.arr" />
      </div>
      <div class="nui-col-3">
        <h5>树列表 <span class="h6">To: </span><code>{{ tree.ac }}</code></h5>
        <nui-tree
          style="height:120px"
          :tree="tree.arr"
          @click="tree.ac=$event" />
        <br>
        <h6>行模式 <code>line</code></h6>
        <nui-tree
          style="height:135px"
          line
          :tree="tree.arr"
          @click="tree.ac=$event" />
        <br>
        <nui-code
          lang="html"
          :code="codes.tree.html" />
        <br>
        <nui-code
          :code="codes.tree.arr" />
      </div>
      <div class="nui-col-3">
        <h5>折叠列表 嵌套组件</h5>
        <div style="height:160px">
          <nui-cpe>
            <nui-cpe-item open>
              <template #head>
                <i class="nui-icon-tools" />
                <ins>Slot 分配</ins>
              </template>
              <ins>文字内容</ins>
            </nui-cpe-item>
            <nui-cpe-item
              open
              icon="nui-icon-home"
              label="属性参数 默认开启">
              <ins>文字内容</ins>
            </nui-cpe-item>
            <nui-cpe-item
              open
              icon="nui-icon-home"
              label="属性参数2">
              <ins>文字内容</ins>
            </nui-cpe-item>
          </nui-cpe>
        </div>
        <br>
        <nui-code
          lang="html"
          :code="codes.cpe.html" />
      </div>
    </div>
  </div>
</template>
<script>
import codes from './datas/list';
export default {
  name: 'DemoList',
  setup(){
    return {
      codes
    };
  },
  data(){
    return {
      list: {
        ac: 'AcList 1',
        arr: [
          {icon: 'nui-icon-tools',label: 'line Info 1'},
          {icon: 'nui-icon-home',label: 'List 1-1',to: 'AcList 1-1'},
          {label: 'List 1-2',to: 'AcList 1-2'},
          {label: 'line Info 2'},
          {label: 'List 2-1',to: 'AcList 2-1'},
          {label: 'List 2-2',to: 'AcList 2-2'},
        ],
      },
      tree: {
        ac: '',
        arr: [
          {icon: 'nui-icon-home',label: 'List 1',to: 'AcList 1'},
          {label: 'List 2',to: 'AcList 2'},
          {icon: 'nui-icon-tools',label: 'nodes Info 3',
            tree: [
              {label: 'List 3-1',to: 'AcList 3-1',},
              {icon: 'nui-icon-home',label: 'List 3-2',to: 'AcList 3-2',open: false,
                tree: [
                  {label: 'List 3-2-1',to: 'AcList 3-2-1'},
                  {icon: 'nui-icon-home',label: 'List 3-2-2',to: 'AcList 3-2-2'}
                ]},
              {label: 'List 3-3',to: 'AcList 3-3'},
            ]},
          {icon: 'nui-icon-home',label: 'List 5',to: 'AcList 5'},
        ]
      }
    };
  }
};
</script>