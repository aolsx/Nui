const label = {
  Html: `<!-- class 附加样式-->
<!-- 尺寸 .h[1-7]-->
<!-- 颜色 .bg-* .color-* -->
<span class="nui-label">
  <i class="icon" />
  <ins>文字</ins>
</span>
<span class="nui-label">
  [Text]
</span>
<span class="nui-badge">
  [Text|Number]
</span>`
};

const btn = {
  Html: `<!-- class 附加样式-->
<!-- .h[1-7] .bg-* .color-* -->
<!-- .--r 圆角 -->
<nui-btn
  :class="h* --r [color|bg]-*"
  :ac="ac"
  :dd="dd"
  icon="icon"
  label="文字" />
<span class="nui-btn **">
  <i class="icon"></i>
  <ins>文字</ins>
</span>`,
};

const card = {
  html: `<div class="nui-card">
  <div class="nui-card-head">
    <slot name="head" />
  </div>
  <div class="nui-card-body">
    <div class="nui-card-icon"><i class="icon-home"/></div>
    <div class="nui-card-title"></div>
    <div class="nui-card-subtitle"></div>
  </div>
  <div class="nui-card-foot">
    <slot name="foot" />
  </div>
</div>`,
  mod: `<nui-card
  class="bg-bl h2"
  :title="主标题"
  :sub="副标题"
  :icon="nicon-cog">
  <template #head>
   <div>#head slot</div>
  </template>
  <span>自定义slot</span>
  <template #foot>
    <div>#foot slot</div>
  </template>
</nui-card>`
};

export default {
  btn,label,card
};