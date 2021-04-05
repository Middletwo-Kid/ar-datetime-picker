import DatetimePicker from './DatetimePicker/index.vue';

const components = [
  DatetimePicker,
];

const install = (Vue) => {
  components.forEach((component) => {
    Vue.component(component.name, component);
  });
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  DatetimePicker,
  install,
};
