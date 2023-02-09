import { reqGetCode,reqUserRegister,reqUserLogin,reqUserInfo,reqLogOut } from "@/api"
import {setToken,getToken,removeToken} from '@/utils/token'
const state = {
    code:'',
    token:getToken(),
    userInfo:''
}
const mutations = {
    GETCODE(state, data) {
        state.code = data
    },
    USERLOGIN(state,data){
        state.token = data.token
    },
    USERINGO(state,data){
        state.userInfo = data || []
    },
    USERLOGOUT(state){
        state.token=''
        state.userInfo={}
        removeToken()
    }
}
const actions = {
    async getCode({ commit }, phone) {
        let result = await reqGetCode(phone);
        if (result.data.code == 200) {
            commit('GETCODE', result.data.data)
            return 'OK'
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
    async userRegister({ commit }, data) {
        let result = await reqUserRegister(data);
        if (result.data.code == 200) {
            return 'OK'
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
    async userLogin({ commit }, data) {
        let result = await reqUserLogin(data);
        if (result.data.code == 200) {
            commit('USERLOGIN',result.data.data)
            //持久化
            setToken(result.data.data.token)
            return 'OK'
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
    async getUserInfo({commit}){
        let result = await reqUserInfo();
        if (result.data.code == 200) {
            commit('USERINGO',result.data.data)
            return 'OK'
        } else {
            return '未登录'
        }
    },
    async userLogout({commit}){
        let result = await reqLogOut();
        if (result.data.code == 200) {
            commit('USERLOGOUT')
            return 'OK'
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
}
const getters = {


}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}