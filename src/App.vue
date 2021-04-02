<template>
  <div id="app">
    <datatime-picker
      :type.sync="type"
      :startTime.sync="startTime"
      :endTime.sync="endTime"
      :minTime="minTime"
      :maxTime="maxTime" />
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
      startTime: '',
      endTime: '',
      type: 'day',
      maxTime: '2021/4/2',
      minTime: '2014/4/2',
    };
  },
};
</script>

<style lang="scss">
</style>
