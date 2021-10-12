<template>
  <div class="nui-paging">
    <div class="nui-paging-total">
      <i :class="icon" />
      <ins><b>{{ total }}</b></ins>
    </div>
    <div class="nui-paging-item">
      <nui-btn
        :dd="acPg < 2"
        icon="nicon-chevron-left"
        @click="acPg-=1,eveTo()" />
      <div v-if="!c_pgTotal">
        <span>0 / 0</span>
      </div>
      <div v-else>
        <span>{{ acPg }}</span>
        <span>/</span>
        <span>{{ c_pgTotal }}</span>
      </div>
      <nui-btn
        :dd="acPg >= c_pgTotal"
        icon="nicon-chevron-right"
        @click="acPg+=1,eveTo()" />
    </div>
    <div
      v-if="pgSzOpt"
      class="nui-paging-select">
      <nui-form-st
        v-model="pgSzNum"
        class="bg-none"
        up
        :icon="['nicon-bars']"
        :items="pgSzOpt" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'NuiPaging',
  props: {
    // 数据总条数
    icon: {
      type: String,
      default: 'nicon-database'
    },
    total: {
      type: Number,
      default: 0
    },
    // 每页显示多少条数据
    pgSz: {
      type: Number,
      default: 10
    },
    // 选择
    pgSzOpt: {
      type: Array,
      default(){
        return null;
      }
    }
  },
  emits: ['pg'],
  data(){
    return {
      // 当前页码
      acPg: 1,
      pgSzNum: this.pgSz
    };
  },
  computed: {
    // 总页数
    c_pgTotal(){
      return Math.ceil(this.total / this.pgSzNum);
    },
  },
  watch: {
    c_pgTotal(v){
      if (this.acPg >= v){
        this.acPg = v;
      }
    },
    pgSzNum(n,o){
      this.eveTo(true);
    },
  },
  methods: {
    eveTo(upsz = false){
      this.$emit('pg',{
        page: this.acPg,
        size: this.pgSzNum,
        upsz
      });
    }
  },
};
</script>
