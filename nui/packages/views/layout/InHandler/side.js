import {NuiLtState} from './state';
// 通用按下移动
export class NuiLayoutSdMouse{
  constructor(e,pos,type,pm){
    const min = NuiLtState.cfg;
    const eX = e.clientX;
    const eY = e.clientY;
    // 改变侧边栏列宽度
    if (type === 'col'){
      const dw = pos.w;
      const reverse = pm.r ? -1 : 1;
      document.body.onmousemove = (e)=>{
        const v = (e.clientX - eX) * reverse;
        const w = dw + v;
        if (v < 0 && w <= min.minW){
          pos.w = min.minW;
        } else if (v > 0 && w >= pm.maxW){
          pos.w = pm.maxW;
        } else {
          pos.w = w;
          pos.min = w < min.minMode;
        }
      };
    } else if (type === 'move'){
      const dL = pos.l;
      const dT = pos.t;
      const maxL = document.body.offsetWidth - pos.w;
      const maxT = document.body.offsetHeight - pos.h - 30;
      document.onmousemove = (e)=>{
        const nL = dL + e.clientX - eX;
        const nT = dT + e.clientY - eY;
        pos.l = nL < 0 ? 0 : nL > maxL ? maxL : nL;
        pos.t = nT < 0 ? 0 : nT > maxT ? maxT : nT;
      };
    } else {
      const dW = pos.w;
      const dH = pos.h;
      // 浮动
      if (pm){
        // let minW,minH,minMinH,acMinH;
        const minW = min.minW;
        const {minH,minMinH} = Basic.getMinH(pm);
        let acMinH = pos.min ? minMinH : minH;
        if (type === 'n'){
          document.body.onmousemove = (e)=>{
            const nH = dH + e.clientY - eY;
            pos.h = nH <= acMinH ? acMinH : nH;
          };
        } else if (type === 'ne'){
          const dL = pos.l;
          document.body.onmousemove = (e)=>{
            const nW = dW - (e.clientX - eX);
            const nH = dH + e.clientY - eY;
            pos.w = nW <= minW ? minW : nW;
            pos.l = dL - (pos.w - dW);
            pos.min = nW < min.minMode;
            acMinH = pos.min ? minMinH : minH;
            pos.h = nH <= acMinH ? acMinH : nH;
          };
        } else {
          document.body.onmousemove = (e)=>{
            const nW = dW + e.clientX - eX;
            const nH = dH + e.clientY - eY;
            pos.w = nW <= minW ? minW : nW;
            pos.min = nW < min.minMode;
            acMinH = pos.min ? minMinH : minH;
            pos.h = nH <= acMinH ? acMinH : nH;
          };
        }
      } else {
        // 内部面板
        const minW = min.minMode;
        const minH = min.minH;
        if (type === 'n'){
          document.body.onmousemove = (e)=>{
            const nH = dH + e.clientY - eY;
            pos.h = nH <= minH ? minH : nH;
          };
        } else {
          // 反向
          const reverse = type === 'ne' ? -1 : 1;
          document.body.onmousemove = (e)=>{
            const nW = dW + (e.clientX - eX) * reverse;
            const nH = dH + e.clientY - eY;
            pos.w = nW <= minW ? minW : nW;
            pos.h = nH <= minH ? minH : nH;
          };
        }
      }
    }
    document.onmouseup = ()=>{
      this.destroy();
    };
    document.body.style.cursor = type === 'move' ? 'grabbing' : `${type}-resize`;
    document.body.classList.add('nui-drag-model');
  }
  destroy(){
    NuiLtState.saveFn();
    document.body.classList.remove('nui-drag-model');
    document.body.style.cursor = '';
    document.body.onmousemove = null;
    document.onmousemove = null;
    document.onmouseup = null;
  }
}

