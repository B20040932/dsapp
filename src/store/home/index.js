import { reqCategoryList,reqBannerList, reqFloorList } from "@/api"

const state = {
    categoryList:[],
    bannerList:[],
    floorList:[],
}
const mutations = {
    GETCATEGORYLIST(state,data){
        state.categoryList = data
    },
    GETBANNERLIST(state,data){
        state.bannerList = data
        // console.log(data)
    },
    GETFLOORLIST(state,data){
        state.floorList = data
    }
}
const actions = {
    async categoryList({commit}) {
        let result = await reqCategoryList();
        if(result.data.code==200){
            commit("GETCATEGORYLIST",result.data.data)
        }
    },
    async bannerList({commit}) {
        let result = await reqBannerList();
        if(result.data.code==200){
            commit("GETBANNERLIST",result.data.data)
        }
    },
    async floorList({commit}) {
        let result = await reqFloorList();
        if(result.data.code==200){
            commit("GETFLOORLIST",result.data.data)
        }
    },
}
const getters = {}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}