<template>
  <div class="ar-datatime-picker-time">
    <div :class="['ar-datatime-picker-time-select',
                index===0 ? 'ar-datatime-picker-time-select__active' : '']"
         @click.stop="handleFocus(0)"
    >{{firstValue}}</div>
    <div class="ar-datatime-picker-time-gap">至</div>
    <div :class="['ar-datatime-picker-time-select',
                index===1 ? 'ar-datatime-picker-time-select__active' : '']"
          @click.stop="handleFocus(1)"
    >{{secondValue}}</div>
  </div>
</template>

<script>
export default {
  name: 'ArDatatimePickerTime',
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

<style lang="scss" scoped>
.ar-datatime-picker-time{
  margin: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;

  &-select {
    width: 35%;
    padding: 0 8px;
    height: 32px;
    line-height: 32px;
    color: $ar-main;
    text-align: center;
    transition: all 0.1s ease-in;
    border-bottom: 1px solid $ar-border;
    box-sizing: border-box;
    user-select: none;

    &__active{
      color: $ar-primary;
      border-color: $ar-primary;
    }
  }

  &-gap{
    margin: 0 32px;
    color: $ar-desc;
    box-sizing: border-box;
  }
}

</style>
