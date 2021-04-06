<template>
  <div id="app">
    <button class="datetime-button" @click="handleClick">显示遮罩</button>
    <ar-overlay :show="show"
                @click="onClose" />
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      show: false,
    };
  },
  methods: {
    handleClick() {
      this.show = true;
    },
    onClose() {
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
