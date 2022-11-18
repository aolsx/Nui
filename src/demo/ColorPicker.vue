<template>
  <div class="-full nui-flex demo-color-picker">
    <div class="nui-flex-auto nui-flex --cc --v nui-container --p">
      <!-- 主输入色板 -->
      <div
        class="nui-card"
        style="height:90px;width:700px">
        <div class="nui-flex nui-flex-auto">
          <div
            v-for="g in CoKeys"
            :key="g.m"
            class="nui-flex-auto -link"
            :style="{backgroundColor:CoDs[g.m].cmp.value.hex}" 
            @click="CoMain.lock = CoMain.lock!=g.m?g.m:''" />
        </div>
        <div class="nui-card-foot nui-flex p-none">
          <div
            v-for="g in CoKeys"
            :key="g.m"
            class="nui-flex-auto nui-flex --vc --hb p-lr-5 tt-bd"
            :class="{'b-l':!!g.k}"
            @click="$Nui.copy(CoDs[g.m].cmp.value.hex)">
            <span class="p-5">{{ g.m }}</span>
            <span
              class="tt-copy tt-cb p-5"
              :style="{color:CoDs[g.m].cmp.value.hex}">{{ CoDs[g.m].cmp.value.hex }} </span>
            <i
              v-show="CoMain.lock==g.m"
              class="nicon-lock" />
          </div> 
        </div>
      </div>
      <!-- 主输入色板 END -->
      <div
        class="nui-flex m-t-15"
        style="width:700px">
        <!-- 主面板 -->
        <div class="nui-card h6 p-none nui-col-3">
          <div class="nui-card-head bg-atom --dks">
            <span>基准色</span>  
            <!-- <div
              class="nui-btn"
              @click="normLight()">
              <span>标准化</span>
            </div> -->
          </div>
          <div class="nui-card-body bg-atom --dker p-t-10">
            <div class="p-tb-10">
              <nui-form-num
                v-model="CoMainCmp.hsl.h"
                color="--pro-bg-none"
                rg
                :rg-bind="{class:'bg-rainbow',style:CoMainCmp.style.h}"
                :rules="{min:0,max:360}"
                show-num />
            </div>
            <div class="p-tb-10">
              <nui-form-num
                v-model="CoMainCmp.hsl.s"
                color="--pro-bg-none"
                rg
                :rg-bind="{style:CoMainCmp.style.s}"
                :rules="{min:0,max:100}"
                show-num />
            </div>
            <div class="p-tb-10">
              <nui-form-num
                v-model="CoMainCmp.hsl.l"
                color="--pro-bg-none"
                rg
                :rg-bind="{style:CoMainCmp.style.l}"
                :rules="{min:0,max:100}"
                show-num />
            </div>
            <div class="p-10">
              <label class="nui-form-str">
                <input
                  ref="inputHex"
                  class="nui-form-input"
                  pattern="^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$"
                  type="text"
                  :value="CoMainCmp.hex"
                  @change="getInputValue($event.target)">
                <div class="nui-form-input-bg" />
              </label>
            </div>
          </div>
        </div>
        <!-- 主面板 END -->
        <!-- 饱和 / 亮度 -->
        <div class="nui-card h6 p-none nui-col m-lr-10">
          <div class="nui-card-head bg-atom --dks">
            <div>饱和 / 亮度</div>
            <div
              class="nui-btn"
              @click="scaleLight()">
              <span>平均化</span>
            </div>
            <div
              class="nui-btn"
              @click="upGpColor(CoMainCmp.hex)">
              <i class="nicon-undo-alt" />
            </div>
          </div>
          <div class="nui-card-body bg-atom --dker p-t-10">
            <div
              v-for="g in CoKeys"
              :Key="g.m" 
              class="nui-flex p-t-15 p-b-5"
              :class="{'b-t':!!g.k}">
              <nui-form-num
                v-model="CoDs[g.m].hsl.s"
                color="color-it --pro-op-none"
                :dd="!!CoMain.lock"
                rg
                :rules="{min:0,max:100}"
                show-num
                :style="{color:CoDs[g.m].cmp.value.hex}" />
              <nui-form-num
                v-model="CoDs[g.m].hsl.l"
                color="color-it --pro-op-none"
                :dd="!!CoMain.lock"
                rg
                :rules="{min:0,max:100}"
                show-num
                :style="{color:CoDs[g.m].cmp.value.hex}" />
              <div
                class="tt-bd"
                style="width:30px;">
                {{ g.m }}
              </div>
            </div>
          </div>
        </div>
        <!-- 饱和 / 亮度 END -->
        <!-- css -->
        <div class="nui-card bg-atom --dks h6 p-none nui-col-3">
          <div class="b-b p-5 p-lr-10 nui-flex --hb --vc">
            <span class="nui-col-none color-atom">生成</span>
            <nui-form-str
              v-model="CoMain.colorName"
              info="颜色名称"
              style="height:20px;width:80px;flex:none" />
          </div>
          <nui-code
            class="-full bg-none"
            :code="RenCss"
            lang="css" />
        </div>
        <!-- css END-->
      </div>
    </div>
    <!-- 色表-->
    <div class="bg-atom --dks nui-flex">
      <div
        class="nui-flex-none tt-c nui-flex --v"
        style="width:50px">
        <div
          class="tt-c p-10 b-b -link h3"
          @click="CoPt.op = !CoPt.op">
          <i
            v-if="CoPt.op"
            class="nicon-angle-double-right color-og" />
          <i
            v-else
            class="nicon-angle-double-left color-bl" />
        </div>
        <div
          class="tt-c p-10 b-b -link h3 tt-bd"
          @click="CoPt.isA = !CoPt.isA,CoPt.k=0">
          <span>{{ CoPt.isA?'A':'B' }}</span>
        </div>
        <div class="nui-container col">
          <div
            v-for="(co,k) in CoList"
            :key="k">
            <span
              class="nui-badge m-t-10 -link"
              :style="`width:20px;height:20px;background-color:${co.list[500]};border-radius:${CoPt.k==k?'4px':'50%'}`"
              @click="CoPt.op = true,CoPt.k=k" />
          </div>
        </div>
      </div>
      <div
        v-if="CoPt.op"
        class="nui-flex-auto b-l nui-container p-lr-10 nui-show-range-thumb"
        style="width:120px">
        <h4 :style="`color:${CoList[CoPt.k].list[500]}`">
          {{ CoList[CoPt.k].name }}
        </h4>
        <div
          v-for="(co,k) in CoList[CoPt.k].list"
          :key="k"
          class="nui-card m-b-10 -sdw-none"
          style="height:55px">
          <div
            class="nui-card-body -link"
            :style="`background-color:${co}`"
            @click="upCoHsl(co)" />
          <div class="nui-card-foot tt-c">
            <b>{{ k }}</b>
            <b
              class="tt-copy tt-r tt-cb"
              @click="$Nui.copy(co)">{{ co }}</b>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// watch,
