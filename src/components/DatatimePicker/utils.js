// [min, max)
const range = (num, min, max) => Math.min(Math.max(num, min), max - 1);

const getTypeOptions = () => [{
  name: '年',
  value: 'year',
}, {
  name: '月',
  value: 'month',
}, {
  name: '日',
  value: 'day',
}];

module.exports = {
  range,
  getTypeOptions,
};
