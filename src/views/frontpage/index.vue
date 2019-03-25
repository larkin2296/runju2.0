<template>
    <div>
        <!-- 页面头（导航栏 搜索框） -->
        <div class='top'>
            <van-icon class='top_icon' size='20px' name='wap-nav'></van-icon>
            <van-search class="search" placeholder="请输入搜索关键词" background="#ffffff" @search="onSearch" v-model="value" />
            <img src='../../img/logo.png' />
        </div>
        <van-popup v-model="show" position="left" :overlay="true" class='top_left'>内容</van-popup>
        <!-- banner -->
        <van-swipe class="banner" :autoplay="3000">
          <van-swipe-item><img class='top_pic' src="../../img/homeban01.jpg"/></van-swipe-item>
          <van-swipe-item><img class='top_pic' src="../../img/homeban02.jpg"/></van-swipe-item>
          <van-swipe-item><img class='top_pic' src="../../img/homeban03.jpg"/></van-swipe-item>
        </van-swipe>
        <!-- 功能分区地区 -->
        <!-- 24格栅 -->
        <div class='function_list'>
          <van-row class='list1' type="flex" justify="space-between">
            <van-col span="11" style='background-color: #00B2EE;'>
              <div class='area' @click='go_list(0)'><span class='title'>开心安家</span><br /><span class='e_title'>settle down</span></div>
            </van-col>
            <van-col span="11" style='background-color: #E58E0D;'>
            <div class='area' @click='go_list(1)'><span class='title'>贴心短租</span><br /><span class='e_title'>short rent</span></div>
            </van-col>
          </van-row>
          <van-row class='list1' type="flex" justify="space-between">
            <van-col offset="0" span="24" style='background-color: #00B2EE;'>
            <div class='area' @click='go_host'><span class='title'>房屋托管</span><br /><span class='e_title'>housing hosting</span></div>
            </van-col>
          </van-row>
          <van-row class='list1' type="flex" justify="space-between">
            <van-col span="7" style='background-color: #EB7186;'>
            <div class='area' @click='go_map'><span class='title'>地图找房</span><br /><span class='e_title'>map</span></div>
            </van-col>
            <van-col span="7" style='background-color: #E58E0D;'>
            <div class='area' @click='go_secondary'><span class='title'>二手房</span><br /><span class='e_title'>secondary</span></div>
            </van-col>
            <van-col span="7" style='background-color: #00B2EE;'>
            <div class='area'><span class='title'><a href="tel:4008-213-449">联系我们</a></span><br /><span class='e_title'>contact</span></div>
            </van-col>
          </van-row>
        </div>
        <!-- 推荐房源 -->
        <div class='kxaj'>
          <div class='kxaj_title'>
            <div class='title_left'>
              <van-cell title="开心安家" label='万千白领青睐的温馨选择'/>
            </div>
            <div class='title_right'></div>
          </div>
          <div class='kxaj_swipe'>
            <van-swipe :autoplay="6000" >
              <van-swipe-item v-for='(item,index) in kaixin' :key="index"><div style='width:100%;height:100%;' @click="goDetail(item.id)">
                  <div class='swipe_left'><img :src="item.pic_1" /></div>
                  <div class='swipe_right'>
                    <div class='swipe_right_top'><van-notice-bar :text="item.title" background='#ffffff'/></div>
                    <div class='swipe_right_center'>{{item.door_name}} 大一居大床外景</div>
                    <div class='swipe_right_middle'>{{item.address}}</div>
                    <div class='swipe_right_bottom'>
                      <child v-for="(itemchild,index) in item.key_name" :key="index" :message="itemchild"></child>
                    </div>
                    <div class='swipe_right_price'>{{item.price}}元/月</div>
                  </div>
                </div></van-swipe-item>
              <div class="custom-indicator" slot="indicator">
              </div>
            </van-swipe>
          </div>
        </div>
        <div class='segmentation'><img src='../../img/segmentation.png' /></div>
        <div class='txdz'>
          <div class='txdz_title'>
            <div class='title_left'>
              <van-cell title="贴心短租" label='独享家的温馨舒适 超越酒店的安全放心'/>
            </div>
            <div class='title_right'></div>
          </div>
          <div class='txdz_swipe'>
            <van-swipe  :autoplay="6000">
              <van-swipe-item v-for='(item,index) in duanzu' :key="index"><div style='width:100%;height:100%;' @click="goDetail(item.id)">
                  <div class='swipe_left'><img :src="item.pic_1" /></div>
                  <div class='swipe_right'>
                    <div class='swipe_right_top'><van-notice-bar :text="item.title" background='#ffffff'/></div>
                    <div class='swipe_right_center'>{{item.door_name}} 大一居大床外景</div>
                    <div class='swipe_right_middle'>{{item.address}}</div>
                    <div class='swipe_right_bottom'>
                      <child v-for="(itemchild,index) in item.key_name" :key="index" :message="itemchild"></child>
                    </div>
                    <div class='swipe_right_price'>{{item.price}}元/月</div>
                  </div>
                </div></van-swipe-item>
              <div class="custom-indicator" slot="indicator">
              </div>
            </van-swipe>
          </div>
        </div>
        <div style='height:45px;width:100%;'></div>
        <!-- 底部导航栏 -->
        <bottom></bottom>
    </div>
