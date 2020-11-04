<template>
  <li
    v-if="item[p_child]"
    class="nui-tree-nodes"
    :class="isOpen&&'--open'">
    <hr>
    <div
      tabindex="-1"
      class="nui-tree-item"
      draggable="true"
      @contextmenu.stop.prevent="rclick()"
      @click.stop.prevent="isOpen=!isOpen,p_open(item)">
      <i
        class="nui-tree-arrow"
        :class="`nui-icon-angle-${isOpen?'down':'right'}`" />
      <i
        v-if="item.icon"
        :class="item.icon" />
      <ins>{{ item.label || item.to }}</ins>
    </div>
    <ul
      tabindex="-1"
      class="nui-tree-in">
      <in-tree-item
        v-for="(im,k) in item[p_child]"
        :key="k"
        :item="im" />
    </ul>
  </li>
  <li v-else>
    <hr>
    <div
      tabindex="-1"
      class="nui-tree-item"
      draggable="true"
      @contextmenu.stop.prevent="rclick()"
      @click.stop.prevent="p_click(item)">
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
  inject: ['p_click','p_rclick','p_open','dragType','p_child'],
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data(){
    return {
      isOpen: this.item.open || false
    };
  },
  methods: {
    rclick(){
      const ptArr = this.$parent.tree || this.$parent.item[this.p_child];
      this.p_rclick({ptArr,k: this.$.vnode.key});
    }
  },
};
</script>