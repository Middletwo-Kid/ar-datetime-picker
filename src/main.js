import Vue from 'vue';
import App from './App.vue';
import '@/assets/style/reset.scss';
import UI from '../lib/index';
import '@/components/theme-chalk/lib/index.css';

Vue.use(UI);
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
