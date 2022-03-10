import axios from "axios";

export default {
    namespaced: true,

    state: () => {
        return {
            loading: false,
            errors: null,
            msg: null,
            university: null,
            universities: []
        }
    },
    getters: {
        getUniversities(state) {
            return state.universities
        },
        getUniversity(state) {
            return state.university
        },
        getLoading(state) {
            return state.loading;
        },
        getErrors(state) {
            return state.errors
        },
        getMsg(state) {
            return state.msg
        }
    },
    mutations: {
        setUniversities(state, payload) {
            state.universities = payload
        },
        setUniversity(state, payload) {
            state.university = payload
        },
        setLoading(state, payload) {
            state.loading = payload;
        },
        setErrors(state, payload) {
            state.errors = payload;
        },
        setMsg(state, payload) {
            state.msg = payload;
        },
    }, actions: {
        a_University({commit}, payload) {
            commit('setUniversity', null)
            commit('setLoading', true)
            return new Promise((((resolve, reject) => {
                axios.get(`/admin/university/${payload}`).then(({data}) => {
                    commit('setLoading', false)
                    commit('setUniversity', data)
                    resolve()
                }).catch((error) => {
                    commit('setErrors', error.response)
                    commit('setLoading', false)
                    reject(error.response)
                })
            })))
        },
        a_UniGet({commit}, payload) {
            commit('setLoading', true)
            return new Promise((((resolve, reject) => {
                axios.get('/admin/universities', {params: payload}).then(({data}) => {
                    commit('setLoading', false)
                    commit('setUniversities', data)
                    resolve()
                }).catch((error) => {
                    commit('setErrors', error.response)
                    commit('setLoading', false)
                    reject(error.response)
                })
            })))
        },
        a_UniSearch({commit}, payload) {
            commit('setLoading', true)
            return new Promise((((resolve, reject) => {
                axios.post('/admin/university/search', payload).then(() => {
                    commit('setLoading', false)
                    commit('setMsg', data)
                    resolve()
                }).catch((error) => {
                    commit('setErrors', error.response)
                    commit('setLoading', false)
                    reject()
                })
            })))
        },
        a_UniCreate({commit}, payload) {
            commit('setLoading', true)
            return new Promise((((resolve, reject) => {
                axios.post('/admin/universities', payload).then(({status, data}) => {
                    commit('setLoading', false)
                    commit('setMsg', data)
                    resolve()
                }).catch((error) => {
                    commit('setErrors', error.response)
                    commit('setLoading', false)
                    reject(error.response)
                })
            })))

        },
        a_UniUpdate({commit}, payload) {
            return new Promise((((resolve, reject) => {
                axios.put(`/admin/university/${payload.id}`, payload).then(({status, data}) => {
                    commit('setLoading', false)
                    commit('setUniversity', data)
                    resolve()
                }).catch((error) => {
                    commit('setErrors', error.response)
                    commit('setLoading', false)
                    reject(error.response)
                })
            })))
        },
        a_UniDelete({commit}, payload) {
            return new Promise((((resolve, reject) => {

            })))
        }
    }
}
