import Overlay from './index.vue';

Overlay.install = (Vue) => {
  Vue.component(Overlay.name, Overlay);
};

export default Overlay;
