<template>
  <div class="nui-container">
    <div
      class="nui-row-grid --min-80 --sp-10"
      grid="100px">
      <template
        v-for="(icon,key) in iconArr"
        :key="key">
        <div
          class="nui-card tt-c tt-copy">
          <div class="nui-card-body">
            <i
              :class="icon"
              class="h1" />
          </div>
          <div class="nui-card-foot">
            <ins>{{ icon }}</ins>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import iconArr from './datas/icon';
export default {
  name: 'DemoIcon',
  setup(){
    return {iconArr};
  }
};
</script>