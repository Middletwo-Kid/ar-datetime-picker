import { on, off } from '../utils/event';

const MIN_DISTANCE = 10;

export default {
  data() {
    return {
      startX: 0,
      startY: 0,
      deltaX: 0,
      deltaY: 0,
      offsetX: 0,
      offsetY: 0,
      direction: '',
    };
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
      if (x > y && x > MIN_DISTANCE) return 'horizontal';
      if (y > x && y > MIN_DISTANCE) return 'vertical';
      return '';
    },

    touchStart(event) {
      this.resetTouchStatus();
      const touches = event.touches[0];
      this.startX = touches.clientX;
      this.startY = touches.clientY;
    },

    toucheMove(event) {
      const touches = event.touches[0];
      this.deltaX = touches.clientX - this.startX;
      this.deltaY = touches.clientY - this.startY;
      this.offsetX = Math.abs(this.deltaX);
      this.offsetY = Math.abs(this.deltaY);
      this.direction = this.getDirection(this.offsetX, this.offsetY);
    },

    bindTouchEvent(el) {
      // @ts-ignore
      const { handleTouchStart, handleTouchMove, handleTouchEnd } = this;

      on(el, 'touchstart', handleTouchStart);
      on(el, 'touchmove', handleTouchMove);

      if (handleTouchEnd) {
        on(el, 'touchend', handleTouchEnd);
        on(el, 'touchcancel', handleTouchEnd);
      }

      this.$once('hook:beforeDestory', () => {
        off(el, 'touchstart', handleTouchStart);
        off(el, 'touchmove', handleTouchMove);
        if (handleTouchEnd) {
          off(el, 'touchend', handleTouchEnd);
          off(el, 'touchcancel', handleTouchEnd);
        }
      });
    },
  },
};
