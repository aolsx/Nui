<template>
  <div class="nui-container --p">
    <div class="nui-row">
      <div class="nui-col-8">
        <div class="nui-row">
          <div class="nui-col-4">
            <h3>弹出菜单 <code>AIP</code></h3>
            <div class="nui-btns">
              <nui-btn
                class="color-sky"
                label="点击垂直"
                @click="menuShow($event)" />
              <nui-btn
                class="color-sky"
                label="右键一行"
                @contextmenu.stop.prevent="menuShow($event,true)" />
            </div>
            <p />
            <nui-code
              :code="codeObj.menu.js" />
          </div>
          <div class="nui-col-4">
            <h3>弹框 <code>组件</code></h3>
            <nui-btn
              class="color-sky"
              label="开启MOD"
              @click="showMod = true" />
            <p />
            <nui-code
              lang="html"
              :code="codeObj.mod.html" />
          </div>
          <div class="nui-col-4">
            <h3>内联弹出 <code>组件</code></h3>
            <div class="nui-btns">
              <nui-tip>
                <template #in>
                  <nui-btn
                    class="color-sky"
                    label="默认中" />
                </template>
                <div>显示内容</div>
                <input type="text">
              </nui-tip>
              <nui-tip lt>
                <template #in>
                  左对齐
                </template>
                <div>显示内容</div>
              </nui-tip>
              <nui-tip
                rt
                :w="100"
                :h="100">
                <template #in>
                  右对齐
                </template>
                <div>显示内容</div>
              </nui-tip>
              <nui-tip tp>
                <template #in>
                  下对齐
                </template>
                <div>显示内容</div>
              </nui-tip>
            </div>
            <p />
            <nui-code
              lang="html"
              :code="codeObj.tip.html" />
          </div>
          <div class="nui-col-4">
            <h3>加载动画 <code>AIP</code></h3>
            <nui-btn
              class="color-gn"
              label="显示加载动画"
              @click="loadAm()" />
            <p />
            <nui-code
              :code="codeObj.load.am" />
          </div>
          <div class="nui-col-8">
            <h3>加载进度 <code>AIP</code> <code>{{ loadToProstate }}</code></h3>
            <div class="nui-btns">
              <nui-btn
                label="自动关闭"
                class="bg-gn"
                @click="loadToPro('a')" />
              <nui-btn
                label="手动关闭"
                class="bg-yl"
                @click="loadToPro('b')" />
              <nui-btn
                label="多个实例"
                class="bg-dm"
                @click="loadToPro('s')" />
            </div>
            <p />
            <nui-code
              :code="codeObj.load.js" />
          </div>
        </div>
      </div>
      <div class="nui-col-4">
        <h3>提示消息 <code>API</code></h3>
        <div class="nui-btns">
          <nui-btn
            v-for="t in typeArr"
            :key="t"
            :class="typeObj[t][0]"
            :icon="typeObj[t][1]"
            :label="`${t} 消`"
            @click="msgShow(`${t} 消息`,t)" />
          <nui-btn
            class="color-sky"
            label="取消时间"
            @click="msgShow('取消关闭','i',0)" />
        </div>
        <p />
        <nui-code
          :code="codeObj.msg.js" />
        <h3>问询确认 <code>API</code></h3>
        <div class="nui-btns">
          <nui-btn
            v-for="t in typeArr"
            :key="t"
            :class="typeObj[t][0]"
            :icon="typeObj[t][1]"
            :label="`${t} 问`"
            @click="confirm(`${t} 问询`,t)" />
        </div>
        <p />
        <nui-code
          :code="codeObj.confirm.js" />
      </div>
    </div>
    <nui-modal
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
    </nui-modal>
  </div>
</template>
<script>
import codeObj from "./datas/popup";
export default {
  name: 'DemoPopup',
  setup(){
    return {codeObj};
  },
  data(){
    return {
      typeArr: ['d','i','w','e','s','q'],
      typeObj: {
        d: ['color-gy','nui-icon-question'],
        // 信息
        i: ['color-bl','nui-icon-info'],
        // 警告
        w: ['color-yl','nui-icon-exclamation'],
        // 错误
        e: ['color-red','nui-icon-exclamation-triangle'],
        // 正确
        s: ['color-gn','nui-icon-shield-check'],
        // 疑问
        q: ['color-dm','nui-icon-question']
      },
      showMod: false,
      loadToProstate: ''
    };
  },
  methods: {
    async confirm(v,t){
      if (await this.$Nui.cfm[t](v)){
        this.$Nui.cfm.q('二次问询');
        // .then((isCm)=>{
        //   // console.log(isCm);
        // });
      } else {
        // console.log('取消');
      }
    },
    msgShow(v,t,tm){
      this.$Nui.msg[t](v,tm);
    },
    menuShow(e,line){
      const arr = [
        {
          icon: 'nui-icon-home',
          label: '菜单A',
          cls: 'color-gn',
          fn(){}
        },
        {
          icon: 'nui-icon-home',
          label: '菜单B',
          fn(){}
        }
      ];
      const arrLine = [
        {
          icon: 'nui-icon-home',
          cls: 'bg-gn',
          fn(){}
        },
        {
          icon: 'nui-icon-home',
          cls: 'bg-yl',
          fn(){}
        }
      ];
      const pos = {
        top: e.clientY,
        left: e.clientX,
      };
      this.$Nui.menu(line ? arrLine : arr,pos,line);
    },
    loadAm(){
      this.$Nui.loadAm.show();
      setTimeout(()=>{
        this.$Nui.loadAm.hide();
      },5000);
    },

    async loadToPro(type){
      this.loadToProstate = 'Start';
      // 异步方法 返回实例
      const Pro = await this.$Nui.loadPro({
        sz: 120, // 尺寸
        sw: 3, // 边宽
        bc: '#292c37', // 轨道颜色
        pc: '#8152ff', // 进度颜色
      },
      'load...');
      this.loadToProstate += '-Show';
      Pro.onComplete = ()=>{
        this.loadToProstate += '-AutoOver';
      };
      Pro.to(10);
      await this.$Nui.sleep(1000);
      Pro.to(40,'暂停1秒');
      this.loadToProstate += '-40';
      if (type == 's'){
        this.loadToProTwo();
      }
      if (type == 'a' || type == 's'){
        await this.$Nui.sleep(1000);
        this.loadToProstate += '-100';
        Pro.to(100,'自动关闭');
      } else if (type == 'b'){
        await this.$Nui.sleep(1000);
        this.loadToProstate += '-手动关闭';
        Pro.hide(100,'设置100并关闭').then(()=>{
          this.loadToProstate += '-HideOver';
        });
      }
    },
    async loadToProTwo(){
      // 异步方法 返回实例
      const Pro = await this.$Nui.loadPro({
        sz: 120, // 尺寸
        sw: 3, // 边宽
        bc: '#292c37', // 轨道颜色
        pc: 'red', // 进度颜色
      },
      'load...');
      Pro.onComplete = ()=>{
        this.loadToProstate += '-TowOver';
      };
      await this.$Nui.sleep(1000);
      Pro.to(60);
      await this.$Nui.sleep(1000);
      Pro.to(100,'自动关闭');
    }
  },
};
</script>