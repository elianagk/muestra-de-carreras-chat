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

// navigator.serviceWorker
//   .register("firebase-messaging-sw.js")
//   .then(function(registration) {
//     console.log("Service Worker Registered!", registration);
//   })
//   .catch(function(err) {
//     console.error("Service Worker registration failed", err);
//   });

new Vue({
  router,
  store,
  vuetify,
  fb,
  render: function (h) { return h(App) }
}).$mount('#app') 

// Vue.use(GoogleAPIs, {
//   clientId: '502634347735-p1d05bu1go6irn8mfvnsob606n9olv5u.apps.googleusercontent.com',
//   discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'],
//   scope: 'https://www.googleapis.com/auth/cloud-platform',
// })
