import { reqShopCartList,reqDeleteCartById,reqCheckCart} from "@/api"

const state = {
    cartList:[]
}
const mutations = {
    GETCARLIST(state,data){
        state.cartList = data
    }
}
const actions = {
    async reqCarList({commit}) {
        let result = await reqShopCartList();
        if(result.data.code==200){
            commit("GETCARLIST",result.data.data)
        }
    },
    async deleteCartBySkuId({commit},skuId){
        let result = await reqDeleteCartById(skuId);
        if(result.data.code==200){
            return 'OK'
        }else{
            return Promise.reject(new Error('fail'))
        }
    },
    async updateCheckedById({commit},{skuId,isChecked}){
        let result = await reqCheckCart(skuId,isChecked);
        if(result.data.code==200){
            return 'OK'
        }else{
            return Promise.reject(new Error('fail'))
        }
    },
    deleteAllChecked({dispatch,getters}){
        let PromiseAll = []
        getters.cartList.cartInfoList.forEach(item=>{
            if(item.isChecked==1){
                let result = dispatch('deleteCartBySkuId',item.skuId)
                PromiseAll.push(result)
            }
        })
        return Promise.all(PromiseAll)
    },
    updateAllChecked({dispatch,getters},isChecked){
        let PromiseAll = []
        getters.cartList.cartInfoList.forEach(item=>{
            let result = dispatch('updateCheckedById',{skuId:item.skuId,isChecked})
            PromiseAll.push(result)
        })
        return Promise.all(PromiseAll)
    }
}
const getters = {
    cartList(state){
        return state.cartList[0] || {}
    },

}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}