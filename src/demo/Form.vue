<template>
  <div class="nui-container --p">
    <div class="nui-row">
      <div class="nui-col-2">
        <h3 class="m-none">
          通用配置
        </h3>
        <p />
        <div class="m-in-25em">
          <nui-btn
            class="color-yl"
            label="只读"
            @click="formCfg.rd = !formCfg.rd" />
          <nui-btn
            class="color-gy"
            label="禁用"
            @click="formCfg.dd = !formCfg.dd" />
          <nui-btn
            class="color-red"
            label="必填"
            @click="formCfg.rules.required = !formCfg.rules.required" />
        </div>
        <p />
        <div class="m-in-25em">
          <nui-btn
            class="color-bl"
            label="前置图标"
            @click="formCfg.icon[0] = formCfg.icon[0]?'':'nicon-cog'" />
          <nui-btn
            class="color-bl"
            label="后缀图标"
            @click="formCfg.icon[1] = formCfg.icon[1]?'':'nicon-tools'" />
        </div>
        <p />
        <nui-code
          lang="json"
          :code="JSON.stringify(formCfg,null,2)" />
        <h6>值</h6>
        <nui-code
          lang="json"
          :code="JSON.stringify(form,null,2)" />
        <h6>表单值</h6>
        <nui-code
          lang="json"
          :code="JSON.stringify(formDatas,null,2)" />
      </div>
      <div class="nui-col-10">
        <h4 class="m-none">
          字符串 <code>&lt;nui-form-str :type='*'/&gt;</code>
        </h4>
        <div class="nui-row">
          <div class="nui-col-8">
            <div class="nui-row">
              <div
                v-for="type in strType"
                :key="type"
                class="nui-col-4">
                <code>:type='{{ type }}'</code>
                <nui-form-str
                  v-model="form.str"
                  :type="type"
                  :rd="formCfg.rd"
                  :dd="formCfg.dd"
                  :rules="formCfg.rules"
                  :info="formCfg.info"
                  :icon="formCfg.icon" />
              </div>
            </div>
          </div>
          <div class="nui-col-4">
            <br>
            <nui-code
              lang="html"
              :code="formCode.str.html" />
          </div>
        </div>
        <div class="nui-row">
          <div class="nui-col-3">
            <h4>
              数字类型 <code>&lt;nui-form-num/&gt;</code>
            </h4>
            <h6>默认</h6>
            <nui-form-num
              v-model="form.num"
              :rd="formCfg.rd"
              :dd="formCfg.dd"
              :rules="formCfg.rules"
              :info="formCfg.info"
              :icon="formCfg.icon" />
            <h6>滑块 <code>:rg=true</code></h6>
            <nui-form-num
              v-model="form.num"
              type="range"
              color="color-gn"
              rg
              :rd="formCfg.rd"
              :dd="formCfg.dd"
              :rules="formCfg.rules"
              :info="formCfg.info"
              :icon="formCfg.icon" />
          </div>
          <div class="nui-col-3">
            <h4>
              下拉菜单 <code>&lt;nui-form-st/&gt;</code>
            </h4>
            <h6>单选 <code>v:Str|Num</code> </h6>
            <nui-form-st
              v-model="form.radio"
              :items="valueList"
              :rd="formCfg.rd"
              :dd="formCfg.dd"
              :rules="formCfg.rules"
              :info="formCfg.info"
              :icon="formCfg.icon" />
            <h6>多选 <code>v:Array</code> 上弹出<code> :up [boolean] </code></h6>
            <nui-form-st
              v-model="form.checkbox"
              :items="valueList"
              :rd="formCfg.rd"
              :dd="formCfg.dd"
              :rules="formCfg.rules"
              :info="formCfg.info"
              :icon="formCfg.icon"
              up />
          </div>
          <div class="nui-col-6">
            <h4>单多选 <code>&lt;nui-form-rc/&gt;</code> <small>开关样式 <code>:sw = true</code></small></h4>
            <div class="nui-row">
              <div class="nui-col-4">
                <h6>单选绑定值 <code>v:Str|Num</code></h6>
                <nui-form-rc
                  v-model="form.checkbox"
                  :items="valueList" />
                <nui-form-rc
                  v-model="form.checkbox"
                  sw
                  :items="valueList" />
              </div>
              <div class="nui-col-4">
                <h6>多选绑定数组 <code>v:Array</code></h6>
                <nui-form-rc
                  v-model="form.radio"
                  :items="valueList" />
                <nui-form-rc
                  v-model="form.radio"
                  sw
                  :items="valueList" />
              </div>
              <div class="nui-col-4">
                <h6>单项切换布尔值 <code>v:Boolean</code></h6>
                <nui-form-rc
                  v-model="form.boolean"
                  :items="valueList" />
              </div>
            </div>
          </div>
        </div>
        <div class="nui-row">
          <div class="nui-col-3">
            <nui-code
              lang="html"
              :code="formCode.num.html" />
          </div>
          <div class="nui-col-3">
            <nui-code
              lang="html"
              :code="formCode.st.html" />
          </div>
          <div class="nui-col-3">
            <nui-code
              :code="formCode.rc.js" />
          </div>
          <div class="nui-col-3">
            <nui-code
              lang="html"
              :code="formCode.rc.html" />
          </div>
        </div>
        <div class="nui-row">
          <div class="nui-col-3">
            <h4>
              表单项 <code>&lt;nui-form-item/&gt;</code>
            </h4>
            <nui-form-item>
              <template #before>
                <nui-form-st
                  v-model="form.radio"
                  style="width:60px"
                  :items="valueList"
                  :rd="formCfg.rd"
                  :dd="formCfg.dd"
                  :rules="formCfg.rules"
                  :info="formCfg.info"
                  :icon="formCfg.icon" />
              </template>
              <template #after>
                text
              </template>
              <nui-form-str
                v-model="form.str"
                :rd="formCfg.rd"
                :dd="formCfg.dd"
                :rules="formCfg.rules"
                :info="formCfg.info"
                :icon="formCfg.icon" />
            </nui-form-item>
            <br>
            <nui-code
              lang="html"
              :code="formCode.item.html" />
          </div>
          <div class="nui-col-3">
            <h4>
              表单 <code>&lt;nui-form /&gt;</code> <code>{{ isConfirm }}</code>
            </h4>
            <nui-form
              :datas="formDatas"
              :items="formItem"
              :resetbtn="{
                label: '重置',
                cls: 'color-atom'
              }"
              :submitbtn="{
                label: '提交',
                cls: 'color-bl'
              }"
              @confirm="isConfirm = !isConfirm" />
          </div>
          <div class="nui-col-3">
            <nui-code
              lang="html"
              :code="formCode.form.html" />
          </div>
          <div class="nui-col-3">
            <nui-code
              :code="formCode.form.js" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import formCode from './datas/form';
