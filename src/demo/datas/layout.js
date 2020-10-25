// toRefs
const mods = {
  // 模块信息
  a_mod: {
    label: 'A标签',
    icon: 'nui-icon-home',
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
  html: `<nui-views-root
  :mods="mods"
  :layout="layout"
  @save="eveSave"
  @win="eveWinDow">
  <template #tool>
    <div>工具栏</div>
  </template>
</nui-views-root>`,
  mods: JSON.stringify(mods,null,2),
  nested: JSON.stringify(nested,null,2),
  sidebar: JSON.stringify(sidebar,null,2),
};

export default demoCode;
