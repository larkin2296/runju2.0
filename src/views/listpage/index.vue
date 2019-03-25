<template>
    <div class='page'>
        <van-nav-bar
        title="房屋列表"
        left-text="返回"
        right-text=""
        left-arrow
        @click-left="onClickLeft"
        />
        <!-- banner图片 -->
        <div class='banner_pic'>
            <img src='../../img/Ban_kxaj.jpg' />
        </div>
        <!-- 搜索框 -->
        <van-search class='search' style='background-color:rgb(234, 134, 8,0.2);'
        v-model="search"
        placeholder="请输入搜索关键词"
        show-action
        @search="onSearch"
        >
        <div slot="action" @click="onSearch">搜索</div>
        </van-search>
        <!-- 筛选 -->
        <van-row class='chose_area' type="flex">
        <van-col span="6" ><div @click='show_area'>{{area_data}}</div></van-col>
        <van-col span="6" ><div @click='show_huxing'>{{huxing_data}}</div></van-col>
        <van-col span="6" ><div @click='show_price'>{{price_data}}</div></van-col>
        <van-col span="6"><div @click='show_choose'>{{choose_more}}</div></van-col>
        </van-row>
        <van-picker v-show='picker' show-toolbar
        title=""
        :columns="columns"
        @cancel="onCancel"
        @confirm="onConfirm" @change="onChange" />
        <!-- 列表 -->
        <van-list  class='house_list' v-model="loading" :finished="finished" :offset='400' @load="onLoad">
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
        </van-list>
        <bottom></bottom>
    </div>
</template>

<script>
import { NavBar,List,Cell,Row, Col,Search,NoticeBar,Picker } from 'vant';
import { search_house , get_choose_data } from '@/api/house.js'
import Bottom from '../../components/Bottom.vue'
import Child from '../../components/Keyword.vue'
export default {
    data() {
        return{
            id: this.$route.params.id,
            list: [],
            loading: false,
            finished: false,
            type: 0,
            columns: [],
            area: {},
            huxing: {},
            price: {},
            picker:false,
            search: '',
            area_data: '区域',
            huxing_data: '户型',
            price_data: '价格',
            choose: 0,
            choose_more: '更多',
            keyword: {}
        }
    },
    components: {
        Bottom,
        Child,
        [NavBar.name]:NavBar,
        [List.name]:List,
        [Cell.name]:Cell,
        [Row.name]:Row,
        [Col.name]:Col,
        [Search.name]:Search,
        [NoticeBar.name]: NoticeBar,
        [Picker.name]:Picker
    },
    created() {
        this.fetchData()
    },
    methods:{
        fetchData(){
            if(this.$route.params.search != ''){
                this.search = this.$route.params.search
            }
            get_choose_data().then(res=>{
                this.area = res.area
                this.huxing = res.huxing
                this.price = res.price
                this.keyword = res.keyword
            })
        },
        onClickLeft(){
            this.$router.push({path: '/'})
        },
        onChange(picker, values) {
            //console.log(this.citys[values[0]][values[1]]);
            // console.log(this.citys['地铁']['2号线'])
            var data = this.area[values[0]][values[1]]
            if(this.area[values[0]][values[1]] == undefined){
                var arr = Object.keys(this.area[values[0]])
                data = this.area[values[0]][arr[0]]
            }
            // console.log(arr[0])
            picker.setColumnValues(1, Object.keys(this.area[values[0]]));
            picker.setColumnValues(2, data);
        },
        onLoad() {
            // 异步更新数据
            setTimeout(() => {
                var param = Object()
                if(this.search != ''){
                    param.title = this.search
                }
                if(this.area_data != '区域'){
                    param.area = this.area_data
                }
                if(this.huxing_data != '户型'){
                    param.huxing = this.huxing_data
                }
                if(this.price_data != '价格'){
                    param.price = this.price_data
                }
                if(this.choose_more != '更多'){
                    param.keyword = this.choose_more
                }
                param.num = ((this.list.length - 1) < 0 ? 0 : (this.list.length))
                param.rent_type = this.$route.params.id
                this.type = this.$route.params.id
                var that = this
                search_house(param).then(res => {
                    res.data.forEach(function (c) {
                        that.list.push(c);
                    })
                    this.loading = false
                    if(res.code == 'none'){
                        this.finished = true
                    }
                })
            }, 500);
//             var area = {
//   '地铁': {'1号线':['人民广场','上海火车站'], '2号线':['陆家嘴','东昌路']},
//   '地区': {'黄浦':['南京东路','周家嘴'], '浦东':['世纪大道','张江']}
// }
                // 加载状态结束
                

                // 数据全部加载完成
                
        },
        goDetail(id){
            this.$router.push({name:'detail',params: { id: id,type: 1 }})
        },
        show_area(){
            this.choose = 0
            this.picker = true
            var first = new Array()
            first = Object.keys(this.area)
            var sec = new Array()
            sec = Object.keys(this.area[first[0]])
            this.columns = [{
                values: Object.keys(this.area),
                className: 'column1'
                },
                {
                values: Object.keys(this.area[first[0]]),
                className: 'column2',
                defaultIndex: 0
                },
                {
                values: this.area[first[0]][sec[0]],
                className: 'column3',
                defaultIndex: 0
                },
            ] 
        },
        onSearch(){
            this.list = []
            this.loading = true
            this.onLoad()          
        },
        show_huxing(){
            this.choose = 1
            this.picker = true
            var huxing = this.huxing
            this.columns = [{
                values: huxing,
                className: 'column1'
                },
            ] 
        },
        show_price(){
            this.choose = 2
            this.picker = true
            var price = this.price
            this.columns = [{
                values: price,
                className: 'column1'
                },
            ] 
        },
        show_choose(){
            this.choose = 3
            this.picker = true
            var keyword = this.keyword
            this.columns = [{
                values: keyword,
                className: 'column1'
                },
            ] 
        },
        onConfirm(value, index) {
            switch(this.choose){
                case 0:
                    this.area_data = value[1] == '不限' ? '区域' : (value[2] == '不限' ? value[1] : value[2])
                    break;
                case 1:
                    this.huxing_data = `${value}` == '不限' ? '户型' : `${value}`
                    break;
                case 2:
                    this.price_data = `${value}` == '不限' ? '价格' : `${value}`
                case 3:
                    this.choose_more = `${value}` == '不限' ? '更多' : `${value}`
            }
            this.list = []
            this.loading = true
            this.onLoad()
            this.picker = false
        },
        onCancel() {
            this.picker = false
        },
        set_colums(data){

        }
    },
}
</script>

<style scoped>
.page{
    background-color: rgb(242,242,242);
}
.banner_pic{
    width:100%;
    height:150px;
    background-color: red;
}
.banner_pic img{
    width:100%;
    height:100%;
}
.search{
    width:100%;
    height:50px;
}
.chose_area{
    width:100%;
    height:30px;
    line-height:30px;
    font-family: PingFangLight;
    font-size:12px;
    text-align: center;
    margin-bottom:5px;
    background-color: #ffffff;
}
.chose_area div{
    overflow: hidden;
}
.house_list{
    width:100%;
    padding-bottom:50px;
}
.house{
    width:100%;
    height:135px;
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
.van-picker{
    position: fixed;
    z-index: 999;
    width: 100%;
    height: 300px;
    bottom: 48px;
}
</style>

