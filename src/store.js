import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        showMenu: false,
        loading: false,
        uploadProgress: 0,
    },
    mutations: {
        toggleMenu(state, payload) {
            state.showMenu = payload;
        },
        setLoadingState(state, payload) {
            state.loading = payload;
        },
        setProgress(state, payload) {
            state.uploadProgress = payload;
        },
    },
})
