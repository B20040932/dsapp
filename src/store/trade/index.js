import { reqAddressInfo,reqOrderInfo } from "@/api"

const state = {
    userAddress:[{address:''}],
    orderInfo:{},
}
const mutations = {
    GETUSERADDRESS(state, data) {
        state.userAddress = data
    },
    GETORDERINFO(state, data) {
        state.orderInfo = data
    },
}
const actions = {
    async getUserAddress({ commit }) {
        let result = await reqAddressInfo();
        if (result.data.code == 200) {
            commit('GETUSERADDRESS', result.data.data)
            return 'OK'
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
    async getOrderInfo({ commit }) {
        let result = await reqOrderInfo();
        if (result.data.code == 200) {
            commit('GETORDERINFO', result.data.data)
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