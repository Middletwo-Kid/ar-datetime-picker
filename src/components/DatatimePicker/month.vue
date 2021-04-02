<template>
  <div class="ar-datetime-picker-month">
    <!-- From -->
    <column v-if="(+index) === 0"
            :column="firstYearColumn"
            :value.sync="firstYearValue"
            :index=0
            key="firstYear"
            @change="onChange"
     />
     <column v-if="(+index) === 0"
            :column="firstMonthColumn"
            :value.sync="firstMonthValue"
            :index=0
            key="firstMonth"
            @change="onChange"
     />
     <!-- To -->
     <column v-if="(+index) === 1"
            :column="secondYearColumn"
            :value.sync="secondYearValue"
            :index=1
            key="secondYear"
            @change="onChange"
     />
     <column v-if="(+index) === 1"
            :column="secondMonthColumn"
            :value.sync="secondMonthValue"
            :index=1
            key="secondMonth"
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
      firstYearValue: '',
      firstMonthValue: '',
      secondYearValue: '',
      secondMonthValue: '',
      maxYear: '',
      minYear: '',
      maxMonth: '',
      minMonth: '',
    };
  },
  computed: {
    firstYearColumn() {
      const arr = [];
      for (let i = this.minYear; i <= this.maxYear; i++) {
        arr.push(i);
      }
      return arr;
    },
    firstMonthColumn() {
      const min = (this.firstYearValue === this.minYear || !this.firstYearValue)
        ? this.minMonth : 1;
      const max = this.firstYearValue === this.maxYear ? this.maxMonth : 12;
      const arr = [];
      for (let i = min; i <= max; i++) {
        arr.push(i);
      }
      return arr;
    },
    secondYearColumn() {
      const arr = [];
      const start = this.firstYearValue ? this.firstYearValue : this.minYear;
      for (let i = start; i <= this.maxYear; i++) {
        arr.push(i);
      }
      return arr;
    },
    secondMonthColumn() {
      const start = this.firstYearValue === this.secondYearValue ? this.firstMonthValue : 1;
      const end = this.secondYearValue === this.maxYear ? this.maxMonth : 12;
      const arr = [];

      for (let i = start; i <= end; i++) {
        arr.push(i);
      }
      return arr;
    },
  },
  methods: {
    onChange({ index }) {
      if ((+index) === 0) {
        this.$emit('update:startTime', `${this.firstYearValue}/${this.firstMonthValue}`);
        if (this.secondYearValue) this.$emit('update:endTime', '');
      }
      if ((+index) === 1) {
        this.$emit('update:endTime', `${this.secondYearValue}/${this.secondMonthValue}`);
      }
    },
  },
  watch: {
    startTime: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          const day = new Date(newVal);
          this.firstYearValue = day.getFullYear();
          this.firstMonthValue = day.getMonth() + 1;
        } else {
          this.firstYearValue = '';
          this.firstMonthValue = '';
        }
      },
    },
    endTime: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          const day = new Date(newVal);
          this.secondYearValue = day.getFullYear();
          this.secondMonthValue = day.getMonth() + 1;
        } else {
          this.secondYearValue = '';
          this.secondMonthValue = '';
        }
      },
    },
  },
  created() {
    this.maxYear = this.maxTime
      ? new Date(this.maxTime).getFullYear() : new Date().getFullYear() + 10;
    this.maxMonth = this.maxTime
      ? new Date(this.maxTime).getMonth() + 1 : 1;
    this.minYear = this.minTime
      ? new Date(this.minTime).getFullYear() : new Date().getFullYear() - 10;
    this.minMonth = this.minTime
      ? new Date(this.minTime).getMonth() + 1 : 1;
  },
};
</script>

<style lang="scss" scoped>
.ar-datetime-picker-month{
  height: 100%;
  display: flex;
  align-items: center;
}
</style>
