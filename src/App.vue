<template>
  <div id="app">
    <p class="datetime-desc">选择的时间： {{startTime}} 至 {{endTime}}</p>
    <button class="datetime-button" @click="handleClick">选择时间</button>
    <datatime-picker
      v-if="show"
      :type.sync="type"
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
      console.log('确定');
      this.show = false;
    },
    onCancel() {
      console.log('取消');
      this.show = false;
    },
    onUnlimit() {
      console.log('不限');
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