export default {
  name: 'DemoForm',
  setup(){
    return {formCode};
  },
  data(){
    const formCfg = {
      rd: false,
      dd: false,
      info: '填写该项',
      rules: {required: true},
      icon: ['',''],
    };
    const valueList = [{label: '选1',v: '1',dd: true},{label: '选2',v: 2},{label: '选3',v: '12'}];
    return {
      strType: ['text','search','password','email','url','tel','date','time','datetime-local','month','week'],
      formCfg,
      form: {
        str: '',
        num: 0,
        radio: '',
        checkbox: [2],
        boolean: false
      },
      formDatas: {
        str: '',
        num: 30,
        radio: '',
        checkbox: [],
      },
      formItem: [
        {
          label: '字符串',
          col: 6,
          field: 'str',
          mod: 'str',
          bind: formCfg,
        },
        {
          label: '数字',
          col: 6,
          field: 'num',
          mod: 'num',
          bind: {...formCfg,rg: true},
        },
        {
          col: 'line',
        },
        {
          label: '单选',
          col: 12,
          field: 'radio',
          mod: 'rc',
          bind: {items: valueList},
        },
        {
          label: '下拉单',
          col: 6,
          field: 'radio',
          mod: 'st',
          bind: {items: valueList},
        },
        {
          label: '下拉多',
          col: 6,
          field: 'checkbox',
          mod: 'st',
          bind: {items: valueList},
        },
      ],
      isConfirm: false,
      valueList,
    };
  }
};
</script>
