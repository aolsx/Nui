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
      @click.stop.prevent="isOpen=!isOpen,p_open(item)">
      <i
        class="nui-tree-arrow"
        :class="`nui-icon-angle-${isOpen?'down':'right'}`" />
      <span @contextmenu.stop.prevent="rclick">
        <i
          v-if="item.icon"
          :class="item.icon" />
        <ins>{{ item.label || item.to }}</ins>
      </span>
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
      @click.stop.prevent="p_click(item)">
      <span @contextmenu.stop.prevent="rclick">
        <i
          v-if="item.icon"
          :class="item.icon" />
        <ins>{{ item.label || item.to }}</ins>
      </span>
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
    rclick(e){
      const ptArr = this.$parent.tree || this.$parent.item[this.p_child];
      this.p_rclick({
        ptArr,
        k: this.$.vnode.key,
        e
      });
    }
  },
};
</script>