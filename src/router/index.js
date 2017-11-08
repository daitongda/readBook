import Router from 'vue-router';
import Vue from 'vue';

Vue.use(Router);


//导入路由需要用到的模块
import LoginComponent from '@/components/login/login.vue';

//注册和登陆组建
import SignUpComponent from '@/components/login/signUp.vue';
import SignInComponent from '@/components/login/signIn.vue';

import HomeComponent from '@/components/home/home.vue';


// 首页用到的路由
//书架模块
import bookRackComponent from '@/components/bookRack/bookrack.vue';

import recommendComponent from '@/components/recommend/recommend.vue';


//获取到书籍详情章节的模块;
import bookDetailsComponent from '@/components/bookDetails/index.vue';

//观看书籍的时候的时候的模块
import seeBookComponent from '@/components/seeBook/seeBook.vue';

//随机书籍的模块
import randomRecommendComponent from '@/components/random/randomRecommend.vue';

//搜索模块
import searchComponent from '@/components/search/search.vue';


export default function(store){
    let router=new Router({
        routes:[
            {
                path:'/',
                name:'/',
                redirect:'/login'
            },
            {
                path:'/login',
                name:'login',
                component:LoginComponent,
                children:[
                    {
                        path:'',
                        name:'signUp',
                        component:SignUpComponent
                    },
                    {
                        path:'signIn',
                        name:'signIn',
                        component:SignInComponent
                    }
                ]
            },
            {
                path:'/home',
                component:HomeComponent,
                children:[
                    {
                        path:'',
                        name:'bookRack',
                        component:bookRackComponent
                    },
                    {
                        path:'recommend/:sex/:fenlei/bookdetails/:id',
                        name:'bookDetails',
                        component:bookDetailsComponent
                    },
                    {
                        path:'recommend/:sex/:fenlei',
                        name:'recommend',
                        component:recommendComponent
                    },
                    {
                        path:'recommend/:sex/:fenlei/bookdetails/:id/:chapter',
                        name:'watchingBook',
                        component:seeBookComponent
                    },
                    {
                        path:'randomrecommend',
                        name:'randomRecommend',
                        component:randomRecommendComponent
                    },
                    {
                        path:'search',
                        name:'search',
                        component:searchComponent
                    }

                ]
            }
        ]
    });

    //在每次路由跳转的时候都会触发这个
    router.beforeEach((to,from,next)=>{
        store.dispatch('getCookie','users').then(data=>{
           var onoff=true;
           if(data==''){
               store.dispatch('addCookie',{
                   name:'users',
                   data:{
                       id:'admin',
                       passWord:'admin',
                       lastLogin:false,
                       eMail:'1050075671@qq.com'
                   }
               }).then(res=>{
                   next('/login/');
               });
           }else{
               store.commit('updateUsers',data);
               store.commit('updateCurrentUser',data);
               next();
           }

        });



    });


    return router;
}

