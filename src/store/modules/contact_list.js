import axios from "axios";

export default {
    namespaced: true,
    state: () => {
        return {
            loading: false,
            errors: null,
            msg: null,
            contact: null,
            contact_list: []
        }
    },
    getters: {
        getContactList(state) {
            return state.contact_list
        },
        getMsg(state) {
            return state.msg
        },
        getLoading(state) {
            return state.loading;
        },
        getErrors(state) {
            return state.errors;
        },
        getContact(state) {
            return state.contact;
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
        setContactList(state, payload) {
            state.contact_list = payload
        },
        setContact(state, payload) {
            state.contact = payload
        }
    },
    actions: {
        a_GetContact({commit}, payload) {
            commit('setLoading', true)
            commit('setContact', null)
            return new Promise((((resolve, reject) => {
                axios.get(`/admin/contact-list/${payload}`).then(({data}) => {
                    commit('setLoading', false)
                    commit('setContact', data)
                    commit('setErrors', []);
                    resolve()
                }).catch((error) => {
                    commit('setErrors', error.response);
                    commit('setLoading', false)
                    reject(error.response)
                })
            })))
        },
        a_UpdateContact({commit, dispatch}, payload) {
            commit('setLoading', true)
            return new Promise((((resolve, reject) => {
                axios.put(`/admin/contact-list/${payload.id}`, payload).then(({data}) => {
                    commit('setLoading', false)
                    commit('setContact', data)
                    dispatch('a_GetContactList')
                    commit('setErrors', []);
                    resolve()
                }).catch((error) => {
                    commit('setErrors', error.response);
                    commit('setLoading', false)
                    reject(error.response)
                })
            })))
        },
        a_GetContactList({commit}, payload) {
            commit('setLoading', true)
            return new Promise((((resolve, reject) => {
                axios.get('/admin/contact-list', {params: payload}).then(({data}) => {
                    commit('setLoading', false)
                    commit('setContactList', data)
                    commit('setErrors', []);
                    resolve()
                }).catch((error) => {
                    commit('setErrors', error.response);
                    commit('setLoading', false)
                    reject(error.response)
                })
            })))
        },
        a_CreateContactList({commit, dispatch}, payload) {
            commit('setLoading', true)
            return new Promise((((resolve, reject) => {
                axios.post('/admin/contact-list', payload).then(({data}) => {
                    commit('setLoading', false)
                    dispatch('a_GetContactList')
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
