<template>
  <div class="nui-container --p">
    <h3 class="m-none">
      通用样式 <code>.h[1-7] .color-[*] .bg-[*] .--b-none</code>
    </h3>
    <br>
    <div class="nui-row">
      <div class="nui-col-6">
        <h3 class="m-none">
          标签/徽章 <span class="h6">样式</span> | 按钮 <span class="h6">组件</span>
        </h3>
        <div class="nui-row">
          <div class="nui-col">
            <h5>通用尺寸 <code>.h[1-7]</code> <code v-if="sz">.{{ sz }}</code></h5>
            <div class="m-in-25em">
              <nui-btn
                v-for="(z,k) in szArr"
                :key="k"
                class="color-gy"
                :label="z||'none h6'"
                @click="sz = z" />
            </div>
          </div>
          <div class="nui-col-none">
            <h5>禁用边框 <code>:bnone|.--b-none</code></h5>
            <nui-btn
              class="color-gy"
              label="禁用边框"
              :bnone="bNone"
              @click="bNone = !bNone" />
          </div>
        </div>
        <p />
        <h4>标签样式 <span class="h6">简化版Btn</span> <code>.nui-label</code></h4>
        <p />
        <div class="m-in-25em">
          <span
            v-for="(c,k) in colorArr"
            :key="k"
            class="nui-label"
            :class="[`bg-${c} ${sz} ${sr}`,{'--b-none':bNone}]">
            <i class="nui-icon-home" />
            <ins>文字</ins>
          </span>
        </div>
        <p />
        <div class="m-in-25em">
          <span
            v-for="(c,k) in colorArr"
            :key="k"
            class="nui-label"
            :class="[`color-${c} ${sz} ${sr}`,{'--b-none':bNone}]">文字</span>
        </div>
        <p />
        <h4>徽章样式 <span class="h6">数字状态</span> <code>.nui-badge</code></h4>
        <p />
        <div class="m-in-25em">
          <span
            v-for="(c,k) in colorArr"
            :key="k"
            class="nui-badge"
            :class="[`bg-${c} ${sz} ${sr}`,{'--b-none':bNone}]">8</span>
          <span
            v-for="(c,k) in colorArr"
            :key="k"
            class="nui-badge"
            :class="[`color-${c} ${sz} ${sr}`,{'--b-none':bNone}]">26</span>
        </div>
        <p />
        <h3>按钮组件 <code>NuiBtn</code></h3>
        <h5>按钮属性 <code>.--r</code> | <code>:ac</code> | <code>:dd</code> </h5>
        <div class="m-in-25em">
          <nui-btn
            class="color-gy"
            label="圆角"
            @click="sr = !sr?'--r':''" />
          <nui-btn
            class="color-gy"
            label="激活"
            :ac="ac"
            @click="ac = !ac" />
          <nui-btn
            class="color-gy"
            label="禁用"
            @click="dd = !dd" />
        </div>
        <p />
        <div class="m-in-25em">
          <nui-btn
            v-for="(c,k) in colorArr"
            :key="k"
            :ac="ac"
            :dd="dd"
            :class="[`bg-${c} ${sz} ${sr}`,{'--b-none':bNone}]"
            icon="nui-icon-home"
            label="文字" />
        </div>
        <p />
        <div class="m-in-25em">
          <nui-btn
            v-for="(c,k) in colorArr"
            :key="k"
            :class="[`color-${c} ${sz} ${sr}`,{'--b-none':bNone}]"
            :ac="ac"
            :dd="dd"
            icon="nui-icon-tools"
            label="文字" />
        </div>
        <p />
        <div class="m-in-25em">
          <nui-btn
            v-for="(c,k) in colorArr"
            :key="k"
            :class="[`bg-${c} ${sz} ${sr}`,{'--b-none':bNone}]"
            :dd="dd"
            :ac="ac"
            icon="nui-icon-home" />
          <nui-btn
            v-for="(c,k) in colorArr"
            :key="k"
            :class="[`color-${c} ${sz} ${sr}`,{'--b-none':bNone}]"
            :ac="ac"
            :dd="dd"
            icon="nui-icon-tools" />
        </div>
        <p />
        <div class="nui-row">
          <div class="nui-col-6">
            <h5>
              标签/徽章 <span class="h6">样式</span>
            </h5>
            <nui-code
              lang="html"
              :code="demoCode.label.Html" />
          </div>
          <div class="nui-col-6">
            <h5>
              按钮 <span class="h6">组件 | 样式</span>
            </h5>
            <nui-code
              lang="html"
              :code="demoCode.btn.Html" />
          </div>
        </div>
      </div>
      <div class="nui-col-6">
        <h3 class="m-none">
          卡片 <span class="h6">样式/组件</span>
        </h3>
        <div class="nui-row">
          <div class="nui-col-5">
            <nui-card title="1280" />
            <br>
            <nui-card
              title="1280"
              sub="副标题" />
            <br>
            <nui-code
              lang="html"
              :code="demoCode.card.mod" />
          </div>
          <div class="nui-col-7">
            <nui-card
              class="bg-bl h2"
              title="1280"
              sub="副标题"
              icon="nui-icon-home">
              <span>自定义slot</span>
              <template #foot>
                <div>#foot slot</div>
              </template>
            </nui-card>
            <br>
            <nui-code
              lang="html"
              :code="demoCode.card.html" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import demoCode from './datas/btns';
export default {
  name: 'DemoBtn',
  setup(){
    const colorArr = ['atom','gy','dm','gn','sky','bl','yl','red'];
    const szArr = ['h1','h2','h3','h4','h5','h6','h7',''];
    return {
      colorArr,
      szArr,
      demoCode
    };
  },
  data(){
    return {
      sz: '',
      sr: '',
      ac: false,
      dd: false,
      bNone: false,
    };
  }
};
</script>