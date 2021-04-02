<template>
  <div class="ar-datatime-picker">
    <div class="ar-datatime-picker-header">
      <options :options="typeOptions"
               :value.sync="currentType"
               @click="handleChangeType" />
    </div>
    <div class="ar-datatime-picker-body">

    </div>
    <bottom @comfirm="onComfirm"
            @unlimit="onUnlimit" />
  </div>
</template>

<script>
import Options from './options.vue';
import Bottom from './footer.vue';
import {
  getAllYears,
  getTypeOptions,
  getStartYear,
  getEndYear,
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
    select: {
      type: String,
      default: 'single',
    },
    year: {
      type: Array,
      default: () => [new Date().getFullYear()],
    },
    month: {
      type: Array,
      default: () => [new Date().getMonth() + 1],
    },
    day: {
      type: Array,
      default: () => [new Date().getDate()],
    },
    startYear: {
      type: [String, Number],
      default: getStartYear(),
    },
    endYear: {
      type: [String, Number],
      default: getEndYear(),
    },
  },
  components: {
    Options,
    Bottom,
  },
  data() {
    return {
      currentType: 'year',
      currentSelect: 'single',
      currentYearValue: [],
      currentMonthValue: [],
    };
  },
  computed: {
    yearsArr() {
      return getAllYears(this.startYear, this.endYear);
    },
  },
  watch: {
    type: {
      immediate: true,
      handler(value) {
        this.currentType = value || 'year';
        this.currentYearValue = [];
        this.currentMonthValue = [];
        console.log('type', this.year, this.month);
      },
    },
    select: {
      immediate: true,
      handler(value) {
        this.currentSelect = value || 'single';
        this.currentYearValue = [];
        this.currentMonthValue = [];
        console.log('select', this.year, this.month);
      },
    },
    year: {
      immediate: true,
      deep: true,
      handler(newVal) {
        this.currentYearValue = newVal;
      },
    },
    month: {
      immediate: true,
      deep: true,
      handler(newVal) {
        this.currentMonthValue = newVal;
      },
    },
  },
  methods: {
    handleChangeType(value) {
      this.$emit('update:type', value);
    },
    handleChangeSelect(value) {
      this.$emit('update:select', value);
    },
    // 改变year
    onChangeYear() {
      this.$emit('change', this.currentYearValue);
    },
    onStartYear({ index, value }) {
      const currentYearValue = JSON.parse(JSON.stringify(this.currentYearValue));
      currentYearValue[index] = value;
    },
    // 确定
    onComfirm() {
      const currentYearValue = this.currentYearValue ? this.currentYearValue : this.yearsArr[0];

      if (this.currentType === 'year') {
        this.$emit('update:year', currentYearValue);
      } else if (this.currentType === 'month') {
        if (this.currentYearValue.length < 2 && this.currentMonthValue < 2) return;
        this.$emit('update:year', currentYearValue);
        this.$emit('update:month', this.currentMonthValue || 1);
      }
    },
    // 不限
    onUnlimit() {
      if (this.currentType === 'year') {
        this.$emit('update:year', []);
      } else if (this.currentType === 'month') {
        this.$emit('update:year', []);
        this.$emit('update:month', []);
      } else {
        this.$emit('update:year', []);
        this.$emit('update:month', []);
        this.$emit('update:day', []);
      }
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
    border-bottom: 1px solid #F2F4F7;
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

    &__year{
      padding: 0 8px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
    }
  }

  &-column{
    &__wrapper{
      height: 33vh;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &__gap{
      height: 100%;
      padding: 0 4px;
      color: $ar-desc;
      display: flex;
      align-items: center;
      box-sizing: border-box;
    }
  }
}
</style>
