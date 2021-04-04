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
import SelectMixins from '../mixins/select';

export default {
  name: 'ArDatatimePickerMonth',
  mixins: [SelectMixins],
  data() {
    return {
      firstYearValue: '',
      firstMonthValue: '',
      secondYearValue: '',
      secondMonthValue: '',
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
        if (!this.firstYearValue || !this.firstMonthValue
        || Number.isNaN(this.firstYearValue)
        || Number.isNaN(this.firstMonthValue)) return;
        this.$emit('update:startTime', `${this.firstYearValue}/${this.firstMonthValue}/1`);
        if (this.secondYearValue) this.$emit('update:endTime', '');
      }
      if ((+index) === 1) {
        if (!this.secondYearValue || !this.secondMonthValue
        || Number.isNaN(this.secondYearValue)
        || Number.isNaN(this.secondMonthValue)) return;
        this.$emit('update:endTime', `${this.secondYearValue}/${this.secondMonthValue}/1`);
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
};
</script>

<style lang="scss" scoped>
.ar-datetime-picker-month{
  height: 100%;
  display: flex;
  align-items: center;
}
</style>
