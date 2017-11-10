<template>
    <div>
        <h1>随机推荐:(说不定会有你喜欢的哦(*^_^*))</h1>
        <book-list></book-list>
    </div>

</template>
<script>
    import bookListComponent from '../public/bookList.vue';
    export default{
        name:'randomRecommend',
        created(){
            this.$store.commit('loading');
            this.$store.dispatch('getRandomList').then(res=>{
                this.$store.dispatch('to0');
                this.$store.commit('closeLoading');
            });
        },
        components:{
            bookList:bookListComponent
        }
    }
</script>
<style>
    h1{
        font-size:30px;
        color: #555;
    }
</style>
