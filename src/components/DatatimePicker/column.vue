<template>
  <div class="ar-datatime-picker-column">
    <div class="ar-datatime-picker-column-body">
      <ul class="ar-datatime-picker-column-main"
          :style="mainStyle"
      >
        <li class="ar-datatime-picker-column-item"
            v-for="item in columnList"
            :key="item"
        >
          {{item}}
        </li>
      </ul>
    </div>
    <div class="ar-datatime-picker-column-mask"></div>
    <div class="ar-datatime-picker-column-frame"></div>
  </div>
</template>

<script>
import { range } from './utils';
import ToucheMixins from './mixins/touch';
import { preventDefault } from './utils/event';

const MOMENTUM_LIMIT_TIME = 300;
const MOMENTUM_LIMIT_DISTANCE = 15;
const ITEMHEIGHT = 44;
const COUNT = 5;
const DEFAULT_DURATION = 200;
const BASEOFFSET = (ITEMHEIGHT * (COUNT - 1)) / 2;

export default {
  name: 'ArColumn',
  mixins: [ToucheMixins],
  props: {
    type: {
      type: String,
      default: 'year',
    },
  },
  data() {
    return {
      yearArr: [2015, 2016, 2017, 2018, 2019, 2020, 2021],
      monthArr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      offset: 0,
      touchStartTime: 0,
      momentumOffset: 0,
      moving: false,
      transitionEndTrigger: null,
    };
  },
  computed: {
    columnList() {
      switch (this.type) {
        case 'year': return this.yearArr;
        case 'month': return this.monthArr;
        default: return this.yearArr;
      }
    },
    // 通过更改ul的样式达到改变高亮的位置(修改offset)
    mainStyle() {
      return {
        transform: `translate3d(0, ${this.offset + BASEOFFSET}px, 0)`,
        transitionDuration: '1000ms',
        transitionProperty: 'all',
      };
    },
  },
  methods: {
    resetTouchStatus() {
      this.direction = '';
      this.deltaX = 0;
      this.deltaY = 0;
      this.offsetX = 0;
      this.offsetY = 0;
    },
    getDirection(x, y) {
      if (x > y && x > 10) return 'horizontal';
      if (y > x && y > 10) return 'vertical';
      return '';
    },
    handleTouchStart(event) {
      this.touchStart(event);

      this.startOffset = this.offset;
      this.duration = 0;
      this.touchStartTime = Date.now();
      this.momentumOffset = this.startOffset;
      this.transitionEndTrigger = null;
    },
    handleTouchMove(event) {
      this.toucheMove(event);

      this.offset = range(this.startOffset + this.deltaY,
        -(this.columnList.length * ITEMHEIGHT), ITEMHEIGHT);
      if (this.direction === 'vertical') {
        this.moving = true;
        preventDefault(event, true);
      }
      const now = Date.now();
      if (now - this.touchStartTime > MOMENTUM_LIMIT_TIME) {
        this.touchStartTime = now;
        this.momentumOffset = this.offset;
      }
    },
    handleTouchEnd() {
      const distance = this.offset - this.momentumOffset;
      const duration = Date.now() - this.touchStartTime;
      const allMomentum = duration < MOMENTUM_LIMIT_TIME
                          && Math.abs(distance) > MOMENTUM_LIMIT_DISTANCE;
      console.log('handleTouchEnd', distance, duration, allMomentum);
      // 惯性滑动思路:
      // 在手指离开屏幕时，如果和上一次 move 时的间隔小于 `MOMENTUM_LIMIT_TIME` 且 move
      // 距离大于 `MOMENTUM_LIMIT_DISTANCE` 时，执行惯性滑动
      if (allMomentum) {
        this.momentum(distance, duration);
        return;
      }

      const index = this.getIndexByOffset(this.offset);
      console.log('index', index);
      this.duration = DEFAULT_DURATION;
      this.setIndex(index, true);
    },
    momentum(distance, duration) {
      const speed = Math.abs(distance / duration);
      // eslint-disable-next-line no-param-reassign
      distance = this.offset + (speed / 0.003) * (distance < 0 ? -1 : 1);
      const index = this.getIndexByOffset(distance);
      this.duration = +1000;
      this.setIndex(index, true);
    },

    getIndexByOffset(offset) {
      return range(Math.round(-offset / ITEMHEIGHT), 0, ITEMHEIGHT);
    },

    adjust(index) {
      return range(index, 0, this.columnList.length);
    },

    setIndex(index, emitChange) {
      console.log('钱', index);
      // eslint-disable-next-line no-param-reassign
      index = this.adjust(index) || 0;
      console.log('后', index);
      const offset = -index * ITEMHEIGHT;

      const trigger = () => {
        if (index !== this.currentIndex) {
          this.currentIndex = index;

          if (emitChange) {
            // this.$emit('change', {
            //   columnIndex: this.columnIndex,
            //   currentIndex: index,
            //   item: this.columnList[index],
            // });
          }
        }
      };

      // 滑动的过程中用transitionEndTrigger记录trigger函数，
      // 如果父组件突然中断，则可以调用trigger
      if (this.moving && offset !== this.offset) {
        this.transitionEndTrigger = trigger();
      } else {
        trigger();
      }

      this.offset = offset;
    },
  },
  mounted() {
    this.bindTouchEvent(this.$el);
  },
};
</script>

<style lang="scss" scoped>
.ar-datatime-picker-column{
  position: relative;
  flex: 1;
  height: 100%;
  box-sizing: border-box;
  border-left: 1px solid #F2F4F7;
  border-right: 1px solid #F2F4F7;

  &-mask{
    position: absolute;
    top:0;
    bottom: 0;
    right: 0;
    left:0;
    z-index: 2;
    background-size: 100% 45%;
    background-image: linear-gradient(
        180deg,
        hsla(0, 0%, 100%, 0.9),
        hsla(0, 0%, 100%, 0.4)
      ),
      linear-gradient(0deg, hsla(0, 0%, 100%, 0.9), hsla(0, 0%, 100%, 0.4));
    background-repeat: no-repeat;
    background-position: top, bottom;
    backface-visibility: hidden;
    pointer-events: none;
  }

  &-frame{
    position: absolute;
    top: 50%;
    right: 4px;
    left: 4px;
    z-index: 3;
    height: 44px;
    transform: translateY(-50%);
    pointer-events: none;
    &::after{
      content: '';
      position: absolute;
      box-sizing: border-box;
      top: -50%;
      right: -50%;
      bottom: -50%;
      left: -50%;
      border-top: 1px solid #ebedf0;
      border-bottom: 1px solid #ebedf0;
      transform: scale(0.5);
    }
  }

  &-body{
    height: 100%;
    font-size: 14px;
    overflow: hidden;
  }

  &-main{
    transition-timing-function: cubic-bezier(0.23, 1, 0.68, 1);
  }

  &-item{
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 8px;
    box-sizing: border-box;
  }
}
</style>
