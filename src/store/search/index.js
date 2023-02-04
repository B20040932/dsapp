import { reqSearchInfo } from "@/api"

const state = {
    searchList:{},
}
const mutations = {
    GETSEARCHLIST(state,data){
        state.searchList = data
    }
}
const actions = {
    async reqSearchList({commit},params) {
        let result = await reqSearchInfo(params);
        if(result.data.code==200){
            commit("GETSEARCHLIST",result.data.data)
        }
    },
}
const getters = {
    goodsList(state){
        return state.searchList.goodsList || []
    },
    trademarkList(state){
        return state.searchList.trademarkList || []
    },
    attrsList(state){
        return state.searchList.attrsList || []
    },
    total(state){
        return state.searchList.total || ''
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}