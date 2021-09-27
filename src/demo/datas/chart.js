const box = {
  html: `<nui-pro-box
  class = "color-*" // 配色 [文字色] 渐变色互斥
  :pro = "45"       // 进度 0-100
  :label = "xxx"    // 自定义文字 #slot 互斥
  :sz = "30"        // 尺寸大小 [字体尺寸]
  :pce = "10"       // 尺寸透视角度
  :color = "['#FFF','#000']" // 渐变色
  :bg = "a">  // 背景纹理 a,b,c
    // #slot
    <span>自定义内容</span>
  </nui-pro-box>`
};

const round = {
  html: `<nui-pro-round
  class = "color-*" // 配色 [文字色] 渐变色互斥
  :pro = "45"       // 进度 0-100
  :label = "xxx"    // 自定义文字 #slot 互斥
  :sz = "120"       // 圆环直径
  :sw = "3"         // 圆环边宽
  :color = "['#FFF','#000']" // 渐变色
  >
    // #slot
    <span>自定义内容</span>
  </nui-pro-round>`
};


export default {
  box,
  round
};