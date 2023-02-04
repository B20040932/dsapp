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

export const reqBannerList = ()=>{
    return mockHttp.get('/banner')
}

export const reqFloorList = ()=>{
    return mockHttp.get('/floor')
}