<template>
    <div class="clearfix typeList" >
        <span v-for="item,index in typeList" :class="{active:selectedName==item.name}" @click="clickChange(item,index)">{{item.name}}</span>
    </div>
</template>
<script>
    export default {
        name:'typeList',
        props:['activeName','activeClick','data'],
        computed:{
            typeList(){
                return this.data;
            },
            selectedName(){
                return this.activeName;
            }
        },
        methods:{
            clickChange(item,index){
                this.activeClick&&this.activeClick(item,index);
            }
        }
    }
</script>

<style scoped>
    span{
        display: inline-block;
        padding:4px 20px;
        /*border:1px solid red;*/
        margin-right:20px;
        -webkit-border-radius: 20px;
        -moz-border-radius: 20px;
        border-radius: 20px;
        height:24px;
        line-height:24px;
        cursor: pointer;
        border:1px solid transparent;
    }
    .active{
        border-color: #2d8cf0;
        color: #2d8cf0;
    }
    .typeList{
        margin-top:20px;
    }
</style>
