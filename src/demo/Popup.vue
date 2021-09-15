<template>
  <div class="nui-container --p">
    <div class="nui-row">
      <div class="nui-col-8">
        <div class="nui-row">
          <div class="nui-col-4">
            <h3>弹出块 <code>组件</code> <code>{{ evePop }}</code></h3>
            <nui-btn
              label="弹出块"
              class="color-sky"
              @click="popShow" />
            <nui-pop
              ref="pop"
              :w="200"
              :h="60"
              @open="evePop='eveOpen'"
              @close="evePop='eveClose'">
              <input
                type="text"
                style="background:#fff1">
              <br>
              <nui-btn
                label="提交测试"
                class="color-sky" />
            </nui-pop>
            <p />
            <nui-code
              lang="html"
              :code="codeObj.pop.html" />
            <h5>内联弹出 <code>组件</code></h5>
            <div class="m-in-25em">
              <nui-tip lt>
                <template #in>
                  左对齐
                </template>
                <div>显示内容</div>
              </nui-tip>
              <nui-tip class="color-red">
                <template #in>
                  默认中
                </template>
                <div>显示内容</div>
                <input type="text">
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
                  上对齐
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
            <h3>
              弹出菜单 <code>AIP </code>
              <code> Call: {{ menuCk }}</code>
            </h3>
            <div class="m-in-25em">
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
            <h3>加载动画 <code>AIP</code></h3>
            <div class="m-in-25em">
              <nui-btn
                class="color-gn"
                label="显示加载动画"
                @click="loadAm()" />
              <nui-btn
                class="color-gn"
                label="节流大于500"
                @click="loadAm(600)" />
              <nui-btn
                class="color-gn"
                label="节流小于不显示"
                @click="loadAm(400)" />
            </div>
            <p />
            <nui-code
              :code="codeObj.load.am" />
          </div>
          <div class="nui-col-8">
            <h3>加载进度 <code>AIP</code> <code>{{ loadToProstate }}</code></h3>
            <div class="m-in-25em">
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
        <h3>抛物曲线 <code>API</code></h3>
        <div class="m-in-25em">
          <nui-btn
            class="color-sky"
            label="默认"
            @click="paa" />
          <nui-btn
            class="color-sky"
            label="ms300"
            @click="paa($event,{time:300})" />
          <nui-btn
            class="color-sky"
            label="ms2000"
            @click="paa($event,{time:2000})" />
          <nui-btn
            class="color-sky"
            label="抛出图标"
            icon="nicon-cog"
            @click="paa($event,{cls:'bg-dm',icon:'nicon-cog'})" />
          <nui-btn
            class="bg-red"
            label="自定义cls"
            @click="paa($event,{cls:'bg-red'})" />
        </div>
        <p />
        <nui-code :code="codeObj.paa.js" />
        <h3>提示消息 <code>API</code></h3>
        <div class="m-in-25em">
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
        <div class="m-in-25em">
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
      icon="nicon-cog"
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
      eveTip: '',
      evePop: '',
      showPopEle: null,
      typeArr: ['d','i','w','e','s','q'],
      typeObj: {
        d: ['color-gy','nicon-question'],
        // 信息
        i: ['color-bl','nicon-info'],
        // 警告
        w: ['color-yl','nicon-exclamation'],
        // 错误
        e: ['color-red','nicon-exclamation-triangle'],
        // 正确
        s: ['color-gn','nicon-shield-check'],
        // 疑问
        q: ['color-dm','nicon-question']
      },
      menuCk: '',
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
          icon: 'nicon-cog',
          label: '菜单A',
          cls: 'color-gn',
          name: 'fnA'
        },
        {
          icon: 'nicon-cog',
          label: '菜单B',
          name: 'fnB'
        }
      ];
      const arrLine = [
        {
          icon: 'nicon-cog',
          cls: 'bg-gn',
          name: 'fnA'
        },
        {
          icon: 'nicon-cog',
          cls: 'bg-yl',
          name: 'fnB'
        }
      ];
      const pos = {
        top: e.clientY,
        left: e.clientX,
      };
      this.$Nui.menu(line ? arrLine : arr,pos,line)
        .then((name)=>{
          if (name){
            this.menuCk = name;
          } else {
            this.menuCk = '取消';
          }
        });
    },
    loadAm(t){
      if (t){
        this.$Nui.loadAm.dee(true);
        setTimeout(()=>{
          this.$Nui.loadAm.dee(false);
        },t);
      } else {
        this.$Nui.loadAm.show();
        setTimeout(()=>{
          this.$Nui.loadAm.hide();
        },3000);
      }
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
    },
    popShow(e){
      this.$refs.pop.open(e.target);
    },
    paa(e,pm){
      const pos = {
        x: e.clientX,
        y: e.clientY
      };
      // 0 - 1000 随机数
      const to = {
        x: Math.round(Math.random() * 1000),
        y: Math.round(Math.random() * 1000)
      };
      this.$Nui.paa({
        pos,
        to,
        ...pm
      });
    }
  }
};
</script>