<template>
  <div class="nui-container --p demo-test">
    <h3 class="m-none">
      布局框架 【组件】
    </h3>
    <div class="nui-row">
      <div class="nui-col-6">
        <h5>侧边布局模式</h5>
        <div
          class="nui-app-root"
          style="position:relative;height:300px;background: #0001">
          <div class="nui-app-head">
            <div class="nui-app-logo">
              <ins>LOGO</ins>
            </div>
            <div class="nui-app-dynamic-tools">
              <i class="nicon-tools" />
              <div>
                <ins> 工具栏</ins>
              </div>
              <i class="nicon-chevron-up" />
            </div>
            <div class="nui-app-window-controls">
              <span>
                <i class="nicon-chrome-close" />
              </span>
            </div>
          </div>
          <div class="nui-app-views">
            <div class="nui-lut-side --left">
              <div
                class="nui-lut-group --min"
                style="width: 40px;">
                <div class="nui-lut-line" />
                <div
                  class="nui-lut-group-item"
                  style="height: 100%;">
                  <div class="nui-lut-tabs-min">
                    <div class="nui-lut-tab-min --active">
                      <i class="nicon-info" />
                      <ins>C</ins>
                    </div>
                    <div
                      class="nui-lut-tab-min">
                      <i class="nicon-info-circle" />
                      <ins>D</ins>
                    </div>
                  </div>
                  <div
                    class="nui-lut-panel --active"
                    style="width: 100px; height: 202px;">
                    <div class="nui-lut-tabs">
                      <div
                        class="nui-lut-tab --active">
                        <i class="nicon-info" />
                        <ins>C</ins>
                      </div>
                      <div
                        class="nui-lut-tab">
                        <i class="nicon-info-circle" />
                        <ins>D</ins>
                      </div>
                    </div>
                    <div class="nui-lut-content">
                      <div class="nui-lut-component --active" />
                    </div>
                    <div class="nui-lut-group-foot" />
                  </div>
                </div>
              </div>
            </div>
            <div class="nui-lut-main">
              主视图
            </div>
            <div class="nui-lut-side --right">
              <div
                class="nui-lut-group"
                style="width: 108px;">
                <div class="nui-lut-line" />
                <div
                  class="nui-lut-group-item"
                  style="height: 60%;">
                  <div class="nui-lut-panel">
                    <div class="nui-lut-tabs">
                      <div
                        class="nui-lut-tab --active">
                        <i class="nicon-tools" />
                        <ins>B</ins>
                      </div>
                    </div>
                    <div class="nui-lut-content">
                      <div class="nui-lut-component --active" />
                    </div>
                  </div>
                </div>
                <div
                  class="nui-lut-group-item"
                  style="height: 40%;">
                  <div class="nui-lut-line" />
                  <div class="nui-lut-panel">
                    <div class="nui-lut-tabs">
                      <div
                        class="nui-lut-tab --active">
                        <i class="nicon-info" />
                        <ins>C</ins>
                      </div>
                      <div
                        class="nui-lut-tab">
                        <i class="nicon-info-circle" />
                        <ins>D</ins>
                      </div>
                    </div>
                    <div class="nui-lut-content">
                      <div class="nui-lut-component --active" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="nui-lut-float">
              <div
                class="nui-lut-float-item"
                style="width: 40px; height: 200px; top: 21px; left: 185px;">
                <div class="nui-lut-float-item-head" />
                <div
                  class="nui-lut-group --min">
                  <div
                    class="nui-lut-group-item"
                    style="height: 40%;">
                    <div class="nui-lut-tabs-min">
                      <div
                        class="nui-lut-tab-min">
                        <i class="nicon-tools" />
                        <ins>B</ins>
                      </div>
                    </div>
                    <div
                      class="nui-lut-panel"
                      style="width: 200px; height: 300px;">
                      <div class="nui-lut-tabs">
                        <div
                          class="nui-lut-tab --active">
                          <i class="nicon-tools" />
                          <ins>B</ins>
                        </div>
                      </div>
                      <div class="nui-lut-content">
                        <div class="nui-lut-component --active" />
                      </div>
                      <div class="nui-lut-group-foot" />
                    </div>
                  </div>
                  <div
                    class="nui-lut-group-item"
                    style="height: 60%;">
                    <div class="nui-lut-line" />
                    <div class="nui-lut-tabs-min">
                      <div
                        class="nui-lut-tab-min">
                        <i class="nicon-info" />
                        <ins>C</ins>
                      </div>
                      <div
                        class="nui-lut-tab-min">
                        <i class="nicon-info-circle" />
                        <ins>D</ins>
                      </div>
                    </div>
                    <div
                      class="nui-lut-panel"
                      style="width: 200px; height: 300px;">
                      <div class="nui-lut-tabs">
                        <div
                          class="nui-lut-tab --active">
                          <i class="nicon-info" />
                          <ins>C</ins>
                        </div>
                        <div
                          class="nui-lut-tab">
                          <i class="nicon-info-circle" />
                          <ins>D</ins>
                        </div>
                      </div>
                      <div class="nui-lut-content">
                        <div class="nui-lut-component --active" />
                      </div>
                      <div class="nui-lut-group-foot" />
                    </div>
                  </div>
                </div>
                <div class="nui-lut-float-item-foot" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="nui-col-6">
        <h5>嵌套布局模式</h5>
        <div
          class="nui-app-root"
          style="position:relative;height:300px;background: #0001">
          <div class="nui-app-head">
            <div class="nui-app-logo">
              <ins>LOGO</ins>
            </div>
            <div class="nui-app-window-controls">
              <span>
                <i class="nicon-chrome-close" />
              </span>
            </div>
          </div>
          <div class="nui-app-views">
            <div class="nui-lut-col --h">
              <div
                class="nui-lut-col --v"
                style="width: 30%;">
                <div
                  class="nui-lut-col --h --panel"
                  style="height: 30%;">
                  <div class="nui-lut-panel">
                    <div class="nui-lut-tabs">
                      <div
                        class="nui-lut-tab --active">
                        <i class="nicon-cog" />
                        <ins>A</ins>
                      </div>
                    </div>
                    <div class="nui-lut-content">
                      <div class="nui-lut-component --active" />
                    </div>
                  </div>
                </div>
                <div
                  class="nui-lut-col --h --panel"
                  style="height: 70%;">
                  <div class="nui-lut-panel">
                    <div class="nui-lut-tabs">
                      <div
                        class="nui-lut-tab --active">
                        <i class="nicon-info" />
                        <ins>C</ins>
                      </div>
                    </div>
                    <div class="nui-lut-content">
                      <div class="nui-lut-component --active" />
                    </div>
                  </div>
                  <div class="nui-lut-line" />
                </div>
              </div>
              <div
                class="nui-lut-col --v"
                style="width: 40%;">
                <div
                  class="nui-lut-col --h"
                  style="height: 40%;">
                  <div
                    class="nui-lut-col --v --panel"
                    style="width: 50%;">
                    <div class="nui-lut-panel">
                      <div class="nui-lut-tabs">
                        <div
                          class="nui-lut-tab --active">
                          <i class="nicon-tools" />
                          <ins>B</ins>
                        </div>
                      </div>
                      <div class="nui-lut-content">
                        <div class="nui-lut-component --active" />
                      </div>
                    </div>
                  </div>
                  <div
                    class="nui-lut-col --v --panel"
                    style="width: 50%;">
                    <div class="nui-lut-panel">
                      <div class="nui-lut-tabs">
                        <div
                          class="nui-lut-tab --active">
                          <i class="nicon-cog" />
                          <ins>A</ins>
                        </div>
                      </div>
                      <div class="nui-lut-content">
                        <div class="nui-lut-component --active" />
                      </div>
                    </div>
                    <div class="nui-lut-line" />
                  </div>
                </div>
                <div
                  class="nui-lut-col --h --panel"
                  style="height: 60%;">
                  <div class="nui-lut-panel">
                    <div class="nui-lut-tabs">
                      <div
                        class="nui-lut-tab --active">
                        <i class="nicon-cog" />
                        <ins>A</ins>
                      </div>
                      <div
                        class="nui-lut-tab">
                        <i class="nicon-tools" />
                        <ins>B</ins>
                      </div>
                    </div>
                    <div class="nui-lut-content">
                      <div class="nui-lut-component --active" />
                    </div>
                  </div>
                  <div class="nui-lut-line" />
                </div>
                <div class="nui-lut-line" />
              </div>
              <div
                class="nui-lut-col --v --panel"
                style="width: 30%;">
                <div class="nui-lut-panel">
                  <div class="nui-lut-tabs">
                    <div
                      class="nui-lut-tab --active">
                      <i class="nicon-info" />
                      <ins>C</ins>
                    </div>
                  </div>
                  <div class="nui-lut-content">
                    <div class="nui-lut-component --active" />
                  </div>
                </div>
                <div class="nui-lut-line" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="nui-row"
      style="height:600px;">
      <div class="nui-col">
        <nui-code
          lang="html"
          :code="demoCode.html">
          <h6>组件</h6>
        </nui-code>
        <nui-code :code="demoCode.mods">
          <h6>模块数据</h6>
        </nui-code>
      </div>
      <div class="nui-col">
        <nui-code
          :code="demoCode.sidebar">
          <h6>侧边布局模式</h6>
        </nui-code>
      </div>
      <div class="nui-col">
        <nui-code :code="demoCode.nested">
          <h6>嵌套布局模式</h6>
        </nui-code>
      </div>
    </div>
    <h4 class="m-none">
      自定义布局 【样式】
      <code>水平 .nui-page-flex.--v</code>
      <code class="p-lr-15">调节组件 &lt;nui-drag-line v-model="Numb" :min :max cy re/&gt;</code>
    </h4>
    <div class="nui-row">
      <div class="nui-col-4">
        <nui-code
          :code="demoCode.chtml"
          lang="html" />
      </div>
      <div
        style="height:300px"
        class="nui-page-flex bg-atom --dks">
        <div
          class="nui-col-none tt-c nui-flex --v --cc"
          :style="`width:${wa}px`">
          可调节宽度
          <code>.nui-col-none</code>
          <code>:style=width:{{ wa }}px </code>
        </div>
        <nui-drag-line v-model="wa" />
        <div class="nui-col nui-flex --v">
          <div
            class="nui-col-none nui-flex --v --cc"
            :style="`height:${ha}px`">
            可调节高度
            <code>.nui-col-none</code>
            <code>:style=height:{{ ha }}px </code>
          </div>
          <nui-drag-line
            v-model="ha"
            :min="100"
            :max="200"
            cy />
          <div class="nui-col nui-flex --v --cc">
            自动占剩<br>
            <code>.nui-col</code>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import demoCode from './datas/layout';
export default {
  name: 'DemoViews',
  setup(){
    return {
      demoCode
    };
  },
  data(){
    return {
      wa: 200,
      ha: 100
    };
  },
};
</script>