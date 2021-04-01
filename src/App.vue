<template>
  <div id="app">
    <datatime-picker
      :startYear="startYear"
      :endYear="endYear"
      :type.sync="type"
      :select.sync="select"
      :year.sync="year"
      :month.sync="month" />
  </div>
</template>

<script>
import DatatimePicker from './components/DatatimePicker/index.vue';

export default {
  name: 'App',
  components: {
    DatatimePicker,
  },
  data() {
    return {
      startYear: '2018',
      endYear: '2025',
      year: ['2020'],
      month: ['1'],
      type: 'year',
      select: 'single',
    };
  },
  watch: {
    year: {
      immediate: true,
      deep: true,
      handler(newVal) {
        console.log(newVal);
      },
    },
  },
};
</script>

<style lang="scss">
</style>
