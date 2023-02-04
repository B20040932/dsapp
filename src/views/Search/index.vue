<template>
  <div>
    <Typenav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <li class="with-x" v-if="searchParams.categoryName">
              {{searchParams.categoryName}}
              <i @click="removeCategoryName">x</i>
            </li>
            <li class="with-x" v-if="searchParams.keyword">
              {{searchParams.keyword}}
              <i @click="removeKeyword">x</i>
            </li>
            <li class="with-x" v-if="searchParams.trademark">
              {{searchParams.trademark.split(":")[1]}}
              <i @click="removeTradeMark">x</i>
            </li>
            <li class="with-x" v-for="(item,index) in searchParams.props" :key="index">
              {{item.split(":")[1]}}
              <i @click="removeProp(index)">x</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{active:isOne}"  @click="changeOrder(1)">
                  <a>综合<span v-show="isOne&&isAsc"> ⬆</span><span v-show="isOne&&isDesc"> ⬇</span></a>
                </li>
                <li :class="{active:isTwo}"  @click="changeOrder(2)">
                  <a>价格<span v-show="isTwo&&isAsc"> ⬆</span><span v-show="isTwo&&isDesc"> ⬇</span></a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="(item,index) in goodsList" :key="index">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${item.id}`">
                      <img :src="item.defaultImg"/>
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i> {{item.price}}.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" :title="item.title">{{item.title}}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>666</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="page">
            <Pagination :pageNo="searchParams.pageNo" :pageSize="searchParams.pageSize" :total="total" :continues="5"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Typenav from '@/components/Typenav'
  import SearchSelector from './SearchSelector/SearchSelector'
  import Pagination from '@/components/Pagination'
  import { mapGetters, mapState } from 'vuex'
  export default {
    name: 'Search',

    components: {
      Typenav,
      SearchSelector,
      Pagination,
    },
    data(){
      return{
        searchParams:{
          category1Id:"",
          category2Id:"",
          category3Id:"",
          categoryName:"",
          keyword:"",
          order:"1:desc",
          pageNo:1,
          pageSize:10,
          props:[],
          trademark:"",

        }
      }
    },
    computed:{
      ...mapGetters('search',['goodsList','attrsList','trademarkList','total']),
      isOne(){
        return this.searchParams.order.indexOf('1') != -1
      },
      isTwo(){
        return this.searchParams.order.indexOf('2') != -1
      },
      isAsc(){
        return this.searchParams.order.indexOf('asc') != -1
      },
      isDesc(){
        return this.searchParams.order.indexOf('desc') != -1
      },
    },
    methods:{
      getSearchList(){
        this.$store.dispatch('search/reqSearchList',this.searchParams)
      },
      removeCategoryName(){
        this.searchParams.categoryName = undefined
        this.searchParams.category1Id = undefined
        this.searchParams.category2Id = undefined
        this.searchParams.category3Id = undefined
        this.getSearchList()
        if(this.$route.params){
          this.$router.push({name:"search",params:this.$route.params})
        }
      },
      removeKeyword(){
        this.searchParams.keyword = undefined
        this.getSearchList()
        //通知Header清除关键字
        this.$bus.$emit("clear")
        if(this.$route.query){
          this.$router.push({name:"search",query:this.$route.query})
        }
      },
      removeTradeMark(){
        this.searchParams.trademark = undefined
        this.getSearchList()
      },
      removeProp(index){
        this.searchParams.props.splice(index,1)
        this.getSearchList()
      },
      getTradeMark(trademark){
        this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`
        this.getSearchList();
      },
      getattrInfo(attr,attrVal){
        let props = `${attr.attrId}:${attrVal}:${attr.attrName}`
        if(this.searchParams.props.indexOf(props)==-1){
          this.searchParams.props.push(props)
        }
        this.getSearchList()
      },
      changeOrder(flag){
        let ori = this.searchParams.order.split(":")
        if(ori[0]==flag){
          ori[1] = ori[1]=='desc'?'asc':'desc'
        }
        else{
          ori[0]=flag
          ori[1]='desc'
        }
        this.searchParams.order = ori.join(":")
        this.getSearchList()
      },
      gotoPage(page){
        this.searchParams.pageNo = page
        this.getSearchList()
      },
    },
    watch:{
      $route(){
        Object.assign(this.searchParams,this.$route.query,this.$route.params)
        this.getSearchList()
        this.searchParams.category1Id=''
        this.searchParams.category2Id=''
        this.searchParams.category3Id=''
      }
    },
    beforeMount(){
      Object.assign(this.searchParams,this.$route.params,this.$route.query)
    },
    mounted(){
      this.getSearchList()
      this.$bus.$on('tradeMarkInfo',(trademark)=>this.getTradeMark(trademark))
      this.$bus.$on('attrInfo',(attr,attrVal)=>this.getattrInfo(attr,attrVal))
      this.$bus.$on('gotoPage',(page)=>this.gotoPage(page))


    },
    beforeDestroy(){
      this.$bus.$off('tradeMarkInfo')
      this.$bus.$off('attrInfo')
      this.$bus.$off('gotoPage')

    }
  }
