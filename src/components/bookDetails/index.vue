<template>
    <div class="bookdetails">
        <el-row>
            <el-col :span="24">
                <book-header  :clickMethods="fetchData" ></book-header>
                <book-list></book-list>
            </el-col>
        </el-row>

    </div>
</template>
<script>
    import bookHeaderComponent from './bookHeader.vue';
    import bookListComponent from './bookList.vue';
    export default{
        name:'bookDetails',
        //在创建的时候根据动态路由去获取到相应的章节和数据
        created(){
            this.fetchData();
            this.$store.dispatch('to0');
        },
        components:{
            bookHeader:bookHeaderComponent,
            bookList:bookListComponent
        },
        methods:{
            fetchData(){
                this.$store.commit('loading');
                var id=this.$route.params.id;
                this.$store.dispatch('getBookdetails',id).then(res=>{
                    return this.$store.dispatch('getBookRecommend',id).then(res=>{
                        this.$store.commit('closeLoading');
                        return this.$store.dispatch('getBookChapter',id);

                    })
                })
            }
        }
    }
</script>
<style >
    .bookdetails .backOut{
        width:120px;
        height:45px;
        line-height:45px;
    }
</style>
