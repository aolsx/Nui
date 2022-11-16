// 导入封装的工具
import handlers from './handler';
// 导入模块 组件
import components from './packages';
// 导入样式
import './assets/style/index.css';

// 实例化之后 安装
export default function(app){
    // 挂载全局 handler
    app.config.globalProperties.$Nui = handlers;
    // 遍历注册全局组件
    components.map(component=>app.component(component.name,component));
};