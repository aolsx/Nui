export const NuiLtState = {
  cfg: {
    // 面板最高宽
    minW: 40,
    minH: 60,
    // 宽度小于将紧缩切换紧缩模式
    // MS布局模式下有效
    minMode: 100,
  },
  area: {
    t: 0,
    l: 0,
    w: 0,
    h: 0,
    op: 0,
    hide: true,
  },
  state: null,
  mods: null,
  saveFn: function(){}
};

export default function(rootVue){
  NuiLtState.mods = rootVue.mods;
  NuiLtState.state = rootVue.layout;
  NuiLtState.area = rootVue.area;
  NuiLtState.saveFn = ()=>{
    rootVue.$emit('save');
  };
}