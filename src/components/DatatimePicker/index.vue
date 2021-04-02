<template>
  <div class="ar-datatime-picker">
    <div class="ar-datatime-picker-header">
      <options :options="typeOptions"
               :value.sync="currentType"
               @click="onChangeType" />
    </div>
    <div class="ar-datatime-picker-select">
      <select-time :startTime="firstValue"
                   :endTime="secondValue"
                   @change="onChangeFocus" />
    </div>
    <div class="ar-datatime-picker-body">
      <select-year v-if="isFocus && currentType ==='year'"
                   :startTime.sync="firstValue"
                   :endTime.sync="secondValue"
                   :index="focusIndex" />
      <select-month v-if="isFocus && currentType ==='month'"
                    :startTime.sync="firstValue"
                    :endTime.sync="secondValue"
                    :index="focusIndex" />
      <select-day v-if="isFocus && currentType ==='day'"
                  :startTime.sync="firstValue"
                  :endTime.sync="secondValue"
                  :index="focusIndex" />
    </div>
    <bottom @comfirm="onComfirm"
            @unlimit="onUnlimit"
            @cancel="onCancel" />
  </div>
</template>

<script>
import Options from './options.vue';
import SelectTime from './time.vue';
import SelectYear from './year.vue';
import SelectMonth from './month.vue';
import SelectDay from './day.vue';
import Bottom from './footer.vue';
import {
  getTypeOptions,
} from './utils';

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
    };
  },
<<<<<<< HEAD
=======
  computed: {
    yearsArr() {
      return getAllYears(this.startYear, this.endYear);
    },
    secondYearsArr() {
      return getAllYears(this.startYear, this.endYear);
    },
  },
>>>>>>> 373240826da77fc817294da12710bf79149fb86b
  watch: {
    type: {
      immediate: true,
      handler(value) {
        this.currentType = value || 'year';
<<<<<<< HEAD
=======
        this.currentYearValue = [];
        this.currentMonthValue = [];
        // 单选年：[2020], 范围：[2020, 2021]
      },
    },
    select: {
      immediate: true,
      handler(value) {
        this.currentSelect = value || 'single';
        this.currentYearValue = [];
        this.currentMonthValue = [];
        // 切换之后，应该思考一下初始值的问题
>>>>>>> 373240826da77fc817294da12710bf79149fb86b
      },
    },
    startTime: {
      immediate: true,
      handler(newVal) {
<<<<<<< HEAD
        this.firstValue = newVal;
=======
        const len = this.select === 'single' ? 1 : 2;
        const val = this.select !== 'year' && newVal && newVal.length === len
          ? newVal : new Array(len).fill('');
        if (this.type !== 'year' && !val[0]) val[0] = new Date().getFullYear();
        if (this.type !== 'year' && this.select === 'range' && val[0] && !val[1]) {
          if (this.month && this.month[0] !== 12) val[1] = (+val[0]);
          else val[1] = val[0] + 1;
        }
        this.currentYearValue = JSON.parse(JSON.stringify(val));
>>>>>>> 373240826da77fc817294da12710bf79149fb86b
      },
    },
    endTime: {
      immediate: true,
      handler(newVal) {
<<<<<<< HEAD
        this.secondValue = newVal;
=======
        const len = this.select === 'single' ? 1 : 2;
        const val = this.select !== 'year' && newVal && newVal.length === len
          ? newVal : new Array(len).fill('');
        if (this.type !== 'year' && !val[0]) val[0] = new Date().getMonth() + 1;
        if (this.type !== 'year' && this.select === 'range' && val[0]) {
          if (this.year && this.year[0] !== this.year[1]) val[1] = 1;
          else val[1] = val[0] + 1;
        }
        this.currentMonthValue = JSON.parse(JSON.stringify(val));
>>>>>>> 373240826da77fc817294da12710bf79149fb86b
      },
    },
  },
  methods: {
    onChangeFocus(index) {
      this.isFocus = true;
      this.focusIndex = index;
    },
    onChangeType(value) {
      this.$emit('update:type', value);
    },
    onComfirm() {
<<<<<<< HEAD
      this.$emit('update:startTime', this.startTime);
      this.$emit('update:endTime', this.endTime);
=======
      let { currentYearValue } = this;

      if (this.currentType === 'year') {
        if (currentYearValue.length === 0 || currentYearValue[0].length === 0) return;
        this.$emit('update:year', currentYearValue);
        if (this.month.length > 0) this.$emit('update:month', []);
      } else if (this.currentType === 'month') {
        let { currentMonthValue } = this;
        if (this.select === 'single' && currentYearValue.length === 0) {
          currentYearValue = [this.yearsArr[0]];
        }
        if (this.select === 'single' && (!this.currentMonthValue || this.currentMonthValue.length === 0)) {
          currentMonthValue = [1];
        }

        if (this.select === 'range') {
          if (this.currentYearValue.length !== 2 || this.currentMonthValue.length !== 2) return;
          if ((this.currentYearValue[1] < this.currentYearValue[0])
          || (this.currentYearValue[1] === this.currentYearValue[0]
          && (this.currentMonthValue[1] < this.currentMonthValue[0]))) return;
        }
        this.$emit('update:year', currentYearValue);
        this.$emit('update:month', currentMonthValue);
      }

      this.$emit('confirm');
>>>>>>> 373240826da77fc817294da12710bf79149fb86b
    },
    onUnlimit() {
      this.isFocus = false;
      this.focusIndex = '';
      this.$emit('update:startTime', '');
      this.$emit('update:endTime', '');
    },
    onCancel() {
      this.isFocus = false;
      this.focusIndex = '';
    },
  },
};
</script>

<style lang="scss" scoped>
.ar-datatime-picker{
  display: flex;
  flex-direction: column;
  background: #fff;

  &-header{
    padding: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
  }

  &-body{
    height: 35vh;
    margin-bottom: 8px;
    padding: 8px 8px 0;
    box-sizing: border-box;
    overflow-y: scroll;
    &::-webkit-scrollbar{
      display: none;
    }
  }
}
</style>
