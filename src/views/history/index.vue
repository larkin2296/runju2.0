<template>
    <div>
        <van-nav-bar
        title="浏览列表"
        left-text=""
        right-text=""
        />
        <van-popup class='msg' v-model="show" :overlay="false"><van-icon name='question'/>{{msg}}</van-popup>
        <!-- 没有行程 -->
        <div class='empty' v-if="label == 0">
            <div class='img'>
                <img src='../../img/announcement.png' />
            </div>
            <div class='empty_title'>
                抱歉，你还没有任何记录
            </div>
        </div>
        <!-- 行程列表 -->
        <div class='list' v-if="label == 1">
            <div class='title'>整租/合租</div>
            <div class='title_bottom'></div>
            <van-list  class='house_list' v-model="loading" :finished="finished" :offset='400' @load='onLoad'>
                <div v-for="(item,index) in list" :key="index" class='house' @click="goDetail(item.id)">
                    <div class='appoint_time'>{{item.house.created_at}}</div>
                    <div class='house_detail'>
                        <div class='swipe_left'><img :src="item.house.pic_1" /></div>
                        <div class='swipe_right'>
                        <div class='swipe_right_top'><van-notice-bar :text="item.house.title" background='#ffffff'/></div>
                        <div class='swipe_right_center'>{{item.house.door_name}} 大一居大床外景</div>
                        <div class='swipe_right_middle'>{{item.house.address}}</div>
                        <div class='swipe_right_bottom'>
                            <child v-for="(itemchild,index) in item.house.key_name" :key="index" :message="itemchild"></child>
                        </div>
                        <div class='swipe_right_price'>{{item.house.price}}元/月</div>
                        </div>
                    </div>
                </div>
            </van-list>
        </div>
        <bottom></bottom>
    </div>
</template>

<script>
import { NavBar,Button,List,NoticeBar,SwipeCell,Icon,Popup,Dialog } from 'vant'
import Bottom from '../../components/Bottom.vue'
import Child from '../../components/Keyword.vue'
import { get_history_data } from '@/api/history.js'
import store from '@/store'
export default {
    data(){
        return{
            label: 0,
            list:[],
            loading:false,
            finished:false,
            show:false,
            msg: ''
        }
    },
    components: {
        Bottom,  
        Child,
        [NavBar.name]: NavBar,
        [Button.name]: Button,
        [List.name]:List,
        [NoticeBar.name]:NoticeBar,
        [SwipeCell.name]:SwipeCell,
        [Icon.name]:Icon,
        [Popup.name]:Popup,
        [Dialog.name]:Dialog
    },
    created(){
        this.fetchData()
    },
    methods: {
        fetchData(){
            var that = this
            if(store.getters.token != undefined && store.getters.id != ''){
                var param = Object()
                param.user_id = store.getters.id
                get_history_data(param).then(res=>{
                    if(res.code == '2000'){
                        this.label = res.status
                    }else{
                        this.label = res.status
                    }
                })
            }
        },
        onLoad(){
            var that = this
            if(store.getters.token != undefined && store.getters.id != ''){
                var param = Object()
                param.user_id = store.getters.id
                get_history_data(param).then(res=>{
                    if(res.code == '2000'){
                        this.list = res.house
                        this.loading = false
                        this.finished = true
                    }else{
                        that.label = res.status
                    }
                })
            }else{
                this.list = [];
            }
            if(this.list == []){
                this.label = 0
            }
        }
    }
}
</script>

<style lang="less">

.empty{
    width:200px;
    height:100px;
    margin:200px auto;
}
.img {
    width:100px;
    height:100px;
    margin:0 auto;
}
.img img{
    width:100%;
    height:100%;
}
.empty_title{
    font-family: PingFangBold;
    font-size:14px;
    text-align: center;
}
.empty_button{
    width:80px;
    height:80px;
    margin: 0 auto;
}
.appoint_time{
    width:90%;
    margin:0 auto;
    font-size:16px;
    font-family: PingFangLight;
    color:#EA8608;
}
.title{
    width: 90%;
    height: 40px;
    margin: 0 auto;
    font-size: 26px;
    line-height: 40px;
    font-family: PingFangBold;
}
.title_bottom{
    width:60px;
    height:5px;
    border-radius: 2px;
    background-color: #EA8608;
    margin-left:5%;
    margin-bottom: 20px;
}
  .house_detail {
    width:90%;
    margin:0 auto;
    height:120px;
  }
.swipe_left{
    width: 120px;
    height: 110px;
    float: left;
    margin-top: 2%;
    border-radius: 10px;
}
.swipe_left img{
  width:100%;
  height:100%;
  border-radius: 10px;
}
.swipe_right{
  width:61%;
  height:99%;
  float:left;
  margin-left:3%;
}
.swipe_right_top,.swipe_right_price{
  width:100%;
  height:25%;
  line-height:30px;
  font-family: PingFangLight;
  font-size:16px;
  color:#EA8608;
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
.msg{
    width:200px;
    height:60px;
    text-align:center;
    line-height:60px;
    border-radius: 5px;
    font-family: PingFangBold;
    color:#ffffff;
    font-size:15px;
    background-color: #000000;
    box-shadow: 3px 4px 10px 2px rgba(119,118,118,0.33);
}
.van-icon{
    vertical-align: middle;
    padding-right:5px;
}
</style>
