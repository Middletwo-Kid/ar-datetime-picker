<template>
  <div class="ar-datetime-picker-month">
    <column v-if="(+index) === 0"
            :column="firstColumn"
            :value.sync="firstValue"
            @change="onChange"
     />
     <column v-if="(+index) === 1"
            :column="secondColumn"
            :value.sync="secondValue"
            @change="onChange"
     />
  </div>
</template>

<script>
import Column from './column.vue';

export default {
  name: 'ArDatatimePickerMonth',
  components: {
    Column,
  },
  props: {
    maxTime: [String, Number],
    minTime: [String, Number],
    startTime: [String, Number],
    endTime: [String, Number],
    index: [String, Number],
  },
  data() {
    return {
      firstValue: '',
      secondValue: '',
    };
  },
  computed: {
    firstColumn() {
      const maxYear = this.maxTime
        ? new Date(this.maxTime).getFullYear() : new Date().getFullYear() + 10;
      const minYear = this.minTime
        ? new Date(this.minTime).getFullYear() : new Date().getFullYear() - 10;
      const arr = [];

      for (let i = minYear; i <= maxYear; i++) {
        arr.push(i);
      }
      return arr;
    },
    secondColumn() {
      const maxYear = this.maxTime
        ? new Date(this.maxTime).getFullYear() : new Date().getFullYear() + 10;
      const minYear = this.minTime
        ? new Date(this.minTime).getFullYear() : new Date().getFullYear() - 10;
      const arr = [];
      const start = this.firstValue ? this.firstValue : minYear;
      for (let i = start; i <= maxYear; i++) {
        arr.push(i);
      }
      return arr;
    },
  },
  methods: {
    onChange() {
      this.$emit('update:startTime', this.firstValue);
      this.$emit('update:endTime', this.secondValue);
      this.$emit('change', {
        startTime: this.firstValue,
        endTime: this.secondValue,
      });
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
.ar-datetime-picker-year{
  height: 100%;
}
</style>
