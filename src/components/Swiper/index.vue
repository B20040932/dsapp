<template>
    <div ref="swiper" class="swiper-container" id="floor1Swiper">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(item,index) in list" :key="index">
                <img :src="item.imgUrl">
            </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>

        <!-- 如果需要导航按钮 -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
    </div>
</template>

<script>
import Swiper from 'swiper'
export default {
    props:['list'],
    name:'Swiper',
    watch:{
        list:{
            immediate:true,
            handler(){
                this.$nextTick(()=>{
                var mySwiper = new Swiper(this.$refs.swiper,{
                    loop:true,
                    autoplay:true,
                    pagination:{
                    el:".swiper-pagination",
                    clickable:true
                    },
                    navigation:{
                    nextEl:'.swiper-button-next',
                    prevEl:'.swiper-button-prev',
                    }
                })
                })
            }
        }
    }
}
</script>

<style lang="less" scoped>

</style>