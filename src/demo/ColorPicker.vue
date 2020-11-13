<template>
  <div class="-full nui-flex">
    <div class="nui-flex-auto">
      22
    </div>
    <div
      class="bg-atom --dks nui-flex">
      <div
        style="width:50px"
        class="nui-container nui-flex-none tt-c p-t-15">
        <div
          v-for="(co,k) in colors"
          :key="k">
          <span
            class="nui-badge m-t-10 -link"
            :style="`width:20px;height:20px;background-color:${co.variations[4].hex};border-radius:${acc==k?'4px':'50%'}`"
            @click="acc = acc==k?null:k" />
        </div>
      </div>
      <div
        v-if="acc !== null"
        style="width:180px"
        class="nui-flex-auto b-l nui-container p-lr-10">
        <h2>
          {{ colors[acc].color }}
        </h2>
        <div
          v-for="(o,k) in colors[acc].variations"
          :key="k"
          class="nui-card m-b-15 -sdw-none"
          :style="`height:50px;background-color:${o.hex}`">
          <div
            class="nui-card-body color-bk op-7 nui-flex --h --hb --vc"
            @click="$Nui.copy(o.hex)">
            <b>{{ o.weight }}</b>
            <b class="tt-copy">{{ o.hex }}</b>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import colors from './datas/colors';
export default {
  name: 'DemoColorPicker',
  setup(){
    return {colors};
  },
  data(){
    return {
      acc: null
    };
  },
};
</script>
