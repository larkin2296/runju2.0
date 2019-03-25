<template>
    <div>
        <van-nav-bar
        title="收藏列表"
        left-text=""
        right-text=""
        
        @click-left="onClickLeft"
        />
        <van-popup class='msg' v-model="show" :overlay="false"><van-icon name='question'/>{{msg}}</van-popup>
        <!-- 没有收藏 -->
        <div class='empty' v-if="label == 0">
            <div class='img'>
                <img src='../../img/coffee.png' />
            </div>
            <div class='empty_title'>
                抱歉，你还没有添加任何收藏
            </div>
            <div class='empty_button'>
                <van-button type='warning' @click='go_list'>去看看</van-button>
            </div>
        </div>
        <!-- 收藏列表 -->
        <div class='list' v-if="label == 1">
            <div class='title'>整租/合租</div>
            <div class='title_bottom'></div>
            <van-list  class='house_list' v-model="loading" :finished="finished" :offset='400' @load='onLoad'>
                <div v-for="(item,index) in list" :key="index" class='house' @click="goDetail(item.id)">
                    <van-swipe-cell :right-width="55" :left-width="55" v-bind:data='item.id' :on-close="onClose">
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
                        <span slot="right">删除</span>
                    </van-swipe-cell>
                </div>
            </van-list>
            <!-- <van-swipe-cell :right-width="65" :left-width="65" :on-close="onClose">
            <span slot="left">选择</span>
            <van-cell-group>
                <van-cell title="单元格" value="内容" />
            </van-cell-group>
            <span slot="right">删除</span>
            </van-swipe-cell> -->
        </div>
        <bottom></bottom>
    </div>
</template>

<script>
import { NavBar,Button,SwipeCell,List,NoticeBar,Cell,CellGroup,Dialog,Icon,Popup } from 'vant'
import Bottom from '../../components/Bottom.vue'
import Child from '../../components/Keyword.vue'
import { get_collect_data,delete_collect } from '@/api/collect.js'
import store from '@/store'
export default {
    data(){
        return{
            label: 0,
            list: [],
            loading:false,
            finished:false,
            show:false,
            msg: ''
        }
    },
    components: {
        Bottom,
        Child,
        [NavBar.name]:NavBar,
        [Button.name]:Button,
        [SwipeCell.name]:SwipeCell,
        [List.name]:List,
        [NoticeBar.name]:NoticeBar,
        [Cell.name]:Cell,
        [CellGroup.name]:CellGroup,
        [Dialog.name]:Dialog,
        [Icon.name]:Icon,
        [Popup.name]:Popup
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
                get_collect_data(param).then(res=>{
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
                get_collect_data(param).then(res=>{
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
        },
        onClickLeft(){
            this.$router.push({path: '/'})
        },
        go_list(){
            this.$router.push({path:'list'})
        },
        onClose(clickPosition, instance) {
            switch (clickPosition) {
                case 'left':
                case 'cell':
                case 'outside':
                instance.close();
                break;
                case 'right':
                Dialog.confirm({
                    message: '确定删除吗？'
                }).then(() => {
                    var that = this
                    var param = Object()
                    param.id = instance.$attrs.data
                    delete_collect(param).then(res=>{
                        this.msg = res.msg
                        this.show = true
                        setTimeout(function () {
                            that.show = false
                            that.onLoad()
                            instance.close();
                        }, 1500)
                    })
                });
                break;
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
  .van-swipe-cell {
    width:90%;
    margin:0 auto;
    height:120px;
    &__left,
    &__right {
      color: #ffffff;
      font-size: 15px;
      width: 55px;
      height: 120px;
      display: inline-block;
      text-align: center;
      line-height: 120px;
      background-color: red;
    }
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
  height:20px;
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