// toRefs
const mods = {
  test1: {
    label: 'test 1',
    icon: 'nui-icon-home',
    component: 'LayoutTest'
  },
  test2: {
    label: 'test 2',
    icon: 'nui-icon-cloud',
    component: 'LayoutTest'
  },
  test3: {
    label: 'test 3',
    icon: 'nui-icon-cube',
    component: 'LayoutTest'
  },
  test4: {
    label: 'test 4',
    icon: 'nui-icon-images',
    component: 'LayoutTest'
  },
};
// 侧边布局
const sidebar = {
  // 孤立浮动
  float: [],
  // 主容器
  main: {
    component: 'LayoutTest'
  },
  // 吸附停靠
  left: [
    {
      pos: {
        min: false,
        w: 220,
      },
      cols: [
        {
          pos: {
            flex: .4,
            w: 200,
            h: 300
          },
          col: {
            active: 'test1',
            tabs: ['test1','test2']
          }
        },
        {
          pos: {
            flex: .4,
            w: 200,
            h: 300
          },
          col: {
            active: 'test1',
            tabs: ['test1']
          }
        },
        {
          pos: {
            flex: .4,
            w: 200,
            h: 300
          },
          col: {
            active: 'test1',
            tabs: ['test1','test2']
          }
        },

      ]
    }
  ],
  right: [
    {
      pos: {
        min: false,
        w: 200,
      },
      cols: [
        {
          pos: {
            flex: .3,
            w: 200,
            h: 300
          },
          col: {
            active: 'test2',
            tabs: ['test1','test2','test3']
          }
        },
        {
          pos: {
            flex: .7,
            w: 200,
            h: 300
          },
          col: {
            active: 'test3',
            tabs: ['test2','test3']
          }
        },

      ]
    }
  ]
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
            active: 'test1',
            tabs: ['test1']
          }
        },
        {
          pos: {
            flex: .3
          },
          col: {
            active: 'test1',
            tabs: ['test1','test2','test4']
          }
        },
        {
          pos: {
            flex: .4
          },
          col: {
            active: 'test3',
            tabs: ['test3','test2']
          }
        },
      ]
    },
    {
      pos: {
        flex: .5
      },
      cols: [
        {
          pos: {
            flex: .2
          },
          col: {
            active: 'test3',
            tabs: ['test3','test4','test1']
          }
        },
        {
          pos: {
            flex: .5
          },
          col: {
            active: 'test3',
            tabs: ['test3','test2','test1']
          }
        },
        {
          pos: {
            flex: .3
          },
          col: {
            active: 'test3',
            tabs: ['test3','test4']
          }
        },
      ]
    },
    {
      pos: {
        flex: .2
      },
      cols: [
        {
          pos: {
            flex: .3
          },
          col: {
            active: 'test1',
            tabs: ['test1','test4']
          }
        },
        {
          pos: {
            flex: .7
          },
          col: {
            active: 'test2',
            tabs: ['test2']
          }
        },
      ]
    },
  ]
};
export default {
  mods,
  sidebar,
  nested
};
