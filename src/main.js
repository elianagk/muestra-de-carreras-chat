import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import  fb  from './firebase';
import linkify from 'vue-linkify'
 
import firebaseMessaging from './firebase'



import { ValidationObserver, ValidationProvider } from 'vee-validate';

Vue.config.productionTip = false
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);
Vue.directive('linkified', linkify);
Vue.prototype.$vueEventBus = new Vue();
Vue.prototype.$messaging = firebaseMessaging


new Vue({
  router,
  store,
  vuetify,
  fb,
  render: function (h) { return h(App) }
}).$mount('#app') 
