import typeCall from './typeCall';
// 抛出异常
let Msgs = {};
// 替换
const replace = function(source,data){
  return source.replace(/\$\{([\w.]+)\}/g,($0,$1)=>{
    const ref = $1.split('.');
    let refObject = data,level;
    while (refObject != null && (level = ref.shift())){
      refObject = refObject[level];
    }
    return refObject != null ? refObject : '';
  });
};
const lang = function(str,...params){
  const tArr = str.split('.');
  let msg = tArr.reduce(function(acc,key){return acc && key in acc ? acc[key] : null},Msgs);
  if (msg && typeCall.isStr(msg)){
    if (params.length){
      msg = replace(msg,params);
    }
    return msg;
  }
  return str;
};
lang.set = function(obj){
  Msgs = {...Msgs,...obj};
};

// lang.throw = function(err){
//   const obj = {msg: null,t: 'e'};
//   if (typeCc.isNum(err)){
//     obj.msg = Msgs[err] || Msgs.not + err;
//   } else if (typeCc.isArr(err) && typeCc.isNum(err[0])){
//     let msg = Msgs[err[0]] || Msgs.not + err[0];
//     if (err.length > 1){
//       err.splice(0,1);
//       msg = replace(msg,err);
//     }
//     obj.msg = msg;
//   } else if (typeCc.isStr(err)){
//     obj.msg = err;
//   }
//   if (obj.msg){
//     throw obj;
//   }
//   throw err;
// };

export default lang;