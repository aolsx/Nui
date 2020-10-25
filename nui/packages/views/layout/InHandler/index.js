import {NuiLtState} from './state';
import {NuiLayoutNdDrag,NuiLayoutColSize} from './nested';
import {NuiLayoutSdDrag,NuiLayoutSdMouse} from './side';

// 导出静态方法
export default {
  GetMod(){
    return NuiLtState.mods;
  },
  NdDragDrop(e){
    new NuiLayoutNdDrag(e.target);
  },
  ColSize(e,pm){
    new NuiLayoutColSize(e,pm);
  },

  ColSizeSide(e,pos,pm){
    new NuiLayoutSdMouse(e,pos,'col',pm);
  },
  SideWhSize(e,pos,dn,pm){
    new NuiLayoutSdMouse(e,pos,dn,pm);
  },
  SdDragDrop(e){
    new NuiLayoutSdDrag(e);
  }
};

