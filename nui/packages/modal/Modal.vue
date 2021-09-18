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
          :class="color">
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
              v-if="icon"
              :class="icon" />
            <ins v-if="label">{{ label }}</ins>
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
    }
  },
  emits: ['close'],
  data(){
    return {
      hide: false
    };
  },
  methods: {
    hideFn(){
      this.hide = true;
    }
  },
};
</script>