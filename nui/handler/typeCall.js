// 类型判断
const types = {
  Str: 'String',
  Num: 'Number',
  Bool: 'Boolean',
  Un: 'Undefined',
  Null: 'Null',
  Fun: 'Function',
  Arr: 'Array',
  Obj: 'Object',
  Date: 'Date'
};

const typeCall = function(obj){
  return toString.call(obj).slice(8,-1);
};

/**
 * 为函数提前绑定前置参数（柯里化）
 * @param {Function} fn 要绑定的函数
 * @param {...Array} cargs cargs
 * @return {Function}
 */

// typeCall.curry = function(fn,...cargs){
//   return function(...rargs){
//     const args = cargs.concat(rargs);
//     return fn.apply(this,args);
//   };
// };

// 空对象
typeCall.isEmpty = function(v){
  if (v === null || v === undefined){
    return true;
  }
  for (const key in v){
    if (hasOwnProperty.call(v,key)){
      return false;
    }
  }
  return true;
};

for (const k in types){
  const v = types[k];
  typeCall[`is${k}`] = function(obj){
    return toString.call(obj) == `[object ${v}]`;
  };
}

export default typeCall;

