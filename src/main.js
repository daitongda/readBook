import Vue from 'vue';
import App from './App.vue';

//导入css初始化文件
import './public.css';

//导入element组件库
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(Element);

//导入路由
import Router from './router/index.js';

//导入vuex数据仓库
import Store from './store/index.js';




Vue.config.productionTip=true;



new Vue({
    el:'#app',
    template:'<app/>',
    store:Store,
    router:Router(Store),
    components:{
        app:App
    },
    created(){
        //设置初始管理员的用户
        // this.$store.dispatch('setCookie',{
        //     name:'users',
        //     data:
        //         {
        //             acount:'admin',
        //             passWord:'admin',
        //             eMail:'1050075671@qq.com',
        //             lastLogin:false,
        //             admin:true
        //         },
        //     aliveTime:20
        // }).then(res=>{
        //     //在所有的数据中判断是否去跳转到首页还是登陆页
        //     var user=res.filter(item=>{
        //         return item.lastLogin;
        //     });
        //     if(user.length>0){
        //         // this.$router.replace({name:'bookRack'});
        //     }else{
        //         this.$router.replace({name:'/'});
        //     }
        // });
    }
});
