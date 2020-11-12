
// document.onselectionchange = function(){
//   const Selection = window.getSelection();
//   if (Selection.focusOffset > 0){
//     let str = Selection.toString();
//     str = str.trim();
//     // console.log(str.replace(/[\r\n]/g,""));
//     navigator.clipboard.writeText(str);
//     Selection.empty();
//   }
//   // console.log(e);
//   // document.execCommand('copy');
//   // window.getSelection().empty();
//   // window.getSelection().removeAllRanges();
// };

export default function(v){
  // 对象 数组 转 字符串
  if (typeof v !== 'string'){
    v = JSON.stringify(v,null,2);
  }
  // writeText
  navigator.clipboard.writeText(v);
  window.getSelection().empty();
}
