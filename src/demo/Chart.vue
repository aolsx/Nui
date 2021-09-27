<template>
  <div class="nui-container --p">
    <div class="nui-row">
      <div class="nui-col-6">
        <h3>进度条3D <code>组件</code> </h3>
        <div class="nui-flex-line p-15">
          <div>
            <div>透视 <code>:pce = {{ PceNum }}</code></div>
            <nui-form-num
              v-model="PceNum"
              :rules="{min:5,max:50}"
              rg />
          </div>
          <div>
            <div>大小 <code>:sz = {{ SzNum }}</code></div>
            <nui-form-num
              v-model="SzNum"
              rg />
          </div>
          <div>
            <div>进度 <code>:pro = {{ ProNum }}</code></div>
            <nui-form-num
              v-model="ProNum"
              rg />
          </div>
        </div>
        <div class="nui-row">
          <div class="nui-col-6">
            <div class="bg-atom --dks p-15">
              <nui-pro-box
                :pro="ProNum"
                :sz="SzNum"
                :pce="PceNum"
                bg="a" />
              <nui-pro-box
                class="color-gn"
                :pro="ProNum"
                :sz="SzNum"
                :pce="PceNum"
                :label="`${ProNum}GB`"
                bg="b" />
              <nui-pro-box
                class="color-red"
                :pro="ProNum"
                :sz="SzNum"
                :pce="PceNum"
                bg="c">
                <span>{{ ProNum }} / 30GB</span>
              </nui-pro-box>
            </div>
          </div>
          <div class="nui-col-6">
            <div class="bg-atom --dks p-15">
              <nui-pro-box
                :pro="ProNum"
                :sz="SzNum"
                :pce="PceNum"
                :color="['#4a9cf9','#9c50ff']" />
              <nui-pro-box
                :pro="ProNum"
                :sz="SzNum"
                :pce="PceNum"
                :color="['#799a33','#e88f07']" />
              <nui-pro-box
                :pro="ProNum"
                :sz="SzNum"
                :pce="PceNum"
                :color="['#bf4040','#07e895']" />
            </div>
          </div>
        </div>
        <div class="m-t-5">
          <nui-code
            lang="html"
            :code="formCode.box.html" />
        </div>
      </div>
      <div class="nui-col-6">
        <h3>进度条 圆环 <code>组件</code> </h3>
        <div class="nui-flex-line p-15">
          <div>
            <div>大小 <code>:sz = {{ RdSzNum }}</code></div>
            <nui-form-num
              v-model="RdSzNum"
              :rules="{min:10,max:300}"
              rg />
          </div>
          <div>
            <div>边宽 <code>:sw = {{ RdSwNum }}</code></div>
            <nui-form-num
              v-model="RdSwNum"
              rg />
          </div>
          <div>
            <div>进度 <code>:pro = {{ ProNum }}</code></div>
            <nui-form-num
              v-model="ProNum"
              rg />
          </div>
        </div>
        <div class="nui-row">
          <div class="nui-col-4">
            <nui-pro-round
              :pro="ProNum"
              :sz="RdSzNum"
              :sw="RdSwNum" />
          </div>
          <div class="nui-col-4">
            <nui-pro-round
              class="color-red"
              :pro="ProNum"
              :sz="RdSzNum"
              :sw="RdSwNum"
              label="附加信息" />
          </div>
          <div class="nui-col-4">
            <nui-pro-round
              :pro="ProNum"
              :sz="RdSzNum"
              :sw="RdSwNum"
              :color="['#bf4040 ','#07e895']">
              <div class="h1">
                {{ ProNum }}
              </div>
              <span>自定义</span>
            </nui-pro-round>
          </div>
        </div>
        <div class="m-t-5">
          <nui-code
            lang="html"
            :code="formCode.round.html" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import formCode from './datas/chart';
export default {
  name: 'DemoChart',
  setup(){
    return {formCode};
  },
  data(){
    return {
      PceNum: 10,
      SzNum: 30,
      ProNum: 45,
      RdSzNum: 120,
      RdSwNum: 3,
    };
  },
};
</script>
