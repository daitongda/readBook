<template>
    <span @click="clickFn" :class="btnType" class="d-btn">
        <slot/>
    </span>
</template>
<script>
    export default{
        name:'button',
        props:['type','to'],
        methods:{
            clickFn(){
                if(this.to){
                    if(this.$route.path.includes('/randomrecommend')||this.$route.path.includes('/search')){
                        this.$router.push('/home/recommend/male/0/bookdetails/'+this.to);
                    }else{
                        this.$router.push(this.$route.path+'/bookdetails/'+this.to);
                    };
                };
            }
        },
        computed:{
            btnType(){
                if(this.type){
                    return this.type;
                }else {
                    return 'default';
                };
            }
        }
    }
</script>
<style >
    .d-btn{
        text-align: center;
        /*width:100px;*/
        width:100%;
        height:34px;
        display: inline-block;
        line-height:32px;
        -webkit-transition: .3s background-color,border-color ;
        -moz-transition: .3s background-color,border-color ;
        -ms-transition: .3s background-color,border-color ;
        -o-transition: .3s background-color,border-color ;
        transition: .3s background-color,border-color ;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        border:1px solid black;
        cursor: pointer;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .d-btn.default{
        border-color:#2d8cf0;
        background: white;
        color:#2d8cf0;
        /*margin-top:1px;*/
    }
    .d-btn.default:hover{
        background-color: #f0f5ff;
    }
    .d-btn.danger{
        border-color:#bf2c24;
        background: #bf2c24;
        color: white;
    }
    .d-btn.danger:hover{
        border-color:#ed4259;
        background-color: #ed4259;
    }


</style>
