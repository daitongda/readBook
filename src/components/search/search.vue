<template>
    <div class="search">
        <el-autocomplete
            v-model="state4"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入内容"
            valueKey="title"
            @select="handleSelect"
        ></el-autocomplete>
        <book-list></book-list>
    </div>

</template>

<script>
    import bookListComponent from '../public/bookList.vue';
    export default {
        name:'search',
        data(){
            return {
                state4:''
            };
        },
        methods:{
            handleSelect(item){
                this.$store.commit('updateSearchList',[item]);
            },
            querySearchAsync(queryString,callBack){
                this.$store.dispatch('search',queryString).then(res=>{
                    callBack(res.data.books);
                });
            }
        },
        components:{
            bookList:bookListComponent
        }
    }
</script>

<style>
    .search .el-autocomplete{
        width:100% !important;
    }
</style>
