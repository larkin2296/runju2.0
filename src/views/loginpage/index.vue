<template>
    <div>
        <van-popup class='msg' v-model="show" :overlay="false"><van-icon name='question'/>{{msg}}</van-popup>
        <van-nav-bar
        title="登录"
        left-text="返回"
        right-text="注册"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
        />
        <van-cell-group>
        <div class='word1'>你好</div>
        <div class='word2'>欢迎使用润居，请<span style='color:rgb(234,156,79);'>登录</span></div>
        <van-field  class='center'
            v-model="account"
            center
            clearable
            placeholder="请输入手机号码"
        >
        </van-field>
        <van-field class='center' v-model='psd' type='password' center clearable placeholder='请输入密码'></van-field>
        </van-cell-group>
        <van-button class='login_button' @click='login'>登录</van-button>
        <bottom></bottom>
    </div>
</template>

<script>
import { Field,Button,NavBar,CellGroup,Popup,Icon } from 'vant';
import Bottom from '../../components/Bottom.vue'
export default {
    data(){
        return{
            account: '',
            psd: '',
            show:false,
            msg: ''
        }
    },
    components: {
        Bottom,
        [Field.name]: Field,
        [Button.name]: Button,
        [NavBar.name]:NavBar,
        [CellGroup.name]:CellGroup,
        [Popup.name]:Popup,
        [Icon.name]:Icon
    },
    methods: {
        onClickLeft: function(){
            this.$router.push({path: '/'})
        },
        onClickRight(){
            this.$router.push({path: 'register'})
        },
        login(){
            var that = this
            var param = Object()
            param.phone = this.account
            param.password = this.psd
            this.$store.dispatch('Login', param).then(res => {
                this.msg = res.msg
                this.show = true
                setTimeout(function () {
                    that.show = false
                    if(res.code == '2000'){
                    that.$router.push({path: 'user'})
                    } 
                }, 1500)
            }).catch(() => {

            })
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
