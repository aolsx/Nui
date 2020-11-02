import dee from './dee';
const LoadAmState = {
  v: {
    isPlay: false
  },
};
// 防抖800
const loadAm = {
  dee: null,
  // 重新定义防抖函数
  setDee(time){
    if (this.dee){this.dee.cancel()}
    this.dee = dee.debounce(function(type){
      LoadAmState.v.isPlay = type;
    },time);
  },
  show(){
    LoadAmState.v.isPlay = true;
  },
  hide(){
    LoadAmState.v.isPlay = false;
  }
};
loadAm.setDee(500);
// const GoFrame = self.requestAnimationFrame;
// const CclFrame = self.cancelAnimationFrame;
// Pro Load
// 组件载入响应式
const ProItemArr = {v: []};

class NuiLoadPro{
  constructor(params,msg){
    // 动画过度到
    this.amToNum = 0;
    this.amFrame = null;
    this.isHide = false;
    // 构造对象
    ProItemArr.v.push({
      id: Date.now(),
      params,
      open: true,
      msg,
      pro: 0
    });
    this.item = ProItemArr.v[ProItemArr.v.length - 1];
    // resolve, reject
    // zoomfade 动画完成
    return new Promise((resolve)=>{
      setTimeout(()=>{
        resolve(this);
      },300);
    });
  }
  _amPlay(){
    if (this.item){
      if (this.item.pro < this.amToNum){
        this.item.pro += 1;
        this.amFrame = requestAnimationFrame(this._amPlay.bind(this));
      } else {
        this._amStop();
        this.item.pro === 100 && this._autoHide();
      }
    }
  }
  _amStop(){
    this.amFrame && cancelAnimationFrame(this.amFrame);
    this.amFrame = null;
  }

  to(num,msg){
    if (this.isHide){
      return;
    }
    num = Math.round(num);
    num = num < 0 ? 0 : num > 100 ? 100 : num;
    if (msg){
      this.item.msg = msg;
    }
    if (num > this.amToNum){
      this.amToNum = num;
      // 启动动画
      if (!this.amFrame){
        this._amPlay();
      }
    } else if (num === 100){
      // 完成自动 隐藏
      this._autoHide();
    }
  }

  onComplete(){
    // 默认回调复写;
  }

  _delItem(){
    const k = ProItemArr.v.findIndex(item=>item.id === this.item.id);
    if (k !== -1){
      ProItemArr.v.splice(k,1);
    }
    this.item = null;
    this.onComplete();
  }
  // 无返回数据
  _autoHide(){
    if (this.isHide){
      return;
    }
    this.isHide = true;
    this._amStop();
    this.item.open = false;
    setTimeout(()=>{
      this._delItem();
    },300);
  }
  hide(num,msg){
    // 已关闭忽略
    if (this.isHide){
      return Promise.resolve();
    }
    this.isHide = true;
    this._amStop();
    return new Promise((resolve)=>{
      if (num || msg){
        if (num){
          this.item.pro = Math.round(num);
        }
        if (msg){
          this.item.msg = msg;
        }
        setTimeout(()=>{
          this.item.open = false;
        },1000);
        setTimeout(()=>{
          this._delItem();
          resolve();
        },1300);
      } else {
        this.item.open = false;
        setTimeout(()=>{
          this._delItem();
          resolve();
        },600);
      }
    });
  }
}

export {LoadAmState,ProItemArr,loadAm};

export default {
  loadAm,
  loadPro(pm,msg){
    return new NuiLoadPro(pm,msg);
  }
};