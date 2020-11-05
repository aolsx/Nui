const Basic = {
  getEleVue(el){
    if (el._vei && el._vei.on_vue){
      return el._vei.on_vue.value();
    }
    return el.parentElement._vei.on_vue.value();
  }
};
class NuiTreeDrag{
  constructor(ele,rootEle,child){
    this.childName = child;
    this.$RootEl = rootEle;
    const ve = Basic.getEleVue(ele);
    const arr = ve.$parent.tree || ve.$parent.item[this.childName];
    const key = ve.$.vnode.key;
    this.$ItemEl = ele;
    this.Item = {
      uid: ve.$.uid,
      pid: ve.$parent.$.uid,
      last: arr.length === key + 1,
      key,
      arr,
    };
    this.ToObj = null;
    this.bindingEve();
  }
  // 绑定事件
  bindingEve(){
    this.$ItemEl.parentElement.classList.add('--drop');
    this.$RootEl.classList.add('--drag');
    this.$RootEl.ondragenter = (e)=>{
      e.preventDefault();
      e.stopPropagation();
      this.eveDragenter(e.target);
    };
    this.$RootEl.ondragover = (e)=>{
      e.preventDefault();
      e.stopPropagation();
    };
    this.$RootEl.ondrop = (e)=>{
      e.preventDefault();
      e.stopPropagation();
      this.eveDrop(e.target);
      this.destroy();
    };
    this.$RootEl.ondragend = (e)=>{
      e.preventDefault();
      e.stopPropagation();
      this.destroy();
    };
  }
  destroy(){
    this.$ItemEl.parentElement.classList.remove('--drop');
    this.$RootEl.classList.remove('--drag');
    this.$RootEl.ondragenter = null;
    this.$RootEl.ondragover = null;
    this.$RootEl.ondrop = null;
    this.$RootEl.ondragend = null;
    for (const k in this){
      this[k] = null;
    }
  }
  eveDragenter(ele){
    this.ToObj = null;
    // 排除自身
    const ve = Basic.getEleVue(ele);
    if (ve.$.uid === this.Item.uid || ele.classList.contains("nui-tree")){
      this.$ItemEl.focus();
      return;
    }
    ele.focus();
    // ul 插入元素内部最下 否则插入上
    this.ToObj = {
      down: ele.tagName === 'UL',
      uid: ve.$.uid
    };
  }
  eveDrop(ele){
    const ToVe = Basic.getEleVue(ele);
    if (!this.ToObj || !ToVe || ToVe.$.uid !== this.ToObj.uid){
      return;
    }
    const im = this.Item.arr[this.Item.key];
    this.Item.arr[this.Item.key] = "NULL";
    // 主节点 或者 子节点
    if (this.ToObj.down){
      const ToArr = ToVe.tree || ToVe.item[this.childName];
      ToArr.push(im);
    } else {
      const key = ToVe.$.vnode.key;
      const ToArr = ToVe.$parent.tree || ToVe.$parent.item[this.childName];
      ToArr.splice(key,0,im);
    }
    const delK = this.Item.arr.findIndex(v=>v === 'NULL');
    this.Item.arr.splice(delK,1);
    this.Item.arr = null;
  }
}

export default function(ele,rootEle,child){
  new NuiTreeDrag(ele,rootEle,child);
}