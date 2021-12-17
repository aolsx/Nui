<template>
  <div class="nui-container --p">
    <div class="nui-row">
      <div class="nui-col-4">
        <nui-code
          class="-full"
          lang="html"
          :code="codeStr.html">
          <div class="p-10">
            组件使用 <code>lang="html"</code> 指定类型 点击拷贝
          </div>
        </nui-code>
      </div>
      <div class="nui-col-4">
        <nui-code
          class="-full"
          :code="codeStr.js">
          <div class="p-10">
            代码示例 自定判断类型
          </div>
        </nui-code>
      </div>
      <div class="nui-col-4">
        <nui-code
          lang="json"
          class="-full"
          :code="codeStr.json"
          wrap>
          <div class="p-10">
            代码示例<code> :wrap</code> 换行
          </div>
        </nui-code>
      </div>
    </div>
  </div>
</template>

<script>
import codeStr from './datas/code.js';
export default {
  name: 'DemoCode',
  setup(){
    return {codeStr};
  },
};
</script>