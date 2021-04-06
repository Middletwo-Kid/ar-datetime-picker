import DatetimePicker from './DatetimePicker/index.vue';
import ActionSheet from './ActionSheet/index.vue';
import Overlay from './Overlay/index.vue';

const components = [
  ActionSheet,
  DatetimePicker,
  Overlay,
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
  ActionSheet,
  DatetimePicker,
  Overlay,
  install,
};
