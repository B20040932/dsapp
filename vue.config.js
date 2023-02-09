const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap:false,
  lintOnSave: false,
  devServer: {
    port: 8888,     // 端口
  },
})
