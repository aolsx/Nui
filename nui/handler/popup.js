// 取消
const attrs = {
  d: ['color-gy','nui-icon-question'],
  // 信息
  i: ['color-bl','nui-icon-info'],
  // 警告
  w: ['color-yl','nui-icon-exclamation'],
  // 错误
  e: ['color-red','nui-icon-exclamation-triangle'],
  // 正确
  s: ['color-gn','nui-icon-shield-check'],
  // 疑问
  q: ['color-dm','nui-icon-question']
};
// 问询确认
const ConfirmArr = {v: []};
const cfm = function(msg,type){
  const arr = type && attrs[type] || attrs.d;
  const state = {
    id: Date.now(),
    pm: {
      color: arr[0],
      icon: arr[1],
      msg
    },
    // onPromise: null,
    // onCancel: null
  };
  // resolve, reject
  return new Promise((resolve)=>{
    state.onConfirm = resolve;
    // state.onCancel = reject;
    ConfirmArr.v.push(state);
  });
};
for (const type of ['d','i','w','e','s','q']){
  cfm[type] = function(info){
    return cfm(info,type);
  };
}

// 消息
const MsgArr = {v: []};
const msg = function(msg,time = 3000,type){
  const arr = type && attrs[type] || attrs.d;
  const state = {
    id: Date.now() + Math.random(),
    pm: {
      color: arr[0],
      icon: arr[1],
      msg,
      time,
    }
  };
  MsgArr.v.unshift(state);
};
for (const type of ['d','i','w','e','s','q']){
  msg[type] = function(info,time){
    msg(info,time,type);
  };
}

// 菜单
let MenuResolve = null;
const handlerMenu = {
  _onResolve(name){
    if (MenuResolve){
      MenuResolve(name);
      MenuResolve = null;
    }
  },
  // 组件内复写
  setDatas(){}
};
const menu = function(arr,pos,line = false){
  // 存在则回调一次取消
  handlerMenu._onResolve(null);
  handlerMenu.setDatas(arr,pos,line);
  const newPm = new Promise((resolve)=>{
    MenuResolve = resolve;
  });
  // reject
  return newPm;
};

// 抛物线
const ParabolaArr = {v: []};
/**
 * @param {Object} pm 参数
 * @param {Number} pm.time 动画时间
 * @param {Object} pm.pos 开始坐标 {x,y}
 * @param {Object} pm.to 开始坐标 {x,y}
 * @param {String} pm.icon 内置图标
 * @param {String} pm.cls 外加样式
 */
const paa = function(pm){
  const id = Date.now() + Math.random();
  let time;
  // 根据距离计算时间
  if (!pm.time){
    const dx = Math.abs(pm.pos.x - pm.to.x);
    const dy = Math.abs(pm.pos.y - pm.to.y);
    var dis = Math.sqrt(Math.pow(dx,2) + Math.pow(dy,2));
    // 去除小数点后的数字，这样看起来舒服
    time = parseInt(dis * .6);
    // console.log(time);
  } else {
    time = pm.time;
  }
  if (time < 100){
    time = 100;
  }
  ParabolaArr.v.push({
    id,
    time,
    ...pm
  });
};

export {handlerMenu,MsgArr,ConfirmArr,ParabolaArr};
export default {
  cfm,
  msg,
  menu,
  paa,
};
