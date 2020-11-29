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
  lang.obj = Msgs;
};

export default lang;