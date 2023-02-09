import { reqGoodsInfo,reqAddOrUpdateShopCart } from "@/api"
import {getUUID} from '@/utils/uuid_token'

const state = {
    goods:{} ,
    uuid_token:getUUID()
}
const mutations = {
    GETGOOD(state,data){
        state.goods = data
    }
}
const actions = {
    async reqGood({commit},params) {
        let result = await reqGoodsInfo(params);
        if(result.data.code==200){
            commit("GETGOOD",result.data.data)
        }
    },
    async addShopCart({commit},{skuId,skuNum}) {
        let result = await reqAddOrUpdateShopCart(skuId,skuNum);
        if(result.data.code==200){
            return 'ok'
        }else{
            return Promise.reject(new Error('fail'))
        }
    },
}
const getters = {
    categoryView(state){
        return state.goods.categoryView || {}
    },
    skuInfo(state){
        return state.goods.skuInfo || {}
    },
    spuSaleAttrList(state){
        return state.goods.spuSaleAttrList || []
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}