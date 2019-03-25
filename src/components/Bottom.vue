<template>
    <div>
        <van-tabbar>
        <van-tabbar-item icon="wap-home" @click="home">首页</van-tabbar-item>
        <van-tabbar-item icon="like-o" @click="collect">收藏</van-tabbar-item>
        <van-tabbar-item icon="records" info="" @click="appoint">行程</van-tabbar-item>
        <van-tabbar-item icon="contact" info="" @click="user">我的</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
import { TabbarItem,Tabbar } from 'vant';
export default {
    components: {
        [Tabbar.name]: Tabbar,
        [TabbarItem.name]: TabbarItem
    },
    methods: {
        user(){
            this.$router.push({path:'user'})
        },
        home(){
            this.$router.push({path:'/'})
        },
        appoint(){
            this.$router.push({path:'/appoint'})
        },
        collect(){
            this.$router.push({path:'/collect'})
        }
    }
}
</script>

