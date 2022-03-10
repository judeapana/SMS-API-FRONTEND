import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import axios from "axios";
import VueAxios from "vue-axios";
import VueTelInputVuetify from 'vue-tel-input-vuetify/lib'
import Notifications from 'vue-notification'
import {getToken} from "./utils";
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';

Vue.component('vue-select', vSelect)
Vue.config.productionTip = false

Vue.use(VueTelInputVuetify, {vuetify})
Vue.use(Notifications)

axios.defaults.baseURL = 'http://127.0.0.1:5000';
axios.defaults.headers['Authorization'] = `Bearer ${getToken()}`
// axios.defaults.withCredentials = true
Vue.use(VueAxios, axios)
new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')
