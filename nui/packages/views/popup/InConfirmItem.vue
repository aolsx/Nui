<template>
  <teleport to="#ToPppMod">
    <transition
      appear
      name="cfm"
      :duration="800"
      @after-leave="$parent.eveDel(item.id)">
      <div
        v-if="show"
        class="nui-popup-mask">
        <div
          class="nui-confirm"
          :class="item.pm.color">
          <div class="nui-confirm-cobg" />
          <div class="nui-confirm-bg" />
          <div
            class="nui-confirm-btn"
            @click.stop.prevent="item.onConfirm(true);show=false">
            <i class="nui-icon-check-circle" />
          </div>
          <div
            class="nui-confirm-close"
            @click.stop.prevent="item.onConfirm(false);show=false">
            <i class="nui-icon-times" />
          </div>
          <div class="nui-confirm-icon">
            <i :class="item.pm.icon||'nui-icon-question'" />
          </div>
          <div class="nui-confirm-body">
            <span>{{ item.pm.msg||'是否确认该操作?' }}</span>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>
<script>
export default {
  name: 'InConfirmItem',
  props: {
    item: {
      type: Object,
      required: true
    },
  },
  data(){
    return {
      show: true
    };
  }
};
</script>