const Basic = {
  // 百分比单位转换
  getEleVue(el){
    return el.__vueParentComponent;
  },
  getEleVNode(el){
    return el.__vnode;
  },
  getElePos(el){
    return el.getBoundingClientRect().toJSON();
  },
  setArea(op,pos){
    NuiLtState.area.op = op ? .3 : 0;
    if (pos){
      NuiLtState.area.t = pos.top;
      NuiLtState.area.l = pos.left;
      NuiLtState.area.w = pos.width;
      NuiLtState.area.h = pos.height;
    }
  },
  emptyArea(){
    for (const k in NuiLtState.area){
      NuiLtState.area[k] = 0;
    }
    NuiLtState.area.hide = true;
  },
  // 计算min 模式下最小高度
  getMinH(pm,colsArr){
    let colsLen = 0,tabLen = 0;
    if (pm){
      colsLen = pm.colsLen;
      tabLen = pm.tabLen;
    } else {
      colsLen = colsArr.length;
      for (const c of colsArr){
        tabLen += c.col.tabs.length;
      }
    }
    const minH = colsLen * NuiLtState.cfg.minH + 16;
    const minMinH = tabLen * 32 + colsLen * 20 + 26;
    return {minH,minMinH};
  }
};

const ClickSide = {
  clickTab(el,aTab,pm){
    const $G = Basic.getEleVue(el);
    const TabsNode = Basic.getEleVNode(el.parentElement);
    const TabNode = Basic.getEleVNode(el);
    const pos = Basic.getElePos(el);
    let tokey = TabNode.key;
    if ($G.uid === aTab.gid && TabsNode.key === aTab.pkey){
      // '忽略自身'
      if (tokey === aTab.key){
        return;
      }
      // 下紧邻
      if (tokey === aTab.key + 1){
        if (pm.min){
          pos.top = pos.bottom;
        } else {
          pos.left = pos.right;
        }
        tokey += 1;
      }
    }
    if (pm.min){
      pos.top -= 2;
      pos.width -= 10;
      pos.left += 5;
      pos.height = 4;
    } else {
      pos.top += 4;
      pos.width = 4;
      pos.height -= 4;
    }
    Basic.setArea(1,pos);
    return {
      fn: 'toTab',
      gid: $G.uid,
      pm: {
        tokey,
        pkey: TabsNode.key
      }
    };
  },
  clickTabs(el,aTab,pm){
    const $G = Basic.getEleVue(el);
    const TabsNode = Basic.getEleVNode(el);
    const before = pm.min && pm.y < 16 ? 1 : 0;
    if ($G.uid === aTab.gid && TabsNode.key === aTab.pkey){
      if ((!pm.min && aTab.last) || (pm.min && (before && aTab.key === 0) || (!before && aTab.last))){
        return;
      }
    }
    let pos;
    if (pm.min){
      if (before){
        pos = Basic.getElePos(el.firstElementChild);
      } else {
        pos = Basic.getElePos(el.lastElementChild);
        pos.top = pos.bottom;
      }
      pos.top -= 2;
      pos.width -= 10;
      pos.left += 5;
      pos.height = 4;
    } else {
      pos = Basic.getElePos(el.lastElementChild);
      pos.width = 4;
      pos.left = pos.right;
      pos.top += 4;
      pos.height -= 4;
    }
    Basic.setArea(1,pos);
    return {
      fn: 'toTabs',
      gid: $G.uid,
      pm: {
        before,
        tokey: TabsNode.key
      }
    };
  },
  clickPanel(el,aTab,pm){
    const $G = Basic.getEleVue(el);
    const imNode = Basic.getEleVNode(el.parentElement);
    const pkey = imNode.key;
    const pos = Basic.getElePos(el);
    const trH = pos.height * .4;
    const isDown = pm.y > trH ? 1 : 0;
    // 独苗上紧邻下 忽略 || !isDown && pkey === aTab.pkey + 1
    if ($G.uid === aTab.gid && aTab.only && (pkey === aTab.pkey || isDown && pkey === aTab.pkey - 1)){
      return;
    }
    if (isDown){
      pos.top = pos.bottom - trH;
    }
    pos.height = trH;
    Basic.setArea(1,pos);
    return {
      fn: 'toItem',
      gid: $G.uid,
      pm: {
        isDown,
        tokey: pkey
      }
    };
  },
  clickItem(el,aTab,pm){
    // 同组独苗忽略
    const $G = Basic.getEleVue(el);
    const imNode = Basic.getEleVNode(el);
    if ($G.uid === aTab.gid && aTab.only && imNode.key === aTab.pkey){
      // console.log('同组独苗忽略');
      return;
    }
    const pos = Basic.getElePos(el);
    const isDown = pm.y > 10 ? 1 : 0;
    if (isDown){
      pos.top = pos.bottom;
    }
    pos.height = 4;
    Basic.setArea(1,pos);
    return {
      fn: 'toItem',
      gid: $G.uid,
      pm: {
        isDown,
        tokey: imNode.key
      }
    };
  },
  clickSide(el,aTab,pm){
    const $G = Basic.getEleVue(el);
    const pos = Basic.getElePos(el);
    const root = pm.root;
    if (root){
      pos.left -= 8;
      pos.width = 16;
      Basic.setArea(1,pos);
      return {
        fn: 'toSide',
        gid: $G.uid,
        pm: {root}
      };
    } else {
      const isDown = pm.x < 10 ? 0 : 1;
      if (isDown){
        pos.left = pos.right;
      }
      pos.left -= 3;
      pos.width = 6;
      Basic.setArea(1,pos);
      return {
        fn: 'toSide',
        gid: $G.uid,
        pm: {
          isDown,
          tokey: $G.vnode.key
        }
      };
    }
  }
};

