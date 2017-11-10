<template>
    <div class="login" >
        <div class="login-box">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="注册"  name="signUp"></el-tab-pane>
                <el-tab-pane label="登陆" name="signIn" ></el-tab-pane>
            </el-tabs>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    export default{
        name:'login',
        methods:{
            handleClick($event){
                this.$router.push({name:$event.name});
            }
        },
        data(){
            return {
                acount:'',
                passWord:'',
                activeName:'signUp'
            }
        }
    }
</script>

<style>
    .login{
        width:100%;
        height:100%;
        background: red;
        position: absolute;
        left:0;
        top:0;
        right:0;
        bottom:0;
        background: url("../../assets/login/timg.jpg") no-repeat;
        -webkit-background-size: 100% 100%;
        background-size: 100% 100%;
        -webkit-backface-visibility: hidden;
        -moz-backface-visibility: hidden;
        -ms-backface-visibility: hidden;
        backface-visibility: hidden;
    }
    .login-box{
        width:350px;
        text-align: center;
        position: absolute;
        left:50%;
        top:50%;
        -webkit-transform: translateX(-50%) translateY(-50%);
        -moz-transform: translateX(-50%) translateY(-50%);
        -ms-transform: translateX(-50%) translateY(-50%);
        -o-transform: translateX(-50%) translateY(-50%);
        transform: translateX(-50%) translateY(-50%);
        background: rgba(255,255,255,.9);
        -webkit-border-radius: 8px;
        -moz-border-radius: 8px;
        border-radius: 8px;
        padding:20px;
    }


    .login .el-input-group__prepend{
        width:20px;
        -webkit-backface-visibility: hidden;
    }

    .login .el-input-group--prepend:nth-of-type(1) .el-input-group__prepend{
        background: url("../../assets/login/user.png") no-repeat center center;
        -webkit-background-size:  20px 20px;
        background-size:  20px 20px;
    }
    .login .el-input-group--prepend:nth-of-type(2) .el-input-group__prepend{
        background: url("../../assets/login/lock.png") no-repeat center center;
        -webkit-background-size:  20px 20px;
        background-size:  20px 20px;
    }
    .login .el-input-group--prepend:nth-of-type(3) .el-input-group__prepend{
        background: url("../../assets/login/email.png") no-repeat center center;
        -webkit-background-size:  20px 20px;
        background-size:  20px 20px;
    }
    .login .el-button--primary{
        width:100%;
    }

    .login .el-tabs__item{
        font-size:17px;
    }
</style>
