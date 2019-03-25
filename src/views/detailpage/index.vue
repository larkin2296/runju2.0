<template>
    <div class='page'>
        <!-- 轮播图 -->
        <van-nav-bar
        :title="result.address"
        left-text="返回"
        right-text=""
        left-arrow
        @click-left="onClickLeft"
        />
        <van-swipe class='swipe' @change="onChange">
        <van-swipe-item v-for="(image, index) in images" :key="index">
            <img class='lazy_img' v-lazy="image" @click='show_pic(index)'/>
        </van-swipe-item>
        </van-swipe>
        <!-- 房屋信息 -->
        <div class='house_area'>
            <div class='house_title'>
                {{result.title}}
            </div>
            <van-row class='house_msg' type="flex" justify="space-between">
                <van-col span="7"><div class='msg_top'>房租</div><div class='msg_content'>{{result.price}}{{type_word}}</div></van-col>
                <van-col span="10" class='msg_middle'><div class='msg_top'>户型</div><div class='msg_content'>{{result.house_type}}</div></van-col>
                <van-col span="7"><div class='msg_top'>面积</div><div class='msg_content'>{{result.acreage}}</div></van-col>
            </van-row>
            <div class='house_announce'>
                <div class='key_word'>
                    <child v-for="(itemchild,index) in result.key_word" :key="index" :message="itemchild"></child>
                </div>
                <div class='house_announce_detail '>
                    <van-row class='list' type="flex" justify="space-between">
                    <van-col span="12"><van-field :value="result.house_type" label="户型:" disabled /></van-col>
                    <van-col span="12"><van-field :value="result.acreage" label="面积:" disabled /></van-col>
                    </van-row>
                    <van-row class='list' type="flex" justify="space-between">
                        <van-col span="12"><van-field :value="result.orientation" label="朝向:" disabled /></van-col>
                        <van-col span="12"><van-field :value="result.house_floor" label="楼层:" disabled /></van-col>
                    </van-row>
                    <van-row class='list' type="flex" justify="space-between">
                        <van-col span="12"><van-field :value="result.under_station" label="地铁:" disabled /></van-col>
                        <van-col span="12"><van-field :value="result.house_status" label="状态:" disabled /></van-col>
                    </van-row>
                    <van-row class='list' type="flex" justify="space-between">
                        <van-col span="12"><van-field :value="result.pay_type" label="支付:" disabled /></van-col>
                        <van-col span="12"><van-field :value="result.address" label="小区:" disabled /></van-col>
                    </van-row>
                </div>
            </div>
        </div>
        <!-- 地图显示位置 -->
        <div class='title'>地理位置</div>
        <div id='container'>

        </div>
        <!-- 房屋简介 -->
        <div class='title'>房屋简介</div>
        <div class='house_more'>
            <div class='facilities'>
                <van-row class='list' type="flex" justify="space-between">
                    <van-col span="4"><van-tabbar-item><span>桌子</span><img slot="icon" slot-scope="props" src="../../img/zhuozi.png"></van-tabbar-item></van-col>
                    <van-col span="4"><van-tabbar-item><span>空调</span><img slot="icon" slot-scope="props" src="../../img/kongtiao.png"></van-tabbar-item></van-col>
                    <van-col span="4"><van-tabbar-item><span>浴缸</span><img slot="icon" slot-scope="props" src="../../img/yugang.png"></van-tabbar-item></van-col>
                    <van-col span="4"><van-tabbar-item><span>椅子</span><img slot="icon" slot-scope="props" src="../../img/yizi.png"></van-tabbar-item></van-col>
                    <van-col span="4"><van-tabbar-item><span>衣柜</span><img slot="icon" slot-scope="props" src="../../img/yigui.png"></van-tabbar-item></van-col>
                </van-row>
                <van-row class='list' type="flex" justify="space-between">
                    <van-col span="4"><van-tabbar-item><span>洗衣机</span><img slot="icon" slot-scope="props" src="../../img/xiyiji.png"></van-tabbar-item></van-col>
                    <van-col span="4"><van-tabbar-item><span>沙发</span><img slot="icon" slot-scope="props" src="../../img/shafa.png"></van-tabbar-item></van-col>
                    <van-col span="4"><van-tabbar-item><span>电视</span><img slot="icon" slot-scope="props" src="../../img/dianshi.png"></van-tabbar-item></van-col>
                    <van-col span="4"><van-tabbar-item><span>床</span><img slot="icon" slot-scope="props" src="../../img/chuang.png"></van-tabbar-item></van-col>
                    <van-col span="4"><van-tabbar-item><span>冰箱</span><img slot="icon" slot-scope="props" src="../../img/bingxiang.png"></van-tabbar-item></van-col>
                </van-row>                 
            </div>
            <div :class="traffic == 1?'traffic':'traffic1'">
                <div class='traffic_list'>{{result.remark}}</div>
                <div v-if="result.translate_nearby != ''" class='traffic_list'>交通：{{result.translate_nearby}}</div>
                <div v-if="result.shopping_nearby != ''" class='traffic_list'>商场：{{result.shopping_nearby}}</div>
                <div v-if="result.hospital_nearby != ''" class='traffic_list'>医院：{{result.hospital_nearby}}</div>
                <div v-if="result.rest_nearby != ''" class='traffic_list'>休闲：{{result.rest_nearby}}</div>
            </div>
                <div @click='show_all' style='color:#00B2EE;font-size:14px;font-family:PingFangLight'>{{traffic_word}}</div>
        </div>
        <!-- 房东联系方式 -->
        <div class='landlord'>

        </div>
        <div class='bottom'><div class='bottom_left' @click='set_like'><van-icon v-if="like == 0" name='like-o' size='34px'/><van-icon v-if="like == 1" style='color:red;' name='like' size='34px'/></div><van-button type='danger' @click='add_appoint'>添加行程</van-button><van-button type='warning' @click='call_phone'>立即联系</van-button></div>
        <van-popup class='msg' v-model="show" :overlay="false"><van-icon name='question'/>{{msg}}</van-popup>
        <van-dialog
            v-model="appoint_area"
            show-cancel-button
            :overlay="true"
            :before-close="beforeClose"
            >
            <van-field
                v-model="name"
                label="联系人"
                placeholder="请输入联系人"
            />
            <van-field
                v-model="phone"
                label="手机号"
                placeholder="手机号"
            />
            <van-field
                v-model="appoint_time"
                label="预约日期"
                placeholder="选择日期"
                :readonly='true'
                @click='show_time'
            />
            <van-datetime-picker
            v-show="time_show"
            v-model="currentDate"
            type="date"
            :min-date="minDate"
            @cancel="onCancel"
            @confirm="onConfirm"
            />
        </van-dialog>
    <bottom></bottom>        
    </div>
