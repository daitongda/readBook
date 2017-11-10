<template>
    <ul class="recommendList">
        <li v-for="item,index in dataList" key="index" class="recommendItem clearfix">
            <el-row>
                <el-col :span="2">
                    <div class="book-img-box">
                <span class="rank-tag" :class="'no'+(index+currentPage+1)">
                    {{(index+currentPage+1)}}
                    <cite v-if="index<3"></cite>
                </span>
                        <img :src="'http://statics.zhuishushenqi.com'+item.cover" alt="">
                    </div>
                </el-col>
                <el-col :span="16">
                    <div class="book-mid-info">
                        <h4>{{item.title}}</h4>
                        <p class="author">
                            <img src="../../assets/recommend/user.f22d3.png" alt="">
                            <a href="#">{{item.author}}</a>
                            <em>|</em>
                            <a href="">{{item.minorCate}}</a>
                            <em>|</em>
                            <span>连载</span>
                        </p>
                        <p class="intro">

                            {{cutOut(item.shortIntro)}}

                        </p>
                        <p class="update">
                            <span class="lastChapter">{{item.lastChapter}}</span>
                            <em>·</em>
                            <span>2017-11-01 22:00</span>
                        </p>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="book-right-info">
                        <div class="total">
                            <p>
                                <span>{{item.latelyFollower}}</span>
                                人气
                            </p>
                        </div>
                        <p class="btn">
                            <el-row>
                                <el-col :span="11" :style="{'margin-right':'10px'}">
                                    <d-btn type="danger"  :to="item['_id']" >书籍详情</d-btn>
                                </el-col>
                                <el-col :span="11">
                                    <d-btn  :class="{disabled:item.addBookRack}" @click.native="addBookRack($event,item)" >{{checkInfo(item)}}</d-btn>
                                </el-col>
                            </el-row>


                        </p>
                    </div>
                </el-col>
            </el-row>
        </li>
    </ul>
</template>
<script>
    import dBtnComponent from './d-button.vue';
    export default {
//        props:['data'],
        components:{
            dBtn:dBtnComponent
        },
        computed:{
            dataList(){
                if(this.$route.path.includes('/home/recommend')){
                    return this.$store.state.currentTypeList;
                }else if(this.$route.path.includes('/home/randomrecommend')){
                    return this.$store.state.randomList;
                }else if(this.$route.path.includes('/home/search')){
                    return this.$store.state.searchList;
                };
            },
            currentPage(){
                return (this.$store.state.currentPage-1)*20;
            }
        },
        methods:{
            cutOut(title){
                if(title.length>=120){
                    var str=title.slice(0,120)+'...';
                    return str;
                };
                return title;
            },
            addBookRack($event,item){
                item.path=this.$route.path+'/bookdetails/'+item['_id'];
                item.is='bookdetails';
                if(this.$route.path.includes('/home/randomrecommend')||this.$route.path.includes('/home/search')){
                    item.path='/home/recommend/male/0/bookdetails/'+item['_id'];
                    item.is='randomrecommend';
                    $event.target.classList.add('disabled');
                }
                item.lastRead='无';
                this.$store.dispatch('setLocalStroage',{
                    name:'bookRack',
                    data:item
                }).then(res=>{
                    this.$store.commit('addBookRack',item);
                });

            },
            checkInfo(item){
                if(item.addBookRack){
                    return '已加入书架';
                }else{
                    return '加入书架';
                };
            }
        }
    }
</script>
<style >
    .recommendItem{
        width:100%;
        height:140px;
        border-bottom:1px solid #e6e6e6;
        padding:24px 0;
    }

    .recommendItem .book-img-box{
        position: relative;
        width:102px;
        height:136px;
        float: left;
    }
    .recommendItem .book-img-box img{
        width:102px;
        height:136px;
        position: absolute;
        left:0;
        top:0;
        z-index:0;
    }
    .recommendItem .rank-tag{
        color: white;
        font-size: 18px;
        height: 22px;
        padding:0px 10px;
        z-index:4;
        display: block;
        line-height:22px;
        text-align: center;
        position: absolute;
        top:0;
        font-weight:bold;
        background: rgba(73,73,73,.3);
    }
    .recommendItem .no1{
        background-color:#bf2c24 !important;
    }
    .recommendItem .no2{
        background-color:#e67225 !important;
    }
    .recommendItem .no3{
        background-color:#e6bf25 !important;
    }

    .recommendItem .rank-tag cite{
         border-top:10px solid #bf2c24;
         border-right:15px solid  transparent;
         border-left:15px solid transparent;
         border-bottom:0 none;
         position: absolute;
         top:22px;
         left:0;
     }
    .recommendItem .no1 cite{
        border-top-color:#bf2c24 !important;
    }
    .recommendItem .no2 cite{
        border-top-color:#e67225 !important;
    }
    .recommendItem .no3 cite{
        border-top-color:#e6bf25 !important;
    }


    .recommendItem .book-mid-info{
        margin-top:-6px;
        float: left;
        margin-left:16px;
    }
    .recommendItem .book-mid-info h4{
        font-size:20px;
    }

    .author{
        height:24px;
        line-height:24px;
    }
    .author img{
        width:14px;
        height:14px;
        vertical-align: top;
        margin-top:10px;
    }
    .author a{
        margin:5px 10px;
    }
    .author img ,.author a,.author em,.author span{
        float: left;
    }
   .author em {
        height:30px;
        line-height:30px;
    }
     .author span{
        margin:5px 10px;
    }
    .recommendItem .author a{
        -webkit-transition: .2s;
        -moz-transition: .2s;
        -ms-transition: .2s;
        -o-transition: .2s;
        transition: .2s;
    }
    .recommendItem .author a:hover{
        color:#262626;
    }
    .recommendItem .intro{
        line-height:24px;
        margin:5px 0;
        height:47px;
        -ms-text-overflow: ellipsis;
        text-overflow: ellipsis;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
        float: left;
    }
    .recommendItem .update{
        clear: both;
    }
    .recommendItem .update a{
        color: #125295;
    }
    .recommendItem .update a:hover{
        color: #317ac8;
    }
    .recommendItem .update em,.recommendList .update span{
        height:31px;
        line-height:31px;
    }
    .recommendItem .update span{
        font-size:12px;
        color: #b5b5b5;
    }

    .recommendItem .book-right-info{
        float: left;
        height:100%;
        width:100%;
        margin-right:40px;
    }
    .recommendItem .book-right-info p{
        font:12px/18px;
    }
    .recommendItem .book-right-info .total{
        text-align: right;
    }

    .recommendItem .btn{
        margin-top:80px;
        float: right;
        width:60%;
    }

    .recommendItem .disabled{
        cursor:not-allowed;
        background: #ccc !important;
    }
    .recommendItem .disabled:hover{
        background: #ccc !important;
    }

    .recommendItem .lastChapter{
        color: darkblue !important;
        cursor: pointer;
    }
</style>
