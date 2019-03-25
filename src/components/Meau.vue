<template>
    <div class='area' @click='go_page'>
        <img :src='url' />
        <div class='title'>{{message}}</div>
    </div>
</template>
<script>
export default {
    props: {
    message: '', //这样可以指定传入的类型，如果类型不对，会警告,
    url:''
    },
    data(){
        return{

        }
    },
    methods:{
        go_page(){
            switch(this.message){
                case '预约管理':
                this.$router.push({name:'appoint'})
                break;
                case '报修服务':
                this.$router.push({name:'maintenance',params: { id: 0}})
                break;
                case '支付房租':
                break;
                case '收藏':
                this.$router.push({name:'collect'})
                break;
                case '浏览记录':
                this.$router.push({name:'history'})
                break;
            }
        }
    }
}
</script>

<style scoped>
.area{
    width:84px;
    height:70px;
    text-align: center;
}
.area img{
    width:50px;
    height:50px;
}
.title{
    font-size: 12px;
    margin-top:-20px;
    font-family: PingFangLight;
}
</style>