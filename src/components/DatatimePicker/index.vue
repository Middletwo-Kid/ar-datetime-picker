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
              :value.sync="currentValue"
              @click="onChangeYear" />
      </div>
      <!-- 年月 -->
      <div class="ar-datatime-picker-body__month"
           v-if="currentType === 'month'">
        <div class="ar-datatime-picker-column__wrapper"
             v-if="currentSelect === 'single'"
        >
          <column type="year" />
          <column type="month"/>
        </div>
        <div class="ar-datatime-picker-column__wrapper"
             v-if="currentSelect === 'range'"
        >
          <column type="year" />
          <column type="month"/>
          <div class="ar-datatime-picker-column__gap">至</div>
          <column type="year" />
          <column type="month"/>
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
      // 选择年月日
      currentType: 'year',
      // 单选or范围
      currentSelect: 'single',
      currentValue: [],
    };
  },
  computed: {
    yearsArr() {
      return this.currentType === 'year' ? getAllYears(this.startYear, this.endYear) : [];
    },
  },
  watch: {
    type: {
      immediate: true,
      handler(value) {
        this.currentType = value || 'year';
        this.currentValue = [];
      },
    },
    select: {
      immediate: true,
      handler(value) {
        this.currentSelect = value || 'single';
        this.currentValue = [];
      },
    },
    year: {
      immediate: true,
      deep: true,
      handler(newVal) {
        this.currentValue = newVal;
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
      this.$emit('change', this.currentValue);
    },
    // 确定
    onComfirm() {
      if (this.currentType === 'year') {
        this.$emit('update:year', this.currentValue);
      }
    },
    // 不限
    onUnlimit() {
      if (this.currentType === 'year') {
        this.$emit('update:year', []);
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
