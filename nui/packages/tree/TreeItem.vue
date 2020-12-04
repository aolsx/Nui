<template>
  <li
    :class="c_class"
    @_vue="()=>this">
    <hr>
    <div
      tabindex="-1"
      class="nui-tree-item"
      :class="{'--arrow':p_arrow,'--ac':c_isAc}"
      :draggable="lock||!p_sort?false:true"
      @_vue="()=>this"
      @_dragType="()=>dragType">
      <i
        v-if="!c_notChild"
        class="nui-tree-arrow"
        :class="`nui-icon-angle-${isOpen?'down':'right'}`"
        @click.stop="eveOpen()" />
      <span
        @contextmenu.stop.prevent="eveRclick"
        @click.stop="eveClick()">
        <i
          v-if="lock"
          class="nui-icon-lock m-r-25em op-5 h7" />
        <i
          v-if="icon"
          :class="icon" />
        <ins>{{ label }}</ins>
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
</template>
<script>
export default {
  name: 'InTreeItem',
  inject: ['p_click','p_rclick','p_open','dragType','p_child','p_arrow','p_idkey','p_labelkey','p_ackeys','p_callback','p_sort'],
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data(){
    return {
      isOpen: this.item.open || false,
      icon: this.item.icon,
      lock: this.item.lock,
      label: this.item[this.p_labelkey]
    };
  },
  computed: {
    c_notChild(){
      return !this.item[this.p_child];
    },
    c_class(){
      if (this.c_notChild){
        return null;
      }
      return ['nui-tree-nodes',{'--open': this.isOpen}];
    },
    c_isAc(){
      const k = this.item[this.p_idkey];
      const keys = this.p_ackeys;
      if (keys?.length && k !== undefined){
        return keys.includes(k);
      }
      return false;
    }
  },
  mounted(){
    this.p_callback?.(this);
  },
  methods: {
    eveClick(){
      // 存在子节点并且不是箭头则 开关
      if (!this.c_notChild && (!this.p_arrow || this.lock)){
        this.isOpen = !this.isOpen;
        this.p_open(this.item);
      } else if (!this.lock){
        this.p_click(this.item);
      }
    },
    eveOpen(){
      this.isOpen = !this.isOpen;
      this.p_open(this.item);
    },
    eveRclick(e){
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