<template>
  <li :class="c_class">
    <hr>
    <div
      tabindex="-1"
      class="nui-tree-item"
      draggable="true"
      @click.stop.prevent="eveClick()">
      <i
        v-if="!c_notChild"
        class="nui-tree-arrow"
        :class="`nui-icon-angle-${isOpen?'down':'right'}`" />
      <span @contextmenu.stop.prevent="eveRclick">
        <i
          v-if="item.icon"
          :class="item.icon" />
        <ins>{{ item.label }}</ins>
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
  computed: {
    c_notChild(){
      return !this.item[this.p_child];
    },
    c_class(){
      if (this.c_notChild){
        return null;
      }
      return ['nui-tree-nodes',{'--open': this.isOpen}];
    }
  },
  created(){
    this.$nextTick(()=>{
      this.$el._vueGet = ()=>this;
      this.$el.children[1]._vueGet = ()=>this;
      this.$el.children[1]._dragType = this.dragType;
    });
  },
  methods: {
    eveClick(){
      if (this.c_notChild){
        this.p_click(this.item);
      } else {
        this.isOpen = !this.isOpen;
        this.p_open(this.item);
      }
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