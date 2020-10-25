<template>
  <div
    v-if="isOpen"
    class="nui-popup-mask --am">
    <div class="nui-loadam">
      <div
        class="nui-loadam-loop"
        :class="{play:isOnePlay}">
        <svg
          viewBox="0 0 120 120"
          filter="url(#blur_loading_line)">
          <defs>
            <filter id="blur_loading_line">
              <feOffset
                result="offOut"
                in="SourceGraphic" />
              <feGaussianBlur
                result="blurOut"
                in="offOut"
                stdDeviation="6" />
              <feBlend
                in="SourceGraphic"
                in2="blurOut"
                mode="normal" />
            </filter>
          </defs>
          <g>
            <g>
              <polyline
                v-bind="attrsLine"
                stroke="#343c45" />
              <polyline v-bind="attrsLineInner" />
            </g>
            <g>
              <polyline
                v-bind="attrsLine"
                stroke="#c7ff30" />
              <polyline v-bind="attrsLineInner" />
            </g>
            <g>
              <polyline
                v-bind="attrsLine"
                stroke="#18e365" />
              <polyline
                v-bind="attrsLineInner"
                @animationend="eveAnimationend" />
              <polyline
                v-bind="attrsLineInner"
                stroke="#c7ff30" />
            </g>
          </g>
          <g transform="rotate(180,60,60) translate(35,35) scale(.4,.4)">
            <g>
              <polyline
                v-bind="attrsLine"
                stroke="#343c45" />
            </g>
            <g>
              <polyline
                v-bind="attrsLine"
                stroke="#c7ff30" />
            </g>
            <g>
              <polyline
                v-bind="attrsLine"
                stroke="#18e365" />
            </g>
          </g>
        </svg>
      </div>
    </div>
  </div>
</template>
<script>
import {LoadAmState} from '../../../handler/load';
export default {
  name: 'InLoadAm',
  data(){
    return {
      // 开启
      isOpen: false,
      // 开始动画
      AmState: {
        isPlay: false
      },
      // 单次完成
      isOnePlay: false
    };
  },
  computed: {
    attrsLine(){
      return {
        class: "nui-loadam-line",
        fill: "none",
        'stroke-width': 12,
        'stroke-linejoin': "round",
        'stroke-linecap': "round",
        points: "67,14 103.3,35 103.3,85 60,110 16.7,85 16.7,35 53,14",
      };
    },
    attrsLineInner(){
      return {
        ...this.attrsLine,
        class: "nui-loadam-line-inner",
        stroke: "#18181f90",
        'stroke-width': 6,
      };
    }
  },
  watch: {
    'AmState.isPlay'(v){
      if (v){
        this.isOpen = true;
        this.isOnePlay = true;
      }
    }
  },
  created(){
    LoadAmState.v = this.AmState;
  },
  methods: {
    eveAnimationend(){
      // 单次完成后
      this.isOnePlay = false;
      // 如果暂停动画 则隐藏整个块
      if (!this.AmState.isPlay){
        this.isOpen = false;
        return;
      }
      // 延迟 500 秒
      setTimeout(()=>{
        // 如果是播放 则开启单次播放
        if (this.AmState.isPlay){
          this.isOnePlay = true;
        }
        // 否则隐藏整个块
        else {
          this.isOpen = false;
        }
      },500);
    }
  }
};
</script>