import axios from "axios";

export default {
    namespaced: true,
    state: () => {
        return {
            loading: false,
            errors: null,
            msg: null,
            templates: []
        }
    },
    getters: {
        getTemplate(state) {
            return state.templates
        },
        getMsg(state) {
            return state.msg
        },
        getLoading(state) {
            return state.loading;
        },
        getErrors(state) {
            return state.errors;
        }
    }, mutations: {
        setLoading(state, payload) {
            state.loading = payload
        },
        setErrors(state, payload) {
            state.errors = payload
        },
        setMsg(state, payload) {
            state.msg = payload
        },
        setTemplate(state, payload) {
            state.templates = payload
        },
    }, actions: {
        a_CreateTemplate({commit}, payload) {
            commit('setLoading', true)
            return new Promise((((resolve, reject) => {
                axios.post('/admin/templates', payload).then(({data}) => {
                    commit('setLoading', false)
                    commit('setErrors', []);
                    resolve()
                }).catch((error) => {
                    commit('setErrors', error.response);
                    commit('setLoading', false)
                    reject(error.response)
                })
            })))
        }
    }
}
