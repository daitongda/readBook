<template>
    <el-row>
        <el-col :span="24">
            <el-table
                :data="tableData"
                stripe
                style="width: 100%">
                <el-table-column
                    prop="title"
                    label="小说名"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="author"
                    label="作者"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="lastChapter"
                    align="center"
                    label="最新章节">
                </el-table-column>
                <el-table-column
                    prop="lastRead"
                    align="center"
                    label="上次阅读">
                </el-table-column>
                <el-table-column
                    align="center"
                    label="操作">
                    <template slot-scope="scope">
                        <el-button type="success" @click="handleEdit(scope.row)">查看</el-button>
                        <el-button type="danger" @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        name: 'bookRack',
        computed:{
            tableData(){
                return this.$store.state.bookRackList;
            }
        },
        created(){
            this.$store.commit('loading');
            this.$store.dispatch('getLocalStroage','bookRack').then(res=>{
                this.$store.commit('closeLoading');
            })
        },
        methods:{
            handleEdit(item){
                this.$router.push(item.path);
            },
            //删除存在Localstorage里的数据
            handleDelete(item){
                this.$store.dispatch('deleteLocalStroage',{
                    name:'bookRack',
                    data:item
                });
            }
        }
    }
</script>
<style>
    .el-button--danger{
        margin:0px !important;
    }
</style>
