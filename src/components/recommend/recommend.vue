<template>
    <div >
        <el-tabs v-model="sex" type="card" @tab-click="handleClick">
            <el-tab-pane label="男生" name="male"></el-tab-pane>
            <el-tab-pane label="女生" name="female"></el-tab-pane>
        </el-tabs>
        <h1>全部分类</h1>
        <type-list :activeClick="activeClick" :activeName="this.$store.state.currentType" :data="this.$store.state.classify[this.$store.state.sex]"></type-list>
        <recommend-list  ></recommend-list>
        <div  class="fenye">
            <el-pagination
                layout="prev, pager, next"
                prev-text="上一页"
                next-text="下一页"
                :page-size="20"
                @current-change="changeList"
                :total="listTotal">
            </el-pagination>
        </div>

    </div>
</template>

<script>
    import bookListComponent from '../public/bookList.vue';
    import typeListComponent from './typeList.vue';
    export default {
        data(){
            var path=this.$route.path.split('/');
            return {
                sex:path[path.length-2]
            }
        },
        methods:{
            //单击改变store中的性别分类
            handleClick(obj){
                this.$store.commit('loading');
                this.$router.push('/home/recommend/'+obj.name+'/0');
                //同时要获取当前性别下适合的分类和书籍
                this.$store.dispatch('getClassify',{
                    sex:obj.name,
                    index:0
                }).then(res=>{
                    this.$store.commit('closeLoading');
                })

            },
            //点击分类列表某个时，重新加载书籍
            activeClick(item,index){
                this.$store.commit('loading');
                //先改变当前选的类
                this.$store.commit('setCurrentType',item.name);
                //发送ajax请求获取书籍
                this.$store.dispatch('getTypeList').then(res=>{
                    this.$router.push('/home/recommend/'+this.$route.params.sex+'/'+index)
                    this.$store.commit('closeLoading');
                });
            },
            changeList(index){
                this.$store.commit('loading');
                var start=(index-1)*20;
                this.$store.commit('updateCurrentPage',index);
                //发送ajax请求获取书籍
                this.$store.dispatch('getTypeList',{
                    start:start,
                    end:start+20
                }).then(res=>{
                    this.$store.commit('closeLoading');
                })
            }
        },
        components:{
            recommendList:bookListComponent,
            typeList:typeListComponent
        },
        created(){
            this.$store.commit('loading');
            //创建的时候获取到router里的信息加载，因为有可能你是在本页面的时候刷新的。
            var path=this.$route.path.split('/');
            this.$store.dispatch('getClassify',{
                sex:path[path.length-2],
                index:path[path.length-1]
            }).then(res=>{
                this.$store.dispatch('to0');
                this.$store.commit('closeLoading');
            });
        },
        computed:{
            listTotal(){
                return this.$store.state.currentBookListTotal;
            }
        }
    }
</script>
<style>
    .fenye {
        text-align: center;
        height: 40px;
        line-height:40px;
        margin-top:10px;
        font-size:20px;
    }
    .fenye .number{
        width:40px;
        height:40px;

    }
    .fenye .btn-prev span,.fenye .btn-next span{
        font-size:18px;
        height:40px;
        line-height:40px;
    }
    .fenye .number{
        font-size:18px;
        height:40px;
        line-height:40px;
        width:60px;
    }
    /*.fenye .number li{*/
        /*padding:0 20px;*/
    /*}*/
    .fenye .more{
        line-height:40px !important;
        height:40px !important;
    }
</style>
