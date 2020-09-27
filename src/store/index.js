import Vue from 'vue'
import Vuex from 'vuex'
import * as types from "./mutation-type"
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userInfo: JSON.parse(localStorage.getItem('userInfo')) || {}


    },
    mutations: {
        [types.SET_USER_INFO](state, list) {
            state.userInfo = list
        }
    },
    actions: {
        setUserInfo({ commit }, list) {
            localStorage.setItem('userInfo', JSON.stringify(list))
            commit(types.SET_USER_INFO, list)
        }
    },
    modules: {}
})