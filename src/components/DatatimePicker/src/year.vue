<template>
  <div class="ar-datetime-picker-year">
    <column v-if="(+index) === 0"
            :key="index"
            :index=0
            :column="firstColumn"
            :value.sync="firstYearValue"
            @change="onChange"
     />
     <column v-if="(+index) === 1"
            :key="index"
            :index=1
            :column="secondColumn"
            :value.sync="secondYearValue"
            @change="onChange"
     />
  </div>
</template>

<script>
import SelectMixins from '../mixins/select';

export default {
  name: 'ArDatatimePickerYear',
  mixins: [SelectMixins],
  data() {
    return {
      firstYearValue: '',
      secondYearValue: '',
    };
  },
  computed: {
    firstColumn() {
      const arr = [];
      for (let i = this.minYear; i <= this.maxYear; i++) {
        arr.push(i);
      }
      return arr;
    },
    secondColumn() {
      if (Number.isNaN(this.firstYearValue)) return [];
      const arr = [];
      const start = this.firstYearValue ? this.firstYearValue : this.minYear;
      for (let i = start; i <= this.maxYear; i++) {
        arr.push(i);
      }
      return arr;
    },
  },
  methods: {
    onChange({ index }) {
      if ((+index) === 0) {
        if (!this.firstYearValue
        || Number.isNaN(this.firstYearValue)) return;
        const val = `${this.firstYearValue}/1/1`;
        this.$emit('update:startTime', val);
        this.$emit('changeStartTime', val);
        if (this.secondYearValue) {
          this.$emit('update:endTime', '');
          this.$emit('changeEndTime', '');
        }
      }
      if ((+index) === 1) {
        if (!this.secondYearValue
        || Number.isNaN(this.secondYearValue)) return;
        const val = `${this.secondYearValue}/1/1`;
        this.$emit('update:endTime', val);
        this.$emit('changeEndTime', val);
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
        } else {
          this.firstYearValue = '';
        }
      },
    },
    endTime: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          const day = new Date(newVal);
          this.secondYearValue = day.getFullYear();
        } else {
          this.secondYearValue = '';
        }
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.ar-datetime-picker-year{
  height: 100%;
}
</style>