import {defineComponent,reactive,computed} from 'vue';
import {CoListA,CoListB,CoAPI} from './colorPicker';
export default defineComponent({
  name: 'DemoColorPicker',
  setup(){
    const CoKeys = [
      {m: 'lter',k: 0},
      {m: 'lt',k: 1},
      {m: 'co',k: 2},
      {m: 'dk',k: 3},
      {m: 'dker',k: 4},
    ];
    const CoDs = {};
    for (const {m} of CoKeys){
      const hsl = reactive({h: 0,s: 50,l: 50});
      const cmp = computed(()=>{
        // const css = `hsl(${hsl.h},${hsl.s}%,${hsl.l}%,1)`;
        const hex = CoAPI.HslToHex(hsl);
        return {hex};
      });
      CoDs[m] = {hsl,cmp};
    }
    // 主色
    const CoMain = reactive({
      hsl: {h: 0,s: 50,l: 50},
      /** 锁定一个阶梯 */
      lock: '',
      colorName: '',
    });
    const CoMainCmp = computed(()=>{
      const t = CoMain.lock;
      const hsl = t ? CoDs[t].hsl : CoMain.hsl;
      const hex = t ? CoDs[t].cmp.value.hex : CoAPI.HslToHex(CoMain.hsl);
      const vdln = "linear-gradient";
      const style = {
        h: {color: `hsl(${hsl.h},100%,50%)`},
        s: {color: `hsl(${hsl.h}, ${hsl.s}%, 50%)`,
          background: `${vdln}(to right,hsl(${hsl.h},0%, 50%),hsl(${hsl.h},100%, 50%))`},
        l: {color: `hsl(${hsl.h}, 100%, ${hsl.l}%)`,
          background: `${vdln}(to right,#000,hsl(${hsl.h},100%, 50%),#FFF)`},
      };
      
      return {style,hex,hsl};
    });
    // 输出样式
    const RenCss = computed(()=>{
      const pix = CoMain.colorName || 'xx';
      const cm = `--${pix}-co`;
      let root = '';
      for (const {m} of CoKeys){
        const hex = CoDs[m].cmp.value.hex;
        if (m === 'co'){
          root += ` ${cm}:${hex};\n`;
        } else {
          root += ` ${cm}-${m}:${hex};\n`;
        }
      }
      return `:root{\n${root}}`;
    });
    // 颜色参考库
    const CoPt = reactive({op: false,k: 0,isA: true});
    const CoList = computed(()=>CoPt.isA ? CoListA : CoListB);

    return {CoAPI,CoKeys,CoDs,CoPt,CoMain,CoList,CoMainCmp,RenCss};
  },
  watch: {
    'CoMain.hsl': {
      handler(){
        this.upGpColor(this.CoMainCmp.hex);
      },
      immediate: true,
      deep: true
    },
  },
  methods: {
    // 获取或设置输入的hex
    getInputValue($input){
      const Hex = $input.value;
      if ($input.checkValidity() && this.CoAPI.ValidCo(Hex)){
        this.upCoHsl(Hex);
      }
    },
    // 更新Hsl表
    upCoHsl(Hex){
      const Hsl = this.CoAPI.HexToHsl(Hex);
      for (const k in Hsl){
        this.CoMain.hsl[k] = Hsl[k];
      }
    },
    // 更新梯度颜色
    upGpColor(Hex){
      const hexArr = this.CoAPI.HslGP(Hex);
      this.setHexArr(hexArr);
    },
    // 均化梯度亮度值
    scaleLight(){
      const CoDs = this.CoDs;
      const cArr = [
        CoDs.lter.cmp.value.hex,
        CoDs.dker.cmp.value.hex
      ];
      const hexArr = this.CoAPI.HexScale(cArr);
      this.setHexArr(hexArr);
    },
    setHexArr(Arr){
      for (const {m,k} of this.CoKeys){
        const {h,s,l} = this.CoAPI.HexToHsl(Arr[k]);
        const hsl = this.CoDs[m].hsl;
        hsl.h = h;
        hsl.s = s;
        hsl.l = l;
      }
    },
    // 标准化亮度值 暂时放弃
    normLight(){
      const hexArr = this.CoAPI.HexNorm(this.CoMainCmp.hex);
      this.setHexArr(hexArr);
    }
  }
});
</script>
