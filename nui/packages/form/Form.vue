<template>
  <form
    class="nui-form"
    :class="{'nui-form-border':br}"
    novalidate="true"
    autocomplete="off">
    <div class="nui-form-body">
      <div
        v-if="items"
        class="nui-row">
        <div
          v-for="(im,k) in items"
          :key="k"
          :class="`nui-col-${im.col||12}`">
          <div
            v-if="im.label"
            class="nui-form-label">
            {{ im.label }}
          </div>
          <nui-form-str
            v-if="im.mod=='str'"
            v-model="vlues[im.field]"
            v-bind="im.bind" />
          <nui-form-num
            v-else-if="im.mod=='num'"
            v-model="vlues[im.field]"
            v-bind="im.bind" />
          <nui-form-rc
            v-else-if="im.mod=='rc'"
            v-model="vlues[im.field]"
            v-bind="im.bind" />
          <nui-form-st
            v-else-if="im.mod=='st'"
            v-model="vlues[im.field]"
            v-bind="im.bind" />
        </div>
      </div>
      <slot />
    </div>
    <slot
      name="submit"
      :reset="formReset"
      :submit="formSubmit" />
    <div
      v-if="!$slots.submit"
      class="nui-form-submit">
      <nui-btn
        v-if="backupDatas && resetbtn"
        v-bind="resetbtn"
        @click="formReset()" />
      <nui-btn
        v-bind="c_style"
        @click="formSubmit()" />
    </div>
  </form>
</template>
<script>
import {toRaw} from 'vue';
export default {
  name: 'NuiForm',
  props: {
    datas: {
      type: Object,
      default(){
        return {};
      }
    },
    items: {
      type: Array,
      default(){
        return null;
      }
    },
    resetbtn: {
      type: Object,
      default(){
        return {
          label: '重置',
          cls: 'color-gy --cdk',
          icon: 'nicon-undo-alt'
        };
      },
    },
    submitbtn: {
      type: Object,
      default(){
        return {
          label: '提交',
          cls: 'color-bl',
          icon: 'nicon-check',
        };
      }
    },
    isedit: {
      type: Boolean,
      default: null
    },
    br: {
      type: Boolean,
      default: false
    }
  },
  emits: ['confirm'],
  data(){
    return {
      vlues: this.datas
    };
  },
  computed: {
    c_style(){
      if (this.isedit === null){
        return this.submitbtn;
      }
      return this.isedit ? {
        label: '修改',
        cls: 'color-bl',
        icon: 'nicon-edit',
      } : {
        label: '新增',
        cls: 'color-gn',
        icon: 'nicon-plus',
      };
    }
  },
  created(){
    if (this.datas){
    // 备份一个初始值
      this.backupDatas = this.toOriginalData(this.datas);
    }
  },
  methods: {
    toOriginalData(proxyData){
      return JSON.parse(JSON.stringify(toRaw(proxyData)));
    },
    // 提交表单
    formSubmit(){
      // this.$el.reportValidity();
      if (this.$el.checkValidity()){
        this.$emit('confirm',this.toOriginalData(this.datas));
      } else {
        for (const input of this.$el.elements){
          if (!input.validity.valid){
            input.focus();
            return;
          }
        }
      }
    },
    // 重置表单
    formReset(){
      const datas = this.datas;
      const backup = this.backupDatas;
      for (const key in datas){
        if (Array.isArray(datas[key])){
          datas[key].splice(0,datas[key].length,...backup[key]);
        } else {
          datas[key] = backup[key];
        }
        // this.$set(this.datas,key,this.backupDatas[key]);
      }
    }
  },
};
</script>