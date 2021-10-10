<template>
  <teleport to="#ToPppMod">
    <transition
      appear
      name="modal"
      :duration="1400"
      @after-leave="$emit('close')">
      <div
        v-show="!hide"
        class="nui-popup-mask">
        <div
          class="nui-modal"
          :class="c_style.c">
          <div class="nui-modal-cobg" />
          <div class="nui-modal-cobg" />
          <div class="nui-modal-bg" />
          <div
            class="nui-modal-btn"
            @click.stop.prevent="hide=true">
            <i class="nicon-times" />
          </div>
          <div class="nui-modal-head">
            <i
              v-if="c_style.i"
              :class="c_style.i" />
            <ins v-if="c_style.l">{{ c_style.l }}</ins>
            <slot name="head" />
          </div>
          <div class="nui-modal-body">
            <slot :hideFn="hideFn" />
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>
<script>
export default {
  name: 'NuiModal',
  props: {
    color: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    formEdit: {
      type: Boolean,
      default: null
    }
  },
  emits: ['close'],
  data(){
    return {
      hide: false
    };
  },
  computed: {
    c_style(){
      const obj = {
        c: this.color,
        i: this.icon,
        l: this.label,
      };
      if (this.formEdit === null){
        return obj;
      }
      // 编辑新增组
      const gObj = this.formEdit ? {
        c: 'color-bl',
        i: obj.i || 'nicon-edit',
        l: `编辑${obj.l}`,
      } : {
        c: 'color-gn',
        i: obj.i || 'nicon-plus',
        l: `新增${obj.l}`,
      };
      return gObj;
    }
  },
  methods: {
    hideFn(){
      this.hide = true;
    }
  },
};
</script>