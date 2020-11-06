import {NuiLtState} from './state';
// 嵌套布局模式方法类
// 基础方法
const Basic = {
  // 百分比单位转换
  perToPx(total,cols){
    // 可能存在剩余 补给最后一个
    let dn = total;
    for (const col of cols){
      col.pos.flex = (col.pos.flex * total).toFixed(5) * 1;
      dn -= col.pos.flex;
    }
    if (dn > 0){
      cols[cols.length - 1].pos.flex += dn;
    }
  },
  pxToPer(total,cols){
    for (const col of cols){
      col.pos.flex = (col.pos.flex / total).toFixed(5) * 1;
    }
  },
  getEleVue(el){
    const onVue = el._vei?.on_vue || el.parentElement?._vei?.on_vue;
    return onVue.value();
  },
  getEleNodeKey(el){
    // @_nodeKey="()=>[tk,k]"
    return el._vei.on_nodeKey.value();
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
  }
};
// 搜索布局
const SearchNested = function(ptCols){
  for (let [k,c] of ptCols.entries()){
    // 空的 tabs
    if (c.col){
      const nullKey = c.col.tabs.findIndex((v)=>v == 'NULL');
      if (nullKey !== -1){
        c.col.tabs.splice(nullKey,1);
        if (!c.col.active && c.col.tabs.length){
          c.col.active = c.col.tabs[0];
        }
      }
      if (c.col.tabs.length === 0){
        throw {fn: 'delCol',k,ptCols};
      }
    }
    else if (c.cols){
      // 提升
      if (c.cols.length === 1){
        if (c.cols[0].col){
          throw {fn: 'upCol',k,ptCols};
        } else if (c.cols[0].cols){
          throw {fn: 'upCols',k,ptCols};
        }
      }
      SearchNested(c.cols);
    } else {
      throw {msg: 'notData',k,ptCols};
    }
  }
};
// 嵌套 重置布局
const ResetNested = {
  // 删除 Col 重置占位
  delCol({k,ptCols}){
    const {pos: {flex}} = ptCols[k];
    ptCols.splice(k,1);
    // 如果小于一等待下一轮提升
    if (ptCols.length > 1){
      const fx = flex / ptCols.length;
      for (const c of ptCols){
        const newF = (c.pos.flex + fx).toFixed(5) * 1;
        c.pos.flex = newF > 1 ? 1 : newF;
      }
    }
  },
  // 提升Col 到上层
  upCol({k,ptCols}){
    const {cols,pos} = ptCols[k];
    const col = cols[0].col;
    ptCols.splice(k,1,{pos,col});
  },
  // 拆分Cols 到上层
  upCols({k,ptCols}){
    const {cols,pos} = ptCols[k];
    const acCols = cols[0].cols;
    for (const c of acCols){
      const newF = (c.pos.flex * pos.flex).toFixed(5) * 1;
      c.pos.flex = newF > 1 ? 1 : newF;
    }
    ptCols.splice(k,1,...acCols);
  },
  check(loop = 0){
    // 最大次数 防止死循环
    if (loop > 10){
      throw 'max Check Layout!';
    }
    try {
      SearchNested(NuiLtState.state.cols);
    } catch (e){
      if (e.fn){
        this[e.fn](e);
        this.check(++loop);
      } else {
        throw e;
      }
    }
  }
};
// 嵌套 放置
const ToNested = {
  toTab(tab,$Cve,pm){
    const col = $Cve.col;
    col.active = tab;
    col.tabs.splice(pm.tokey,0,tab);
  },
  toTabs(tab,$Cve){
    const col = $Cve.col;
    col.active = tab;
    col.tabs.push(tab);
  },
  // 重构插入
  toInsert(tab,$Cve,pm){
    const cols = $Cve.$parent.cols;
    let flex = 0;
    for (const c of cols){
      const r = c.pos.flex * .2;
      c.pos.flex -= r;
      flex += r;
    }
    const newCol = {
      col: {active: tab,tabs: [tab]},
      pos: {flex}
    };
    cols.splice(pm.tokey + pm.isDown,0,newCol);
  },
  // 重构原地拆分
  toSplit(tab,$Cve,pm){
    const cols = $Cve.$parent.cols;
    const col = $Cve.col;
    const flex = $Cve.pos.flex;
    const newCol = {
      col: {active: tab,tabs: [tab]},
      pos: {flex: .5}
    };
    const oldCol = {
      col: {active: col.active,tabs: [...col.tabs]},
      pos: {flex: .5}
    };
    const newCols = {
      cols: pm.isDown ? [oldCol,newCol] : [newCol,oldCol],
      pos: {flex}
    };
    cols.splice(pm.tokey,1,newCols);
  },
  toRoot(tab,$Cve,pm){
    const cols = $Cve.cols;
    const newCol = {
      col: {active: tab,tabs: [tab]},
      pos: {flex: .2}
    };
    const oldCols = {
      cols: [...cols],
      pos: {flex: .8}
    };
    $Cve.$parent.layout.vertical = !$Cve.vertical;
    if (pm.isDown){
      cols.splice(0,cols.length,oldCols,newCol);
    } else {
      cols.splice(0,cols.length,newCol,oldCols);
    }
  }
};
// 嵌套 检查放置区域
const ClickNested = {
  clickTab(el,aTab){
    const $ColVe = Basic.getEleVue(el);
    const cid = $ColVe.$.uid;
    let [tokey] = Basic.getEleNodeKey(el);
    const isBrother = cid === aTab.cid;
    // '忽略自身'
    if (isBrother && tokey === aTab.key){
      return;
    }
    const pos = Basic.getElePos(el);
    // 同组
    if (isBrother && tokey === aTab.key + 1){
      // 下紧邻
      pos.left = pos.right;
      tokey += 1;
    }
    pos.top += 4;
    pos.width = 4;
    pos.height -= 4;
    Basic.setArea(1,pos);
    return {
      fn: 'toTab',
      cid,
      pm: {tokey}
    };
  },
  clickTabs(el,aTab){
    const $ColVe = Basic.getEleVue(el);
    const cid = $ColVe.$.uid;
    // 同组最后一个忽略
    if (cid === aTab.cid && aTab.last){
      return;
    }
    const pos = Basic.getElePos(el.lastElementChild);
    pos.width = 4;
    pos.left = pos.right;
    pos.top += 4;
    pos.height -= 4;
    Basic.setArea(1,pos);
    return {
      fn: 'toTabs',
      cid
    };
  },
  clickPanel(el,aTab,e){
    const $ColVe = Basic.getEleVue(el);
    const cid = $ColVe.$.uid;
    // 同面板 独苗 忽略内拆
    if (cid === aTab.cid && aTab.only){
      return;
    }
    const ckey = $ColVe.$.vnode.key;
    const vc = $ColVe.vertical;
    const pos = Basic.getElePos(el);
    const trH = pos.height * .4;
    const isDown = e.offsetY > trH ? 1 : 0;
    // 独苗上紧邻下 忽略 || !isDown && ckey === aTab.ckey + 1
    if (aTab.only && $ColVe.$parent.$.uid === aTab.csid && !vc && isDown && ckey === aTab.ckey - 1){
      return;
    }
    if (isDown){
      pos.top = pos.bottom - trH;
    }
    pos.height = trH;
    Basic.setArea(1,pos);
    return {
      fn: vc ? 'toSplit' : 'toInsert',
      cid,
      pm: {tokey: ckey,isDown}
    };
  },
  clickCol(el,aTab,e){
    const $ColVe = Basic.getEleVue(el);
    const cid = $ColVe.$.uid;
    const pos = Basic.getElePos(el);
    const tokey = $ColVe.$.vnode.key;
    const vc = $ColVe.vertical;
    let isDown = e.offsetX > pos.width * .5 ? 1 : 0;
    if ($ColVe.col || $ColVe.vertical){
      pos.width = 10;
      if (isDown){
        pos.left = pos.right - 5;
      } else {
        pos.left -= 5;
      }
    }
    // 左右
    if ($ColVe.col){
      // 同面板 独苗 忽略内拆
      if (aTab.only && cid === aTab.cid || ($ColVe.$parent.$.uid === aTab.csid && (isDown && tokey === aTab.ckey - 1 || !isDown && tokey === aTab.ckey + 1))){
        return;
      }
      Basic.setArea(1,pos);
      return {
        fn: !vc ? 'toSplit' : 'toInsert',
        cid,
        pm: {tokey,isDown}
      };
    }
    if (!vc){
      pos.top = pos.bottom - 16;
      pos.height = 16;
      isDown = 1;
    }
    Basic.setArea(1,pos);
    return {
      fn: $ColVe.root ? 'toRoot' : 'toInsert',
      cid,
      pm: {tokey,isDown}
    };
  }
};
const ClickCallMatch = {
  tab: 'clickTab',
  tabs: 'clickTabs',
  panel: 'clickPanel',
  col: 'clickCol'
};
// 嵌套 拖拽改变布局
export class NuiLayoutNdDrag{
  constructor(el){
    // 拿到触发 Tab 各种参数
    const $ColVe = Basic.getEleVue(el);
    const [key] = Basic.getEleNodeKey(el);
    const cid = $ColVe.$.uid;
    const Tabslen = $ColVe.col.tabs.length;
    this.Cols = $ColVe.col;
    this.Tab = {
      key,
      last: Tabslen === key + 1,
      only: Tabslen === 1,
      cid,
      ckey: $ColVe.$.vnode.key,
      csid: $ColVe.$parent.$.uid
    };
    this.toObj = null;
    this.bindingEve();
    NuiLtState.area.hide = false;
  }
  bindingEve(){
    document.body.classList.add('nui-drag-model','nui-drag-lutnd');
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
    document.body.classList.remove('nui-drag-model','nui-drag-lutnd');
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
    const lue = e.target.attributes.lutype?.value;
    if (!lue){
      return;
    }
    const clickFn = ClickCallMatch[lue];
    this.toObj = ClickNested[clickFn](e.target,this.Tab,e);
  }
  eveDrop(e){
    if (!this.toObj){
      return;
    }
    const $ColVe = Basic.getEleVue(e.target);
    if (this.toObj.cid === $ColVe.$.uid){
      // 标记删除
      const tabs = this.Cols.tabs;
      const tab = tabs[this.Tab.key];
      tabs[this.Tab.key] = 'NULL';
      // tab 是激活状态
      if (this.Cols.active === tab){
        this.Cols.active = '';
      }
      // 放置
      ToNested[this.toObj.fn](tab,$ColVe,this.toObj.pm);
      // 重置布局
      ResetNested.check();
      // 保存
      NuiLtState.saveFn();
    }
  }
}

