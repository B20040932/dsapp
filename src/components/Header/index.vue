<template>
    <header class="header">
    <!-- 头部的第一行 -->
        <div class="top">
        <div class="container">
            <div class="loginList">
                <p>京东欢迎您！</p>
                <p v-if="!userInfo.name">
                    <span>请 </span>
                    <router-link to="/login">登录</router-link>
                    <router-link to="/register" class="register">免费注册</router-link>
                </p>
                <p v-else>
                  <a>{{ userInfo.name }}</a>
                  <a class="register" @click="logout">退出登录</a>
                </p>
            </div>
            <div class="typeList">
            <router-link to="/center">我的订单</router-link>
            <router-link to="/shopcart">我的购物车</router-link>
            <a href="###">企业采购</a>
            <a href="###">合作招商</a>
            <a href="###">商家后台</a>
            </div>
        </div>
        </div>
        <!--头部第二行 搜索区域-->
        <div class="bottom">
        <h1 class="logoArea">
            <router-link class="logo" title="京东" to="/home">
            <img src="./image/logo.png" alt />
            </router-link>
        </h1>
        <div class="searchArea">
            <form action="###" class="searchForm">
            <input v-model="keyword" type="text" id="autocomplete" class="input-error input-xxlarge" />
            <button class="sui-btn btn-xlarge btn-danger" type="button" @click="goSearch">搜索</button>
            </form>
        </div>
        </div>
    </header>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'Search',
    data () {
        return {
            keyword:''
        }
    },
    methods:{
        goSearch(){
            if(this.keyword.trim()!=''){
                let location = {
                  name:'search',
                    params:{
                        keyword:this.keyword
                    }
                }
                if(this.$route.query){
                  location.query = this.$route.query
                }
                this.$router.push(location).catch(()=>{})
                this.keyword = ""
            }else{
                alert('请输入')
            }
        },
        async logout(){
          try{
            await this.$store.dispatch('user/userLogout')
            this.$router.push('/home')
          }catch(error){
            console.log(error.message)
          }
        }
    },
    computed:{
      ...mapState('user',['userInfo'])
    },
    mounted(){
      this.$bus.$on("clear",()=>{
        this.keyword = ""
      })
    },
    beforeDestroy(){
      this.$bus.$off('clear')
    }

}
</script>

<style lang="less" scoped>
.header {
  .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;
        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          &+a {
            border-left: 1px solid #b3aeae;
          }
        }

      }

    }
  }

  &>.bottom {
    display: flex;
    align-items: center;
    width: 1200px;
    height: 180px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      margin-left: 30px;
      .searchForm {
        overflow: hidden;
        input {
          box-sizing: border-box;
          width: 520px;
          height: 40px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 40px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}

</style>