</template>

<script>
//Search搜索框，Swipe轮播，SwipeItem轮播单元，Button按钮 TabbarItem标签栏 Popup弹出层
import { Search, Swipe, SwipeItem, Button,Tabbar, TabbarItem,Popup,Icon,Row, Col,Cell,NoticeBar } from 'vant';
import Bottom from '../../components/Bottom.vue'
import Child from '../../components/Keyword.vue'
import { get_frontpage_house } from '@/api/house.js'
export default {
  name: 'frontpage',
  data(){
    return{
      sum:123123123123,
      show:false,
      kaixin: [],
      duanzu: [],
      value: ""
    }
  },
  components: {
    Bottom,
    Child,
    [Search.name]: Search,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Button.name]: Button,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [Popup.name]: Popup,
    [Icon.name]: Icon,
    [Row.name]: Row,
    [Col.name]:Col,
    [Cell.name]: Cell,
    [NoticeBar.name]:NoticeBar
    // [.name]: ,
  },
  created() {
    this.fetchData()
  },
  methods:{
    fetchData(){
      get_frontpage_house().then(res => {
        this.kaixin = res['kaixin']
        this.duanzu = res['duanzu']
      })
    },
    check(){
      alert('It works')
    },
    onSearch(){
      this.$router.push({name:'list',params: { search: this.value }})
    },
    jump(){
        this.$router.push({path:'list'})
    },
    pop(){
      this.show = true
    },
    go_list(data){
      // login().then(res => {
      //   console.log(res)
      // })
      this.$router.push({name:'list',params: { id: data }})
    },
    go_host(){
      this.$router.push({path:'hosting'})
    },
    go_map(){
      this.$router.push({path:'map'})
    },
    goDetail(id){
      this.$router.push({name:'detail',params: { id: id,type: 1 }})
    },
    go_secondary(){
      this.$router.push({name:'secondary',params: { id: 2}})
    }
  }  
}
</script>

<style scoped>
.top{
  width:100%;
  height:50px;
  background-color: #ffffff;
}
.top_left{
  width:50px;
  left:50px;
}
.top_pic{
  width:100%;
  height:100%;
}
.top_icon{
    float: left;
    width: 24px;
    height: 24px;
    margin: 10px;
}
.search{
  width:230px;
  margin:0 auto;
  float:left;
}
.top img{
  width:80px;
  height:40px;
  margin-top:5px;
}
.area{
  width:100%;
  height:100%;
  text-align: center;
  color:#ffffff;
  line-height:3px;
}
.area .title{
  font-size: 14px;
  font-family: PingFangMedium;
}
.area .title a{
  color:#ffffff;
}
.area .e_title{
  font-size: 12px;
  font-family: PingFangLight;
}
.function_list{
  width:90%;
  height:200px;
  margin:20px auto;
}
.list1{
  height:60px;
  margin-top:10px;
}
.van-col{
  border-radius: 5px;
  background-color: #ffffff;
  box-shadow: 0px 5px 32px 0px rgba(119,118,118,0.33);
  font-family: PingFangLight;
  text-align: center;
  line-height: 60px;
}
.banner{
  width:100%;
  margin:0 auto;
  height:120px;

}
.segmentation{
  width:100%;
  height:15px;
}
.segmentation img{
  width:100%;
  height:100%;
  opacity: 0.5;
}
.kxaj,.txdz{
  width:100%;
  height:180px;
  margin:0 auto;
  background-color: #ffffff;
  padding-bottom:20px;
}
.kxaj_swipe,.txdz_swipe,.van-swipe{
  width:100%;
  height:120px;

}
.kxaj_title,.txdz_title{
  width:100%;
  height:60px;
  font-family: PingFangBold;
}
.title_left .van-cell{
  font-size:20px;
    color:#EA8608;
}
.swipe_left{
  width:30%;
  height:90%;
  float:left;
  margin-left:3%;
  border-radius: 10px;
}
.swipe_left img{
  width:100%;
  height:100%;
  border-radius: 10px;
}
.swipe_right{
  width:63%;
  height:100%;
  float:left;
  margin-left:3%;
}
.swipe_right_top,.swipe_right_price{
  width:100%;
  height:25%;
  line-height:30px;
  font-family: PingFangLight;
  font-size:18px;
  color:orange;
}
.swipe_right_center,.swipe_right_middle,.swipe_right_bottom{
  width:100%;
  height:16%;
  line-height:19.2px;
  font-family: PingFangLight;
  font-size:13px;
  color:rgb(172,172,172);
  overflow: hidden;
}
.van-notice-bar{
  height:30px;
}
</style>
