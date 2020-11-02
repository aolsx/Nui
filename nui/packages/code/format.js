import hljs from '../../handler/plugin/highlight.min.js';
hljs.configure({
  classPrefix: 'nui-code--'
});
// hljs.addPlugin({
//   'before:highlightBlock': (args)=>{
//   }
// });
// hljs.debugMode();

export default function(Str,lang){
  let o;
  if (lang){
    o = hljs.highlight(lang,Str);
    // o = hljs.highlightAuto(Str);
  } else {
    o = hljs.highlightAuto(Str);
  }
  return {
    html: o.value,
    lang: lang || o.language
  };
}