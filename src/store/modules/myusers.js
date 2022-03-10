import {Roles} from "../../utils/role";
import axios from "axios";

export default {
    namespaced: true,
    state: () => {
        return {
            loading: false,
            error: null,
            msg: '',
            users: [],
            user: null,
        }
    },
    getters: {
        getErrors(state) {
            return state.error;
        },
        getMessage(state) {
            return state.msg;
        },
        getUsers(state) {
            return state.users
        },
        getUser(state) {
            return state.user
        },
        getLoading(state) {
            return state.loading
        },
        getCustomers(state) {
            return state.users.map((x) => x.role === Roles.User.name)
        }, getBusinessAccount(state) {
            return state.users.map((x) => x.account_type === 'BUSINESS')
        }, getOtherAccounts(state) {
            return state.users.map((x) => x.account_type === 'OTHERS')
        }, getIndividualAccounts(state) {
            return state.users.map((x) => x.account_type === 'INDIVIDUAL')
        }
    }, mutations: {
        setUsers(state, payload) {
            state.users = payload
        },
        setErrors(state, payload) {
            state.error = payload;
        },
        setMsg(state, payload) {
            state.msg = payload;
        },
        setLoading(state, payload) {
            state.loading = payload;
        },
        setUser(state, payload) {
            state.user = payload;
        }
    }, actions: {
        a_Users({commit}, payload) {
            return new Promise(((resolve, reject) => {
                axios.post()
            }))
        },
        a_SearchUsers({commit}, payload) {
            return new Promise(((resolve, reject) => {
                commit('setLoading', true)
                axios.post('admin/users/search', payload).then(() => {
                    commit('setUsers', data)
                    commit('setLoading', false)
                    resolve()
                }).catch((error) => {
                    commit('setErrors', error.response);
                    commit('setLoading', false)
                    commit('setUsers', [])
                    reject(error.response)
                })

            }))
        },
        a_CreateUser({commit}, payload) {
            commit('setLoading', true)
            return new Promise(((resolve, reject) => {
                axios.post('/admin/users', payload).then(() => {
                    commit('setMsg', 'You have successfully created a new user')
                    commit('setLoading', false)
                    resolve()
                }).catch((error) => {
                    commit('setErrors', error.response);
                    commit('setLoading', false)
                    reject(error.response)
                })
            }))
        },
        a_GetUsers({commit}, payload) {
            commit('setLoading', true)
            return new Promise(((resolve, reject) => {
                axios.get('/admin/users', {params: payload}).then(({data}) => {
                    commit('setUsers', data)
                    commit('setLoading', false)
                    resolve()
                }).catch((error) => {
                    commit('setErrors', error.response);
                    commit('setLoading', false)
                    commit('setUser', [])
                    reject()
                })
            }))
        },
        a_GetUser({commit}, payload) {
            commit('setUser', null)
            commit('setLoading', true)
            return new Promise(((resolve, reject) => {
                axios.get(`/admin/user/${payload}`).then(({data}) => {
                    commit('setUser', data)
                    commit('setLoading', false)
                    resolve()
                }).catch((error) => {
                    commit('setErrors', error.response);
                    commit('setLoading', false)
                    commit('setUser', [])
                    reject(error.response)
                })
            }))
        },
        a_UpdateUser({commit}, payload) {
            commit('setLoading', true)
            return new Promise(((resolve, reject) => {
                axios.put(`/admin/user/${payload.id}`, payload).then(() => {
                    commit('setUser', null)
                    commit('setLoading', false)
                    resolve()
                }).catch((error) => {
                    commit('setErrors', error.response);
                    commit('setLoading', false)
                    reject(error.response)
                })
            }))
        },
        a_DeleteUser({commit}, payload) {
            return new Promise((({resolve, reject}) => {

            }))
        }
    }
}
