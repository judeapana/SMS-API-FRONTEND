import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';
import auth from "./modules/auth";
import main from "./modules/main";
import myusers from "./modules/myusers";
import university from "./modules/university";
import campus from "./modules/campus";
import contact_list from "./modules/contact_list";
import message from "./modules/message";
import credit from "./modules/credit";
import niche_archieve from "./modules/niche_archieve";
import template from "./modules/template";
Vue.use(Vuex)

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        message, credit,template,
        niche_archieve,
        myusers, auth, main, university, campus, contact_list
    },
    plugins: [createPersistedState()]
})
