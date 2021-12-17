import {reactive} from 'vue';
// toRefs
const mods = {
  demoList: {
    label: 'DEMO',
    icon: 'nicon-cog',
    component: 'VewsList'
  },
  vewsTemp: {
    label: 'DEMO',
    icon: 'nicon-cog',
    component: 'VewsTemp'
  },
};
// 侧边布局
const sidebar = {
  // 孤立浮动
  float: [],
  // 主容器
  main: {
    component: 'VewsDemo',
    panel: {
      head: 'LayoutTest',
      body: 'LayoutTest',
      foot: 'LayoutTest',
    }
  },
  // 吸附停靠
  left: [
    {
      pos: {
        min: false,
        w: 120,
      },
      cols: [
        {
          pos: {
            flex: .7,
            w: 200,
            h: 300
          },
          col: {
            active: 'demoList',
            tabs: ['demoList']
          }
        },
        {
          pos: {
            flex: .3,
            w: 200,
            h: 300
          },
          col: {
            active: 'vewsTemp',
            tabs: ['vewsTemp']
          }
        },

      ]
    }
  ],
  right: []
};

const listArr = [
  {line: true,label: 'Style'},
  {label: '常用样式',to: 'DemoBasisCss'},
  {label: '配色样式',to: 'DemoColor'},
  {label: '配色工具',to: 'DemoColorPicker'},
  {label: '内置图标',to: 'DemoIcon'},
  {line: true,label: 'Api'},
  {label: '内置API',to: 'DemoApi'},
  {line: true,label: 'Component'},
  {label: '视图布局',to: 'DemoViews'},
  {label: '列表组件',to: 'DemoList'},
  {label: '按钮标签',to: 'DemoBtn'},
  {label: '弹出模块',to: 'DemoPopup'},
  {label: '表单组件',to: 'DemoForm'},
  {label: '进度图表',to: 'DemoChart'},
  {label: '数据表格',to: 'DemoTable'},
  {label: '代码预览',to: 'DemoCode'}
];

const listTo = reactive({
  component: 'DemoBasisCss'
});
export {listTo,listArr};

export default {
  mods,
  sidebar
};
