export default {
    namespaced: true,
    state: () => {
        return {
            loading: false,
            errors: null,
            msg: null,
        }
    },
    getters: {
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
    },
}
