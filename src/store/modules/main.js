export default {
    namespaced: true,
    state: () => {
        return {
            loading: false,
            drawer: false,
            title: ''
        }
    },
    getters: {
        getLoading(state) {
            return state.loading;
        },
        getDrawer(state) {
            return state.drawer;
        },
        getTitle(state) {
            return state.title;
        }
    },
    mutations: {
        setLoading(state, payload) {
            state.loading = payload
        },
        setDrawer(state, payload) {
            state.drawer = payload
        },
        setTitle(state, payload) {
            state.title = payload
        }
    },
    actions: {
        a_loading({commit}, payload) {
            commit('setLoading', payload)
        },
        a_drawer({commit}, payload) {
            commit('setDrawer', payload)
        },
        a_change_title({commit}, payload) {
            commit('setTitle', payload)
        },

    },

}
