import { ComponentCustomProperties } from 'vue';

declare interface $Nui {
  /** 暂停时间 */
  sleep: (t: number) => Promise<any>;
  /** 复制到剪切板 */
  copy: (v: string | object | any[]) => void;
  /** 拖拽 回调 ck(x,y,mx,my)*/
  dragSize: (ck: Function, cursor?: string) => void;
  /** 节流防抖 */
  dee: {
    /** 防抖 */
    debounce: (func: Function, wait: number, options?: object) => void;
    /** 防抖 */
    throttle: (func: Function, wait: number, options?: object) => void;
  };
  /** 问询确认 'd','i','w','e','s','q' */
  cfm: {
    (msg: string, type: any): Promise<any>;
    d(msg: string): Promise<any>;
    i(msg: string): Promise<any>;
    w(msg: string): Promise<any>;
    e(msg: string): Promise<any>;
    s(msg: string): Promise<any>;
    q(msg: string): Promise<any>;
  };
  /** 弹出消息 */
  msg: {
    (msg: any, time: number, type: any): Promise<any>;
    d(msg: string): Promise<any>;
    i(msg: string): Promise<any>;
    w(msg: string): Promise<any>;
    e(msg: string): Promise<any>;
    s(msg: string): Promise<any>;
    q(msg: string): Promise<any>;
  };
  /** 弹出菜单 */
  menu: (arr: any[], pos: any, line?: boolean) => Promise<any>;
  /** 抛物线 pos/to {x,y} */
  paa(pm: {
    time: number;
    pos: { x: number, y: number; };
    to: { x: number, y: number; };
    icon: string;
    cls: string;
  }): void;

  /** 显示隐藏加载动画 */
  loadAm: {
    /** 防抖开关 默认 500*/
    dee(open: boolean): void;
    /** 重设防抖开关*/
    setDee(time: number): void;
    show(): void;
    hide(): void;
  };
  /** 加载进度 返回实例 */
  loadPro(params: object, msg: string): Function;
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $Nui:$Nui
  }
}

declare module 'aolsx-nui' {
  export const install: (v: any) => void;
}