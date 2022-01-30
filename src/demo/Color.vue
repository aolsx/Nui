<template>
  <div class="nui-container --p">
    <h2>
      配色
      <span class="h6">
        <code>.bg-[*]</code> 背景色
        <code>.color-[*]</code> 文字色
        <code>*.--[lter|lt|dk|dker]</code> 颜色升降
      </span>
    </h2>
    <h4 class="nui-col-12">
      背景色
      <code class="h6">.bg-[*] </code>
      禁用 <code> .bg-none</code>
      继承文字色 <code> .bg-color</code>
    </h4>
    <div class="nui-row">
      <div
        v-for="(nm,key) in colorName"
        :key="key"
        class="nui-row"
        :class="nm == 'atom'?'nui-col-12':'nui-col-6 '">
        <div
          v-for="(d,k) in nm == 'atom'?colorAtom:colorEd"
          :key="k"
          class="nui-col">
          <div
            class="nui-card tt-c tt-copy"
            :class="`bg-${nm} ${d}`"
            style="height:60px">
            <div class="nui-card-body" />
            <div class="nui-card-foot tt-c">
              <div class="-eps">
                .bg-{{ nm }}<span v-if="d">.{{ d }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="nui-col-6 nui-row">
        <div
          v-for="(nm,k) in colorWb"
          :key="k"
          class="nui-col">
          <div
            class="nui-card tt-c tt-copy"
            style="height:60px"
            :class="`bg-${nm}`">
            <div class="nui-card-body" />
            <div class="nui-card-foot tt-c">
              <div class="-eps">
                .bg-{{ nm }}
              </div>
            </div>
          </div>
        </div>
        <div class="nui-col">
          <div
            class="nui-card tt-c tt-copy"
            style="height:60px">
            <div class="nui-card-body bg-grid" />
            <div class="nui-card-foot tt-c">
              <div class="-eps">
                .bg-grid
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <h4 class="nui-col-12">
      彩色投影
      <span class="h6">
        <code>.bg-[*].--sdw </code> |
        <code>.sdw-none</code> 禁用投影
      </span>
    </h4>
    <div class="nui-row">
      <div
        v-for="(nm,key) in colorName"
        :key="key"
        class="nui-col">
        <div
          class="nui-card tt-c tt-copy --sdw"
          style="height:60px"
          :class="`bg-${nm}`">
          <div
            class="nui-card-body"
            style="height:40px" />
          <div class="nui-card-foot tt-c">
            <ins>.bg-{{ nm }}.--sdw</ins>
          </div>
        </div>
      </div>
    </div>
    <h4 class="nui-col-12">
      文字色
      <code class="h6">.color-[*] .--cdk .--hover .--focus</code>
    </h4>
    <div class="nui-row">
      <div
        v-for="(nm,key) in colorName"
        :key="key"
        class="nui-col">
        <div
          class="nui-card tt-c tt-copy">
          <div class="nui-card-body">
            <h4
              style="line-height:1.5;"
              :class="`color-${nm}`">
              {{ nm }}
            </h4>
            <h4
              style="line-height:1.5;"
              :class="`color-${nm} --cdk`">
              {{ nm }}
            </h4>
          </div>
          <div class="nui-card-foot tt-c">
            <ins>.color-{{ nm }}</ins>
          </div>
        </div>
      </div>
    </div>
    <div class="nui-row">
      <div
        v-for="(nm,key) in colorWb"
        :key="key"
        class="nui-col">
        <div
          class="nui-card tt-c tt-copy"
          :class="`color-${nm}`">
          <div class="nui-card-body">
            <h4 style="line-height:1.5;">
              {{ nm }}
            </h4>
          </div>
          <div class="nui-card-foot tt-c">
            <ins>.color-{{ nm }}</ins>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'DemoColor',
  setup(){
    const colorName = ['atom','gy','sky','bl','dm','gn','red','yl','og','pk'];
    const colorEd = ['--lter','--lt','','--dk','--dker','--op'];
    const colorAtom = ['--lter','--lt','','--dk','--dks','--dker','--op'];
    const colorWb = ['wt','wt --op','bk','bk --op','it'];
    return {colorName,colorEd,colorAtom,colorWb};
  }
};
</script>