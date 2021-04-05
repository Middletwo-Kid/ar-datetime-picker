<template>
  <div class="ar-datetime-picker-time">
    <div :class="['ar-datetime-picker-time-select',
                index===0 ? 'ar-datetime-picker-time-select__active' : '']"
         @click.stop="handleFocus(0)"
    >{{firstValue}}</div>
    <div class="ar-datetime-picker-time-gap">至</div>
    <div :class="['ar-datetime-picker-time-select',
                index===1 ? 'ar-datetime-picker-time-select__active' : '']"
          @click.stop="handleFocus(1)"
    >{{secondValue}}</div>
  </div>
</template>

<script>
export default {
  name: 'ArDatetimePickerTime',
  props: {
    startTime: [String, Number],
    endTime: [String, Number],
    type: String,
  },
  data() {
    return {
      index: '',
      firstValue: '',
      secondValue: '',
    };
  },
  methods: {
    handleFocus(index) {
      this.index = index;
      this.$emit('change', index);
    },
    reset() {
      this.index = '';
    },
    initData(val) {
      if (val && val.length > 0) {
        switch (this.type) {
          case 'year': return val.slice(0, 4);
          case 'month': return val.slice(0, 6);
          case 'day': return val;
          default: return '';
        }
      } else {
        return '';
      }
    },
  },
  watch: {
    startTime: {
      immediate: true,
      handler(newVal) {
        this.firstValue = this.initData(newVal);
      },
    },
    endTime: {
      immediate: true,
      handler(newVal) {
        this.secondValue = this.initData(newVal);
      },
    },
  },
};
</script>
