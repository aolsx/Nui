<template>
  <div class="-full nui-flex demo-color-picker">
    <div class="nui-flex-auto nui-flex --cc --v nui-container --p">
      <div
        class="nui-card"
        style="height:90px;width:600px">
        <!-- 主输入色板 -->
        <div class="nui-flex nui-flex-auto">
          <div
            v-for="ck in CoGpKeys"
            :key="ck"
            class="nui-flex-auto -link"
            :style="`background-color:${CoGroup[ck].hex}`"
            @click="upCoHsl(CoGroup[ck].hex)" />
        </div>
        <div class="nui-card-foot nui-flex p-none">
          <div
            v-for="ck in CoGpKeys"
            :key="ck"
            class="nui-flex-auto tt-c b-l  p-lr-5 nui-flex --vc --hb"
            @click="$Nui.copy(CoGroup[ck].hex)">
            <div 
              class="p-5 -link"
              @click="CoGroup[ck].link = !CoGroup[ck].link">
              <i
                v-if="CoGroup[ck].link"
                class="nicon-link" />
              <i
                v-else
                class="nicon-unlink" />
            </div>
            <span
              class="tt-copy tt-cb tt-bd"
              :style="`color:${CoGroup[ck].hex}`">{{ CoGroup[ck].hex }} </span>
          </div> 
        </div>
      </div>
      <div
        class="nui-row --sp-10 m-t-15"
        style="width:600px">
        <div
          class="nui-card bg-atom --dks h6 p-none tt-c"
          style="width:180px">
          <div class="p-5 b-t b-b">
            当前基准色
          </div>
          <div class="bg-atom --dker p-10  color-atom">
            <div class="b-b p-b-10">
              色域 / 饱和 / 亮度
            </div>
            <div class="p-tb-10">
              <nui-form-num
                ref="Hslh"
                v-model="CoHsl.h"
                color="--pro-bg-none"
                rg
                :rg-bind="{class:'bg-rainbow',style:c_Hsl.style.h}"
                :rules="{min:0,max:360}"
                show-num />
            </div>
            <div class="p-tb-10">
              <nui-form-num
                v-model="CoHsl.s"
                color="--pro-bg-none"
                rg
                :rg-bind="{style:c_Hsl.style.s}"
                :rules="{min:0,max:100}"
                show-num />
            </div>
            <div class="p-tb-10">
              <nui-form-num
                v-model="CoHsl.l"
                color="--pro-bg-none"
                rg
                :rg-bind="{style:c_Hsl.style.l}"
                :rules="{min:0,max:100}"
                show-num />
            </div>
          </div>
          <div class="p-10">
            <label class="nui-form-str">
              <input
                ref="inputHex"
                class="nui-form-input"
                pattern="^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$"
                type="text"
                :value="c_Hsl.Hex"
                @change="getInputValue($event.target)">
              <div class="nui-form-input-bg" />
            </label>
          </div>
        </div>
        <div
          class="nui-card bg-atom --dks h6 p-none tt-c m-lr-15"
          style="width:180px">
          <div class="b-b p-5 nui-flex --vc --hb">
            <div class="p-l-5 color-atom">
              亮度
            </div>
            <div
              class="nui-btn"
              @click="normLight()">
              <span>标准化</span>
            </div>
            <div
              class="nui-btn"
              @click="scaleLight()">
              <span>平均化</span>
            </div>
            <div
              class="nui-btn"
              @click="upAllLight()">
              <i class="nicon-undo-alt" />
            </div>
          </div>
          <div
            v-for="ck in CoGpKeys" 
            :Key="ck"
            class="m-tb-10">
            <nui-form-num
              v-model="CoGpLight[ck]"
              color="color-it --pro-op-none"
              :dd="!CoGroup[ck].link"
              rg
              :rules="{min:-50,max:50}"
              show-num
              :style="`color:${CoGroup[ck].hex}`" />
          </div>
        </div>
        <div class="nui-card bg-atom --dks h6 p-none  nui-col">
          <div class="b-b p-5 p-lr-10 nui-flex --hb --vc">
            <span class="nui-col-none color-atom">生成</span>
            <nui-form-str
              v-model="colorName"
              info="颜色名称"
              style="height:20px;width:80px;flex:none" />
            <!-- <div class="nui-btn bg-atom --lt">
              <span class="color-gy">保存</span>
            </div> -->
          </div>
          <nui-code
            class="-full bg-none"
            :code="renCss"
            lang="css" />
        </div>
      </div>
    </div>
    <div class="bg-atom --dks nui-flex">
      <div
        class="nui-flex-none tt-c nui-flex --v"
        style="width:50px">
        <div
          class="tt-c p-10 b-b -link h3"
          @click="coPt.op = !coPt.op">
          <i
            v-if="coPt.op"
            class="nicon-angle-double-right color-og" />
          <i
            v-else
            class="nicon-angle-double-left color-bl" />
        </div>
        <div
          class="tt-c p-10 b-b -link h3 tt-bd"
          @click="coPt.isA = !coPt.isA,coPt.k=0">
          <span>{{ coPt.isA?'A':'B' }}</span>
        </div>
        <div class="nui-container col">
          <div
            v-for="(co,k) in CoList"
            :key="k">
            <span
              class="nui-badge m-t-10 -link"
              :style="`width:20px;height:20px;background-color:${co.list[500]};border-radius:${coPt.k==k?'4px':'50%'}`"
              @click="coPt.op = true,coPt.k=k" />
          </div>
        </div>
      </div>
      <div
        v-if="coPt.op"
        class="nui-flex-auto b-l nui-container p-lr-10 nui-show-range-thumb"
        style="width:120px">
        <h4 :style="`color:${CoList[coPt.k].list[500]}`">
          {{ CoList[coPt.k].name }}
        </h4>
        <div
          v-for="(co,k) in CoList[coPt.k].list"
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
import {CoListA,CoListB,CoAPI} from './colorPicker';
export default {
  name: 'DemoColorPicker',
  setup(){
    const CoGpKeys = ['lter','lt','co','dk','dker'];
    return {CoAPI,CoListA,CoListB,CoGpKeys};
  },
  data(){
    return {
      colorName: '',
      // 颜色库
      coPt: {op: false,k: 0,isA: true},
      CoHsl: {h: 0,s: 50,l: 50},
      CoGroup: {
        lter: {link: true,hex: '',},
        lt: {link: true,hex: '',},
        co: {link: true,hex: '',},
        dk: {link: true,hex: '',},
        dker: {link: true,hex: '',}
      },
      CoGpLight: {lter: 10,lt: 5,co: 0,dk: -10,dker: -15},
      saveCoGp: [{name: '',co: [{}]}],
    };
  },
  computed: {
    CoList(){
      return this.coPt.isA ? CoListA : CoListB;
    },
    c_Hsl(){
      const {h,s,l} = this.CoHsl;
      const Hex = this.CoAPI.HslToHex({h,s,l});
      const vdln = "linear-gradient";
      const style = {
        h: {color: `hsl(${h},100%,50%,1)`},
        s: {color: `hsl(${h}, ${s}%, 50%,1)`,
          background: `${vdln}(to right,hsl(${h},0%, 50%,1),hsl(${h},100%, 50%,1))`},
        l: {color: `hsl(${h}, 100%, ${l}%,1)`,
          background: `${vdln}(to right,#000,hsl(${h},100%, 50%,1),#FFF)`},
      };
      return {style,Hex};
    },
    renCss(){
      const coObj = this.CoGroup;
      const pix = this.colorName || 'xx';
      const cm = `--${pix}-co`;
      let root = '';
      for (const fx of this.CoGpKeys){
        if (fx === 'ac'){
          root += ` ${cm}:${coObj[fx].hex};\n`;
          // css += ` --co:var(${cm});\n`;
          // css += ` --ac-co:var(${cm});\n`;
        } else {
          root += ` ${cm}-${fx}:${coObj[fx].hex};\n`;
          // css += ` --co-${fx}:var(${cm}-${fx});\n`;
        }
      }
      // root += ` --${cm}-o:${coObj.dk}40;\n`;
      // const csss = `.co--[x]{--ac-co:var(--[x])}\n`;
      return `:root{\n${root}}`;
    }
  },
  watch: {
    CoHsl: {
      handler(){
        this.upGpColor(this.c_Hsl.Hex);
      },
      immediate: true,
      deep: true
    },
    'CoGpLight.lter'(n){
      this.upLight(this.CoGroup.lter,n);
    },
    'CoGpLight.lt'(n){
      this.upLight(this.CoGroup.lt,n);
    },
    'CoGpLight.co'(n){
      this.upLight(this.CoGroup.co,n);
    },
    'CoGpLight.dk'(n){
      this.upLight(this.CoGroup.dk,n);
    },
    'CoGpLight.dker'(n){
      this.upLight(this.CoGroup.dker,n);
    }
  },
  methods: {
    // 更新梯度颜色
    upGpColor(Hex){
      const CoGpLight = this.CoGpLight;
      const CoGroup = this.CoGroup;
      for (const k in CoGpLight){
        let n = CoGpLight[k];
        if (CoGroup[k].link){
          CoGroup[k].hex = this.CoAPI.HexLight(Hex,n);
        }
      }
    },
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
        this.CoHsl[k] = Hsl[k];
      }
    },
    // 更新单独组的亮度
    upLight(item,n){
      const Hex = this.c_Hsl.Hex;
      item.hex = this.CoAPI.HexLight(Hex,n);
    },
    // 重置梯度 
    upAllLight(arr){
      const CoGp = this.CoGpLight;
      const df = {lter: 10,lt: 5,co: 0,dk: -10,dker: -15};
      if (arr){
        // 数组取值
        // const keys = this.CoGpKeys;
        // for (const [k,v] of keys.entries()){
          
        // }
      } else {
        for (const k in CoGp){
          if (this.CoGroup[k].link){
            CoGp[k] = df[k];
          }
        }
      }
    },
    // 均化梯度亮度值
    scaleLight(){
      const Gp = this.CoGroup;
      const cArr = [Gp.lter.hex,Gp.dker.hex];
      const lArr = this.CoAPI.HexScale(cArr);
      this.upAllLight(lArr);
    },
    // 标准化亮度值
    normLight(){
      
    }
  },
};
</script>
