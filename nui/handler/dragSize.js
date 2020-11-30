// 拖拽调节尺寸
export default function(ck,cursor = ''){
  document.body.style.cursor = cursor;
  document.body.classList.add('nui-drag-model');
  document.onmousemove = (e)=>{
    ck(e.clientX,e.clientY,e.movementX,e.movementY);
  };
  document.onmouseup = ()=>{
    document.body.classList.remove('nui-drag-model');
    document.body.style.cursor = '';
    document.onmousemove = null;
    document.onmouseup = null;
  };
}