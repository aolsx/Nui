import hljs from 'highlight.js';

hljs.configure({
  classPrefix: 'nui-code--'
});

// hljs.addPlugin({
//   'before:highlightBlock': (args)=>{
//   }
// });
// hljs.debugMode();

export default function(Str,language){
  let o;
  if (language){
    o = hljs.highlight(Str,{language,ignoreIllegals: true});
    // o = hljs.highlightAuto(Str);
  } else {
    o = hljs.highlightAuto(Str);
  }
  return {
    html: o.value,
    lang: language || o.language
  };
}