# ar-datetime-picker

## 安装
```bash
npm install --save armouy-ui-test
```

## 引入
### 全局引入
```js
import Vue from 'vue'
import App from './App.vue'
import ArUi from 'armouy-ui-test'
import "armouy-ui-test/lib/theme-chalk/index.css";
Vue.use(ArUi)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

```

以上代码便完成了 ArDatetimePicker 的引入。需要注意的是，样式文件需要单独引入。

### 按需引入
```bash
npm install babel-plugin-component -D
```
修改`babel.config.js`:
```js
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    [
      "component",
      {
        "libraryName": "armouy-ui-test",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}

```
修改`main.js`:
```js
import Vue from 'vue'
import App from './App.vue'
import { DatetimePicker } from 'armouy-ui-test'
Vue.use(DatetimePicker)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
```

## Dome
```html
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

```