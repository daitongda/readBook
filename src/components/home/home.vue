<template>
    <div id="home">
        <el-container >
            <el-row>
                <el-col :span="3">
                    <el-container >
                        <el-aside >
                            <l-aside></l-aside>
                        </el-aside>
                    </el-container>
                </el-col>
                <el-col :span="21">
                    <el-container >
                        <el-header>
                            <tHeader></tHeader>
                        </el-header>
                        <el-main>
                            <router-view></router-view>
                        </el-main>
                    </el-container>
                </el-col>
            </el-row>
        </el-container>
    </div>
</template>

<script>
    //侧边栏组件
    import asideComponent from'./aside.vue';
    import headerComponent from './header.vue';
    export default{
        name:'home',
        computed:{
        },
        components:{
            lAside:asideComponent,
            tHeader:headerComponent
        }
    }
</script>

<style>
    #app{
        position: absolute;
        left:0;
        top:0;
        right:0;
        bottom:0;
    }
    #home{
        height:100%;
    }
    .el-container{
        height:100% !important;
    }
    .el-row{
        width:100%;
        height:100%;
    }
    .el-col{
        height:100%;
    }
    .el-header{
        border-bottom:1px solid #e2e2e2;
        width:100%;
    }


</style>
