1. typeOptions
为`{name: xxx, value: xxx}`的数组对象，表示年月日三种类型, `value`的值必须为`year、month、day`中的一种。

2. selectOptions
为`{name: xxx, value: xxx}`的数组对象，表示单选、范围两种类型。`value`的值必须为`single、range`中的一种。

3. year
当前选中的年份，数据类型为数组，默认为今年，如: `[2021]`。

4. month
当前选中的月份，数据类型为数组，默认为这个月, 如：`[4]`。

5. day
当前选中的日，数据类型为数组，默认为今日, 如：`[1]`。

6. startYear
其实年份，可以为`string`和`number`, 默认为当前年份的前十年，如: `2011`。

7. endYear
其实年份，可以为`string`和`number`, 默认为当前年份的后十年，如: `2031`。