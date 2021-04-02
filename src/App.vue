<template>
  <div id="app">
    <datatime-picker
      :type.sync="type"
      :startTime.sync="startTime"
      :endTime.sync="endTime" />
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
<<<<<<< HEAD
      startTime: '2014',
      endTime: '2016',
      type: '',
    };
  },
=======
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
>>>>>>> 373240826da77fc817294da12710bf79149fb86b
};
</script>

<style lang="scss">
</style>