</template>

<script>
import { Swipe,SwipeItem,ImagePreview,Row,Col,TabbarItem,Field,Icon,NavBar,Button,Popup,DatetimePicker } from 'vant';
import Bottom from '../../components/Bottom.vue';
import Child from '../../components/Keyword.vue';
import Meau from '../../components/Meau.vue'
import { get_house_detail,set_house_like,set_appoint,save_history } from '@/api/house.js';
import { TMap } from '../../TMap.js';
import { formatDate } from '../../utils/date.js';
import store from '@/store'
export default {
    data(){
        return{
            id: this.$route.params.id,
            current: 0,
            images:[],
            current: 0,
            pic_length: 0,
            result:[],
            markers:[],
            icon_dress:[
                require('../../img/zhuozi.png')
            ],
            like: 0,
            show:false,
            msg: '',
            appoint_area: false,
            name: '',
            phone: '',
            appoint_time: '',
            time_show:false,
            currentDate: new Date(),
            minDate:new Date(),
            traffic: 1,
            traffic_word: '展开',
            type_word: this.$route.params.type == 1?'/月':'万元'
        }
    },
    components: {
        Bottom,
        Child,
        Meau,
        [Swipe.name]:Swipe,
        [SwipeItem.name]:SwipeItem,
        [Row.name]:Row,
        [Col.name]:Col,
        [TabbarItem.name]:TabbarItem,
        [Field.name]:Field,
        [Icon.name]:Icon,
        [NavBar.name]:NavBar,
        [Button.name]:Button,
        [Popup.name]:Popup,
        [DatetimePicker.name]:DatetimePicker
    },
    created(){
        this.fetchData()
    },
    mounted() {
        
    },
    methods:{
        fetchData(){
            TMap('TEFBZ-LI5KD-AEE4S-HLTQ3-74SJ7-UJB6G').then(qq => {
            var map = new qq.maps.Map(document.getElementById("container"), {
                // 地图的中心地理坐标。
                center: new qq.maps.LatLng(39.916527, 116.397128),
                 zoom: 8,
                 disableDefaultUI: true,
                 zoomControl: true, 
            });
            var that = this
            //调用Poi检索类
            var searchService = new qq.maps.SearchService({
                //检索成功的回调函数
                complete: function(results) {
                    //设置回调函数参数
                    var pois = results.detail.pois;
                    var infoWin = new qq.maps.InfoWindow({
                        map: map
                    });
                    var latlngBounds = new qq.maps.LatLngBounds();
                    for (var i = 0, l = pois.length; i < l; i++) {
                        var poi = pois[i];
                        //扩展边界范围，用来包含搜索到的Poi点
                        latlngBounds.extend(poi.latLng);
        
                        (function(n) {
                            var marker = new qq.maps.Marker({
                                map: map
                            });
                            marker.setPosition(pois[n].latLng);
        
                            marker.setTitle(i + 1);
                            that.markers.push(marker);
                        })(i);
                    }
                //调整地图视野
                    map.fitBounds(latlngBounds);
                    },
                    //若服务请求失败，则运行以下函数
                    error: function() {
                        alert("出错了。");
                    }
            });
            var param = Object()
            param.id = this.$route.params.id
            if(store.getters.token != undefined && store.getters.id != ''){
                param.user_id = store.getters.id
                save_history(param).then(res=>{

                })
            }
            get_house_detail(param).then(res => {
                this.result = res
                this.images = res.pic
                this.like = res.like
                this.pic_length = res.pic.pic_length
                searchService.setPageIndex(1);
                //设置每页的结果数
                searchService.setPageCapacity(1);
                searchService.setLocation('上海');
                searchService.search(res.district + res.address);
            })
            document.body.scrollTop = 0
            document.documentElement.scrollTop = 0
        });
        },
        onClickLeft(){
            if(this.$route.params.type == 2){
                this.$router.push({name:'secondary',params: { id: 2}})
            }else{
                this.$router.push({name:'list',params: { id: 1}})
            }
        },
        onChange(index) {
            this.current = index;
        },
        show_pic(index){
            ImagePreview({
                images: this.images,
                startPosition: index,
                onClose() {
                    // do something
                }
            });
        },
        set_like(){
            var that = this
            var param = Object()
            param.id = this.$route.params.id
            if(store.getters.token != undefined && store.getters.id != ''){
                param.user_id = store.getters.id
                set_house_like(param).then(res => {
                if(res.code == '2000'){
                    this.like = res.data
                }
                })
            }else{
                this.msg = '请先登录'
                this.show = true
                setTimeout(function () {
                    that.show = false
                }, 1500)
            }
        },
        add_appoint(){
            if(store.getters.token != undefined && store.getters.id != ''){
                this.appoint_area = true
            }else{
                this.msg = '请先登录'
                this.show = true
                setTimeout(function () {
                    that.show = false
                }, 1500)
            }
        },
        beforeClose(action, done) {
            var that = this
            if (action === 'confirm') {
                if(this.name == '' || this.phone == '' || this.appoint_time == ''){
                this.msg = '填写完整'
                this.show = true
                setTimeout(function () {
                    that.show = false
                    done()
                    that.appoint_area = true
                }, 1500)                    
                }else{
                    var param = Object()
                    param.user_id = store.getters.id,
                    param.house_id = this.$route.params.id
                    param.name = this.name
                    param.phone = this.phone
                    param.appoint_time = this.appoint_time
                    set_appoint(param).then(res=>{
                        this.msg = res.data
                        this.show = true
                        setTimeout(function () {
                            that.show = false
                            done()
                        }, 1500)
                    })
                }
            } else {
                done();
            }
        },
        call_phone(){

        },
        show_time(){
            this.time_show = true
        },
        onConfirm(value){
            this.appoint_time = formatDate(value, 'yyyy-MM-dd');
            this.time_show = false
        },
        onCancel(){
            this.time_show = false
        },
        show_all(){
            if(this.traffic == 0){
                this.traffic = 1
                this.traffic_word = '展开'
            }else{
                this.traffic = 0
                this.traffic_word = '关闭'
            }
        }
    }
}
</script>

