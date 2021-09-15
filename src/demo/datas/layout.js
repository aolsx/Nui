// toRefs
const mods = {
  // 模块信息
  a_mod: {
    label: 'A标签',
    icon: 'nicon-cog',
    component: 'a_component'
  },
};
// 嵌套布局
const nested = {
  vertical: false,
  pos: {
    flex: 1
  },
  cols: [
    {
      pos: {
        flex: .3
      },
      cols: [
        {
          pos: {
            flex: .3
          },
          col: {
            active: 'a_mod',
            tabs: ['a_mod']
          }
        },
        '{...}'
      ]
    },
    {
      pos: {
        flex: .7
      },
      col: {
        active: 'b_mod',
        tabs: ['b_mod']
      }
    }
  ]
};

// 侧边布局
const sidebar = {
  // 孤立浮动
  float: [
    {
      pos: {
        min: true,
        w: 40,
        h: 200,
        t: 50,
        l: 100
      },
      cols: [
        {
          pos: {
            flex: .4,
            w: 200,
            h: 300
          },
          col: {
            active: 'b_mod',
            tabs: ['b_mod']
          }
        },
        '{...}',
      ]
    }
  ],
  // 主容器
  main: {
    component: 'PageMain'
  },
  // 吸附停靠
  left: [
    {
      pos: {
        min: true,
        w: 40,
      },
      cols: [
        {
          pos: {
            flex: 1,
            w: 200,
            h: 300
          },
          col: {
            active: 'c_mod',
            tabs: ['c_mod','d_mod']
          }
        },
      ]
    }
  ],
  right: ['{left}']
};

const demoCode = {
  html: `<nui-view-root
  :bgicon="nicon-logo">
  <nui-view-head
    reload
    :logo="{icon:'ng-logo',label:'NG IDE'}"
    @win="eveWinDow($event)">
    工具栏插槽
    <slot /> i+div+i
  </nui-view-head>
  <nui-View-home v-if="**">
    <slot name="title" />
    <slot />
  </nui-View-home>
  <nui-view-main
    v-else
    :mods="mods"
    :layout="layout"
    @save="eveSave()" />
</nui-view-root>`,
  mods: JSON.stringify(mods,null,2),
  nested: JSON.stringify(nested,null,2),
  sidebar: JSON.stringify(sidebar,null,2),
};

export default demoCode;
