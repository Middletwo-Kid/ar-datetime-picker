import DatetimePicker from './DatetimePicker/index.vue';
import Overlay from './Overlay/index.vue';
import Popup from './Popup/index.vue';

const components = [
  DatetimePicker,
  Overlay,
  Popup,
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
  Overlay,
  Popup,
  install,
};
