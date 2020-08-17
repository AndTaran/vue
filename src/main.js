import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import store from './store'
import BuyModalComponents from '@/components/Shared/BuyModal'
import * as fb from 'firebase/app'
import 'firebase/auth';        // for authentication
import 'firebase/storage';     // for storage
import 'firebase/database';    // for realtime database
import 'firebase/firestore';   // for cloud firestore
import 'firebase/messaging';   // for cloud messaging
import 'firebase/functions';   // for cloud functions

Vue.component('app-buy-modal', BuyModalComponents)

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App),
  created() {
    var firebaseConfig = {
      apiKey: "AIzaSyDs8JtEM1UPqYlwp-8MaO6bLz2YqWaDKcs",
      authDomain: "itc-ads-12105.firebaseapp.com",
      databaseURL: "https://itc-ads-12105.firebaseio.com",
      projectId: "itc-ads-12105",
      storageBucket: "itc-ads-12105.appspot.com",
      messagingSenderId: "853600898311",
      appId: "1:853600898311:web:ee8eff5d05d29c8bc449a2"
    };
    fb.initializeApp(firebaseConfig);
    fb.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoLoginUser', user)
      }
    })
    this.$store.dispatch('fetchAds')
  }
}).$mount('#app')
