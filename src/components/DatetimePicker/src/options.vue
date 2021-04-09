<template>
  <div class="ar-datetime-picker-options">
    <div class="ar-datetime-picker-options-select">
      <div :class="['ar-datetime-picker-options-item',
            value === item.value ? 'ar-datetime-picker-options-item__active': '']"
          v-for="item in options"
          :key="item.value"
          @click="handleClick(item)"
      >{{item.name}}</div>
    </div>
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
