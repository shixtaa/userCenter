import Vue from 'vue'
import Vuex from 'vuex'
import * as types from "./mutation-type"
import { post, get, put, del } from "../utils/axios"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userInfo: JSON.parse(localStorage.getItem('userInfo')) || {}
    },
    mutations: {
        /* 存储用户信息 */
        [types.SET_USER_INFO](state, list) {
            state.userInfo = list
            console.log(state.userInfo)
        }
    },
    actions: {
        setUserInfo({ commit }, list) {
            localStorage.setItem('userInfo', JSON.stringify(list))
            commit(types.SET_USER_INFO, list)
        },
        /* 从接口获取用户信息
         *  更新vuex中userInfo
         */
        async getUserInfo({ commit }) {
            let data = {
                id: JSON.parse(localStorage.getItem('userInfo'))._id
            }
            let getUserRes = await get('/user/userinfo', { params: data })
            if (getUserRes) {
                commit(types.SET_USER_INFO, getUserRes)
            }
        }
    },
    modules: {}
})