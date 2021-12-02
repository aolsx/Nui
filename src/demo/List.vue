<template>
  <div class="nui-container --p">
    <h3 class="m-none">
      列表面板
    </h3>
    <div class="nui-row">
      <div class="nui-col-3">
        <h5>
          基础列表 <code>组件</code>
          <span class="h6"> To: </span>
          <code> {{ list.ac }}</code>
        </h5>
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
        <h5>
          树列表 <code>组件</code>
          <span class="h6"> Ck: </span>
          <code>{{ tree.ac?.label }}</code>
          <span class="h6"> RCk: </span>
          <code>{{ tree.r?.k }}</code>
        </h5>
        <nui-btn
          label="切换行模式"
          class="color-sky"
          @click="tree.line=!tree.line" />
        <nui-tree
          style="height:140px"
          child="tree"
          sort
          :arrow="false"
          :line="tree.line"
          :tree="tree.arr"
          :ackeys="tree.ackeys"
          :child-icon="['nicon-folder','nicon-folder-open']"
          @open="tree.ac=$event"
          @rclick="tree.r=$event"
          @click="tree.ac=$event">
          <template #default="{data,k}">
            <i :class="data.icon" />
            <span>
              {{ [k] }}
              {{ data.label }}
            </span>
          </template>
        </nui-tree>
        <br>
        <nui-code
          lang="html"
          :code="codes.tree.html" />
        <br>
        <nui-code
          :code="codes.tree.arr" />
      </div>
      <div class="nui-col-3">
        <h5>折叠列表嵌套 <code>组件</code></h5>
        <div style="height:160px">
          <nui-cpe>
            <nui-cpe-item>
              <template #head>
                <i class="nicon-tools" />
                <ins>Slot 分配</ins>
              </template>
              <ins>文字内容</ins>
            </nui-cpe-item>
            <nui-cpe-item
              open
              icon="nicon-cog"
              label=":open 默认开启">
              <ins>文字内容</ins>
            </nui-cpe-item>
            <nui-cpe-item
              label=":left 箭头左侧"
              left>
              <ins>文字内容</ins>
            </nui-cpe-item>
          </nui-cpe>
        </div>
        <br>
        <nui-code
          lang="html"
          :code="codes.cpe.html" />
      </div>
      <div class="nui-col-3">
        <h5>面板 <code>样式</code></h5>
        <div
          class="nui-panel"
          style="height:160px">
          <div class="nui-panel-head">
            <b>标题</b>
            <div>
              <nui-btn
                class="color-gn"
                icon="nicon-cog" />
              <nui-btn
                class="color-gn"
                icon="nicon-cog" />
            </div>
          </div>
          <div class="nui-panel-body">
            <div class="p-tb-15">
              内容
            </div>
            <div class="p-tb-15">
              内容
            </div>
            <div class="p-tb-15">
              内容
            </div>
          </div>
          <div class="nui-panel-foot">
            <nui-btn
              class="color-gn"
              icon="nicon-cog" />
            <span class="nui-flex-auto">面板底部</span>
            <nui-btn
              class="color-gn"
              icon="nicon-cog" />
          </div>
        </div>
        <br>
        <nui-code
          lang="html"
          :code="codes.panel.html" />
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
          {icon: 'nicon-tools',label: 'line Info 1'},
          {icon: 'nicon-cog',label: 'List 1-1',to: 'AcList 1-1'},
          {label: 'List 1-2',to: 'AcList 1-2'},
          {label: 'line Info 2'},
          {label: 'List 2-1',to: 'AcList 2-1'},
          {label: 'List 2-2',to: 'AcList 2-2'},
        ],
      },
      tree: {
        r: null,
        ac: '',
        line: false,
        ackeys: [1,2],
        arr: [
          {icon: 'nicon-cog',label: 'List 1',to: 'AcList 1',id: 1},
          {label: 'List 2',to: 'AcList 2',},
          {icon: 'nicon-tools',label: 'nodes Info 3',id: 2,
            tree: [
              {label: 'List 3-1',to: 'AcList 3-1',},
              {icon: 'nicon-cog',label: 'List 3-2',to: 'AcList 3-2',open: false,
                tree: [
                  {label: 'List 3-2-1',to: 'AcList 3-2-1'},
                  {icon: 'nicon-cog',label: 'List 3-2-2',to: 'AcList 3-2-2'}
                ]},
              {label: 'List 3-3',to: 'AcList 3-3'},
            ]},
          {icon: 'nicon-cog',label: 'List 5',to: 'AcList 5'},
        ]
      }
    };
  }
};
</script>