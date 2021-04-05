<template>
  <div class="ar-datetime-picker-column">
    <div class="ar-datetime-picker-column-body">
      <ul class="ar-datetime-picker-column-main"
          :style="mainStyle"
      >
        <li class="ar-datetime-picker-column-item"
            v-for="item in columnList"
            :key="item"
        >
          {{item}}
        </li>
      </ul>
    </div>
    <div class="ar-datetime-picker-column-mask"></div>
    <div class="ar-datetime-picker-column-frame"></div>
  </div>
</template>

<script>
import range from '../utils/num';
import ToucheMixins from '../mixins/touch';
import { preventDefault } from '../utils/event';

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
    column: {
      type: Array,
      default: () => [],
    },
    value: [String, Number],
    index: [String, Number],
  },
  data() {
    return {
      offset: 0,
      touchStartTime: 0,
      momentumOffset: 0,
      moving: false,
      transitionEndTrigger: null,
      currentIndex: 0,
    };
  },
  computed: {
    columnList() {
      return this.column;
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

      // 惯性滑动思路:
      // 在手指离开屏幕时，如果和上一次 move 时的间隔小于 `MOMENTUM_LIMIT_TIME` 且 move
      // 距离大于 `MOMENTUM_LIMIT_DISTANCE` 时，执行惯性滑动
      if (allMomentum) {
        this.momentum(distance, duration);
        return;
      }
      const index = this.getIndexByOffset(this.offset);
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
      // eslint-disable-next-line no-param-reassign
      index = this.adjust(index) || 0;
      const offset = -index * ITEMHEIGHT;
      const trigger = () => {
        if (index !== this.currentIndex) {
          this.currentIndex = index;

          if (emitChange) {
            this.$emit('update:value', this.columnList[index]);
            this.$emit('change', {
              value: this.columnList[index],
              index: this.index,
            });
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
  watch: {
    value: {
      immediate: true,
      handler(val) {
        let index;
        if (!val || val.length === 0) {
          index = 0;
        } else {
          index = this.column.findIndex((item) => (+item) === (+val));
          index = index > -1 ? index : 0;
        }

        // fix: 初始化值为空或者级联选择时初始化值的问题
        const currentVal = this.columnList[index];
        if (index === 0 && val !== currentVal) {
          this.$emit('update:value', currentVal);
          this.$emit('change', {
            value: currentVal,
            index: this.index,
          });
        } else {
          this.currentIndex = index;
          this.setIndex(index);
        }
      },
    },
    column: {
      immediate: true,
      deep: true,
      handler(val, oldVal) {
        if (val && oldVal && oldVal.length !== val.length) {
          this.$emit('update:value', val[0]);
          this.$emit('change', {
            value: val[0],
            index: this.index,
          });
        }
      },
    },
  },
  mounted() {
    this.bindTouchEvent(this.$el);
  },
};
</script>
