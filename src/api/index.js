//统一管理api接口
import http from './request'
import mockHttp from './mockserve'


export const reqCategoryList = ()=>{
    return http.get('/product/getBaseCategoryList')
}

export const reqSearchInfo = (params)=>{
    return http.post('/list',{
        params:params
    })
}

export const reqGoodsInfo = (GoodId)=>{
    return http.get(`/item/${GoodId}`)
}

export const reqAddOrUpdateShopCart = (skuId,skuNum)=>{
    return http.post(`/cart/addToCart/${skuId}/${skuNum}`)
}

export const reqShopCartList = ()=>{
    return http.get('/cart/cartList')
}

export const reqCheckCart = (skuId,isChecked)=>{
    return http.get(`/cart/checkCart/${skuId}/${isChecked}`)
}

export const reqDeleteCartById = (skuId)=>{
    return http.delete(`/cart/deleteCart/${skuId}`)
}

export const reqGetCode = (phone)=>{
    return http.get(`/user/passport/sendCode/${phone}`)
}

export const reqUserRegister = (data)=>{
    return http.post('/user/passport/register/',data)
}

export const reqUserLogin = (data)=>{
    return http.post('/user/passport/login',data)
}

export const reqLogOut = ()=>{
    return http.get('/user/passport/logout')
}


export const reqUserInfo = ()=>{
    return http.get('/user/passport/auth/getUserInfo')
}

export const reqOrderInfo = ()=>{
    return http.get('/order/auth/trade')
}

export const reqSubmitOrder = (tradeNo,data)=>{
    return http.post(`/order/auth/submitOrder?tradeNo=${tradeNo}`,data)
}

export const reqPayInfo = (orderId)=>{
    return http.get(`/payment/weixin/createNative/${orderId}`)
}

export const reqPayStatus = (orderId)=>{
    return http.get(`/payment/weixin/queryPayStatus/${orderId}`)
}

export const reqMyOrderList = (page,limit)=>{
    return http.get(`/order/auth/${page}/${limit}`)
}

export const reqAddressInfo = ()=>{
    return mockHttp.get('/address')
}

export const reqBannerList = ()=>{
    return mockHttp.get('/banner')
}

export const reqFloorList = ()=>{
    return mockHttp.get('/floor')
}

export const reqSpuSaleAttrList = ()=>{
    return mockHttp.get('/spuSaleAttrList')
}
