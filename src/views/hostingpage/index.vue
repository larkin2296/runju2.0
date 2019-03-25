<template>
    <div id='page'>
        <van-nav-bar
        title="房屋托管"
        left-text="返回"
        right-text=""
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
        />
        <van-popup class='msg' v-model="show" :overlay="false"><van-icon name='question'/>{{msg}}</van-popup>
        <div class='banner'>
            <img src='../../img/tuoguan.png' />
        </div>
        <van-cell-group class='list'>
        <van-field
            v-model="community"
            clearable
            label="小区名称"
            placeholder="请输入小区名称"
        />
        <van-field
            v-model="type"
            clearable
            label="出售方式"
            placeholder="请选择房屋销售方式"
            readonly
            @click='show_chose'
        />
        <van-field
            v-model="address"
            label="具体地址"
            placeholder="请输入详细地址"
            clearable
        />
        <van-field
            v-model="hope_price"
            label="期望售价"
            placeholder="请输入希望售价"
            clearable
        />
        <van-field
            v-model="call_name"
            label="称呼"
            placeholder="如何称呼"
            clearable
        />
        <van-field
            v-model="phone"
            label="联系方式"
            placeholder="请输入联系电话"
            clearable
        />
        <div class='img'><img src='../../img/show_1.png' /></div>
        </van-cell-group>
        <van-picker show-toolbar class='chose'
        title="选择方式"
        @cancel="onCancel"
        @confirm="onConfirm"
        :columns="columns" :style="{'display':status == 0 ? 'none':'block'}"/>
        <van-button class='button' @click='send_hosting'>确认发布</van-button>
        <bottom></bottom>
    </div>
</template>

<script>
import { NavBar,Field,RadioGroup, Radio,Cell,CellGroup,Picker,Button,Dialog,Popup,Icon } from 'vant';
import Bottom from '../../components/Bottom.vue'
import { set_hosting } from '@/api/hosting.js'
export default {
    data(){
        return{
            status: 0,
            columns: ['出租', '出售'],
            type: '',
            community: '',
            address:'',
            hope_price: '',
            call_name:'',
            phone:'',
            show:false,
            msg: ''
        }
    },
    components: {
        Bottom,
        [NavBar.name]:NavBar,
        [Field.name]:Field,
        [RadioGroup.name]:RadioGroup,
        [Radio.name]:Radio,
        [Cell.name]:Cell,
        [CellGroup.name]:CellGroup,
        [Picker.name]:Picker,
        [Button.name]:Button,
        [Dialog.name]:Dialog,
        [Popup.name]:Popup,
        [Icon.name]:Icon
    },
    methods: {
        onClickLeft(){
            this.$router.push({path: '/'})
        },
        onConfirm(picker, value, index) {
            this.type = picker;
            this.status = 0
            Toast(`当前值：${value}, 当前索引：${index}`);
        },
        onCancel(){
            this.status = 0
        },
        show_chose(){
            this.status = 1
        },
        send_hosting(){
            if(this.community == ''){
                this.msg = '请填写小区名称'
                this.show = true
                setTimeout(function () {
                    that.show = false
                }, 1500)
            }else if(this.address == ''){
                this.msg = '请填写具体地址'
                this.show = true
                setTimeout(function () {
                    that.show = false
                }, 1500)
            }else if(this.hope_price == ''){
                this.msg = '请填写期望价格'
                this.show = true
                setTimeout(function () {
                    that.show = false
                }, 1500)
            }else if(this.call_name == ''){
                this.msg = '请填写联系人姓名'
                this.show = true
                setTimeout(function () {
                    that.show = false
                }, 1500)
            }else if(this.phone == ''){
                this.msg = '请填写联系方式'
                this.show = true
                setTimeout(function () {
                    that.show = false
                }, 1500)
            }else{
                Dialog.confirm({
                title: '',
                message: '确定发布托管信息？'
                }).then(() => {
                    var that = this
                    var param = Object()
                    param.community = this.community
                    param.address = this.address
                    param.phone = this.phone
                    param.type = this.type == '出租' ? 1 : 0
                    param.call_name = this.call_name
                    param.hope_price = this.hope_price
                    set_hosting(param).then(res=>{
                        this.msg = res.msg
                        this.show = true
                        this.community = ''
                        this.address = ''
                        this.phone = ''
                        this.call_name = ''
                        this.hope_price = ''
                        setTimeout(function () {
                            that.show = false
                        }, 1500)
                    })
                }).catch(() => {
                // on cancel
                });                
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
.banner{
    width:100%;
    height:width*0.4;
}
.banner img{
    width:100%;
    height:100%;
}
.list{
    width:100%;
    height:80%;
    padding-top:20px;
    
    box-shadow: 0px 5px 32px 0px rgba(119,118,118,0.33);
    font-family: PingFangMedium;
}
.button{
    width:100%;
    height:50px;
    background-color: rgb(234, 134, 8,0.5);
    color:#ffffff;
    letter-spacing: 5px;
    font-family: PingFangBold;
    font-size:18px;
    position:fixed;
    bottom:8%;
}
.list .img{
    width:100%;
    max-width:337px;
    height:11%;
    margin:0 auto;
    margin-top:40px;
}
.img img{
    width:100%;
    height:100%;
}
.chose{
    width:100%;
    height:200px;
    position:fixed;
    bottom:14%;
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