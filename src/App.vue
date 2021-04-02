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
      startTime: '2014',
      endTime: '2016',
      type: '',
    };
  },
};
</script>

<style lang="scss">
</style>
