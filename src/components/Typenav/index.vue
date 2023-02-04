<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container"  @mouseleave="leaveShow">
      <h2 class="all" @mouseenter="enterShow" >
        全部商品分类
      </h2>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
      <transition name="sort">
        <div class="sort" v-show="isShow"  >
        <div class="all-sort-list2" @mouseleave="leaveIndex" @click="goSearch">
          <div class="item" v-for="(c1) in categoryList" :key="c1.categoryId" :class="{cur:currentIndex==c1.categoryId}">
            <h3 @mouseenter="changeIndex(c1.categoryId)">
              <a :data-id="1" :data-categoryid="c1.categoryId">{{c1.categoryName}}</a>
            </h3>
            <div class="item-list clearfix">
              <div class="subitem" v-for="(c2) in c1.categoryChild" :key="c2.categoryId">
                <dl class="fore">
                  <dt>
                    <a :data-id="2" :data-categoryid="c2.categoryId">{{c2.categoryName}}</a>
                  </dt>
                  <dd>
                    <em  v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                      <a :data-id="3" :data-categoryid="c3.categoryId">{{c3.categoryName}}</a>
                    </em>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
        </div>
      </transition>

    </div>
  
  </div>
</template>

<script>
import {debounce,throttle} from '@/assets/js/common'
import { mapState } from 'vuex'
export default {
  name: 'TypeNav',
  data(){
    return{
      isShow:true,
      currentIndex:-1,
    }
  },
  methods:{
    changeIndex:throttle(function(index){
      // console.log(index,this.currentIndex)
      this.currentIndex = index
    },20),
    leaveIndex(){
      this.currentIndex=-1
    },
    leaveShow(){
      if(this.$route.path!='/home'){
        this.isShow = false
      }
    },
    goSearch(e){
      if(e.target.nodeName=='A'){
        let location = {
          name:'search',
        }
        let query = {
            categoryName:e.target.text,
          }
        if(e.target.dataset.id==1){
          query.category1Id=e.target.dataset.categoryid
        }
        else if(e.target.dataset.id==2){
          query.category2Id=e.target.dataset.categoryid
        }
        else if(e.target.dataset.id==3){
          query.category3Id=e.target.dataset.categoryid
        }
        location.query = query
        if(this.$route.params){
          location.params = this.$route.params
        }
        this.$router.push(location)
      }
    },
    enterShow(){
      this.isShow=true
    }
  }, 
  computed:{
    ...mapState('home',['categoryList'])
  },
  mounted(){
    if(this.$route.path!='/home'){
      this.isShow=false
    }
  }
}
</script>
  
  <style  lang="less" scoped>
  .type-nav {
    border-bottom: 2px solid #e1251b;
  
    .container {
      width: 1200px;
      margin: 0 auto;
      display: flex;
      position: relative;
  
      .all {
        width: 210px;
        height: 45px;
        background-color: #e1251b;
        line-height: 45px;
        text-align: center;
        color: #fff;
        font-size: 14px;
        font-weight: bold;
      }
  
      .nav {
        a {
          height: 45px;
          margin: 0 22px;
          line-height: 45px;
          font-size: 16px;
          color: #333;
        }
      }

      .sort {
        position: absolute;
        left: 0;
        top: 45px;
        width: 210px;
        height: 461px;
        position: absolute;
        background: #fafafa;
        z-index: 999;
  
        .all-sort-list2 {
          .item {
            h3 {
              line-height: 27px;
              font-size: 14px;
              font-weight: 400;
              overflow: hidden;
              padding: 0 20px;
              margin: 0;
  
              a {
                color: #333;
                text-decoration: none;
                cursor: pointer;

              }
            }
            .item-list {
              display: none;
              position: absolute;
              width: 734px;
              min-height: 465px;
              _height: 200px;
              background: #f7f7f7;
              left: 210px;
              border: 1px solid #ddd;
              top: 0;
              z-index: 9999 !important;
  
              .subitem {
                float: left;
                width: 650px;
                padding: 0 4px 0 8px;
  
                dl {
                  border-top: 1px solid #eee;
                  padding: 6px 0;
                  overflow: hidden;
                  zoom: 1;
  
                  &.fore {
                    border-top: 0;
                  }
  
                  dt {
                    float: left;
                    width: 54px;
                    line-height: 22px;
                    text-align: right;
                    padding: 3px 6px 0 0;
                    font-weight: 700;
                    cursor: pointer;
                  }
  
                  dd {
                    float: left;
                    width: 415px;
                    padding: 3px 0 0;
                    overflow: hidden;
                    cursor: pointer;
  
                    em {
                      float: left;
                      height: 14px;
                      line-height: 14px;
                      padding: 0 8px;
                      margin-top: 5px;
                      border-left: 1px solid #ccc;
                    }
                  }
                }
              }
            }
  
            &:hover {
              .item-list {
                display: block;
              }
            }
          }
        }
      }
      // .sort-enter{
      //   height:0px;
      //   opacity: 0;
      // }
      // .sort-enter-to{
      //   height:461px;
      //   opacity: 1;
      // }
      // .sort-enter-active{
      //   transition:all .5s linear
      // }
    }
  }
  .cur{
    background-color: #d9d9d9;
  }

  </style>
  