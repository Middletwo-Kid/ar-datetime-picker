## Popup 弹出层

### 介绍
弹出层容器，用于展示弹窗、信息提示等内容，支持多个弹出层叠加展示。

### 引入

```js
import Vue from 'vue';
import { Popup } from 'ar-ui';

Vue.use(Popup);
```

### 代码演示
```html
<template>
  <div id="app">
    <button class="datetime-button" @click="handleClick">显示遮罩层</button>
    <ar-popup v-model="show">
      我是内容
    </ar-popup>
  </div>
</template>

<script>

export default {
  data() {
    return {
      show: false,
    };
  },
  methods: {
    handleClick() {
      this.show = true;
    },
  },
};
</script>
```

### API

#### props
| 参数     | 说明                       | 类型      | 默认                        |
| ------- | ---------------- | --------------------  |------------------------  |
| `show`  | 是否展示弹出层                | `boolean`                 | `false`|                                  |
### Events

| 事件名     | 说明                       | 回调参数                        |
| --------- | -------------------------- | ------------------------------  |
| `click` | 点击时触发。    | `event: Event` |

