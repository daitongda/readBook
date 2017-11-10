<template>
    <div class="book-header clearfix">
            <el-row>
                <el-col :span="3">
                    <div class="book-img-box">
                        <img :src="'http://statics.zhuishushenqi.com'+dataHeader.cover"  alt="">
                    </div>
                </el-col>
                <el-col :span="21">
                    <div class="book-top-info clearfix">
                        <div class="book-left-info">
                            <h4 class="title">{{dataHeader.title}}</h4>
                            <p class="author">作者:{{dataHeader.author}}</p>
                            <p class="last-update">最后更新 :  {{updated}}</p>
                        </div>
                        <div class="book-right-btn">
                            <el-button type="primary" @click.native="toBottom">直达底部</el-button>
                            <!--<el-button type="danger" :disabled="disabledBtn">加入黑名单</el-button>-->
                        </div>
                    </div>
                    <div class="book-bottom-info">
                        {{dataHeader.longIntro}}
                    </div>
                </el-col>
            </el-row>


        <el-row>
            <el-col :span="24">
                <div class="bookRecommend">
                    <span>相关推荐:</span>
                    <router-link v-for="item in bookRecommendList" :to="item['_id']" @click.native="reloadRouter">{{item.title}}</router-link>
                </div>
            </el-col>
        </el-row>

    </div>
</template>
<script>
    export default {
        name:'bookHeader',
        props:['clickMethods'],
        computed:{
            //头部信息
            dataHeader(){
                return this.$store.state.currentBookDetails;
            },

            bookRecommendList(){
                if(this.$store.state.currentBookRecommendList.length>0){
                    return this.$store.state.currentBookRecommendList.slice(0,10);
                }else{
                    return []
                };
            },

            updated(){
                if(this.$store.state.currentBookDetails.updated){
                    return this.$store.state.currentBookDetails.updated.slice(0,10);
                }else{
                    return '';
                };
            },

            disabledBtn(){
                var localStr=window.localStorage.getItem('bookRack');
                if(!localStr){
                    return false;
                };
                var localData=JSON.parse(localStr);
                for(var i=0;i<localData.length;i++){
                    if(localData[i].title==this.$store.state.currentBookDetails.title){
                        return true;
                    };
                };
            }
        },
        methods:{
            reloadRouter(){
                this.clickMethods();
            },
            toBottom(){
                this.$store.dispatch('toBottom');
            }
        }
    }
</script>
<style>
    .book-header{
        /*width:1450px;*/
        width:100%;
        display: table;
    }
    .book-img-box{
        float: left;
        margin-right:20px;
    }
    .book-img-box img{
        width:100%;
        height:200px;
    }
    .book-top-info{
        width:100%;
        padding-bottom: 10px;
        border-bottom:1px dashed black;
    }
    .book-left-info{
        float: left;
    }
    .book-left-info .title{
        font-size:30px;
    }

    .book-left-info .author{
        margin:5px 0;
    }
    .book-left-info .last-update{
        margin:5px 0;
    }
    .book-right-btn{
        float: right;
        line-height:95px;
    }
    .book-top-info{
        float: left;
    }
    .book-bottom-info{
        margin-top:5px;
        float: left;
        height:84px;
        width:100%;
        vertical-align: middle;
        display: table-cell;
        overflow: hidden;
        -ms-text-overflow: ellipsis;
        text-overflow: ellipsis;
    }

    .bookRecommend{
        width:100%;
        display: block;
        clear: both;
    }
    .bookRecommend span{
        float: left;
        margin:5px 10px;
        cursor: pointer;
        margin-left:0px;
    }

    a{
        margin:5px 10px;
        float: left;
    }
</style>
