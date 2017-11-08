<template>
    <div id="header">
        <span id="headerTip">{{title}}</span>
        <el-dropdown trigger="click">
            <span class="el-dropdown-link">
            {{obj.id}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="exit">退出</el-dropdown-item>
            </el-dropdown-menu>
            <span class="user-bg"></span>
        </el-dropdown>
    </div>
</template>
<script >
    export default{
        name:'header',
        data(){
            return {
                obj:''
            }
        },
        computed:{
            title(){
                var str='我的书架';
                if(this.$route.path.includes('recommend')){
                    str='排行版';
                }
                if(this.$route.path.includes('randomrecommend')){
                    str='随机推荐';
                }
                return str;
            }
        },
        methods:{
            //退出当前用户
            exit(){
                this.$store.dispatch('checkUserStateCookie',{
                    name:'users',
                    data:{
                        id:this.obj.id,
                        passWord:this.obj.passWord,
                        lastLogin:false
                    }
                }).then(res=>{
                    this.$router.push('/login');
                });
            }
        },
        created(){
            this.obj=this.$store.getters.currentUser[0];
        }
    }
</script>
<style scoped>
    #header{
        width:100%;
    }
    #headerTip{
        /*width:60%;*/
        display: block;
        float: left;
        line-height:60px;
        font-size:20px;
    }
    .el-dropdown{
        float: right;
        margin-top:20px;
        margin-right:30px;
    }
    .el-dropdown-link{
        cursor: pointer;
    }
    .user-bg{
        background: url("../../assets/home/user_bg.png");
        -webkit-background-size: 40px 40px;
        background-size: 40px 40px;
        width:40px;
        height:40px;
        display: block;
        float: right;
        margin-top:-10px;
        margin-left: 8px;
    }

</style>
