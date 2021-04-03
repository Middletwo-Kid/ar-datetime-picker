<template>
  <div class="ar-datetime-picker-year">
    <column v-if="(+index) === 0"
            :key="index"
            :index=0
            :column="firstColumn"
            :value.sync="firstValue"
            @change="onChange"
     />
     <column v-if="(+index) === 1"
            :key="index"
            :index=1
            :column="secondColumn"
            :value.sync="secondValue"
            @change="onChange"
     />
  </div>
</template>

<script>
import Column from './column.vue';

export default {
  name: 'ArDatatimePickerYear',
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
      maxYear: '',
      minYear: '',
    };
  },
  computed: {
    firstColumn() {
      const arr = [];
      for (let i = this.minYear; i <= this.maxYear; i++) {
        arr.push(i);
      }
      return arr;
    },
    secondColumn() {
      if (Number.isNaN(this.firstValue)) return [];
      const arr = [];
      const start = this.firstValue ? this.firstValue : this.minYear;
      for (let i = start; i <= this.maxYear; i++) {
        arr.push(i);
      }
      return arr;
    },
  },
  methods: {
    onChange({ index }) {
      if ((+index) === 0) {
        if (!this.firstValue
        || Number.isNaN(this.firstValue)) return;
        this.$emit('update:startTime', `${this.firstValue}/1/1`);
        if (this.secondValue) this.$emit('update:endTime', '');
      }
      if ((+index) === 1) {
        if (!this.secondValue
        || Number.isNaN(this.secondValue)) return;
        this.$emit('update:endTime', `${this.secondValue}/1/1`);
      }

      // this.$emit('change', {
      //   startTime: `${this.firstValue}/1/1`,
      //   endTime: this.secondValue,
      // });
    },
  },
  watch: {
    startTime: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          const day = new Date(newVal);
          this.firstValue = day.getFullYear();
        } else {
          this.firstValue = '';
        }
      },
    },
    endTime: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          const day = new Date(newVal);
          this.secondValue = day.getFullYear();
        } else {
          this.secondValue = '';
        }
      },
    },
  },
  created() {
    this.maxYear = this.maxTime
      ? new Date(this.maxTime).getFullYear() : new Date().getFullYear() + 10;
    this.minYear = this.minTime
      ? new Date(this.minTime).getFullYear() : new Date().getFullYear() - 10;
  },
};
</script>

<style lang="scss" scoped>
.ar-datetime-picker-year{
  height: 100%;
}
</style>
