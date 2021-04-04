<template>
  <div class="ar-datetime-picker-day">
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
     <column v-if="(+index) === 0"
            :column="firstDayColumn"
            :value.sync="firstDayValue"
            :index=0
            key="firstDay"
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
     <column v-if="(+index) === 1"
            :column="secondDayColumn"
            :value.sync="secondDayValue"
            :index=1
            key="secondDay"
            @change="onChange"
     />
  </div>
</template>

<script>
import SelectMixins from '../mixins/select';

export default {
  name: 'ArDatatimePickerday',
  mixins: [SelectMixins],
  data() {
    return {
      firstYearValue: '',
      firstMonthValue: '',
      firstDayValue: '',
      secondYearValue: '',
      secondMonthValue: '',
      secondDayValue: '',
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
    firstDayColumn() {
      const min = (!this.firstYearValue || !this.firstMonthValue
              || (this.firstYearValue === this.minYear && this.firstMonthValue === this.minMonth))
        ? this.minDay : 1;
      const max = (this.firstYearValue === this.maxYear && this.firstMonthValue === this.maxMonth)
        ? this.maxDay : new Date(this.firstYearValue, this.firstMonthValue, 0).getDate();
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
    secondDayColumn() {
      const start = (this.firstYearValue === this.secondYearValue
        && this.firstMonthValue === this.secondMonthValue)
        ? this.firstDayValue : 1;
      const end = (this.secondYearValue === this.maxYear && this.secondMonthValue === this.maxMonth)
        ? this.maxDay : new Date(this.secondYearValue, this.secondMonthValue, 0).getDate();
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
        this.$emit('update:startTime', `${this.firstYearValue}/${this.firstMonthValue}/${this.firstDayValue}`);
        if (this.secondYearValue) this.$emit('update:endTime', '');
      }
      if ((+index) === 1) {
        this.$emit('update:endTime', `${this.secondYearValue}/${this.secondMonthValue}/${this.secondDayValue}`);
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
          this.firstDayValue = day.getDate();
        } else {
          this.firstYearValue = '';
          this.firstMonthValue = '';
          this.firstDayValue = '';
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
          this.secondDayValue = day.getDate();
        } else {
          this.secondYearValue = '';
          this.secondMonthValue = '';
          this.secondDayValue = '';
        }
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.ar-datetime-picker-day{
  height: 100%;
  display: flex;
  align-items: center;
}
</style>
