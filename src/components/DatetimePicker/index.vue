<template>
  <div class="ar-datetime-picker">
    <div class="ar-datetime-picker-header">
      <options v-if="typeOptions && typeOptions.length > 1"
               :options="typeOptions"
               :value.sync="currentType"
               @click="onChangeType" />
    </div>
    <div class="ar-datetime-picker-select">
      <select-time ref="options"
                   :type="currentType"
                   :key="currentType"
                   :startTime="firstValue"
                   :endTime="secondValue"
                   @change="onChangeFocus" />
    </div>
    <div class="ar-datetime-picker-body">
      <component :is="'select-' + currentType"
                 v-if="isFocus"
                 :startTime.sync="firstValue"
                 :endTime.sync="secondValue"
                 :minTime="minTime"
                 :maxTime="maxTime"
                 :index="focusIndex"
                 :maxYear="maxYear"
                 :minYear="minYear"
                 :maxMonth="maxMonth"
                 :minMonth="minMonth"
                 :maxDay="maxDay"
                 :minDay="minDay"
                 @changeStartTime="onChangeStartTime"
                 @changeEndTime="onChangeEndTime" />
    </div>
    <bottom @comfirm="onComfirm"
            @unlimit="onUnlimit"
            @cancel="onCancel" />
  </div>
</template>

<script>
import Options from './src/options.vue';
import SelectTime from './src/time.vue';
import SelectYear from './src/year.vue';
import SelectMonth from './src/month.vue';
import SelectDay from './src/day.vue';
import Bottom from './src/footer.vue';
import getTypeOptions from './utils/data';

const today = new Date();
const dayStr = `${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}`;

