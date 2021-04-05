<template>
  <div class="ar-datatime-picker">
    <div class="ar-datatime-picker-header">
      <options :options="typeOptions"
               :value.sync="currentType"
               @click="onChangeType" />
    </div>
    <div class="ar-datatime-picker-select">
      <select-time ref="options"
                   :type="type"
                   :key="currentType"
                   :startTime="firstValue"
                   :endTime="secondValue"
                   @change="onChangeFocus" />
    </div>
    <div class="ar-datatime-picker-body">
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
                 :minDay="minDay" />
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
  name: 'ArDatatimePicker',
  props: {
    typeOptions: {
      type: Array,
      default: () => getTypeOptions(),
    },
    type: {
      type: String,
      default: 'year',
    },
    startTime: [String, Number],
    endTime: [String, Number],
    minTime: [String, Number],
    maxTime: [String, Number],
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
        this.currentType = value || 'year';
      },
    },
    startTime: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          switch (this.type) {
            case 'year': this.firstValue = `${newVal}/1/1`; break;
            case 'month': this.firstValue = `${newVal}/1`; break;
            default: {
              if (!newVal) this.firstValue = newVal;
              else {
                const arr = newVal.split('/');
                if (arr.length === 3) {
                  this.firstValue = newVal;
                } else if (arr.length === 2) {
                  const year = arr[0];
                  const month = arr[1];
                  if (year === this.minYear && month === this.minMonth) {
                    this.firstValue = `${newVal}/${this.minDay}`;
                  } else {
                    this.firstValue = `${newVal}/1`;
                  }
                } else {
                  this.firstValue = `${newVal}/${this.minMonth}/${this.minDay}`;
                }
              }
              break;
            }
          }
        } else {
          this.firstValue = '';
        }
      },
    },
    endTime: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          switch (this.type) {
            case 'year': this.secondValue = `${newVal}/1/1`; break;
            case 'month': this.secondValue = `${newVal}/1`; break;
            default: this.secondValue = newVal; break;
          }
        } else {
          this.secondValue = '';
        }
      },
    },
  },
  methods: {
    onChangeType(value) {
      if (value === this.type) return;
      this.isFocus = false;
      this.focusIndex = '';
      this.$refs.options.reset();
      this.$emit('update:type', value);
      if (this.startTime.length === 0) {
        this.firstValue = '';
        this.secondValue = '';
        return;
      }

      const startTime = new Date(this.startTime);
      const endTime = new Date(this.endTime);
      const startYear = startTime.getFullYear();
      const startMonth = startTime.getMonth() + 1;
      const endYear = endTime.getFullYear();
      const endMonth = endTime.getMonth() + 1;

      if ((value === 'month' && startYear === this.minYear)
          || (value === 'day' && startYear === this.minYear && startMonth <= this.minMonth)) {
        this.firstValue = `${startYear}/${this.minMonth}/${this.minDay}`;
      }

      if ((value === 'month' && endYear === this.minYear)
          || (value === 'day' && endYear === this.minYear && endMonth <= this.minMonth)) {
        this.secondValue = `${endYear}/${this.minMonth}/${this.minDay}`;
      }
    },
    onChangeFocus(index) {
      this.isFocus = true;
      this.focusIndex = index;
    },
    onComfirm() {
      if (!this.firstValue || !this.secondValue) return;
      let firstValue = '';
      let secondValue = '';
      switch (this.type) {
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
      this.$emit('update:startTime', '');
      this.$emit('update:endTime', '');
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
  },
  created() {
    this.maxYear = this.maxTime
      ? new Date(this.maxTime).getFullYear() : new Date().getFullYear() + 10;
    this.maxMonth = this.maxTime
      ? new Date(this.maxTime).getMonth() + 1 : 12;
    this.maxDay = this.maxTime
      ? new Date(this.maxTime).getDate() : new Date(this.maxYear, this.maxMonth, 0).getDate();
    this.minYear = this.minTime
      ? new Date(this.minTime).getFullYear() : new Date().getFullYear() - 10;
    this.minMonth = this.minTime
      ? new Date(this.minTime).getMonth() + 1 : 1;
    this.minDay = this.minTime
      ? new Date(this.minTime).getDate() : 1;
  },
};
</script>

<style lang="scss" scoped>
.ar-datatime-picker{
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
