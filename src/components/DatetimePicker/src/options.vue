<template>
  <div class="ar-datetime-picker-options">
    <p class="ar-datetime-picker-options-desc">按</p>
    <div class="ar-datetime-picker-options-select">
      <div :class="['ar-datetime-picker-options-item',
            value === item.value ? 'ar-datetime-picker-options-item__active': '']"
          v-for="item in options"
          :key="item.value"
          @click="handleClick(item)"
      >{{item.name}}</div>
    </div>
    <p class="ar-datetime-picker-options-desc">选择</p>
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
