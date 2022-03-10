import axios from "axios";

export default {
    namespaced: true,
    state: () => {
        return {
            loading: false,
            errors: null,
            msg: null,
            campus: null,
            campuses: [],
        }
    },
    getters: {

        getLoading(state) {
            return state.loading;
        },
        getCampus(state) {
            return state.campus;
        },
        getErrors(state) {
            return state.errors;
        },
        getMsg(state) {
            return state.msg;
        },
        getCampuses(state) {
            return state.campuses;
        }
    },
    mutations: {
        setLoading(state, payload) {
            state.loading = payload
        },
        setCampus(state, payload) {
            state.campus = payload
        },
        setErrors(state, payload) {
            state.errors = payload
        },
        setMsg(state, payload) {
            state.msg = payload
        },
        setCampuses(state, payload) {
            state.campuses = payload
        }
    }, actions: {
        a_GetCampuses({commit}, payload) {
            commit('setLoading', true)
            return new Promise((((resolve, reject) => {
                axios.get('/admin/campuses', {params: payload}).then(({data}) => {
                    commit('setLoading', false)
                    commit('setCampuses', data)
                    resolve()
                }).catch((error) => {
                    commit('setLoading', false)
                    commit('setErrors', error.response)
                    reject(error.response)
                })
            })))
        },
        a_GetCampus({commit}, payload) {
            commit('setCampus', null)
            commit('setLoading', true)
            return new Promise((((resolve, reject) => {
                axios.get(`/admin/campus/${payload}`).then(({data}) => {
                    commit('setLoading', false)
                    commit('setCampus', data)
                    resolve()
                }).catch((error) => {
                    commit('setLoading', false)
                    commit('setErrors', error.response)
                    reject(error.response)
                })
            })))
        },
        a_CampusCreate({commit}, payload) {
            commit('setLoading', true)
            return new Promise((((resolve, reject) => {
                axios.post('/admin/campuses', payload).then(() => {
                    commit('setLoading', false)
                    resolve()
                }).catch((error) => {
                    commit('setLoading', false)
                    commit('setErrors', error.response)
                    reject(error.response)
                })
            })))
        },
        a_CampusUpdate({commit}, payload) {
            commit('setLoading', true)
            return new Promise((((resolve, reject) => {
                axios.put(`/admin/campus/${payload.id}`, payload).then(({data}) => {
                    commit('setLoading', false)
                    commit('setCampus', data)
                    resolve()
                }).catch((error) => {
                    commit('setLoading', false)
                    commit('setErrors', error.response)
                    reject(error.response)
                })
            })))
        },
        a_CampusDelete({commit}, payload) {
            commit('setLoading', true)
            return new Promise((((resolve, reject) => {
                axios.delete('admin/campuses').then(() => {
                    commit('setLoading', false)
                    resolve()
                }).catch(() => {
                    commit('setLoading', false)
                    reject()
                })
            })))
        },
        a_CampusSearch({commit}, payload) {
            commit('setLoading', true)
            return new Promise((((resolve, reject) => {
                axios.post('admin/campuses/search').then(() => {

                    commit('setLoading', false)
                    resolve()
                }).catch(() => {
                    commit('setLoading', false)
                    reject()
                })
            })))
        }
    }
}
