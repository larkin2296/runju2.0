<template>
    <div style='background-color:#ffffff;'>
        <van-nav-bar
        title="个人中心"
        left-text=""
        right-text=""
        />
        <!-- 头像 登录注册 登陆后用户名 -->
        <div class='top'>
            <div class='top_left'>
                <div class='head_portrait'><img v-bind:src="imgurl" /></div>
            </div>
            <div class='top_right'>
                <span class='top_right_top' @click='login' v-if="username == ''">登录/注册</span><span class='top_right_top' v-else-if="username !=''">{{username}}</span><br/>
                <span class='top_right_center' @click='go_detail'>点击编辑详细资料</span>
            </div>
        </div>
        <!-- 预约管理 报修服务 支付房租 收藏 浏览记录 -->
        <div class='center'>
            <div class='center_content'>
                <van-row type="flex" justify="space-around">
                <van-col span="6">
                    <!-- <van-tabbar-item>
                    <span>预约管理</span>
                    <img
                    slot="icon"
                    :src="img1"
                    >
                    </van-tabbar-item> -->
                    <meau message='预约管理' :url='img1'></meau>
                </van-col>
                <van-col span="6">
                    <meau message='报修服务' :url='img2'></meau>
                </van-col>
                <van-col span="6">
                    <meau message='支付房租' :url='img3'></meau>
                </van-col>
                <van-col span="6">
                    <meau message='收藏' :url='img4'></meau>
                </van-col>
                </van-row>
                <van-row type="flex" justify="space-around">
                <van-col span="6">
                    <meau message='浏览记录' :url='img5'></meau>
                </van-col>
                <van-col span="6"></van-col>
                <van-col span="6"></van-col>
                <van-col span="6"></van-col>
                </van-row>
            </div>
            
        </div>
        <van-swipe class="banner" :autoplay="3000">
          <van-swipe-item><img class='top_pic' src="../../img/homeban01.jpg"/></van-swipe-item>
          <van-swipe-item><img class='top_pic' src="../../img/homeban02.jpg"/></van-swipe-item>
          <van-swipe-item><img class='top_pic' src="../../img/homeban03.jpg"/></van-swipe-item>
        </van-swipe>
        <!-- 列表 -->
        <div class='list'>
            <ul>
                <li @click='go_fankui'>反馈中心</li>
                <li @click='go_about'>关于我们</li>
                <li><a href="tel:4008-213-449">联系我们</a></li>
            </ul>
        </div>
        <bottom></bottom>
    </div>
</template>

<script>
import { Tabbar, TabbarItem,Row,Col,Swipe,SwipeItem,NavBar } from 'vant'
import Bottom from '../../components/Bottom.vue'
import Meau from '../../components/Meau.vue'
import store from '@/store'
export default {
    data(){
        return{
            imgurl: require('../../img/head_default.png'),
            img1: require('../../img/ordering.png'),
            img2: require('../../img/repair.png'),
            img3: require('../../img/pay.png'),
            img4: require('../../img/collection.png'),
            img5: require('../../img/history.png'),
            username: ''
        }
    },
    components: {
        Bottom,
        Meau,
        [Tabbar.name]: Tabbar,
        [TabbarItem.name]: TabbarItem,
        [Row.name]:Row,
        [Col.name]:Col,
        [Swipe.name]:Swipe,
        [SwipeItem.name]:SwipeItem,
        [NavBar.name]: NavBar
    },
    created(){
        this.fetchData()
    },
    methods: {
        login(){
            this.$router.push({name:'login'})
        },
        fetchData(){
            var that = this
            var id = store.getters.id
            if(id != ''){
                this.username = store.getters.name
                this.$store.dispatch('GetInfo').then(res => {
                    console.log(res)
                that.imgurl = res.data.portrait == '' ? require('../../img/head_default.png'): res.data.portrait
                }).catch(() => {

                })
            }
        },
        go_appoint(){
            this.$router.push({name:'appoint'})
        },
        go_repair(){

        },
        go_pay(){

        },
        go_collect(){
            this.$router.push({name:'collect'})
        },
        go_history(){
            this.$router.push({name:'historys'})            
        },
        go_detail(){
            if(store.getters.token != undefined && store.getters.id != ''){
                this.$router.push({name:'edit'}) 
            }else{
                this.$router.push({name:'login'}) 
            }  
        },
        go_fankui(){
            this.$router.push({name:'maintenance',params: { id: 1}})
        },
        go_about(){
            this.$router.push({name:'about'})
        }
    }
}
</script>

<style scoped>
.top{
    width:100%;
    height:100px;
    background-color: #ffffff;
}
.top_left{
    width:30%;
    height:100px;
    float:left;
}
.head_portrait{
    width:60px;
    height:60px;
    /* background-color: pink; */
    border-radius: 50%;
    margin:20px auto;
}
.head_portrait img{
    width:100%;
    height:100%;
    border-radius: 10px;
}
.top_right{
    width:45%;
    height:80px;
    margin-top:10px;
    float:left;
}
.top_right_top{
    font-size:24px;
    line-height:50px;
    font-family: PingFangBold;
}
.top_right_center{
    font-size:14px;
    font-family: PingFangLight;
}
.center{
    width:100%;
    height:200px;
    margin-top:50px;
    margin-bottom:20px;
}
.center_title{
    width:100%;
    height:50px;
}
.center_content{
    width:90%;
    height:150px;
    padding-top:10px;
    padding-bottom:10px;
    margin:0 auto;
    background-color: #ffffff;
    box-shadow: 0px 5px 32px 0px rgba(119,118,118,0.33);
    border-radius: 10px;
}
.van-swipe-item img{
    width:100%;
    height:100%;
}
.van-tabbar-item__icon img{
    height:40px;
}
.banner{
    width:90%;
    height:80px;
    border-radius: 10px;
    margin:0 auto;
    background-color: red;
    margin-bottom:20px;
}
.van-row{
    height:70px;
}
.list{
    width:100%;
    height:300px;
    background-color: #ffffff;
}
ul{
    margin:0px;
    padding:0px;
}
li{
    font-family: PingFangMedium;
    height:50px;
    line-height:50px;
    margin-left:20px;
}
a{
    color:black;
}
</style>


