<template>
  <div id="app">
    <p class="datetime-desc">选择的时间： {{startTime}} 至 {{endTime}}</p>
    <button class="datetime-button" @click="handleClick">选择时间</button>
    <ar-popup v-model="show">
      <ar-datetime-picker
        :type.sync="type"
        :startTime.sync="startTime"
        :endTime.sync="endTime"
        :minTime="minTime"
        :maxTime="maxTime"
        @confirm="onConfirm"
        @cancel="onCancel"
        @unlimit="onUnlimit" />
    </ar-popup>
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      startTime: '2021/03',
      endTime: '2021/03',
      type: 'month',
      maxTime: '2022/4/2',
      minTime: '2021/4/2',
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
  color: rgba(64, 64, 92, 1);
  line-height: 44px;
}

.datetime-button{
  display: block;
  height: 44px;
  width: 80%;
  margin: 8px 0;
  background: rgba(41, 113, 255, 1);
  color: #fff;
  line-height: 44px;
  text-align: center;
  outline: none;
  border: none;
  box-sizing: border-box;
}
</style>
