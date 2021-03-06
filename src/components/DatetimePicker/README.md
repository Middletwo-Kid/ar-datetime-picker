## DatetimePicker 时间选择

### 介绍

时间选择器，支持年、月、日期、不限等纬度，可以选择某段时间或者选择某天、某月或某日。

### 引入

```js
import Vue from 'vue';
import { DatetimePicker } from 'ar-ui';

Vue.use(DatetimePicker);
```

### 代码演示
结合`ar-action-sheet`使用。
```html
<template>
  <div id="app">
    <p class="datetime-desc">选择的时间： {{startTime}} 至 {{endTime}}</p>
    <button class="datetime-button" @click="handleClick">选择时间</button>
    <ar-action-sheet v-model="show">
      <ar-datetime-picker
        unlimitVal="all"
        :startTime.sync="startTime"
        :endTime.sync="endTime"
        :minTime="minTime"
        :maxTime="maxTime"
        @confirm="onConfirm"
        @cancel="onCancel"
        @unlimit="onUnlimit" />
    </ar-action-sheet>
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

### API

#### props

| 参数         | 说明                                            | 类型                     | 默认值                                                       |
| ------------ | ----------------------------------------------- | ------------------------ | ------------------------------------------------------------ |
| `type`       | 纬度，可选值为`year、month、day`                | `string`                 | `year`                                                       |
| `typeOption` | 纬度配置项。`value`的可选值为`year、month、day` | `[{name:'', value: ''}]` | `[{value: 'year', name: '年'}, {value: 'month', name: '月'}, {value: 'day', name: '日'}]` |
| `startTime`  | 起始时间，以`/`为分割，例如：`2021/4/2`。       | `string`                 | `''`                                                         |
| `endTime`    | 终止时间，以`/`为分割，例如：`2025/4/2`。       | `string`                 | `''`                                                         |
| `minTime`    | 最小时间， 以`/`为分割，例如：`2025/4/2`。      | `string`                 | 为当前日期的前十年。                                         |
| `maxTime`    | 最大时间， 以`/`为分割，例如：`2025/4/2`。      | `string`                 | 为当前日期的后十年。                                         |

### Events

| 事件名    | 说明                       | 回调参数                       |
| --------- | -------------------------- | ------------------------------ |
| `confrim` | 点击确定按钮时触发的事件。 | `{startTime: '', endTime: ''}` |
| `unlimit` | 点击不限按钮时触发的事件。 | `event: Event`                             |
| `cancel`  | 点击取消按钮时触发的事件。 | `event: Event`                             |
| `changeType`  |     改变类型时触发的事件。                       |        `year 或者 month 或者 day`                        |
| `changeStartTime`  |     选择起始时间时触发的事件。                       |        `''`                        |
| `changeEndTime`  |     选择结束时间时触发的事件。                       |        `''`                        |

