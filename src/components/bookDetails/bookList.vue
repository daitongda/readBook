<template>
    <div class="list ">
        <el-row>
            <el-col :span="24">
                <dl class="clearfix">
                    <dt>
                        <b>《{{currentBookDetails.title}}》最新章节</b>
                    </dt>
                    <dd v-for="item,index in lastBookList">
                        <span  @click="handleClick(item)">{{item.title}}</span>
                    </dd>
                    <dd class="bookMain">
                        <b>《{{currentBookDetails.title}}》正文</b>
                    </dd>
                    <dd v-for="item,index in bookList">
                        <span  @click="handleClick(item)">{{item.title}}</span>
                    </dd>
                </dl>
            </el-col>
        </el-row>

    </div>
</template>
<script>
    export default {
        name:'bookList',
        computed:{
            bookList(){
                return this.$store.state.currentBookChapterList;
            },
            lastBookList(){
                return this.$store.state.currentBookChapterList.slice(-9);
            },
            currentBookDetails(){
                return this.$store.state.currentBookDetails;
            }
        },
        methods:{
            handleClick(item){
                this.bookList.forEach((res,index)=>{
                    if(res.title==item.title){
                        this.$router.push(this.$route.path+'/'+index);
                    }
                });
                this.$store.dispatch('updateLastRead',{
                    name:'bookRack',
                    data:{
                        "_id":this.currentBookDetails["_id"],
                        lastRead:item.title
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .list{
        /*width:1446px;*/
        width:100%;
        padding:4px;
        border:2px solid #88c6e5;
    }
    dt,.bookMain{
        width:100%;
        text-align: center;
        height:40px;
        background: #c3dfea;
        color: #444444;
        line-height:40px;
        border-bottom:0;
    }
    .bookMain{
        margin-top:5px;
    }
    dd{
        width:33%;
        height:40px;
        line-height:40px;
        float: left;
        border-bottom:1px dashed #cccccc;
        overflow: hidden;
    }
    dd span{
        color: #444444;
        cursor: pointer;
    }
</style>
