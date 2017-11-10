import Vue from 'vue';
import VueX from 'vuex';
import Axios from 'axios';


import {Loading} from 'element-ui';

Vue.use(VueX);


export default new VueX.Store({
    state:{
        users:[],
        currentUser:[],
        asideCollapse:false,
        //男生女生的爱好分类
        classify:{
            male:[],
            female:[]
        },
        //当前页
        currentPage:1,
        //当前选择的分类如玄幻
        currentType:'',
        //当前性别
        sex:'male',
        //当前分类玄幻下的书籍列表
        currentTypeList:[],
        //当前分类下总共有多少书籍
        currentBookListTotal:0,
        //loading动画
        loading:'',
        //当前书本id
        currentBookId:'',
        //当前书本章节
        currentBookChapterList:[],
        //当前书的详细信息
        currentBookDetails:[],
        //当前书籍的推荐列表
        currentBookRecommendList:[],
        //随机书籍的列表
        randomList:[],
        // 书架列表
        bookRackList:[],
        //当前章节的信息
        currentChapterDetails:[],
        //搜索到的数据
        searchList:[]
    },

    getters:{
        //看是否能够获取到当前的用户.
        currentUser(state){
            var user=state.users.filter(item=>{
                return item.lastLogin
            });
            if(user.length==1){
                state.currentUser=user;
                return user;
            }
            return ;
        }
    },

    mutations:{
        //更新store当中的当前用户对象
        updateCurrentUser(state,data){
            data.filter(item=>{
                if(item.lastLogin){
                    state.currentUser=item
                }
            })
        },
        //更新所有用户名
        updateUsers(state,data){
            state.users=data;
        },
        //加载loading
        loading(state){
            if(state.loading==''){
                state.loading=Loading.service({
                    target:'fullscreen',
                    spinner:'el-icon-loading',
                    text:'正在拼老命的加载',
                    lock:true
                });
            }
        },
        //关闭加载
        closeLoading(state){
            if(state.loading!=''){
                state.loading.close();
                state.loading='';
            }
        },
        //更新书本分类.
        updateClassify(state,data){
            state.classify={
                male:data.male,
                female:data.female
            };
        },
        //设置当前的分类
        setCurrentType(state,name){
            state.currentPage=1;
            state.currentType=name;
        },
        // 设置当前分类的书籍
        setCurrentTypeList(state,data){
            state.currentTypeList=data.books.slice(0,20);
        },
        //设置当前用户选择的什么性别
        setSex(state,type){
            state.sex=type;
        },
        //更新当前的id
        updateBookId(state,id){
            state.currentBookId=id;
        },
        // 更新当前通过id获取到的书籍的章节
        currentBookChapterList(state,data){
            state.currentBookChapterList=data.chapters;
        },
        //更新当前分类下总共有多少书籍
        updateBookListTotal(state,num){
            state.currentBookListTotal=num/100;
        },
        //更新当前书籍的详细的信息
        currentBookDetails(state,data){
            state.currentBookDetails=data;
        },
        //根据id去设置当前书籍的推荐目录
        currentBookRecommendList(state,data){
            state.currentBookRecommendList=data;
        },
        //设置当前的章节内容
        currentChapterDetails(state,data){
            state.currentChapterDetails=data;
        },
        //随机书籍列表
        updateRandomList(state,res){
            state.randomList=res.books.slice(0,10);
        },
        //添加到书架
        addBookRack(state,obj){
            if(obj.is.includes('randomrecommend')){
                state.randomList.forEach(item=>{
                    if(item.title==obj.title){
                        item.addBookRack=true;
                        state.bookRackList.push(item);
                    }
                })
            }else{
                state.currentTypeList.forEach(item=>{
                    if(item.title==obj.title){
                        item.addBookRack=true;
                        state.bookRackList.push(item);
                    }
                })
            }
        },
        //从书架中删除
        deleteBookRack(state,obj){
            //用来控制当前列表中的是否添加到书架,但是一开始刷新的时候，当前的列表是不存在的
            state.currentTypeList.forEach((item,index)=>{
                if(item['_id']==obj['_id']){
                    item.addBookRack=false;
                }
            });
            //用来控制删除的，一开始就去获取了。
            state.bookRackList.forEach((item,index)=>{
                if(item['_id']==obj['_id']){
                    state.bookRackList.splice(index,1);
                }
            });
        },
        //更新书架
        updateBookRack(state,obj){
            state.bookRackList=obj;
        },
        //设置当前的页数
        updateCurrentPage(state,num){
            state.currentPage=num;
        },
        //设置搜索到的数据
        updateSearchList(state,data){
            state.searchList=data;
        }
    },

    actions:{
        //获取到想要cookie
        getCookie(store,name){
            name+='=';
            var original=document.cookie.split('; ');
            var str='';
            original.forEach(item=>{
                if(item.indexOf(name)==0){
                    str=item.slice(name.length);
                }
            });

            if(str==''){
                return '';
            }
            var users=JSON.parse(str);
            return users;
        },

        //添加对应的cookie
        addCookie(store,obj){
            var result;
            store.dispatch('getCookie',obj.name).then(res=>{
                if(!res){
                    result=[obj.data];
                    store.dispatch('intoCookie',{
                        data:result,
                        name:obj.name
                    });
                }else{
                    store.dispatch('checkCookie',obj).then(onoff=>{
                        if(!onoff){
                            res.push(obj.data);
                        }
                        result=res;
                        store.dispatch('intoCookie',{
                            data:result,
                            name:obj.name
                        });
                    })
                }

            });
        },
        //注入到cookie当中
        intoCookie(store,obj){
            // cookie默认为1个月后过期，有值的话按值来
            var d=new Date();
            var exdays=1000*60*60*24*30;
            d.setTime(Date.now()+exdays);
            var expires='expires='+d.toUTCString();

            document.cookie = obj.name + "=" + JSON.stringify(obj.data) + "; " + expires+'; max-age='+(exdays/1000);
            return obj.data;
        },
        //重复的避免重复的cookie
        checkCookie(store,obj){
            return this.dispatch('getCookie',obj.name).then(users=>{
                var onoff=false;
                users.forEach(res=>{
                    if(res.id==obj.data.id){
                        onoff=true;
                    }
                });
                return onoff;
            });
        },
        //验证登录信息如果正确则更新登陆状态
        checkUserStateCookie(store,obj){
            return this.dispatch('getCookie',obj.name).then(users=>{
                var onoff=false;
                users.forEach(item=>{
                    if(item.id==obj.data.id&&item.passWord==obj.data.passWord){
                        item.lastLogin=obj.data.lastLogin;
                        onoff=true;
                    }else{
                        item.lastLogin=false;
                    }
                });
                return store.dispatch('intoCookie',{
                    name:obj.name,
                    data:users
                }).then(res=>{
                    return onoff
                })
            })
        },

        //获取到分类信息
        getClassify(store,obj){


            return Axios.get('http://novel.juhe.im/categories').then(res=>{
                store.commit('setCurrentType',res.data.data[obj.sex][obj.index].name);
                store.commit('setSex',obj.sex);
                store.commit('updateClassify',res.data.data);

                return store.dispatch('getTypeList');
            });
        },



        //获取到分类中的书籍
        getTypeList(store,obj){
            if(!obj){
                obj={};
                obj.start=0;
                obj.end=20;
            }

            return Axios.get('http://novel.juhe.im/category-info?gender=male&type=hot&major='+store.state.currentType+'&minor=&start='+obj.start+'&limit='+obj.end).then(res=>{

                //递归去循环，获取到最新章节的时间，由于太卡舍弃该获取最新章节时间的功能
                // function getTime(index){
                //     if(!res.data.data.books[index]){
                //         store.commit('setCurrentTypeList',res.data.data);
                //         store.state.loading.close();
                //         store.state.loading='';
                //         return ;
                //     }else{
                //         return store.dispatch('getUpdateTime',res.data.data.books[index]).then(function(){
                //             index++;
                //             getTime(index);
                //         });
                //     }
                // }
                // getTime(0);


                //设置路由,最后面的数字代表的是male或者female中的第几个
                var fenlei=0;
                store.state.classify[store.state.sex].forEach(function(item,index){
                    if(store.state.currentType==item.name){
                        fenlei=index;
                    };
                });
                //要递归的去添加该书是否被添加到了书架中

                var index=0;
                function addBookRack(index){
                    var item=res.data.data.books[index];
                    if(item){
                        store.dispatch('checkLocalStroage',{
                            name:'bookRack',
                            data:item
                        }).then(res=>{
                            item.addBookRack=res;
                            index++;
                            addBookRack(index);
                        })
                    }else{
                        store.commit('setCurrentTypeList',res.data.data);
                        store.commit('updateBookListTotal',res.data.data.total);
                        return '/home/recommend/'+store.state.sex+'/'+fenlei;
                    }
                };

                return addBookRack(index);
            });
        },
        //获取到当前的书籍的章节最新更新时间
        getUpdateTime(store,item) {
            return Axios.get('http://novel.juhe.im/book-info/'+item['_id']).then(res=>{
                item.updated=res.data.data.updated;
            });
        },

        //根据id获取本书的详细信息
        getBookdetails(store,id){
            return Axios.get('http://novel.juhe.im/book-info/'+id).then(res=>{
                store.commit('updateBookId',id);
                store.commit('currentBookDetails',res.data.data);
                return res.data.data;
            });
        },

        //根据id获取本书的所有目录
        getBookChapter(store,id) {
            return Axios.get('http://dtd.space/read/proxy.php?api=http://api.zhuishushenqi.com/mix-atoc/'+id+'?view=chapters').then(res => {
                store.commit('currentBookChapterList',res.data.mixToc);
                return res;
            })
        },
        //点击目录时获取章节内的信息
        getChapterDetails(store,id){
            return Axios.get('http://novel.juhe.im/chapters/http%3A%2F%2Fvip.zhuishushenqi.com%2Fchapter%2F56f8da09176d03ac1983f6d7%3Fcv%3D1486473051386').then(res=>{
                store.commit('currentChapterDetails',res.data.data.chapter);
                return res;
            })
        },
        //根据id获取本书的相关推荐
        getBookRecommend(store,id) {
            return Axios.get('http://novel.juhe.im/recommend/' + id).then(res=>{
               store.commit('currentBookRecommendList',res.data.data.books);
               return res;
            });
        },
    //    随机获取小说列表
        getRandomList(store){
            var randomStart=Math.floor(Math.random()*(500-10));
            var type=store.state.currentType;
            if(type==''){
                type='奇幻';
            }
            return Axios.get('http://novel.juhe.im/category-info?gender=male&type=hot&major='+type+'&minor=&start='+randomStart+'&limit='+randomStart+10).then(res=>{
                store.commit('updateRandomList',res.data.data);
                return res;
            });
        },
    //    设置localstorage
        setLocalStroage(store,obj){
            var localStr=window.localStorage.getItem(obj.name);
            if(!localStr){
                window.localStorage.setItem(obj.name,JSON.stringify([obj.data]));
            }else{
                var localData=JSON.parse(window.localStorage.getItem(obj.name));
                store.dispatch('checkLocalStroage',obj).then(res=>{
                    if(res==false){
                        localData.push(obj.data);
                    };
                    window.localStorage.setItem(obj.name,JSON.stringify(localData));
                });
            };
        },
        //查看本地存储是否有相同的
        checkLocalStroage(store,obj){
            var localStr=window.localStorage.getItem(obj.name);
            if(!localStr){
                return false;
            }
            var localData=JSON.parse(localStr);
            for(var i=0;i<localData.length;i++){
                if(localData[i]['_id']==obj.data['_id']){
                    return true;
                }
            };
            return false;
        },
        //获取本地存储的数据
        getLocalStroage(store,name){
            var localStr=window.localStorage.getItem(name);
            if(localStr){
                store.commit('updateBookRack',JSON.parse(localStr));
            }
        },
        //删除本地存储数据
        deleteLocalStroage(store,obj){
            var localStr=window.localStorage.getItem(obj.name);
            if(!localStr){
                return false;
            }
            var localData=JSON.parse(localStr);
            var data=localData.filter(res=>{
                return res['_id']!=obj.data['_id']
            });
            window.localStorage.setItem(obj.name,JSON.stringify(data));
            store.commit('deleteBookRack',obj.data)
        },
    //    更新最后一次看的章节
        updateLastRead(store,obj){
            store.state.bookRackList.forEach(item=>{
                if(item['_id']==obj.data['_id']){
                    item.lastRead=obj.data.lastRead;
                }
            });
            window.localStorage.setItem(obj.name,JSON.stringify(store.state.bookRackList));
        },
        //滚动条到0
        to0(store){
            var main=document.querySelector('.el-main');
            if(main){
                main.scrollTop=0;
            }
        },
        //滚动条到最底部
        toBottom(store){
            var main=document.querySelector('.el-main');
            var list=document.querySelector('.bookdetails');
            if(main){
                main.scrollTop=list.offsetHeight;
            }
        },
        //模糊搜索数据
        search(store,name){
            return Axios.get('/api/book/fuzzy-search?query='+name).then(res=>{
                var index=0;
                function addBookRack(index){
                    var item=res.data.books[index];
                    if(item){
                        store.dispatch('checkLocalStroage',{
                            name:'bookRack',
                            data:item
                        }).then(res=>{
                            item.addBookRack=res;
                            index++;
                            addBookRack(index);
                        })
                    }else{
                        store.commit('updateSearchList',res.data.books);
                    }
                };
                addBookRack(index);
                return res;
            });
        }
    }
});
