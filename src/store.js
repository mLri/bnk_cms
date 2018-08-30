import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {

        userInfo: {},
        token: null

    },
    getters: {

        userInfo: state => {
            return state.userInfo
        },
        loggedIn(state) {
            return state.token !== null
        }

    },
    mutations: {

        SET_INFO(state, info){

            state.userInfo = info
            state.token = info.token
        },
        LOGOUT(state) {
            state.userInfo = {}
            state.token = null
        }

    },
    actions: {

        set_info(context, info) {

            const token = info.data.token
            const userInfo = {
                'email': info.data.email,
                'firstName': info.data.firstName,
                'lastName': info.data.lastName,
                'token': info.data.token
            }

            localStorage.setItem('access_token', token)
            localStorage.setItem('userInfo', JSON.stringify(userInfo))

            context.commit('SET_INFO', userInfo)
        },
        logout(context) {
            context.commit('LOGOUT')
        }

    }
})