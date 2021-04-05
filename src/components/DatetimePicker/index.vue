<template>
  <div class="ar-datetime-picker">
    <div class="ar-datetime-picker-header">
      <options :options="typeOptions"
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
        if (newVal) {
          if (newVal === this.unlimitVal) {
            this.firstValue = '';
            this.prevStartTime = this.firstValue;
            return;
          }

          const { minYear, minMonth, minDay } = this.getMin();
          const arrVal = newVal.split('/');
          if (arrVal.length === 1) {
            this.firstValue = `${arrVal[0]}/${minMonth}/${minDay}`;
          } else if (arrVal.length === 2) {
            const day = arrVal[0] === minYear && arrVal[1] <= minMonth ? minDay : 1;
            this.firstValue = `${arrVal[0]}/${minMonth}/${day}`;
          } else {
            this.firstValue = newVal;
          }
        } else {
          this.firstValue = '';
        }
        this.prevStartTime = this.firstValue;
      },
    },
    endTime: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          if (newVal === this.unlimitVal) {
            this.secondValue = '';
            this.prevEndTime = this.secondValue;
            return;
          }

          const { minYear, minMonth, minDay } = this.getMin();
          const arrVal = newVal.split('/');
          if (arrVal.length === 1) {
            this.secondValue = `${arrVal[0]}/${minMonth}/${minDay}`;
          } else if (arrVal.length === 2) {
            const day = arrVal[0] === minYear && arrVal[1] <= minMonth ? minDay : 1;
            this.secondValue = `${arrVal[0]}/${minMonth}/${day}`;
          } else {
            this.secondValue = newVal;
          }
        } else {
          this.secondValue = '';
        }

        this.prevEndTime = this.secondValue;
      },
    },
  },
  methods: {
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
      const endTime = new Date(this.prevEndTime);
      const startYear = startTime.getFullYear();
      const startMonth = startTime.getMonth() + 1;
      const startDay = startTime.getDate();
      const endYear = endTime.getFullYear();
      const endMonth = endTime.getMonth() + 1;
      const endDay = endTime.getDate();

      if ((value === 'month' && startYear === this.minYear)
          || (value === 'day' && startYear === this.minYear && startMonth <= this.minMonth)) {
        this.firstValue = `${startYear}/${this.minMonth}/${this.minDay}`;
      } else {
        this.firstValue = `${startYear}/${startMonth}/${startDay}`;
      }

      if ((value === 'month' && endYear === this.minYear)
          || (value === 'day' && endYear === this.minYear && endMonth <= this.minMonth)) {
        this.secondValue = `${endYear}/${this.minMonth}/${this.minDay}`;
      } else {
        this.secondValue = `${endYear}/${endMonth}/${endDay}`;
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
      if (!this.firstValue || !this.secondValue
      || this.firstValue === this.unlimitVal
      || this.secondValue === this.unlimitVal) return;
      let firstValue = '';
      let secondValue = '';
      switch (this.currentType) {
        case 'year':
          firstValue = this.firstValue.slice(0, 4);
          secondValue = this.secondValue.slice(0, 4);
          break;
        case 'month':
          firstValue = this.firstValue.slice(0, 6);
          secondValue = this.secondValue.slice(0, 6);
          break;
        default:
          firstValue = this.firstValue;
          secondValue = this.secondValue;
          break;
      }
      this.$emit('update:startTime', firstValue);
      this.$emit('update:endTime', secondValue);
      this.$emit('confirm', {
        startTime: firstValue,
        endTime: secondValue,
      });
    },
    onUnlimit() {
      this.isFocus = false;
      this.focusIndex = '';
      this.$refs.options.reset();
      this.firstValue = '';
      this.secondValue = '';
      this.$emit('update:startTime', this.unlimitVal);
      this.$emit('update:endTime', this.unlimitVal);
      this.$emit('unlimit');
    },
    onCancel() {
      this.isFocus = false;
      this.focusIndex = '';
      this.$refs.options.reset();
      this.firstValue = this.startTime;
      this.secondValue = this.endTime;
      this.$emit('cancel');
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
