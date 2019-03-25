<template>
    <div id='page'>
        <van-nav-bar
        :title="title"
        left-text="返回"
        right-text=""
        left-arrow
        @click-left="onClickLeft"
        />
        <van-popup class='msg' v-model="show" :overlay="false"><van-icon name='question'/>{{msg}}</van-popup>
         <div class='area'>
            <textarea class='text' v-model='content' placeholder="请填写你遇到的问题给我们"></textarea>
            <div class='upload'>
                <img v-for="(item,index) in img_list" :key="index" :src='item.url'/>
                <van-uploader :after-read="onRead" accept="image/*" multiple>
                    <img class="head-img" :src="portrait" ref="goodsImg"/>
                </van-uploader>
            </div>
        </div>
        <van-button class='sure' @click='send_maintenance'>确认</van-button>
    </div>
</template>
<script>
import { Uploader,Button,NavBar,Popup,Icon } from 'vant'
import { send_maintencance_data } from '@/api/upload.js'
export default {
    data(){
        return{
            img_list: [],
            portrait: require('../../img/add_pic.png'),
            type: this.$route.params.id,
            title: '',
            msg: '',
            content: ''
        }
    },
    created(){
        this.fetchData()
    },
    components:{
        [Uploader.name]:Uploader,
        [Button.name]:Button,
        [NavBar.name]:NavBar,
        [Popup.name]:Popup,
        [Icon.name]:Icon
    },
    methods:{
        fetchData(){
            if(this.$route.params.id == 0){
                this.title = '房屋维修'
            }else{
                this.title = '意见反馈'
            }
        },
        onClickLeft(){
            this.$router.push({path: '/user'})
        },
        onRead(file){
            if(this.img_list.length > 3){
                this.msg = '最多上传三张图片'
                this.show = true
                setTimeout(function () {
                    that.show = false
                }, 1500)
            }
            var param = Object()
            param.url = file.content
            this.img_list.push(param)
        },
        send_maintenance(){
            var param = Object()
            if(this.content == ''){
                this.msg = '请输入反馈问题'
                this.show = true
                setTimeout(function () {
                    that.show = false
                }, 1500)
            }else{
                param.content = this.content
                param.img_list = this.img_list
                param.type = this.type
                send_maintencance_data(param).then(res=>{
                    this.msg = '最多上传三张图片'
                    this.show = true
                    setTimeout(function () {
                        that.show = false
                    }, 1500)
                    this.img_list = []
                    this.content = ''                    
                })
            }
        }
    }
}
</script>

<style scoped>
#page{
    width:100%;
    height:100%;
    background-color: rgb(242,242,242);
}
.area{
    width:100%;
    height:300px;
    background-color: #ffffff;
}
.text{
    width:90%;
    margin-left:5%;
    height:200px;
    font-size:14px;
}
.upload{
    width:90%;
    height:100px;
    margin:0 auto;
}
.sure{
    width:90%;
    height:50px;
    margin:10px auto;
    display: block;
    color:#ffffff;
    background-color: #EA8608;
    font-family: PingFangLight;
    font-size:22px;
    letter-spacing: 5px;
}
.upload img{
    width:80px;
    height:80px;
    margin-right:10px;
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
