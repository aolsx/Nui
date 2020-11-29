import copy from './copy';
import popup from './popup';
import load from './load';
import dee from './dee';
import typeCall from "./typeCall";
import lang from './lang';
import dragSize from './dragSize';
// navigator 浏览器对象

// 常用方法
// 等待{t 毫秒}
const sleep = function(t){
  return new Promise(resolve=>{
    setTimeout(()=>resolve(),t);
  });
};

export default {
  sleep,
  copy,
  dragSize,
  dee,
  ...popup,
  ...load,
  typeCall,
  lang
};
