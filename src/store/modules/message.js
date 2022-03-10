import axios from "axios";

export default {
    namespaced: true,
    state: () => {
        return {
            loading: false,
            errors: null,
            msg: null,
            messages: []
        }
    },
    getters: {
        getMessage(state) {
            return state.messages
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
        setMessage(state, payload) {
            state.message = payload
        },
    }, actions: {
        a_CreateMessage({commit}, payload) {
            commit('setLoading', true)
            return new Promise((((resolve, reject) => {
                axios.post('/admin/messages', payload).then(() => {
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
