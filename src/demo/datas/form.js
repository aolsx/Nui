const str = {
  html: `<nui-form-str
  v-model="form.str"
  :type="type"
  --mixins--
  :info='',
  :rules= null,
  :rd = Boolean,
  :dd= Boolean,
  :icon= [] />`
};
const num = {
  html: `<nui-form-num
  v-model="form.num"
  :rg=Boolean, // 滑块
  :color='',   // 滑块颜色
  --mixins--/>`
};
const rc = {
  html: `<nui-form-rc
  v-model="单选值<String,Number>"
  v-model="多选值<Array>"
  :items="valueList"
  :sw="开关<Boolean>"/>`,
  js: `const valueList = [{
    label: '选一',v: '1',
    dd: true,rd: true
  },...
]`
};
const st = {
  html: `<nui-form-st
  v-model="单选值<String,Number>"
  v-model="多选值<Array>"
  :items="valueList"
  --mixins-- />`
};
const item = {
  html: `<nui-form-item>
  <template #before>
    前
  </template>
  <template #after>
    后
  </template>
  <nui-form-str
  v-model="form.str"/>
</nui-form-item>
`
};
const form = {
  html: `<nui-form
  :datas="formDatas"
  :items="formItem"
  :resetbtn="btn{}"
  :submitbtn="btn{}"
  // 新增|编辑
  :isedit="false|true"
  :br // 输入有框边线 无背景
  @confirm="fn($event<datas>)">
  <div>自定义表单</div>
  <template #submit={reset,submit}>
   <nui-btn @click="reset()"/>
   <nui-btn @click="submit()"/>
  </template>
</nui-form>`,
  js: `// 表单数据 重置|返回
const formDatas = {'<field>':'值'};
const formItem = [
  {
    label: '提示',
    col: 6,
    // 字段名称 匹配 数据
    field: 'fieldName',
    // 组件类型
    mod: 'str|num|rc|st',
    // 绑定 对应组件参数
    bind: {...}
  },{col: 'line'}, // 行分割线
]`
};

export default {
  str,num,rc,st,item,form
};