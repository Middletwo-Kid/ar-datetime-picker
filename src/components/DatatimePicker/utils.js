// 获得所有的年组合
const getAllYears = (startYear, endYear) => {
  const start = startYear ? (+startYear) : 2015;
  const end = endYear ? (+endYear) : new Date().getFullYear() + 30;

  if (Number.isNaN(start) || Number.isNaN(end)) {
    throw new Error('startYear or endYear is invaild');
  }

  const arr = [];

  // eslint-disable-next-line no-plusplus
  for (let i = start; i <= end; i++) {
    arr.push(i);
  }

  return arr;
};

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

const getSelectOptions = () => [{
  name: '单选',
  value: 'single',
}, {
  name: '范围',
  value: 'range',
}];

const getStartYear = () => new Date().getFullYear() - 10;

const getEndYear = () => new Date().getFullYear() + 10;

module.exports = {
  getAllYears,
  range,
  getTypeOptions,
  getSelectOptions,
  getStartYear,
  getEndYear,
};
