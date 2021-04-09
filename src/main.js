import Vue from 'vue';
import UI from '@/components/index';
import App from './App.vue';
import '@/assets/style/reset.scss';
import '@/components/theme-chalk/index.scss';

Vue.use(UI);
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
