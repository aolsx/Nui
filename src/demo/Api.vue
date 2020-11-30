<template>
  <div class="nui-container bg-atom --dks p-lr-15">
    <h2>
      内置APP
      <span class="h6">
        挂载全局对象 |
        <code>this.$Nui.[fn]()</code>
      </span>
    </h2>
    <div class="nui-row h5">
      <div
        v-for="(arr,ka) in apiList"
        :key="ka"
        class="nui-col-6">
        <div
          v-for="(im,key) in arr"
          :key="key">
          <h4>{{ im.title }}</h4>
          <table>
            <tr
              v-for="(c,k) in im.list"
              :key="k">
              <td>
                <code
                  class="tt-copy h5"
                  @click="$Nui.copy(c[0])">{{ c[0] }}</code>
              </td>
              <td>
                <div
                  :class="c[2]"
                  :style="c[3]">
                  {{ c[1] }}
                </div>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import apiList from './datas/api';
export default {
  name: 'DemoApi',
  setup(){
    return {apiList};
  }
};
</script>