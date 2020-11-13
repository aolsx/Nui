const confirm = {
  js: `// 问询 API
// 类型 ['d','i','w','e','s','q']
// this.$Nui.cfm('文本',<类型>);
this.$Nui.cfm.[<类型>].('文本');
async function confirm(){
  const isOk=await this.$Nui.cfm.d('问询');
  if (isOk ){ ... } // 确认
  else { ... } // 取消
}
// 或者
function confirm(){
  this.$Nui.cfm.q('问询')
  .then((isOk)=>{
    if (isOk ){ ... } // 确认
    else { ... } // 取消
  });
}`,
};
const msg = {
  js: `// 类型 ['d','i','w','e','s','q']
// Time 关闭时间 默认3000ms
this.$Nui.msg.[<类型>]('消息',<Time>)`,
};

const mod = {
  html: `<nui-modal
  v-if="showMod"
  v-slot="{ hideFn }"
  icon="nui-icon-home"
  label="Title"
  color="color-gn"
  @close="showMod = false">
  <div>
    <nui-btn
      class="color-sky"
      label="关闭MOD"
      @click="hideFn()" />
  </div>
</nui-modal>`,
};
const menu = {
  js: `const arr = [{
  name:'xxx' // 方法识别
  icon: 'nui-icon-home',
  label: '菜单A ',
  cls: 'color-gn'}];
const pos = {
  top:e.clientY,
  left:e.clientX
};
// line行模式
this.$Nui.menu(arr,pos,line)
  .then((name)=>{
    if (!name){}// 取消
  });`
};

const load = {js: `async loadToPro(type){
    // 异步方法返回实例 等待呈现动画
    const Pro = await this.$Nui.loadPro({
      sz: 120,       // 尺寸
      sw: 3,         // 边宽
      bc: '#292c37', // 轨道颜色
      pc: '#8152ff', // 进度颜色
    },'附加文字信息');
    Pro.onComplete = ()=>{}; // 完成回调
    Pro.to(10);              // 设置进度
    Pro.to(40,'暂停1秒');    // 设置进度和附加信息
    Pro.to(100,'自动关闭');  // TO 100自动关闭
    // 强制完成回调
    Pro.hide(100,'设置100并关闭').then(()=>{});
}`,
am: `loadAm(){
  // 节流 默认 500 毫秒
  this.$Nui.loadAm.dee(true);
  this.$Nui.loadAm.dee(false);
  // 重新设置间隔时间
  this.$Nui.loadAm.setDee(500);

  // 直接显示
  this.$Nui.loadAm.show();
  this.$Nui.loadAm.hide();
}`};

const tip = {
  html: `<!-- 方向 lt|rt|tp 尺寸 w|h -->
<nui-tip lt :h="100" :w="210">
  <template #in>显示内容</template>
  <!-- 弹出内容-->
</nui-tip>`
};
const pop = {
  html: `<!-- $ref.pop.[open(e)|close()]-->
<nui-pop ref="pop" :h="100" :w="210"
@open="" @close="">
</nui-pop>`
};

const paa = {
  js: `paa(e,pm){
  this.$Nui.paa({
    pos: {x,y}, // 起点坐标
    to: {x,y},  // 终点坐标
    time: 2000, // 持续时间
    icon: 'icon', // 内置图标
    cls:'bg-color', // 外加样式
  });
}`
};

export default {
  confirm,
  msg,
  mod,
  menu,
  load,
  tip,
  pop,
  paa
};