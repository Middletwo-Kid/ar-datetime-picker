<template>
  <div id="app">
    <datatime-picker
      :startYear="startYear"
      :endYear="endYear"
      :type.sync="type"
      :select.sync="select"
      :year.sync="year"
      :month.sync="month"
      @confirm="onConfirm" />
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
      year: [],
      month: [],
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
  methods: {
    onConfirm() {
      // eslint-disable-next-line no-alert
      alert('13');
    },
  },
};
</script>

<style lang="scss">
</style>
