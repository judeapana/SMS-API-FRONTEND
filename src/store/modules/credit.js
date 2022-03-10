import axios from "axios";

export default {
    namespaced: true,
    state: () => {
        return {
            loading: false,
            errors: null,
            msg: null,
            credit: []
        }
    },
    getters: {
        getCredit(state) {
            return state.credit
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
        setCredit(state, payload) {
            state.credit = payload
        },
    },
    actions: {
        a_UpdateCredit({commit}, payload) {
            commit('setLoading', true)
            return new Promise((((resolve, reject) => {
                axios.post('/admin/credit', payload).then(({data}) => {
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
