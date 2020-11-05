<template>
  <div
    class="nui-lut-group"
    tabIndex="-1"
    :class="{'--min':min,'--right':floatRt}"
    @_vue="()=>this">
    <div
      v-for="(pt,k) in group.cols"
      :key="k"
      class="nui-lut-group-item"
      :style="pt.pos.flex>1?`height:${pt.pos.flex}px`:`height:${pt.pos.flex*100}%`"
      @_vue="()=>this">
      <div
        v-if="k > 0"
        class="nui-lut-line"
        @mousedown.prevent="$parent.colSize($event,this,k)" />
      <div
        v-if="min"
        :key="k"
        class="nui-lut-tabs-min"
        @dragstart.stop="$parent.dragStart($event)"
        @_vue="()=>this">
        <div
          v-for="(tab,tk) in pt.col.tabs"
          :key="tk"
          class="nui-lut-tab-min"
          draggable="true"
          :class="minAc==k&&pt.col.active==tab&&'--active'"
          @click.stop="clickMin(k,pt,tab)"
          @dragstart.stop="$parent.dragStart($event)">
          <i
            v-if="$parent.mods[tab].icon"
            :class="$parent.mods[tab].icon" />
          <ins v-if="$parent.mods[tab].label">{{ $parent.mods[tab].label }}</ins>
        </div>
      </div>
      <div
        class="nui-lut-panel"
        :class="min&&minAc==k&&'--active'"
        :style="min&&`width:${pt.pos.w}px;height:${pt.pos.h}px`">
        <div
          :key="k"
          class="nui-lut-tabs"
          @_vue="()=>this">
          <div
            v-for="(tab,tk) in pt.col.tabs"
            :key="tk"
            class="nui-lut-tab"
            draggable="true"
            :class="pt.col.active==tab&&'--active'"
            @click.stop="pt.col.active=tab"
            @dragstart.stop="$parent.dragStart($event)">
            <i
              v-if="$parent.mods[tab].icon"
              :class="$parent.mods[tab].icon" />
            <ins v-if="$parent.mods[tab].label">{{ $parent.mods[tab].label }}</ins>
          </div>
        </div>
        <div class="nui-lut-content">
          <div
            v-for="(tab,tk) in pt.col.tabs"
            :key="`${tab.component}-${tk}`"
            class="nui-lut-component"
            :class="pt.col.active==tab&&'--active'">
            <component :is="$parent.mods[tab].component" />
          </div>
        </div>
        <div
          v-if="min"
          class="nui-lut-group-foot">
          <i @mousedown="$parent.sideWhSize($event,pt.pos,'ne')" />
          <span @mousedown="$parent.sideWhSize($event,pt.pos,'n')" />
          <i @mousedown="$parent.sideWhSize($event,pt.pos,'nw')" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'InSdGroupFt',
  props: {
    group: {
      type: Object,
      required: true
    },
  },
  data(){
    return {
      minAc: -1
    };
  },
  computed: {
    min(){
      return this.group.pos.min;
    },
    floatRt(){
      const pos = this.group.pos;
      return pos.l + pos.w / 2 > document.body.offsetWidth / 2;
    }
  },
  mounted(){
    if (this.$el.offsetWidth <= 100){
      const pos = this.group.pos;
      pos.min = true;
    }
  },
  methods: {
    clickMin(k,pt,tab){
      if (this.minAc == k){
        if (pt.col.active == tab){
          this.minAc = -1;
        } else {
          pt.col.active = tab;
        }
      } else {
        this.minAc = k;
        pt.col.active = tab;
      }
    }
  },
};
</script>