const ToSide = {
  toTab(tab,$G,pm){
    const col = $G.ctx.group.cols[pm.pkey].col;
    col.active = tab;
    col.tabs.splice(pm.tokey,0,tab);
  },
  toTabs(tab,$G,pm){
    const col = $G.ctx.group.cols[pm.tokey].col;
    col.active = tab;
    if (pm.before){
      col.tabs.unshift(tab);
    } else {
      col.tabs.push(tab);
    }
  },
  toItem(tab,$G,pm,pos){
    const cols = $G.ctx.group.cols;
    const newCol = {
      col: {active: tab,tabs: [tab]},
      pos: {...pos}
    };
    let flex = 0;
    for (const c of cols){
      const r = c.pos.flex * .2;
      c.pos.flex -= r;
      flex += r;
    }
    newCol.pos.flex = flex;
    cols.splice(pm.tokey + pm.isDown,0,newCol);
  },
  toSide(tab,$G,pm,pos){
    const newCols = {
      cols: [
        {
          col: {active: tab,tabs: [tab]},
          pos: {...pos,flex: 1}
        }
      ],
      pos: {
        w: 40,
        min: true,
      }
    };
    if (pm.root){
      $G.ctx.layout.push(newCols);
    } else {
      $G.parent.ctx.layout.splice(pm.tokey + pm.isDown,0,newCols);
    }
  },
  toFloat(tab,tl,pos){
    const newCols = {
      cols: [
        {
          col: {active: tab,tabs: [tab]},
          pos: {...pos,flex: 1}
        }
      ],
      pos: {
        w: 40,
        h: 70,
        t: tl.t,
        l: tl.l,
        min: true,
      }
    };
    NuiLtState.state.float.push(newCols);
  }
};

const ResetSide = {
  delNull(area){
    const ptCols = NuiLtState.state[area];
    for (let [k,Obj] of ptCols.entries()){
      for (let [ik,iObj] of Obj.cols.entries()){
        const isDelK = iObj.col.tabs.findIndex(v=>v == 'NULL');
        if (isDelK !== -1){
          const col = iObj.col;
          if (col.tabs.length > 1){
            col.tabs.splice(isDelK,1);
            if (!col.active){
              col.active = col.tabs[0];
            }
          } else {
            const flex = iObj.pos.flex;
            Obj.cols.splice(ik,1);
            const colsLen = Obj.cols.length;
            if (colsLen){
              const v = flex / colsLen;
              for (const c of Obj.cols){
                c.pos.flex += v;
              }
            } else {
              ptCols.splice(k,1);
            }
          }
          return;
        }
      }
    }
  },
  // 重置浮动面板POS
  floatPos($G){
    const g = $G.ctx.group;
    const {minH,minMinH} = Basic.getMinH(null,g.cols);
    const acH = g.pos.min ? minMinH : minH;
    if (g.pos.h < acH){
      g.pos.h = acH;
    }
  }
};

