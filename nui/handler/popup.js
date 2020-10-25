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
export const ConfirmArr = {v: []};
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
export const MsgArr = {v: []};
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

export const MenuObj = {
  v: {
    line: false,
    arr: [],
    pos: {}
  }
};
const menu = function(arr,pos,line = false){
  MenuObj.v.line = line;
  MenuObj.v.pos = pos;
  MenuObj.v.arr = arr;
};

export default {
  cfm,
  msg,
  menu
};
