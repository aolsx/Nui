<template>
  <div class="nui-container bg-atom --dks p-lr-15">
    <h2>
      常用样式
      <span class="h6">
        命名规则 |
        <code>.-[^]</code> 全局样式 无前缀 |
        <code>.nui-[^]</code> 常规样式 前缀 |
        <code>^.--[^]</code> 样式扩展 自身无样式
        <code>^ > ._[^]</code> 子类样式 自身无样式
      </span>
    </h2>
    <div class="nui-row">
      <div
        v-for="(im,key) in cssList"
        :key="key"
        :class="`nui-col-${im.row}`">
        <h4>{{ im.title }} <code v-if="im.smCode"><small>{{ im.smCode }}</small></code></h4>
        <table>
          <tr
            v-for="(c,k) in im.list"
            :key="k">
            <td><code class="tt-copy">{{ c[0] }}</code></td>
            <td>
              <div
                :class="c[2]"
                :style="c[3]">
                {{ c[1] }}
              </div>
            </td>
          </tr>
        </table>
        <div
          v-if="im.child"
          class="nui-row">
          <div
            v-for="(cm,ck) in im.child"
            :key="ck"
            :class="`nui-col-${cm.row}`">
            <h5>{{ cm.title }} <code v-if="cm.smCode"><small>{{ cm.smCode }}</small></code></h5>
            <table>
              <tr
                v-for="(c,k) in cm.list"
                :key="k">
                <td><code class="tt-copy">{{ c[0] }}</code></td>
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
  </div>
</template>
<script>
import cssList from './datas/basisCss';
export default {
  name: 'DemoBasisCss',
  setup(){
    return {cssList};
  }
};
</script>