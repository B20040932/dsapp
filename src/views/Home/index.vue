<template>
  <div>
    <Typenav/>
    <ListContainer :bannerList="bannerList"/>
    <Recommend/>
    <Rank/>
    <Like/>
    <Floor v-for="(item,index) in floorList" :key="index" :list="item"/>
    <Brand/>

  </div>
</template>

<script>
import Typenav from '@/components/Typenav'
import ListContainer from '@/views/Home/ListContainer'
import Recommend from '@/views/Home/Recommend'
import Like from '@/views/Home/Like'
import Rank from '@/views/Home/Rank'
import Floor from '@/views/Home/Floor'
import Brand from '@/views/Home/Brand'
import { mapState } from 'vuex'




export default {
  components:{
    Typenav,
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand
  },
  computed:{
    ...mapState('home',['floorList','bannerList'])

  },
  mounted(){
    this.$store.dispatch('home/bannerList')
    this.$store.dispatch('home/floorList')
    try{
      this.$store.dispatch('user/getUserInfo')
    }catch(error){
      console.log(error.message)
    }
  }
}
</script>

<style>

</style>