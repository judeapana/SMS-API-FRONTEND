import axios from "axios";
import {HTTP} from "./httpcodes";
import store from '../store/index'

export const APP_NAME = 'Campus Notify'

export const getCurrentUser = () => {
    try {
        return JSON.parse(localStorage.getItem('user'))
    } catch (e) {
        console.error("Something went wrong")
    }

}

export const setCurrentUser = (user) => {
    try {
        let usr = JSON.stringify(user)
        localStorage.setItem('user', usr);
    } catch (e) {
        console.error("Something went wrong")
    }

}

export const isAuthenticated = () => {
    return localStorage.getItem('user') !== null;
}


export const getToken = () => {
    return localStorage.getItem('token') || null
}

export const getRefreshToken = () => {
    return localStorage.getItem('rtoken');
}

export const setToken = (token) => {
    localStorage.setItem('rtoken', token.refresh)
    localStorage.setItem('token', token.main);
}

export const logoutUser = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('rtoken')
    localStorage.removeItem('token')
}

export const setAuthHeader = (payload) => {
    axios.defaults.headers['Authorization'] = `Bearer ${payload}`
}

export const AuthInterceptor = () => {
    axios.interceptors.response.use(response => response, error => {
        const {config, response: {status, data}} = error;
        if (status === HTTP.UNAUTHORIZED && !config._retry) {
            config._retry = true;
            store.dispatch('auth/a_RefreshToken').then(({data}) => {
                setAuthHeader(data)
                return axios(config)
            }).catch(() => {
                store.dispatch('auth/a_LoginOut')
                Promise.reject();
            })
        }
    })
}


