<template>
    <div id='page'>
        <van-nav-bar
        title="地图找房"
        left-text="返回"
        right-text=""
        left-arrow
        @click-left="onClickLeft"
        />
        <van-popup class='msg' v-model="show" :overlay="false"><van-icon name='question'/>{{msg}}</van-popup>
        <van-search
        v-model="value"
        placeholder="请输入搜索小区名或地铁站名"
        show-action
        @search="onSearch"
        >
        <div slot="action" @click="onSearch">搜索</div>
        </van-search>
        <van-loading v-if='show_loading == 0' color="white" />
        <div v-if='show_loading == 1' id='container'>

        </div>
        <van-popup v-model="show1" position="bottom" :overlay="true" :close-on-click-overlay="true">
        <div v-for="(item,index) in list" :key="index" class='house' @click="goDetail(item.id)">
            <div class='house_detail'>
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
            </div>
        </div>
        </van-popup>
    </div>
</template>

<script>
import { TMap } from '../../TMap.js';
import { search_map_house,get_house_search } from '@/api/house.js'
import { NavBar,Search,Loading,Popup,NoticeBar,Icon } from 'vant'
import Child from '../../components/Keyword.vue'
export default {
    data(){
        return{
            markers: [],
            value: '',
            top_left: [],
            top_right: [],
            bottom_left: [],
            bottom_right: [],
            region: [],
            show_loading: 1,
            list: [],
            show:false,
            show1:false,
            msg: ''
        }
    },
    created(){
        this.fetchData('')
    },
    components:{
        Child,
        [NavBar.name]:NavBar,
        [Search.name]:Search,
        [Loading.name]:Loading,
        [Popup.name]:Popup,
        [NoticeBar.name]:NoticeBar,
        [Icon.name]:Icon
    },
    methods:{
        onClickLeft(){
            this.$router.push({path: '/'})
        },
        onSearch(){
            this.show_loading = 0
            var that = this
            var param = Object()
            param.search = this.value
            this.get_search_area(this.value).then(val=>{
                search_map_house(param).then(res=>{
                if(res.code == '2000'){
                    var i = 0
                    this.markers = []
                    var interval = setInterval(function(){
                        that._Tmap(res.data[i][0],res.data[i][1],that.region)
                        i++
                        if(i == res.data.length){
                            clearInterval(interval)
                            that.show_loading = 1
                        }
                    },500)
                    //that._Tmap('浦东新区乳山四村')
                }else if(res.code == '3000'){
                    this.msg = '没有搜索到结果'
                    this.show = true
                    setTimeout(function () {
                        that.show = false
                    }, 1500) 
                    this.show_loading = 1
                    this.fetchData('')   
                }
                })
            })
        },
        fetchData(data){
            this._Tmap(data)
        },
        get_search_area(data){
            var that = this
            TMap('TEFBZ-LI5KD-AEE4S-HLTQ3-74SJ7-UJB6G').then(qq => {
                //调用Poi检索类
                var searchService = new qq.maps.SearchService({
                    //检索成功的回调函数
                    complete: function(results) {
                        var pois = results.detail.pois;
                        var lat = pois[0].latLng.lat
                        var lng = pois[0].latLng.lng
                        var new_lat_left = Number(lat) - Number(0.02000)
                        var new_lat_right = Number(lat) + Number(0.02000)
                        var new_lng_left = Number(lng) - Number(0.020000)
                        var new_lng_right = Number(lng) + Number(0.020000)
                        that.top_left = new qq.maps.LatLng(new_lat_left,new_lng_left)
                        that.top_right = new qq.maps.LatLng(new_lat_right,new_lng_left)
                        that.bottom_left = new qq.maps.LatLng(new_lat_left,new_lng_right)
                        that.bottom_right = new qq.maps.LatLng(new_lat_right,new_lng_right)
                        that.region = new qq.maps.LatLngBounds(that.top_left,that.bottom_right);
                        },
                        //若服务请求失败，则运行以下函数
                        error: function() {
                        }
                });
                searchService.setPageIndex(1);
                    //设置每页的结果数
                searchService.setPageCapacity(1);
                searchService.setLocation('上海');
                searchService.search(data);
            });
            return Promise.resolve(that.region)
        },
        _Tmap(data1,data2,region){
            TMap('TEFBZ-LI5KD-AEE4S-HLTQ3-74SJ7-UJB6G').then(qq => {
            var map = new qq.maps.Map(document.getElementById("container"), {
                // 地图的中心地理坐标。
                center: new qq.maps.LatLng(31.23595,121.480524),
                 zoom: 11,
                 disableDefaultUI: true,
                 zoomControl: true, 
            });
            var that = this
            //调用Poi检索类
            var searchService = new qq.maps.SearchService({
                //检索成功的回调函数
                complete: function(results) {
                    console.log(results)
                    var pois = results.detail.pois;
                    var marker = new qq.maps.Label({
                        content: data2,
                    });
                    //console.log(pois[0].latLng)
                    marker.setPosition(pois[0].latLng);
                    that.markers.push(marker);
                    //console.log(that.markers)
                    var latlngBounds = new qq.maps.LatLngBounds();
                    for(var i = 0, l = that.markers.length; i < l; i++){
                            var cssC={color:"#EA8608",fontSize:"12px",fontWeight:"normal"};
                            latlngBounds.extend(that.markers[i].position);
                            (function(n) {
                            var marker = new qq.maps.Label({
                                position: new qq.maps.LatLng(that.markers[i].position.lat, that.markers[i].position.lng),
                                map: map,
                                content: that.markers[i].content,
                                style:cssC
                            });
                            //marker.setStyle(cssC);
                            qq.maps.event.addListener(marker, 'click', function() {
                                var param = Object()
                                param.name = marker.content
                                get_house_search(param).then(res=>{
                                    that.show1 = true
                                    that.list = res.data
                                })
                            });
                        })(i);                      
                    }


                //     //设置回调函数参数
                //     var pois = results.detail.pois;
                //     var infoWin = new qq.maps.InfoWindow({
                //         map: map
                //     });
                //     var latlngBounds = new qq.maps.LatLngBounds();
                //     for (var i = 0, l = pois.length; i < l; i++) {
                //         var poi = pois[i];
                //         //扩展边界范围，用来包含搜索到的Poi点
                //         latlngBounds.extend(poi.latLng);
        
                //         (function(n) {
                //             var marker = new qq.maps.Marker({
                //                 map: map
                //             });
                //             marker.setPosition(pois[n].latLng);
        
                //             marker.setTitle(i + 1);
                //             that.markers.push(marker);
                //             console.log(that.markers)
        
                //             // qq.maps.event.addListener(marker, 'click', function() {
                //             //     infoWin.open();
                //             //     infoWin.setContent('<div style="width:280px;height:100px;">' + 'POI的ID为：' +
                //             //         pois[n].id + '，POI的名称为：' + pois[n].name + '，POI的地址为：' + pois[n].address + '，POI的类型为：' + pois[n].type + '</div>');
                //             //     infoWin.setPosition(pois[n].latLng);
                //             // });
                //         })(i);
                //     }
                // //调整地图视野
                     map.fitBounds(latlngBounds);
                    },
                    //若服务请求失败，则运行以下函数
                    error: function() {
                        
                    }
            });
            searchService.setPageIndex(1);
                //设置每页的结果数
            searchService.setPageCapacity(1);
            searchService.setLocation('上海');
            if(data1 != '' && data2 != ''){
                searchService.searchInBounds((data1+data2), region)
            }
        });
        },
        goDetail(id){
        this.$router.push({name:'detail',params: { id: id,type: 1 }})
        },
    }
}
</script>

<style scoped>
#page{
    width:100%;
    height:100%;
}
#container{
    width:100%;
    height:87%;
}
.van-loading{
    width: 55px;
    height: 55px;
    font-size: 0;
    line-height: 0;
    position: absolute;
    top: 50%;
    left: 40%;
    z-index: 999;
    vertical-align: middle;
    background-color: #c2c2c2;
    border-radius: 5px;
}
.house{
    width:100%;
    height:120px;
    background-color: #ffffff;
}
.house_detail{
    width:90%;
    margin:0 auto;
    height:120px;
    border-bottom: 1px solid rgb(172,172,172);
}
.swipe_left{
    width: 30%;
    height: 77%;
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
  width:63%;
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
.van-popup{
    height:auto;
    max-height:500px;
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