export class NuiLayoutSdDrag{
  constructor(el){
    const $G = Basic.getEleVue(el);
    const $Root = $G.parent;
    const TabsNode = Basic.getEleVNode(el.parentElement);
    const TabNode = Basic.getEleVNode(el);
    const pkey = TabsNode.key;
    const key = TabNode.key;
    const g = $G.ctx.group;
    const Cols = g.cols[pkey];
    const Tabslen = Cols.col.tabs.length;
    let area;
    if ($Root.type.name === 'InSidebarFloat'){
      area = 'float';
    } else {
      area = $Root.ctx.left ? 'left' : 'right';
    }
    this.Tab = {
      area,
      key,
      pkey,
      last: Tabslen === key + 1,
      only: Tabslen === 1,
      gid: $G.uid,
      // gkey: $G.vnode.key,
    };
    this.Cols = Cols;
    this.toObj = null;
    this.bindingEve();
    NuiLtState.area.hide = false;
  }
  bindingEve(){
    document.body.classList.add('nui-drag-model','nui-drag-lutsd');
    document.ondragenter = (e)=>{
      e.preventDefault();
      this.eveDragenter(e);
    };
    document.ondragover = (e)=>{
      e.preventDefault();
    };
    document.ondrop = (e)=>{
      e.preventDefault();
      this.eveDrop(e);
      this.destroy();
    };
    document.ondragend = (e)=>{
      e.preventDefault();
      this.destroy();
    };
  }
  // 销毁
  destroy(){
    // console.log('销毁');
    document.body.classList.remove('nui-drag-model','nui-drag-lutsd');
    document.ondragenter = null;
    document.ondragover = null;
    document.ondrop = null;
    document.ondragend = null;
    Basic.emptyArea();
    for (const o in this){
      this[o] = null;
    }
  }
  // 进入元素 检查类型
  eveDragenter(e){
    Basic.setArea(0);
    this.toObj = null;
    const list = e.target.classList;
    const pm = {
      x: e.offsetX,
      y: e.offsetY,
    };
    let clickFn;
    if (list.contains('nui-lut-tab')){
      clickFn = 'clickTab';
    } else if (list.contains('nui-lut-tabs')){
      clickFn = 'clickTabs';
    } else if (list.contains('nui-lut-tab-min')){
      clickFn = 'clickTab';
      pm.min = true;
    } else if (list.contains('nui-lut-tabs-min')){
      clickFn = 'clickTabs';
      pm.min = true;
    } else if (list.contains('nui-lut-panel')){
      clickFn = 'clickPanel';
    } else if (list.contains('nui-lut-group-item')){
      clickFn = 'clickItem';
    } else if (list.contains('nui-lut-group')){
      clickFn = 'clickSide';
    } else if (list.contains('nui-lut-side')){
      clickFn = 'clickSide';
      pm.root = true;
    }
    if (clickFn){
      this.toObj = ClickSide[clickFn](e.target,this.Tab,pm);
    } else {
      this.toObj = 'float';
    }
  }
  eveDrop(e){
    if (!this.toObj){
      return;
    }
    const $G = Basic.getEleVue(e.target);
    const To = this.toObj;
    // 标记删除
    const col = this.Cols.col;
    const tab = col.tabs[this.Tab.key];
    col.tabs[this.Tab.key] = 'NULL';
    // tab 是激活状态
    if (col.active === tab){
      col.active = '';
    }
    if (To === 'float'){
      ToSide.toFloat(tab,{t: e.clientY,l: e.clientX},this.Cols.pos);
      ResetSide.delNull(this.Tab.area);
    } else if (To.gid === $G.uid){
      // 放置
      ToSide[To.fn](tab,$G,To.pm,this.Cols.pos);
      ResetSide.delNull(this.Tab.area);
      if ($G.parent.ctx.floatRoot){
        ResetSide.floatPos($G);
      }
    }
    // 保存
    NuiLtState.saveFn();
  }
}