<template>
  <div class="nui-list">
    <template
      v-for="(im,k) in list"
      :key="k">
      <div
        v-if="im.to"
        class="nui-list-item"
        :class="ac===im.to &&'--active'"
        @click.stop="$emit('click',im.to)">
        <i
          v-if="im.icon"
          :class="im.icon" />
        <ins>{{ im.label||im.to }}</ins>
      </div>
      <div
        v-else
        class="nui-list-item --line">
        <i
          v-if="im.icon"
          :class="im.icon" />
        <ins>{{ im.label }}</ins>
      </div>
    </template>
  </div>
</template>
<script>
export default {
  name: 'NuiList',
  props: {
    list: {
      type: Array,
      required: true
    },
    ac: {
      type: String,
      default: ''
    },
  },
  emits: ['click']
};
</script>