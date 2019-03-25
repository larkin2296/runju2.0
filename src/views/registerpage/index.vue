<template>
    <div>
        <van-popup class='msg' v-model="show" :overlay="false"><van-icon name='question'/>{{msg}}</van-popup>
        <van-nav-bar
        title="注册"
        left-text="返回"
        right-text=""
        left-arrow
        @click-left="onClickLeft"
        />
        <van-cell-group>
        <div class='word1'>你好</div>
        <div class='word2'>欢迎使用润居，请<span style='color:rgb(234,156,79);'>注册</span></div>
        <van-field  class='center'
            v-model="phone"
            center
            clearable
            :disabled="is_click"
            placeholder="请输入手机号码"
        >
            <van-button class='msg_button' slot="button" size="small" :disabled="is_click" @click='send_code'>{{button_msg}}<span v-if="button_num != 0">{{button_num}}</span></van-button>
        </van-field>
        <van-field   class='center' v-model='code' center clearable placeholder='请输入验证码'></van-field>
        <van-field   type='password' class='center' v-model='psd' center clearable placeholder='请输入密码'></van-field>
        <van-field   type='password' class='center' v-model='r_psd' center clearable placeholder='确认密码'></van-field>
        </van-cell-group>
        <van-button class='login_button' @click="register">注册</van-button>
        <bottom></bottom>
    </div>
</template>

<script>
import { Field,Button,NavBar,Popup,Icon,CellGroup } from 'vant';
import { send_code,send_register} from '@/api/login.js'
import Bottom from '../../components/Bottom.vue'
export default {
    data(){
        return{
            phone: '',
            code: '',
            psd: '',
            r_psd: '',
            show:false,
            msg: '',
            sure_code: '',
            button_msg: '发送验证码',
            button_num: 0,
            is_click: false
        }
    },
    components: {
        Bottom,
        [Field.name]: Field,
        [Button.name]: Button,
        [NavBar.name]:NavBar,
        [Popup.name]:Popup,
        [Icon.name]:Icon,
        [CellGroup.name]:CellGroup
    },
    methods: {
        onClickLeft: function(){
            this.$router.push({path: '/login'})
        },
        send_code(){
            var that = this
            if(this.phone == '' || this.phone.length != 11){
                this.msg = '请输入正确的手机号'
                this.show = true
                setTimeout(function () {
                    that.show = false
                }, 1500)
            }else{
                var param = Object()
                param.phone = this.phone
                send_code(param).then(res=>{
                    this.sure_code = res.obj
                    console.log(res.obj)
                })
                this.button_msg = '重新发送'
                this.button_num = 60
                var countdown = setInterval(function () {
                    that.is_click = true
                    that.button_num --
                    if(that.button_num == 0){
                        clearInterval(countdown)
                        that.button_msg = '发送验证码'
                        that.is_click = false
                    }
                },1000)
            }
        },
        register(){
            var that = this
            if(this.phone == '' || this.code == '' || this.psd == '' || this.r_psd == ''){
                this.msg = '请填写完整'
                this.show = true
                setTimeout(function () {
                    that.show = false
                }, 1500)
            }else if(this.code != this.sure_code){
                this.msg = '验证码错误'
                this.show = true
                setTimeout(function () {
                    that.show = false
                }, 1500)
            }else if(this.psd.length < 6){
                this.msg = '密码不可小于6位'
                this.show = true
                setTimeout(function () {
                    that.show = false
                }, 1500)
            }else if(this.psd != this.r_psd){
                this.msg = '两次密码输入不正确'
                this.show = true
                setTimeout(function () {
                    that.show = false
                }, 1500)
            }else{
                var param = Object()
                param.phone = this.phone
                param.password = this.psd
                send_register(param).then(res=>{
                    this.msg = res.msg
                    this.show = true
                    setTimeout(function () {
                        that.show = false
                    }, 1500)                    
                    if(res.code == 2000){
                        setTimeout(function () {
                            that.$router.push({path:'user'})
                        }, 2000)                      
                    }
                })
            }
        }
    }
}
</script>

<style>
html,body{
    width:100%;
    height:100%;
}
.center{
    width:90%;
    height:60px;
    margin: 0 auto;
}
.login_button{
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
.msg_button{
    background-color:rgb(84,112,224);color:#ffffff;
}
.word1{
    width: 84px;
    height: 57px;
    font-family: PingFangBold;
    font-size: 34px;
    margin-left:7%;
    margin-top:50px;
}
.word2{
    width: 300px;
    height: 37px;
    font-family: PingFangLight;
    font-size: 22px;
    margin-left:7%;
    margin-bottom:30px;  
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
