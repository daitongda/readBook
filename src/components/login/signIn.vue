<template>
    <div class="signIn" >
        <el-input placeholder="请输入账号" v-model="id" aoto-complete="on" class="count" :autofocus="true">
            <template slot="prepend"></template>
        </el-input>
        <el-input  placeholder="请输入密码" v-model="passWord" type="password">
            <template slot="prepend"></template>
        </el-input>
        <span class="messageTip"></span>
        <el-button type="primary" native-type="submit" @click="handleSubmit">登陆</el-button>
    </div>
</template>
<script>
    export default {
        name:'signIn',
        data(){
            return {
                id:'',
                passWord:''
            }
        },
        methods:{
            handleSubmit(){
                this.$store.dispatch('checkUserStateCookie',{
                    name:'users',
                    data:{
                        id:this.id,
                        passWord:this.passWord,
                        lastLogin:true
                    }
                }).then(res=>{
                    if(res){
                        this.$message({
                            type:'success',
                            message:'登陆成功,欢迎回来',
                            duration:1000
                        });
                        this.$store.dispatch('getCookie','users').then(res=>{
                            this.$store.commit('updateCurrentUser',res);
                        });
                        this.$router.replace({name:'bookRack'});
                    }else{
                        this.$message({
                            type:'error',
                            message:'账号或密码错误，请再次输入',
                            duration:1000
                        })
                    }
                })
            }
        }
    }
</script>
<style scoped="">
    .el-input{
        margin-bottom:20px;
    }
    .messageTip{
        height:0;
    }
</style>
