export default
[
  [
    {
      title: '常用类',
      list: [
        ['$Nui.copy(str)','写入剪切板 < 字符串 | 对象>'],
        ['$Nui.dragSize(ck(x,y),cursor)','拖拽 < 回调 , 鼠标样式 >']
      ]
    },
    {
      title: '语言包',
      list: [
        ['$Nui.lang.set(obj)','添加语言包'],
        ['$Nui.lang.obj','语言对象'],
        ['$Nui.lang(str,params)','深层获取 a.b ,替换参数[1,2]'],
      ]
    },
    {
      title: '对象类型检测 ',
      list: [
        ['$Nui.typeCall(obj)','返回类型'],
        ['$Nui.typeCall.isEmpty(obj)','空对象'],
        ['$Nui.typeCall.is[*](obj)','类型判断'],
        ["'Str','Num','Bool','Un','Null','Fun','Arr','Obj','Date'",'类型']
      ]
    },
    {
      title: '等待、防抖、节流',
      list: [
        ['await $Nui.sleep(time)','异步等待 < 毫秒 >'],
        ['$Nui.dee.debounce(func,wait,opts)','防抖 < 函数 ,等待毫秒 >'],
        ['$Nui.dee.throttle(func,wait,opts)','节流 < 函数 ,等待毫秒 >'],
      ]
    }
  ],
  [
    {
      title: '确认对话框',
      list: [
        ['await $Nui.cfm.[*](str)','异步 run false|true'],
        ["['d','i','w','e','s','q']",'配色类型'],
      ]
    },
    {
      title: '弹出消息',
      list: [
        ['$Nui.msg.[*](str,time)',' < 字符串 | 延迟关闭毫秒>'],
        ["['d','i','w','e','s','q']",'类型'],
      ]
    },
    {
      title: '弹出菜单',
      list: [['$Nui.menu(arr,pos,line)','< 返回标记 >']]
    },
    {
      title: '抛出动画',
      list: [['$Nui.paa({time,pos,to,icon,cls})']]
    },
    {
      title: '加载动画',
      list: [
        ['$Nui.loadAm.show()','显示动画'],
        ['$Nui.loadAm.hide()','关闭动画'],
        ['$Nui.loadAm.dee(true|false)','防抖显示|关闭'],
        ['$Nui.loadAm.loadPro(pm,msg)','进度 - 参考弹出模块'],
      ]
    },
  ]
];