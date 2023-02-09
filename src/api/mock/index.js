import Mock from 'mockjs'

import banner from './banner.json'
import floor from './floor.json'
import spuSaleAttrList from './spuSaleAttrList.json'
import address from './address.json'


//轮播图数据
Mock.mock("/mock/banner", { code: 200, data: banner })
Mock.mock("/mock/floor", { code: 200, data: floor })
Mock.mock("/mock/spuSaleAttrList", { code: 200, data: spuSaleAttrList })
Mock.mock("/mock/address", { code: 200, data: address })
