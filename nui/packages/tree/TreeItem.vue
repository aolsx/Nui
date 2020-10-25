<template>
  <li
    v-if="item.tree"
    class="nui-tree-nodes"
    :class="item.open&&'--open'">
    <hr>
    <div
      tabindex="-1"
      class="nui-tree-item"
      draggable="true">
      <i
        class="nui-tree-arrow"
        :class="`nui-icon-angle-${item.open?'down':'right'}`" />
      <i
        v-if="item.icon"
        :class="item.icon" />
      <ins>{{ item.label || item.to }}</ins>
    </div>
    <ul
      tabindex="-1"
      class="nui-tree-in">
      <in-tree-item
        v-for="(im,k) in item.tree"
        :key="k"
        :item="im" />
    </ul>
  </li>
  <li v-else>
    <hr>
    <div
      tabindex="-1"
      class="nui-tree-item"
      draggable="true">
      <i
        v-if="item.icon"
        :class="item.icon" />
      <ins>{{ item.label || item.to }}</ins>
    </div>
  </li>
</template>
<script>
export default {
  name: 'InTreeItem',
  props: {
    item: {
      type: Object,
      required: true
    }
  }
};
</script>