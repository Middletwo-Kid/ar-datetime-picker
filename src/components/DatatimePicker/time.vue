<template>
  <div class="ar-datatime-picker-time">
    <div :class="['ar-datatime-picker-time-select',
                index===0 ? 'ar-datatime-picker-time-select__active' : '']"
         @click="handleFocus(0)"
    >{{firstValue}}</div>
    <div class="ar-datatime-picker-time-gap">至</div>
    <div :class="['ar-datatime-picker-time-select',
                index===1 ? 'ar-datatime-picker-time-select__active' : '']"
          @click="handleFocus(1)"
    >{{secondValue}}</div>
  </div>
</template>

<script>
export default {
  name: 'ArDatatimePickerTime',
  props: {
    startTime: [String, Number],
    endTime: [String, Number],
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
  },
  watch: {
    startTime: {
      immediate: true,
      handler(newVal) {
        this.firstValue = newVal;
      },
    },
    endTime: {
      immediate: true,
      handler(newVal) {
        this.secondValue = newVal;
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.ar-datatime-picker-time{
  margin: 32px 12px;
  display: flex;
  align-items: center;
  justify-content: center;

  &-select {
    width: 35%;
    padding: 8px;
    color: $ar-main;
    text-align: center;
    transition: all 0.2s ease-in;
    border-bottom: 1px solid #F2F4F7;
    box-sizing: border-box;

    &__active{
      color: $ar-primary;
      border-bottom: 1px solid $ar-primary;
    }
  }

  &-gap{
    margin: 0 32px;
    color: $ar-desc;
  }
}

</style>
