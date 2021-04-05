import Column from '../src/column.vue';

export default {
  components: {
    Column,
  },
  props: {
    maxTime: [String, Number],
    minTime: [String, Number],
    startTime: [String, Number],
    endTime: [String, Number],
    index: [String, Number],
    minYear: [String, Number],
    maxYear: [String, Number],
    minMonth: [String, Number],
    maxMonth: [String, Number],
    minDay: [String, Number],
    maxDay: [String, Number],
  },
};