</script>

<style lang="less" scoped>
  .main {
    margin: 10px 0;

    .py-container {
      width: 1200px;
      margin: 0 auto;

      .bread {
        margin-bottom: 5px;
        overflow: hidden;

        .sui-breadcrumb {
          padding: 3px 15px;
          margin: 0;
          font-weight: 400;
          border-radius: 3px;
          float: left;

          li {
            display: inline-block;
            line-height: 18px;

            a {
              color: #666;
              text-decoration: none;

              &:hover {
                color: #4cb9fc;
              }
            }
          }
        }

        .sui-tag {
          margin-top: -5px;
          list-style: none;
          font-size: 0;
          line-height: 0;
          padding: 5px 0 0;
          margin-bottom: 18px;
          display: flex;
          justify-content: start;
          align-items: center;

          .with-x {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 12px;
            margin: 0 5px 5px 0;
            overflow: hidden;
            color: #000;
            background: #f7f7f7;
            padding: 0 7px;
            height: 20px;
            line-height: 20px;
            border: 1px solid #dedede;
            white-space: nowrap;
            transition: color 400ms;
            cursor: pointer;

            i {
              margin-left: 10px;
              cursor: pointer;
              font: 400 14px tahoma;
              height: 100%;
              vertical-align: middle;
            }

            &:hover {
              color: #28a3ef;
            }
          }
        }
      }

      .details {
        margin-bottom: 5px;

        .sui-navbar {
          overflow: visible;
          margin-bottom: 0;

          .filter {
            min-height: 40px;
            padding-right: 20px;
            background: #fbfbfb;
            border: 1px solid #e2e2e2;
            padding-left: 0;
            border-radius: 0;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

            .sui-nav {
              position: relative;
              left: 0;
              display: block;
              float: left;
              margin: 0 10px 0 0;

              li {
                float: left;
                line-height: 18px;

                a {
                  display: block;
                  cursor: pointer;
                  padding: 11px 15px;
                  color: #777;
                  text-decoration: none;
                  span{
                    font-size: 16px;
                  }
                }

                &.active {
                  a {
                    background: #e1251b;
                    color: #fff;
                  }
                }
              }
            }
          }
        }

        .goods-list {
          margin: 20px 0;

          ul {
            display: flex;
            flex-wrap: wrap;

            li {
              height: 100%;
              width: 20%;
              margin-top: 10px;
              line-height: 28px;

              .list-wrap {
                .p-img {
                  padding-left: 15px;
                  width: 215px;
                  height: 255px;

                  a {
                    color: #666;

                    img {
                      max-width: 100%;
                      height: auto;
                      vertical-align: middle;
                    }
                  }
                }

                .price {
                  padding-left: 15px;
                  font-size: 18px;
                  color: #c81623;

                  strong {
                    font-weight: 700;

                    i {
                      margin-left: -5px;
                    }
                  }
                }

                .attr {
                  padding-left: 15px;
                  width: 85%;
                  overflow: hidden;
                  margin-bottom: 8px;
                  min-height: 38px;
                  cursor: pointer;
                  line-height: 1.8;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;

                  a {
                    color: #333;
                    text-decoration: none;
                  }
                }

                .commit {
                  padding-left: 15px;
                  height: 22px;
                  font-size: 13px;
                  color: #a7a7a7;

                  span {
                    font-weight: 700;
                    color: #646fb0;
                  }
                }

                .operate {
                  padding: 12px 15px;

                  .sui-btn {
                    display: inline-block;
                    padding: 2px 14px;
                    box-sizing: border-box;
                    margin-bottom: 0;
                    font-size: 12px;
                    line-height: 18px;
                    text-align: center;
                    vertical-align: middle;
                    cursor: pointer;
                    border-radius: 0;
                    background-color: transparent;
                    margin-right: 15px;
                  }

                  .btn-bordered {
                    min-width: 85px;
                    background-color: transparent;
                    border: 1px solid #8c8c8c;
                    color: #8c8c8c;

                    &:hover {
                      border: 1px solid #666;
                      color: #fff !important;
                      background-color: #666;
                      text-decoration: none;
                    }
                  }

                  .btn-danger {
                    border: 1px solid #e1251b;
                    color: #e1251b;

                    &:hover {
                      border: 1px solid #e1251b;
                      background-color: #e1251b;
                      color: white !important;
                      text-decoration: none;
                    }
                  }
                }
              }
            }
          }
        }

        .page{
          display: flex;
          justify-content: center;
        }
      }
    }
  }
</style>