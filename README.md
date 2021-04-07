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