<style scoped>
.page{
    width:100%;
    height:auto;
    padding-bottom:150px;
}
.swipe{
    width:100%;
    height:260px;
}
.lazy_img{
    width:100%;
    height:100%;
}
#container{
    width:100%;
    height:200px;
    top:-7%;
}
.title{
    width:85%;
    height:60px;
    font-family: PingFangMedium;
    font-size:20px;
    margin:0 auto;
    line-height:60px;
}
.house_area{
    width:90%;
    height:auto;
    padding-bottom:20px;
    margin:0 auto;
}
.house_title{
    width:100%;
    height:70px;
    padding-top:20px;
    padding-bottom:20px;
    font-size:18px;
    font-family: PingFangBold;
}
.house_msg{
    height:40px;
}
.msg_top{
    width:100%;
    height:20px;
    text-align: center;
    font-family: PingFangLight;
    font-size:13px;
}
.msg_content{
    width:100%;
    height:20px;
    text-align: center;
    font-family: PingFangMedium;
    color:#EA8608;
}
.msg_middle{
    border-left: 1px solid #c2c2c2;
    border-right: 1px solid #c2c2c2;
}
.house_announce{
    width:100%;
    height:200px;
}
.key_word{
    width:100%;
    height:50px;
    margin-top:30px;
    overflow: hidden;
}
.house_announce_detail{
    width:100%;
    height:150px;
}
.house_announce_detail .list{
    height:40px;
}
.house_more{
    width:90%;
    margin:0 auto;
}
.facilities{
    height:140px;
}
.list{
    height:70px;
}
.van-tabbar-item{
    height:70px;
    font-size:14px;
}
.van-tabbar-item img{
    width:40px;
    height:40px;
}
.traffic{
    margin-top:20px;
    width:100%;
    height:80px;
    overflow: hidden;
    font-size: 14px;
    font-family: PingFangLight;
}
.traffic1{
    margin-top:20px;
    width:100%;
    height:auto;
    font-size: 14px;
    font-family: PingFangLight;
}
.bottom{
    width:100%;
    height:50px;
    position:fixed;
    bottom:50px;
    box-shadow: -8px 0px 9px 0px rgba(119,118,118,0.33);
    background-color: #FFFFFF;
}
.van-button{
    width:40%;
    height:50px;
}
.bottom_left{
    width:20%;
    height:45px;
    float:left;
    padding-top:5px;
    text-align: center;
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
.msg .van-icon{
    vertical-align: middle;
    padding-right:5px;
}
.traffic_list{
    margin-bottom: 20px;
}
</style>


