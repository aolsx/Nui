<template>
  <li
    :class="c_class"
    @_vue="()=>this">
    <hr>
    <div
      tabindex="-1"
      class="nui-tree-item"
      :class="{'--arrow':p_arrow,'--ac':c_isAc}"
      :draggable="!p_sort?false:true"
      @_vue="()=>this"
      @_dragType="()=>dragType">
      <span
        v-if="!c_notChild"
        class="nui-tree-arrow"
        @click.stop="eveOpen()">
        <i
          :class="`nicon-angle-${isOpen?'down':'right'}`" />
        <i
          v-if="p_childIcon"
          :class="isOpen?p_childIcon[1]:p_childIcon[0]" />
      </span>
      <div
        @contextmenu.stop.prevent="eveRclick"
        @click.stop="eveClick()">
        <template v-if="!hasslot">
          <i
            v-if="item.icon"
            :class="item.icon" />
          <ins>{{ item[p_labelkey] }}</ins>
        </template>
        <slot
          :data="item"
          :k="itemkey" />
      </div>
    </div>
    <ul
      tabindex="-1"
      class="nui-tree-in">
      <in-tree-item
        v-for="(im,kk) in item[p_child]"
        :key="kk"
        :item="im"
        :itemkey="kk"
        :hasslot="hasslot">
        <template #default="{data,k}">
          <slot
            :data="data"
            :k="k" />
        </template>
      </in-tree-item>
    </ul>
  </li>
</template>
<script>
export default {
  name: 'InTreeItem',
  inject: ['p_click','p_rclick','p_open','dragType','p_child','p_childIcon','p_arrow','p_idkey','p_labelkey','p_ackeys','p_sort','p_expand'],
  props: {
    item: {
      type: Object,
      required: true
    },
    itemkey: {
      type: [String,Number],
      required: true
    },
    hasslot: Boolean
  },
  data(){
    return {
      isOpen: this.item.open || this.p_expand || false
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
  methods: {
    eveClick(){
      // 存在子节点并且不是箭头则 开关
      if (!this.c_notChild && !this.p_arrow){
        this.isOpen = !this.isOpen;
        this.p_open(this.item);
      } else {
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