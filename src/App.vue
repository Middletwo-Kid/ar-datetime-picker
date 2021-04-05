<template>
  <div id="app">
    <p class="datetime-desc">选择的时间： {{startTime}} 至 {{endTime}}</p>
    <button class="datetime-button" @click="handleClick">选择时间</button>
    <!-- <action-sheet v-if="show">
      <datatime-picker
        v-if="show"
        unlimitVal="all"
        :startTime.sync="startTime"
        :endTime.sync="endTime"
        :minTime="minTime"
        :maxTime="maxTime"
        @confirm="onConfirm"
        @cancel="onCancel"
        @unlimit="onUnlimit" />
    </action-sheet> -->
    <datatime-picker
        v-if="show"
        unlimitVal="all"
        :startTime.sync="startTime"
        :endTime.sync="endTime"
        :minTime="minTime"
        :maxTime="maxTime"
        @confirm="onConfirm"
        @cancel="onCancel"
        @unlimit="onUnlimit" />
  </div>
</template>

<script>
import DatatimePicker from './components/DatatimePicker/index.vue';
// import ActionSheet from './components/ActionSheet/index.vue';

export default {
  name: 'App',
  components: {
    DatatimePicker,
    // ActionSheet,
  },
  data() {
    return {
      startTime: '',
      endTime: '',
      type: 'day',
      maxTime: '2022/4/2',
      minTime: '2014/4/2',
      show: false,
    };
  },
  methods: {
    handleClick() {
      this.show = true;
    },
    onConfirm() {
      this.show = false;
    },
    onCancel() {
      this.show = false;
    },
    onUnlimit() {
      this.show = false;
    },
  },
};
</script>

<style lang="scss">
#app{
  display: flex;
  flex-direction: column;
  align-items: center;
}

.datetime-desc{
  color: $ar-main;
  line-height: 44px;
}

.datetime-button{
  display: block;
  height: 44px;
  width: 80%;
  margin: 8px 0;
  background: $ar-primary;
  color: #fff;
  line-height: 44px;
  text-align: center;
  outline: none;
  border: none;
  box-sizing: border-box;
}
</style>
