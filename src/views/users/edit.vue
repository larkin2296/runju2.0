<template>
    <div class='page'>
        <van-nav-bar
        title="我的个人信息"
        left-text="返回"
        right-text=""
        left-arrow
        @click-left="onClickLeft"
        />
        <van-cell-group v-if='show == 0'>
            <div class='list_portrait'>
                <div class='list_left'>头像</div>
                <div class='list_right'>
                    <van-uploader :after-read="onRead" accept="image/*" multiple>
                        <img class="head-img" :src="portrait" ref="goodsImg"/>
                    </van-uploader>
                </div>
            </div>
            <van-field input-align="right" v-model="username" label="昵称"  readonly @click='set_username'/>
            <van-field input-align="right" v-model="phone" label="手机号" readonly />
            <van-field input-align="right" label="密码" placeholder="设置密码" @click='set_password'/>
        </van-cell-group>
        <div class='set_username' v-if='show == 1'>
            <van-field label="昵称" placeholder="输入昵称" v-model='new_name'/>
            <van-button class='sure' @click='send_newname'>确认</van-button>
        </div>
        <div class='set_userpsd' v-if='show == 2'>
            <van-field label="旧密码" type='password' placeholder="输入旧密码" v-model='old_psd'/>
            <van-field label="新密码" type='password' placeholder="输入新密码" v-model='new_psd'/>
            <van-button class='sure' @click='send_newpsd'>确认</van-button>
        </div>
        <bottom></bottom>
    </div>
</template>

<script>
import { NavBar, CellGroup, Field,Button,Uploader} from 'vant'
import { set_newname,set_newpsd } from '@/api/user.js'
import { upload_pic } from '@/api/upload.js'
import Bottom from '../../components/Bottom.vue'
import store from '@/store'
export default {
    data(){
        return{
            Aventer:'',
            username: '',
            phone:'',
            show: 0,
            new_name:'',
            old_psd:'',
            new_psd: '',
            portrait: ''
        }
    },
    components:{
        Bottom,
        [NavBar.name]:NavBar,
        [CellGroup.name]:CellGroup,
        [Field.name]:Field,
        [Button.name]:Button,
        [Uploader.name]:Uploader
    },
    created(){
        this.fetchData()
    },
    methods:{
        fetchData(){
            var that = this
            this.$store.dispatch('GetInfo').then(res => {
                console.log(res)
                that.username = res.data.name
                that.phone = res.data.phone
                that.portrait = res.data.portrait == '' ? require('../../img/head_default.png'): res.data.portrait
            }).catch(() => {

            })
        },
        onClickLeft(){
            if(this.show == 0){
                this.$router.push({path: '/user'})
            }else if(this.show == 1 || this.show == 2){
                this.show = 0
            }
        },
        set_username(){
            this.show = 1
        },
        send_newname(){
            var param = Object()
            param.id = store.getters.id
            param.username = this.new_name
            set_newname(param).then(res=>{
                this.show = 0
                this.fetchData()
            })
        },
        set_password(){
            this.show = 2
        },
        send_newpsd(){
            var param = Object()
            param.id = store.getters.id
            param.password = this.old_psd
            param.new_psd = this.new_psd
            set_newpsd(param).then(res=>{
                this.show = 0
            })            
        },
        onRead(file) {
            var param = Object()
            param.file = file.content
            upload_pic(param).then(res=>{

            })
            console.log(file);
            //将原图片显示为选择的图片
            this.portrait = file.content;
        }
    }
}
</script>

<style scoped>
.page{
    width:100%;
    height:100%;
    background-color: rgb(245,245,245);
}
.sure{
    width:90%;
    height:55px;
    margin:10px auto;
    display: block;
    color:#ffffff;
    background-color: rgb(84,112,224);
    font-family: PingFangLight;
    font-size:22px;
    letter-spacing: 5px;
}
.van-cell-group{
    margin-top:20px;
    background-color: #ffffff;
}
.set_username,.set_userpsd{
    margin-top:20px;
}
.list_portrait{
    width:100%;
    height:40px;
}
.list_left{
    width: 25%;
    height: 40px;
    margin-left: 4%;
    line-height: 40px;
    color: #333;
    font-size: 14px;
    float:left;
}
.list_right{
    width: 11%;
    height: 40px;
    margin-right: 4%;
    float:right;
    border-radius: 10px;
}
.van-uploader{
    width:100%;
    height:100%;    
}
.van-uploader img{
    width:100%;
    height:100%;
}
</style>
