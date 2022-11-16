<template>
  <div class="-full nui-flex demo-color-picker">
    <div class="nui-flex-auto nui-flex --cc --v nui-container --p">
      <div
        class="nui-card"
        style="height:85px;width:700px">
        <div class="nui-flex nui-flex-auto">
          <div
            v-for="c in colorGroup"
            :key="c"
            class="nui-flex-auto"
            :style="`background-color:${renGroup[c]}`"
            @click="c!=='ac'&&setColorRgb(renGroup[c+'Rgb'])" />
        </div>
        <div class="nui-card-foot nui-flex p-none">
          <div
            v-for="c in colorGroup"
            :key="c"
            class="nui-flex-auto tt-c b-l p-5 tt-copy tt-cb"
            :style="`color:${renGroup[c]}`"
            @click="$Nui.copy(renGroup[c])">
            {{ renGroup[c] }} 
          </div>
        </div>
      </div>
      <div
        class="nui-row --sp-10 m-t-15"
        style="width:700px">
        <div
          class="nui-card bg-atom --dks h6 p-none tt-c color-atom"
          style="width:150px">
          <div class="b-b p-5">
            颜色调节
          </div>
          <div class="bg-atom --dker p-10">
            <div class="p-tb-10">
            <nui-form-num
              ref="inp1"
              v-model="form.h"
              color="--pro-bg-none"
              rg
              showNum
              :rules="{min:0,max:360}" />
            </div>
            <div class="p-tb-10">
            <nui-form-num
              ref="inp2"
              v-model="form.s"
              color="--pro-bg-none"
              rg
              showNum
              :rules="{min:0,max:100}" />
            </div>
            <div class="p-tb-10">
            <nui-form-num
              ref="inp3"
              v-model="form.l"
              color="--pro-bg-none"
              rg
              showNum
              :rules="{min:0,max:100}" />
            </div>
          </div>
          <div class="p-lr-10 color-atom b-t">
            <div class="m-t-5">当前基色</div>
            <p class="m-t-5">
              <label class="nui-form-str">
                <input
                  :value="inputHex"
                  class="nui-form-input"
                  type="text"
                  pattern="^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$"
                  @change="setColorHex">
                <div class="nui-form-input-bg" />
              </label>
            </p>
            <p class="m-tb-5">
              {{ `rgb(${renRaw.Rgb})` }}
            </p>
            <p class="m-tb-5">
              {{ `hsl(${renRaw.Hsl.h}, ${renRaw.Hsl.s}%, ${renRaw.Hsl.l}%)` }}
            </p>
            <p class="m-tb-5">
              {{ `hsv(${renRaw.Hsv})` }}
            </p>
          </div>
        </div>
        <div
          class="nui-card bg-atom --dks h6 p-none tt-c color-atom m-l-15"
          style="width:150px">
          <div class="b-b p-5">
            输出颜色
          </div>
          <div class="bg-atom --dker p-10">
            <div class="m-tb-10" 
            v-for="Gl in colorGroup"
              :Key="Gl">
              <label class="nui-form-str" v-if="Gl=='ac'">
                <div
                  class="nui-form-range-track color-it"
                  :style="`background:${renGroup.ac}`" />
              </label>
              <nui-form-num
              v-else
              v-model="gpOffset[Gl]"
              :style="`color:${renGroup[Gl]}`"
              color="color-it --pro-op-none"
              rg
              showNum
              :rules="{min:0,max:50}" />
            </div>
          </div>
          <div class="p-15">
            <div class="nui-flex --vc --hb ">
              <span>梯度间隔</span>
              <nui-form-rc
                v-model="gpGradient.isAdd"
                :items="[{label:'递加',v:false}]"
                :sw="true"/>
            </div> 
            <nui-form-num
              v-model="gpGradient.v"
              color="color-gy --pro-op-none"
              rg
              :rules="{min:1,max:50}" />
            <p />
            <nui-btn
              class="bg-atom --lt color-gy"
              label="初始化参数"
              bnone
              @click="resetGpOffv" />
          </div>
        </div>
        <div class="nui-card bg-atom --dks h6 p-none color-atom m-l-15 nui-col ">
          <div class="b-b p-5 p-lr-10 nui-flex --hb --ac m-in-l-25em">
            <span class="nui-flex-auto">生成 CSS</span>
            <nui-form-str
              v-model="colorName"
              style="height:18px;width:80px;flex:none"
              info="颜色名称" />
          </div>
          <nui-code
            class="-full bg-none"
            lang="css"
            :code="renCss" />
        </div>
      </div>
    </div>
    <div
      class="bg-atom --dks nui-flex ">
      <div
        style="width:50px"
        class="nui-container nui-flex-none tt-c p-t-15">
        <div
          v-for="(co,k) in colors"
          :key="k">
          <span
            class="nui-badge m-t-10 -link"
            :style="`width:20px;height:20px;background-color:${co.variations[4].hex};border-radius:${acc==k?'4px':'50%'}`"
            @click="acc = acc==k?null:k" />
        </div>
      </div>
      <div
        v-if="acc !== null"
        style="width:180px"
        class="nui-flex-auto b-l nui-container p-lr-10 nui-show-range-thumb">
        <h4>
          {{ colors[acc].color }}
        </h4>
        <div
          v-for="(o,k) in colors[acc].variations"
          :key="k"
          class="nui-card m-b-15 -sdw-none"
          style="height:55px">
          <div
            class="nui-card-body -link"
            :style="`background-color:${o.hex}`"
            @click="setColor(o.hsl)" />
          <div class="nui-card-foot tt-c">
            <b>{{ o.weight }}</b>
            <b
              class="tt-copy tt-r"
              @click="$Nui.copy(o.hex)">{{ o.hex }}</b>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {ColorPicker,colors} from './colorPicker';
