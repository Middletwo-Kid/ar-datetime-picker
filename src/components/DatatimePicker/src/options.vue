<template>
  <div class="ar-datatime-picker-options">
    <div :class="['ar-datatime-picker-options-item',
          value === item.value ? 'ar-datatime-picker-options-item__active': '']"
         v-for="item in options"
         :key="item.value"
         @click="handleClick(item)"
    >{{item.name}}</div>
  </div>
</template>

<script>
export default {
  name: 'ArOption',
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    value: {
      type: [String, Number],
      default: '',
    },
  },
  methods: {
    handleClick(item) {
      if (item.value === this.value) return;
      this.$emit('update:value', item.value);
      this.$emit('click', item.value);
    },
  },
};
</script>

<style lang="scss" scoped>
.ar-datatime-picker-options{
  display: flex;
  align-items: center;
  background: #fff;
  border: 1px solid $ar-primary;
  border-radius: 4px;
  box-sizing: border-box;

  &-item{
    padding: 0 16px;
    line-height: 30px;
    font-size: 14px;
    color: $ar-primary;
    border-right: 1px solid $ar-primary;
    transition: all 0.2s ease-in;

    &:last-of-type{
      border-right: none;
    }

    &__active{
      color: #fff;
      background: $ar-primary;
    }
  }
}
</style>
