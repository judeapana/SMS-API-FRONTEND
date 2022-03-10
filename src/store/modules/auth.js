import axios from "axios";
import {setCurrentUser, setToken} from "../../utils";

export default {
    namespaced: true,
    strict: false,
    state: {
        loading: false,
        user: null,
        isAuthenticated: false,
        errors: null,
        msg: null
    },
    getters: {
        getMsg(state) {
            return state.msg
        },
        getIsAuthenticated(state) {
            return state.isAuthenticated
        },
        getUser(state) {
            return state.user;
        },
        getLoading(state) {
            return state.loading;
        },
        getErrors(state) {
            return state.errors;
        }
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload
        },
        setLoading(state, payload) {
            state.errors = null
            state.msg = null
            state.loading = payload
        },
        setErrors(state, payload) {
            state.errors = payload
            state.loading = false
        },
        setMsg(state, payload) {
            state.msg = payload
            state.loading = false
            state.errors = null

        },
        isAuthenticated(state, payload) {
            state.isAuthenticated = payload
        }
    },
    actions: {
        a_forgotPassword({commit}, payload) {
            commit('setLoading', true)
            commit('setErrors', null);
            return new Promise(((resolve, reject) => {
                axios.post('/auth/forgot-pwd', payload).then(({data}) => {
                    commit('setLoading', false)
                    commit('setMsg', data)
                    commit('setErrors', null);
                    resolve()
                }).catch((errors) => {
                    commit('setErrors', errors.response)
                    reject()
                })
            }))
        },
        a_validateOTP({commit}, payload) {
            commit('setLoading', true)
            return new Promise(((resolve, reject) => {
                axios.post('/auth/verify', payload).then(({data}) => {
                    commit('setLoading', false)
                    commit('setMsg', data)
                    commit('setErrors', null);
                    resolve()
                }).catch((errors) => {
                    commit('setErrors', errors.response);
                    reject()
                })
            }))
        },
        a_resetPassword({commit}, payload) {
            commit('setLoading', true)
            return new Promise(((resolve, reject) => {
                axios.post('/auth/reset-pwd', payload).then(({data}) => {
                    commit('setLoading', false)
                    commit('setMsg', data)
                    commit('setErrors', null);
                    resolve()
                }).catch((errors) => {
                    commit('setErrors', errors.response);
                    reject()
                })

            }))
        },
        a_registerUser({commit}, payload) {
            commit('setLoading', true)
            return new Promise(((resolve, reject) => {
                axios.post('/auth/register', payload).then(({data}) => {
                    commit('setLoading', false)
                    commit('setMsg', data)
                    commit('setErrors', null);
                    resolve()
                }).catch((errors) => {
                    commit('setErrors', errors.response);
                    reject()
                })
            }))

        },
        a_loginUser({commit}, payload) {
            commit('setLoading', true)
            return new Promise(((resolve, reject) => {
                axios.post('auth/', payload).then(({data}) => {
                    commit('setUser', data.user)
                    setToken(data.token)
                    setCurrentUser(data.user)
                    commit('isAuthenticated', true)
                    commit('setLoading', false)
                    commit('setErrors', null);
                    resolve(true)
                }).catch((error) => {
                    commit('setErrors', error.response)
                    reject()
                })
            }))
        },
        a_RefreshToken({commit}, payload) {
            return new Promise(((resolve, reject) => {
                commit('setLoading', true)
                axios.post('auth/refresh/', payload).then(({data}) => {
                    setToken(data.token)
                    commit('setLoading', false)
                    commit('setErrors', null);
                    resolve(true)
                }).catch((error) => {
                    commit('setErrors', error.response);
                    reject()
                })
            }))
        },
        a_LoginOut({commit}, payload) {
            commit('setLoading', true)
            return new Promise(((resolve, reject) => {
                axios.post('auth/logout/', payload).then((data) => {
                    setToken(null)
                    setCurrentUser(null)
                    commit('isAuthenticated', false)
                    commit('setLoading', false)
                    commit('setUser', null)
                    commit('setErrors', null);

                    resolve(true)
                }).catch((error) => {
                    commit('setErrors', error.response);
                })
            }))
        }
    }

}