export default {
  name: 'DemoColorPicker',
  setup(){
    return {
      ColorPicker,
      colors,
      colorGroup: ['lter','lt','ac','dk','dker']
    };
  },
  data(){
    return {
      acc: null,
      form: {
        h: 0,
        s: 50,
        l: 50,
      },
      gpGradient:{
        isAdd:true,
        v:10
      },
      gpOffset: {
        lter: 10,
        lt: 5,
        dk: 10,
        dker: 20
      },
      colorName: '',
      cssStr: '',
      inputHex: '',
    };
  },
  computed: {
    renRaw(){
      const {h,s,l} = this.form;
      const Rgb = ColorPicker.hslToRgb(h,s,l);
      const Hex = ColorPicker.rgbToHex(...Rgb);
      const Hsv = ColorPicker.rgbToHsv(...Rgb);
      return {
        Hsl: {h,s,l},
        Rgb,
        Hsv,
        Hex
      };
    },
    renGroup(){
      const off = this.gpOffset;
      const Hsl = this.renRaw.Hsl;
      const ac = this.renRaw.Hex;
      const {rgb: lterRgb,hex: lter} = ColorPicker.hslToGroup(Hsl,off.lter);
      const {rgb: ltRgb,hex: lt} = ColorPicker.hslToGroup(Hsl,off.lt);
      const {rgb: dkRgb,hex: dk} = ColorPicker.hslToGroup(Hsl,~off.dk);
      const {rgb: dkerRgb,hex: dker} = ColorPicker.hslToGroup(Hsl,~off.dker);
      // console.log(ac,lter,lt,dk,dker);
      return {
        ac,lter,lt,dk,dker,lterRgb,ltRgb,dkRgb,dkerRgb
      };
    },
    renCss(){
      const coObj = this.renGroup;
      const pix = this.colorName|| 'xx';
      const cm = `--${pix}-co`;
      let root = '';
      let css = '';
      for (const fx of this.colorGroup){
        if (fx === 'ac'){
          root += ` ${cm}:${coObj[fx]};\n`;
          css += ` --co:var(${cm});\n`;
          css += ` --ac-co:var(${cm});\n`;
        } else {
          root += ` ${cm}-${fx}:${coObj[fx]};\n`;
          css += ` --co-${fx}:var(${cm}-${fx});\n`;
        }
      }
      // root += ` --${cm}-o:${coObj.dk}40;\n`;
      const csss = `.co--[x]{--ac-co:var(--[x])}\n`;
      return `:root{\n${root}}\n.co-${pix}{\n${css}}\n${csss}`;
    }
  },
  watch: {
    form: {
      handler(v){
        this.upColor(v);
      },
      // immediate: true,
      deep: true // 表示开启深度监听
    },
    // 梯度
    'gpGradient.v'(v,old){
        const ofn = this.gpOffset;
        if(this.gpGradient.isAdd){
          for (const key in ofn) {
            ofn[key] += v>old?1:-1;
          }
        }else{
          ofn.lter = ofn.dker = v * 2;
          ofn.lt = ofn.dk = v;
        }
    }
  },
  mounted(){
    const hArr = [];
    for (let i = 0; i < 360; i++){
      hArr.push(`hsl(${i + 1}, ${100}%, ${50}%)`);
    }
    this.$inp1 = this.$refs.inp1.$el.children[1].style;
    this.$inp1.background = `linear-gradient(to right, ${hArr.join(", ")})`;
    this.$inp2 = this.$refs.inp2.$el.children[1].style;
    this.$inp3 = this.$refs.inp3.$el.children[1].style;
    this.upColor(this.form);
  },
  methods: {
    upColor({h,s,l}){
      const sArr = [];
      const lArr = [];
      for (var i = 0; i < 100; i++){
        sArr.push(`hsl(${h}, ${i}%, 50%)`);
        lArr.push(`hsl(${h}, 100%, ${i}%)`);
      }
      this.$inp2.background = `linear-gradient(to right, ${sArr.join(", ")})`;
      this.$inp3.background = `linear-gradient(to right, ${lArr.join(", ")})`;

      this.$inp1.color = `hsl(${h}, 100%, 50%)`;
      this.$inp2.color = `hsl(${h}, ${s}%, 50%)`;
      this.$inp3.color = `hsl(${h}, 100%, ${l}%)`;

      this.inputHex = this.renRaw.Hex;
    },
    // 初始化组参数
    resetGpOffv(){
      this.gpOffset.lter = 10;
      this.gpOffset.lt = 5;
      this.gpOffset.dk = 10;
      this.gpOffset.dker = 20;
    },
    setColor([h,s,l]){
      this.form.h = h;
      this.form.s = s;
      this.form.l = l;
    },
    setColorRgb(rgb){
      this.setColor(ColorPicker.rgbToHsl(...rgb));
    },
    setColorHex(e){
      // .trim()
      let str = e.target.value;
      str = str.replace(/\s*/g,"");
      if(str.indexOf("#")!==0){
        str = "#"+ str
      }
      if(/^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/.test(str)){
        this.setColorRgb(ColorPicker.hexToRgb(str));
      }else{
        // e.target.value = '';
      }
      // this.inputHex = str;
    }
  }
};
</script>
