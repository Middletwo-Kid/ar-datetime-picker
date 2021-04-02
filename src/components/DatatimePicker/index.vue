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
        this.firstValue = newVal;
      },
    },
    endTime: {
      immediate: true,
      handler(newVal) {
        this.secondValue = newVal;
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
      this.$emit('update:startTime', this.startTime);
      this.$emit('update:endTime', this.endTime);
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
