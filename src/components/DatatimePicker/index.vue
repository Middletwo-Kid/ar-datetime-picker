<template>
  <div class="ar-datatime-picker">
    <div class="ar-datatime-picker-header">
      <options :options="typeOptions"
               :value.sync="currentType"
               @click="handleChangeType" />
      <options :options="selectOptions"
               :value.sync="currentSelect"
               @click="handleChangeSelect" />
    </div>
    <div class="ar-datatime-picker-body">
      <!-- 年 -->
      <div class="ar-datatime-picker-body__year"
           v-if="currentType === 'year'">
        <cell v-for="item in yearsArr"
              :key="item"
              :label="item"
              :selectType="currentSelect"
              :value.sync="currentYearValue"
              @click="onChangeYear" />
      </div>
      <!-- 年月 -->
      <div class="ar-datatime-picker-body__month"
           v-if="currentType === 'month'">
        <div class="ar-datatime-picker-column__wrapper"
             v-if="currentSelect === 'single'"
        >
          <column type="year"
                  :column="yearsArr"
                  :value.sync="currentYearValue[0]"
                  :index=0 />
          <column type="month"
                  :value.sync="currentMonthValue[0]"
                  :index=0 />
        </div>
        <div class="ar-datatime-picker-column__wrapper"
             v-if="currentSelect === 'range'"
        >
           <column type="year"
                  :column="yearsArr"
                  :value.sync="currentYearValue[0]"
                  :index=0 />
          <column type="month"
                  :value.sync="currentMonthValue[0]"
                  :index=0 />
          <div class="ar-datatime-picker-column__gap">至</div>
           <column type="year"
                  :column="yearsArr"
                  :value.sync="currentYearValue[1]"
                  :index=1 />
          <column type="month"
                  :value.sync="currentMonthValue[1]"
                  :index=1 />
        </div>
      </div>
      <!-- 年月日 -->
      <div class="ar-datatime-picker-body__day"
           v-if="currentType === 'day'"
      >年月日</div>
    </div>
    <bottom @comfirm="onComfirm"
            @unlimit="onUnlimit" />
  </div>
</template>

<script>
import Options from './options.vue';
import Cell from './cell.vue';
import Column from './column.vue';
import Bottom from './footer.vue';
import {
  getAllYears,
  getSelectOptions,
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
    selectOptions: {
      type: Array,
      default: () => getSelectOptions(),
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
    Cell,
    Column,
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
      },
    },
    select: {
      immediate: true,
      handler(value) {
        this.currentSelect = value || 'single';
        this.currentYearValue = [];
        this.currentMonthValue = [];
      },
    },
    year: {
      immediate: true,
      deep: true,
      handler(newVal) {
        const len = this.select === 'single' ? 1 : 2;
        const val = this.select !== 'year' && newVal && newVal.length === len
          ? newVal : new Array(len).fill('');
        if (this.type !== 'year' && !val[0]) val[0] = new Date().getFullYear();
        this.currentYearValue = JSON.parse(JSON.stringify(val));
      },
    },
    month: {
      immediate: true,
      deep: true,
      handler(newVal) {
        const len = this.select === 'single' ? 1 : 2;
        const val = this.select !== 'year' && newVal && newVal.length === len
          ? newVal : new Array(len).fill('');
        if (this.type !== 'year' && !val[0]) val[0] = new Date().getMonth() + 1;
        this.currentMonthValue = JSON.parse(JSON.stringify(val));
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
      let { currentYearValue } = this;

      if (this.currentType === 'year') {
        if (currentYearValue.length === 0 || currentYearValue[0].length === 0) return;
        this.$emit('update:year', currentYearValue);
        if (this.month.length > 0) this.$emit('update:month', []);
      } else if (this.currentType === 'month') {
        if (this.select === 'single' && currentYearValue.length === 0) {
          currentYearValue = [this.yearsArr[0]];
        }
        const currentMonthValue = this.currentMonthValue && this.currentMonthValue.length > 0
          ? this.currentMonthValue : [1];
        this.$emit('update:year', currentYearValue);
        this.$emit('update:month', currentMonthValue);
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
