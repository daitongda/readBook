<template>
    <div class="signUp" >
        <el-input placeholder="账号" :minlength="5" :maxlength="13"  v-model="acount" :autofocus="true"  >
            <template slot="prepend" >
            </template>
        </el-input>
        <span class="messageTip" :class="[{ok:acountTip=='输入成功'},{error:acountTip=='请重新输入'},{error:acountTip=='账号已注册'}]">{{acountTip}}</span>
        <el-input placeholder="密码"  :minlength="6" :maxlength="16" v-model="passWord" type="password"  >
            <template slot="prepend" ></template>
        </el-input>
        <span class="messageTip" :class="[{ok:passWordTip=='输入成功'},{error:passWordTip=='请重新输入'}]">{{passWordTip}}</span>
        <el-input placeholder="邮箱" v-model="eMail"  >
            <template slot="prepend" ></template>
        </el-input>
        <span class="messageTip" :class="[{ok:eMailTip=='输入成功'},{error:eMailTip=='请重新输入'}]">{{eMailTip}}</span>
        <el-button type="primary" native-type="submit" @click="handleSubmit">注册</el-button>
    </div>
</template>

<script>
    export default {
        name:'signup',
        data(){
            return {
                acount:'',
                passWord:'',
                eMail:''
            }
        },
        computed:{
            acountTip(){
                //利用正则来判断账号名字
                var reg=/^[a-z0-9A-Z]{5,13}$/;
                var str='';
                if(this.acount.length==0){
                    str='5~13个字符，由数字、字母组成';
                }else if(reg.test(this.acount)) {
                    str='输入成功';
                }else{
                    str='请重新输入';
                };
                var registered=this.$store.state.users.filter(item=>{
                    return item.acount==this.acount;
                });

                if(registered.length!=0){
                    str='账号已注册';
                };
                return str;

            },
            passWordTip(){
                //利用正则来判断密码
                var reg=/^[\S]{6,16}$/;
                var str='';
                if(this.passWord.length==0){
                    str='6~16个字符，区分大小写,不能输入空格';
                }else if(reg.test(this.passWord)) {
                    str='输入成功';
                }else{
                    str='请重新输入';
                }
                return str;
            },
            eMailTip(){
                //利用正则来判断邮箱
                var reg=/^[\S]+@[0-9a-z]+\.com$/;
                var str='';
                if(this.eMail.length==0){
                    str='例：qq1050075671@qq.com';
                }else if(reg.test(this.eMail)) {
                    str='输入成功';
                }else{
                    str='请重新输入';
                }
                return str;
            }
        },
        methods:{
            //清空  账号密码和email
            clearAll(){
                this.acount='';
                this.passWord='';
                this.eMail='';
            },
            handleSubmit(){
                if(this.acountTip=='输入成功'&&this.passWordTip=='输入成功'&&this.eMailTip=='输入成功'){
                    this.$store.dispatch('addCookie',{
                        name:'users',
                        data:{
                            id:this.acount,
                            passWord:this.passWord,
                            eMail:this.eMail,
                            lastLogin:false
                        },
                    }).then(res=>{
                        this.$message({
                            type:'success',
                            message:'创建成功',
                            duration:1000
                        });
                        this.clearAll();
                    });

                };
            }
        }
    }
</script>
<style>
    .messageTip{
        height:30px;
        width:100%;
        display: block;
        text-align: left;
        text-indent:40px;
        line-height:20px;
        margin-bottom:5px;
        font-size:16px;
        color: #97a8be;
    }
    .ok{
        color: #20a0ff;
    }
    .error{
        color: red;
    }
</style>
