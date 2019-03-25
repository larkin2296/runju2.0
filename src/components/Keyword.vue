<template>
        <div class='keyword'>{{message}}</div>
</template>
<script>
export default {
    props: {
    message: '' //这样可以指定传入的类型，如果类型不对，会警告
    },
    data(){
        return{

        }
    }
}
</script>

<style scoped>
.keyword{
    width:60px;
    height:20px;
    background-color: #00B2EE;
    line-height: 20px;
    font-family: PingFangLight;
    font-size: 12px;
    color:#ffffff;
    float:left;
    margin-right:5px;
    text-align: center;
    opacity: 0.6;
    border-radius: 5px;
}
</style>


