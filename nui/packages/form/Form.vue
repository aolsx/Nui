<template>
  <form
    class="nui-form"
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
        v-bind="submitbtn"
        @click="formSubmit()" />
    </div>
  </form>
</template>
<script>
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
        // return {
        //   label: 'Reset',
        //   cls: 'color-gy'
        // };
        return null;
      },
    },
    submitbtn: {
      type: Object,
      default(){
        return {
          label: 'Submit',
          cls: 'color-bl'
        };
      }
    },
  },
  emits: ['confirm'],
  data(){
    return {
      vlues: this.datas
    };
  },
  created(){
    if (this.datas){
    // 备份一个初始值
      this.backupDatas = this.toOriginalData(this.datas);
    }
  },
  methods: {
    toOriginalData(proxyData){
      const newDatas = {};
      for (const key in proxyData){
        if (Array.isArray(proxyData[key])){
          newDatas[key] = [...proxyData[key]];
        } else {
          newDatas[key] = proxyData[key];
        }
      }
      return newDatas;
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