export default {
  name: 'ArDatetimePicker',
  props: {
    typeOptions: {
      type: Array,
      default: () => getTypeOptions(),
    },
    type: String,
    startTime: [String, Number],
    endTime: [String, Number],
    minTime: [String, Number],
    maxTime: [String, Number],
    unlimitVal: String,
  },
  components: {
    Options,
    SelectTime,
    SelectYear,
    SelectMonth,
    SelectDay,
    Bottom,
  },
  data() {
    return {
      currentType: '',
      prevStartTime: '',
      prevEndTime: '',
      firstValue: '',
      secondValue: '',
      isFocus: false,
      focusIndex: '',
      maxYear: '',
      minYear: '',
      maxMonth: '',
      minMonth: '',
      maxDay: '',
      minDay: '',
    };
  },
  watch: {
    type: {
      immediate: true,
      handler(value) {
        const defalutOptions = this.typeOptions ? this.typeOptions : getTypeOptions();
        const defaultType = this.type ? this.type : defalutOptions[0].value;
        this.currentType = value || defaultType;
      },
    },
    startTime: {
      immediate: true,
      handler(newVal) {
        const val = newVal ? newVal.toString().replace(/-/g, '/') : '';
        this.firstValue = this.handleValue(val);
        this.prevStartTime = this.firstValue;
      },
    },
    endTime: {
      immediate: true,
      handler(newVal) {
        const val = newVal ? newVal.toString().replace(/-/g, '/') : '';
        this.secondValue = this.handleValue(val);
        this.prevEndTime = this.secondValue;
      },
    },
  },
  methods: {
    handleValue(newVal) {
      if (newVal && newVal !== this.unlimitVal) {
        let value = '';
        const { minYear, minMonth, minDay } = this.getMin();
        const arrVal = newVal.toString().split('/');
        if (arrVal.length === 1) {
          value = `${arrVal[0]}/${minMonth}/${minDay}`;
        } else if (arrVal.length === 2) {
          const month = arrVal[0] === minYear && parseInt(arrVal[1], 10) <= minMonth
            ? minMonth : parseInt(arrVal[1], 10);
          const day = month <= minMonth ? minDay : 1;
          value = `${arrVal[0]}/${month}/${day}`;
        } else {
          value = newVal;
        }

        return value;
      }
      return '';
    },

    onChangeType(value) {
      if (value === this.type) return;
      this.isFocus = false;
      this.focusIndex = '';
      this.$refs.options.reset();
      this.currentType = value;
      this.$emit('update:type', value);
      this.$emit('changeType', value);

      if (!this.startTime || this.startTime.length === 0
      || this.startTime === this.unlimitVal) {
        this.firstValue = '';
        this.secondValue = '';
        return;
      }
      const startTime = new Date(this.prevStartTime);
      const startYear = startTime.getFullYear();
      const startMonth = startTime.getMonth() + 1;
      const startDay = startTime.getDate();

      if ((value === 'month' || value === 'day') && startYear === this.minYear && startMonth <= this.minMonth) {
        this.firstValue = `${startYear}/${this.minMonth}/${this.minDay}`;
      } else {
        this.firstValue = `${startYear}/${startMonth}/${startDay}`;
      }

      if (this.prevEndTime) {
        const endTime = new Date(this.prevEndTime);
        const endYear = endTime.getFullYear();
        const endMonth = endTime.getMonth() + 1;
        const endDay = endTime.getDate();
        if ((value === 'month' || value === 'day') && endYear === this.minYear && endMonth <= this.minMonth) {
          this.secondValue = `${endYear}/${this.minMonth}/${this.minDay}`;
        } else {
          this.secondValue = `${endYear}/${endMonth}/${endDay}`;
        }
      } else {
        this.secondValue = '';
      }
    },
    onChangeFocus(index) {
      this.isFocus = true;
      this.focusIndex = index;
    },
    onChangeStartTime(val) {
      const value = this.getResult(val);
      this.$emit('changeStartTime', value);
    },
    onChangeEndTime(val) {
      const value = this.getResult(val);
      this.$emit('changeEndTime', value);
    },
    onComfirm() {
      if (!this.firstValue || this.firstValue === this.unlimitVal) return;
      let firstValue = '';
      const secondValueTemp = this.secondValue ? this.secondValue : dayStr;
      let secondValue = '';
      const firstValueDay = new Date(this.firstValue);
      const secondValueDay = new Date(secondValueTemp);
      const year1 = firstValueDay.getFullYear();
      const month1 = firstValueDay.getMonth() + 1;
      const day1 = firstValueDay.getDate();
      const year2 = secondValueDay.getFullYear();
      const month2 = secondValueDay.getMonth() + 1;
      const day2 = secondValueDay.getDate();
      switch (this.currentType) {
        case 'year':
          firstValue = year1;
          secondValue = year1 > year2 ? year1 : year2;
          break;
        case 'month':
          firstValue = `${year1}/${month1}`;
          if (year1 > year2 || (year1 === year2 && month1 > month2)) {
            secondValue = `${year1}/${month1}`;
          } else {
            secondValue = `${year2}/${month2}`;
          }
          break;
        default:
          firstValue = `${year1}/${month1}/${day1}`;
          if (year1 > year2 || (year1 === year2 && month1 > month2)
            || (year1 === year2 && month1 === month2 && day1 > day2)) {
            secondValue = `${year1}/${month1}/${day1}`;
          } else {
            secondValue = `${year2}/${month2}/${day2}`;
          }
          break;
      }
      this.isFocus = false;
      this.$refs.options.reset();
      this.$emit('update:startTime', firstValue);
      this.$emit('update:endTime', secondValue);
      this.$emit('confirm', {
        startTime: firstValue,
        endTime: secondValue,
      });
    },
    onUnlimit(e) {
      this.isFocus = false;
      this.focusIndex = '';
      this.$refs.options.reset();
      this.firstValue = '';
      this.secondValue = '';
      this.$emit('update:startTime', this.unlimitVal);
      this.$emit('update:endTime', this.unlimitVal);
      this.$emit('unlimit', e);
    },
    onCancel(e) {
      this.isFocus = false;
      this.focusIndex = '';
      this.$refs.options.reset();
      this.firstValue = this.startTime;
      this.secondValue = this.endTime;
      this.$emit('cancel', e);
    },
    getResult(val) {
      let value;
      if (val.length > 0) {
        switch (this.currentType) {
          case 'year': value = val.slice(0, 4); break;
          case 'month': value = val.slice(0, 6); break;
          default: value = val; break;
        }
      }
      return value;
    },
    getMax() {
      const maxYear = this.maxTime
        ? new Date(this.maxTime).getFullYear() : new Date().getFullYear() + 10;
      const maxMonth = this.maxTime
        ? new Date(this.maxTime).getMonth() + 1 : 12;
      const maxDay = this.maxTime
        ? new Date(this.maxTime).getDate() : new Date(this.maxYear, this.maxMonth, 0).getDate();
      return {
        maxYear,
        maxMonth,
        maxDay,
      };
    },
    getMin() {
      const minYear = this.minTime
        ? new Date(this.minTime).getFullYear() : new Date().getFullYear() - 10;
      const minMonth = this.minTime
        ? new Date(this.minTime).getMonth() + 1 : 1;
      const minDay = this.minTime
        ? new Date(this.minTime).getDate() : 1;
      return {
        minYear,
        minMonth,
        minDay,
      };
    },
  },
  created() {
    const { minYear, minMonth, minDay } = this.getMin();
    const { maxYear, maxMonth, maxDay } = this.getMax();
    this.maxYear = maxYear;
    this.maxMonth = maxMonth;
    this.maxDay = maxDay;
    this.minYear = minYear;
    this.minMonth = minMonth;
    this.minDay = minDay;
  },
  deactivated() {
    this.isFocus = false;
  },
  beforeDestroy() {
    this.isFocus = false;
  },
};
</script>

<style lang="scss" scoped>
.ar-datetime-picker{
  width: 100%;
  display: flex;
  flex-direction: column;
  background: #fff;
  -webkit-touch-callout:none;
  -webkit-user-select:none;
  -khtml-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none;

  &-header{
    padding: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
  }

  &-body{
    height: 220px;
    padding: 0 8px 0;
    box-sizing: border-box;
    overflow-y: scroll;
    &::-webkit-scrollbar{
      display: none;
    }
  }
}
</style>
