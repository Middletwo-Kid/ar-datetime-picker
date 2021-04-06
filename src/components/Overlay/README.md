## Overlay 遮罩层

### 介绍

创建一个遮罩层，用于强调特定的页面元素，并阻止用户进行其他操作。

### 引入

```js
import Vue from 'vue';
import { Overlay } from 'ar-ui';

Vue.use(Overlay);
```

### 代码演示
```html
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
```

### API

#### props
| 参数     | 说明                       | 类型      | 默认                        |
| ------- | ---------------- | --------------------  |------------------------  |
| `show`  | 是否展示遮罩层                | `boolean`                 | `false`|                                  |
### Events

| 事件名     | 说明                       | 回调参数                        |
| --------- | -------------------------- | ------------------------------  |
| `click` | 点击时触发。    | `event: Event` |

