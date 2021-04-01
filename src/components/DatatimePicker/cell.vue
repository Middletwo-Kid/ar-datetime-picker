<template>
  <div :class="['ar-datatime-picker-cell',
        active?'ar-datatime-picker-cell__active': '']"
        @click.stop="handleClick">
    {{label}}
  </div>
</template>

<script>
export default {
  name: 'ArDatatimePickerCell',
  props: {
    label: {
      type: [String, Number],
      default: '',
    },
    value: {
      type: Array,
      default: () => [],
    },
    selectType: {
      type: String,
      default: 'single',
    },
  },
  methods: {
    handleClick() {
      const { label } = this;
      if (this.selectType === 'single') {
        this.$emit('update:value', [label]);
      } else if (this.selectType === 'range') {
        if (this.value.length <= 0 || this.value.length === 2) {
          this.$emit('update:value', [label]);
        } else {
          const value = JSON.parse(JSON.stringify(this.value));
          if (label > value[0]) {
            value.push(label);
            this.$emit('update:value', value);
          } else {
            this.$emit('update:value', [label]);
          }
        }
      }
      this.$emit('click', label);
    },
  },
  computed: {
    active() {
      if (this.value.length === 2) {
        return ((this.label) >= this.value[0]) && (this.label <= this.value[1]);
      } if (this.value.length === 1) {
        return (+this.label) === (+this.value[0]);
      }
      return false;
    },
  },
};
</script>

<style lang="scss" scoped>
.ar-datatime-picker-cell{
  flex-basis: 20%;
  margin: 0 8px 8px 0;
  text-align: center;
  line-height: 30px;
  font-size: 14px;
  color: $ar-main;
  background: #f8f8fa;
  border-radius: 4px;
  box-sizing: border-box;
  transition: all 0.2s ease-in-out;
  cursor: pointer;

  &:hover, &__active{
    color: #fff;
    background-color: $ar-primary;
  }
}
</style>
