<template>
    <div class="aside">
        <el-menu :default-active="defaultActive" class="el-menu-vertical-demo" :collapse="collapse" background-color="#324157" text-color="#bfcbd9" active-text-color="#2d8cf0"   @select="handleSelect">
            <el-menu-item index='/home'>
                <img src="../../assets/home/bookrack.png" class="icon" alt="">
                <span slot="title">我的书架</span>
            </el-menu-item>
            <el-menu-item index='/home/recommend/male/0'>
                <img src="../../assets/home/bookrack.png" class="icon" alt="">
                <span slot="title">排行榜</span>
            </el-menu-item>


            <el-menu-item index="/home/randomrecommend">
                <img src="../../assets/home/bookrack.png" class="icon" alt="">
                <span slot="title">随机推荐</span>
            </el-menu-item>

            <el-menu-item index="/home/search">
                <img src="../../assets/home/bookrack.png" class="icon" alt="">
                <span slot="title">搜索</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>
<script>

    export default {
        name:'aside',
        computed:{
            collapse(){
                return this.$store.state.asideCollapse;
            },
            defaultActive(){
                var str='/home';
                if(this.$route.path.includes('/home/recommend')){
                    str='/home/recommend/male/0';
                }else if(this.$route.path.includes('/home/randomrecommend')){
                    str='/home/randomrecommend';
                }else if(this.$route.path.includes('/home/booktip')){
                    str='/home/booktip';
                }else if(this.$route.path.includes('/home/blacklist')){
                    str='/home/blacklist';
                }else if(this.$route.path.includes('/home/search')){
                    str='/home/search';
                };
                return str;
            }
        },
        methods:{
            handleSelect(index){
                this.$router.push(index);
            }
        }
    }
</script>
<style>
    .el-aside{
        background-color: #324157;
        /*border-right:1px solid transparent;*/
        position: relative;
        width:100%;
    }
    .icon{
        width:18px;
        height:18px;
        margin-right:5px;
        margin-left:5px;
    }
    a{
        text-decoration: none ;
        color: black;
        color: rgb(191, 203, 217);
    }
</style>
