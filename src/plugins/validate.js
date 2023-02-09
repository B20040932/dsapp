import Vue from 'vue'
import VeeValidate from 'vee-validate'
import zn_CH from 'vee-validate/dist/locale/zh_CN'
Vue.use(VeeValidate)
VeeValidate.Validator.localize('zn_CH',{
    messages:{
        ...zn_CH.messages,
        is:(field)=>`${field}必须与密码相同`
    },
    attributes:{
        phone:'手机号',
        code:'验证码',
        pwd:'密码',
        REpwd:'确认密码',
        agree:'协议'
    }
})

VeeValidate.Validator.extend('agree',{
    validate:value=>{
        return value
    },
    getMessage:field => field+'必须同意'
})