// 拖拽改变布局占位 嵌套+侧边
export class NuiLayoutColSize{
  constructor(e,{ptSize,colsArr,curIndex,vertical}){
    const min = NuiLtState.cfg;
    this.colsArr = colsArr;
    // 指针
    this.curIndex = curIndex;
    this.plusK = curIndex;
    this.minusK = curIndex - 1;
    this.setPlusPos();
    this.setMinusPos();
    // 绑定事件
    let ptv,cursor;
    if (vertical){
      // 最大锚点
      this.minEv = ptSize.left + curIndex * min.minW;
      this.maxEv = ptSize.right - (colsArr.length - curIndex) * min.minW;
      cursor = 'col-resize';
      ptv = ptSize.width;
      let oldX = e.clientX;
      document.onmousemove = (e)=>{
        const v = e.clientX;
        this.move(oldX - v,v,min.minW);
        oldX = v;
      };
    } else {
      // 最大锚点
      this.minEv = ptSize.top + curIndex * min.minH;
      this.maxEv = ptSize.bottom - (colsArr.length - curIndex) * min.minH;
      cursor = 'row-resize';
      ptv = ptSize.height;
      let oldY = e.clientY;
      document.onmousemove = (e)=>{
        const v = e.clientY;
        this.move(oldY - v,v,min.minH);
        oldY = v;
      };
    }
    Basic.perToPx(ptv,colsArr);
    document.body.style.cursor = cursor;
    document.body.classList.add('nui-drag-model');
    document.onmouseup = ()=>{
      Basic.pxToPer(ptv,this.colsArr);
      this.destroy();
    };
  }
  setMinusPos(){
    this.mPos = this.colsArr[this.minusK].pos;
  }
  setPlusPos(){
    this.pPos = this.colsArr[this.plusK].pos;
  }
  move(v,ev,min){
    let minusV,plusV;
    // 左
    if (v > 0){
      if (this.maxEv < ev){
        return false;
      }
      if (this.plusK != this.curIndex){
        this.plusK = this.curIndex;
        this.setPlusPos();
      }
      if (this.minusK >= this.curIndex){
        this.minusK = this.curIndex - 1;
        this.setMinusPos();
      }
      if (this.mPos.flex === min){
        if (this.minusK === 0){
          return false;
        }
        // 前跳
        this.minusK -= 1;
        this.setMinusPos();
      }
      minusV = this.mPos.flex - v;
      plusV = this.pPos.flex + v;
    }
    // 右
    else {
      if (this.minEv > ev){
        return false;
      }
      if (this.plusK != this.curIndex - 1){
        this.plusK = this.curIndex - 1;
        this.setPlusPos();
      }
      if (this.minusK < this.curIndex){
        this.minusK = this.curIndex;
        this.setMinusPos();
      }
      if (this.mPos.flex === min){
        if (this.minusK === this.colsArr.length - 1){
          return false;
        }
        // 后跳
        this.minusK += 1;
        this.setMinusPos();
      }
      minusV = this.mPos.flex + v;
      plusV = this.pPos.flex - v;
    }
    if (minusV <= min){
      plusV -= min - minusV;
      minusV = min;
    }
    this.mPos.flex = minusV;
    this.pPos.flex = plusV;
    return true;
  }
  // 销毁
  destroy(){
    NuiLtState.saveFn();
    document.body.classList.remove('nui-drag-model');
    document.body.style.cursor = '';
    document.onmousemove = null;
    document.onmouseup = null;

    this.mPos = null;
    this.pPos = null;
    this.colsArr = null;
  }
}

