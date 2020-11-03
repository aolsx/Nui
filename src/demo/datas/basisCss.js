export default [
  {
    title: '容器类',
    row: 4,
    list: [
      ['.nui-container','滚动容器 高宽最大'],
      ['^.--p','添加内间距 一般主视图'],
      ['.nui-container-in','滚动容器 未指定高宽'],
    ],
    child: [
      {
        title: '弹性容器',
        smCode: '{display:flex}',
        row: 12,
        list: [
          ['.nui-flex','栅格布局'],
          ['^.--cc','纵向+横向 居中'],
          ['^.--h','横向排列 Horizontal'],
          ['^.--v','纵向排列 Vertical'],
          ['^.--hc | ^.--vc','居中对齐'],
          ['^.--hb','两端对齐'],
          ['.nui-flex-auto','占剩超缩 ！'],
          ['.nui-flex-none','固定自身 ！'],
        ],
      },
      {
        title: '容器栅格布局 ',
        smCode: '{display:flex}',
        row: 12,
        list: [
          ['.nui-row','栅格布局'],
          ['^.--sp-10','网格间距 10px 默认5px'],
          ['^.--sp-none','去除网格间距'],
          ['.nui-col','自动宽度 占剩超缩'],
          ['.nui-col-none','固定占位 内部尺寸'],
          ['.nui-col-[1-12]','栅格占位 1-12'],
        ],
      },
      {
        title: '列表网格布局 ',
        smCode: '{display:grid}',
        row: 12,
        list: [
          ['.nui-row-grid','列表网格布局'],
          ['^.--min-80','单个网格最小 80px'],
          ['^.--sp-10','网格间距 10px'],
        ],
      },
    ],
  },
  {
    title: '内外间距类 ',
    smCode: 'v[5|10|15]',
    row: 4,
    list: [
      ['.p-[5|10|15]','内间距 5-15'],
      ['.p-lr-[v]','内左右'],
      ['.p-tb-[v]','内上下'],
      ['.p-[t|r|b|l]-[v]','上下左右'],
      ['.p-[^]-none]','清除内间距 ！'],
      ['.m-[5|10|15]','外间距 5-15'],
      ['.m-lr-[v]','内间距左右'],
      ['.m-tb-[v]','内间距上下'],
      ['.m-[t|r|b|l]-[v]','上下左右'],
      ['.m-[^]-none]','清除外间距 ！'],
    ],
    child: [
      {
        title: '子元素间距',
        row: 12,
        list: [['.m-in-[6|8|10|25em]','子间距 .m-in-*>*']],
      },
      {
        title: '透明度',
        row: 12,
        list: [['.op-[1|3|5|7]','元素透明度']],
      },
      {
        title: '其它元素类',
        row: 12,
        list: [
          ['.-link','连接光标样式','-link'],
          ['.-float|.--[r|b]','元素强制浮动 ！'],
          ['.-none','元素强制禁用 ！'],
          ['.-full','宽高100%强制 ！']
        ],
      },
    ]
  },
  {
    title: '文字类',
    row: 4,
    list: [
      ['h[1-6]','标签 文字尺寸 24px-12px'],
      ['.h[1-7]','样式 文字尺寸 24px-10px'],
      ['.tt-c','居中','tt-c'],
      ['.tt-r','右侧对齐','tt-r'],
      ['.tt-bd','粗体','tt-bd'],
      ['.tt-cab','abc 首字母大写','tt-cab'],
      ['.tt-cb','abc 全大写','tt-cb'],
      ['.tt-cs','ABC 全小写','tt-cs'],
      ['.tt-copy','文字可选中 配合 $Nui.copy(API)','tt-copy'],
      ['ins | .-eps','强制一行超出显示省略号。','-eps','width:140px;']
    ],
  }
];