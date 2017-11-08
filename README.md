# readBook
> vue project
阅读书籍网站
##  简介
    该项目采用了Vue-cli,Vuex,element组件库,Axios,服务端代理获取数据来完成前端页面的开放，设计上模仿了网上知名的阅读网站。后台采用了在git上搜索到的api接口，所以有些接口是可以直接访问的，因为服务器端在返回数据的header中设置了Access-Control-Allow-Origin，所以可以跨域的获取到数据.由于是多篇文档中的api接口，有些服务端不允许跨域，所以就采用了vue-cli中自带的小型服务器进行了服务代理去获取数据。
<<<<<<< HEAD

=======
    
>>>>>>> 35aabc73a52e06b8aa2f0b0551b55f3106a6cbba
## 功能
- 登入登出
- 书籍书架
- 书籍排行版
    - 书籍分类
    - 添加到书架
    - 查看书籍目录
    - 书籍最新章节
    - 查看书籍章节内容
- 自动记录书架内的书籍的观看记录
- 随机推荐
- 模糊查询书籍
- 高级路由
    - 动态路由
    - 带参数路由
## 项目流程简洁
### 注册页面
- 注册登陆界面采用了element的分页和输入框进行布局。
- element标签页切换由于他采用的是translate来进行移动，会涉及到一个重绘和回流的问题，当页面中某个元素的宽高等发生改变的时候会造成重绘，同时由于修改了当前元素的宽高，后面的元素往上顶，这就是回流问题。重绘和回流问题有时会极大的影响性能。这里element的分页的移动会导致字体的抖动，就好像画面轻轻的晃动了一下，可以通过给他添加translateZ来解决这个问题，但是标签页translate移动时添加在行内的，所以我只能通过-webkit-backface-visiblity:hidden来解决问题。
<<<<<<< HEAD

=======
    
>>>>>>> 35aabc73a52e06b8aa2f0b0551b55f3106a6cbba
- 注册和登陆由于没有后台支持，所以采用了Cookie来存储数据，页面一打开的时候，由于Cookie中没有用户信息，所以会跳转到注册页面，同时会往Cookie中添加一个admin用户，用户的保存时期均为30天。

- 账号在触发onchange时会验证Cookie中是否有账号名，如果有账号名会提示你修改，同时账号和密码和邮箱会进行正则的验证，只有通过了正则验证才能注册;


```
将代码挂载在Store中的action中模拟前后端交互

    //获取到想要cookie数据,obj={obj:获取的cookie的名字,data:数据}
        getCookie(store,name){
            name+='=';
            var original=document.cookie.split('; ');
            var str='';
            //循环其中的每项，然后截取出数据。
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
        }
<<<<<<< HEAD

=======
        
>>>>>>> 35aabc73a52e06b8aa2f0b0551b55f3106a6cbba
    //添加对应的cookie,obj={name:获取的cookie的名字,data:数据}
        addCookie(store,obj){
            var result;
            //去获取到想要的那个Cookie数据
            store.dispatch('getCookie',obj.name).then(res=>{
            //如果为空，直接添加到cookie中。
                if(!res){
                    result=[obj.data];
                    store.dispatch('intoCookie',{
                        data:result,
                        name:obj.name
                    });
                }else{
                   //不为空的话，要先验证一下Cookie中是否有重复的。
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
        }
<<<<<<< HEAD

=======
        
>>>>>>> 35aabc73a52e06b8aa2f0b0551b55f3106a6cbba
    //注入到cookie当中
        intoCookie(store,obj){
            // cookie默认为1个月后过期
            var d=new Date();
            var exdays=1000*60*60*24*30;
            d.setTime(Date.now()+exdays);
            var expires='expires='+d.toUTCString();

            //设置Cookie
            document.cookie = obj.name + "=" + JSON.stringify(obj.data) + "; " + expires+'; max-age='+(exdays/1000);
            return obj.data;
        }
<<<<<<< HEAD

=======
        
>>>>>>> 35aabc73a52e06b8aa2f0b0551b55f3106a6cbba
    //避免设置重复的cookie，true为有重复的，false为不重复的
        checkCookie(store,obj){
            return this.dispatch('getCookie',obj.name).then(users=>{
                var onoff=false;
                users.forEach(res=>{
                //通过列表中的唯一标识来判断是否重复
                    if(res.id==obj.data.id){
                        onoff=true;
                    }
                });
                return onoff;
            });
        }
```

<<<<<<< HEAD

### 整体布局
- 整个页面的布局采用了element的Container布局容器来进行布局。左边是el-aside，上边的el-header，主体的容器是el-main;

### 我的书架
- 会从本地的localStorage中获取到书籍显示出来，可以在这里实现快捷的跳转到书籍的目录和删除该条记录，同时你可以看到上次最后一次阅读的章节。

```
存储到localStorage中的方法和上面设置Cookie的方法是相似的；
```
### 排行榜
- 排行榜有男性和女性的分类，同时还有书籍的分类，每一本书的组件是自己写的，因为element中没有类似的，模仿的是知名的阅读网站；同时设置了动态的路由，路由是:/home/recommend/男性还是女性/书籍分类的索引，因为考虑到在本页面刷新，我还是想要显示的是刷新的那个页面。所以采用了动态路由的方式，在created中获取相对应的数据。

- 点击书籍详情可以看到相对应的目录，同时也有本书的相关推荐，点击章节目录可以看到对应的内容，但是由于找不到相对应的api接口，所以保持内容一致。

### 随机推荐
- 随机推荐是随机的去获取几本书，说不定有你喜欢的。
### 搜索
- 可以进行模糊查询和精确查询来获取到相对应的书籍。但是由于api接口不支持跨域，同时没有给回调的接口，所以只能采用服务端代理的方式进行获取数据。

- 服务代理的流程：首先我们发送请求给同源策略下的后台，在由它发送请求获取到数据，服务器是不受同源策略影响的，然后同源服务器获取到数据后在发送给前端。

- 在vue-cli脚手架搭建的项目中的config文件夹中的index.js的dev对象下的proxyTable对象里设置。

```
    '/api':{
        target: 'http://api.zhuishushenqi.com/mix-atoc/',//设置你调用的接口域名和端口号 别忘了加http
        changeOrigin: true,
        pathRewrite: {
            '^/api': '/'//这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'http://40.00.100.100:3002/user/add'，直接写‘/api/user/add’即可
        }
    }
=======

### 整体布局
- 整个页面的布局采用了element的Container布局容器来进行布局。左边是el-aside，上边的el-header，主体的容器是el-main;

### 我的书架
- 会从本地的localStorage中获取到书籍显示出来，可以在这里实现快捷的跳转到书籍的目录和删除该条记录，同时你可以看到上次最后一次阅读的章节。

```
存储到localStorage中的方法和上面设置Cookie的方法是相似的；
```
### 排行榜
- 排行榜有男性和女性的分类，同时还有书籍的分类，每一本书的组件是自己写的，因为element中没有类似的，模仿的是知名的阅读网站；同时设置了动态的路由，路由是:/home/recommend/男性还是女性/书籍分类的索引，因为考虑到在本页面刷新，我还是想要显示的是刷新的那个页面。所以采用了动态路由的方式，在created中获取相对应的数据。

- 点击书籍详情可以看到相对应的目录，同时也有本书的相关推荐，点击章节目录可以看到对应的内容，但是由于找不到相对应的api接口，所以保持内容一致。

### 随机推荐
- 随机推荐是随机的去获取几本书，说不定有你喜欢的。
### 搜索
- 可以进行模糊查询和精确查询来获取到相对应的书籍。但是由于api接口不支持跨域，同时没有给回调的接口，所以只能采用服务端代理的方式进行获取数据。

- 服务代理的流程：首先我们发送请求给同源策略下的后台，在由它发送请求获取到数据，服务器是不受同源策略影响的，然后同源服务器获取到数据后在发送给前端。

- 在vue-cli脚手架搭建的项目中的config文件夹中的index.js的dev对象下的proxyTable对象里设置。

>>>>>>> 35aabc73a52e06b8aa2f0b0551b55f3106a6cbba
```
    '/api':{
        target: 'http://api.zhuishushenqi.com/mix-atoc/',//设置你调用的接口域名和端口号 别忘了加http
        changeOrigin: true,
        pathRewrite: {
            '^/api': '/'//这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'http://40.00.100.100:3002/user/add'，直接写‘/api/user/add’即可
        }
    }
```


## api接口
- 获取分类详情
    - major=分类,start=开始为第几条，limit=截取几条;
    - url: ```http://novel.juhe.im/category-info?gender=male&type=hot&major=奇幻&minor=&start=0&limit=20```

- 获取书籍详情
    - book-info/后面写获取过来的书籍的id
    - url: ```http://novel.juhe.im/book-info/53115e30173bfacb4904897e```

- 获取小说章节根据id;(需要使用服务代理)
    - /mix-atoc/:bookId
    - url:```http://api.zhuishushenqi.com/mix-atoc/50bff3ec209793513100001c?view=chapters```

- 获取书籍相关推荐
    - /recommend/:bookId
    - url: ```http://novel.juhe.im/recommend/53115e30173bfacb4904897e```

- 模糊搜索
    - /book/fuzzy-search/:书籍名称(需要使用服务代理)
    - url:```http://api.zhuishushenqi.com/book/fuzzy-search?query=%E6%96%97%E7%BD%97```



<<<<<<< HEAD
## 项目中的坑
- 在使用侧边栏布局的时候，搭配el-menu菜单栏有可能会导致侧边栏多出来一点，会有个1Px的偏差，如果你需要设置背景颜色就可以清晰的看出差距，需要一条height:100%,宽为1px同背景色的div去覆盖到上面去遮挡住。

- element会在打包后给body添加一个position:relative !important;的样式有可能会对布局造成影响。

- 使用vue中style标签scoped属性，页面的样多刷新几次有可能会造成不一样，样式有时候不会生效。



## api接口
- 获取分类详情
    - major=分类,start=开始为第几条，limit=截取几条;
    - url: ```http://novel.juhe.im/category-info?gender=male&type=hot&major=奇幻&minor=&start=0&limit=20```

- 获取书籍详情
    - book-info/后面写获取过来的书籍的id
    - url: ```http://novel.juhe.im/book-info/53115e30173bfacb4904897e```

- 获取小说章节根据id;(需要使用服务代理)
    - /mix-atoc/:bookId
    - url:```http://api.zhuishushenqi.com/mix-atoc/50bff3ec209793513100001c?view=chapters```

- 获取书籍相关推荐
    - /recommend/:bookId
    - url: ```http://novel.juhe.im/recommend/53115e30173bfacb4904897e```

- 模糊搜索
    - /book/fuzzy-search/:书籍名称(需要使用服务代理)
    - url:```http://api.zhuishushenqi.com/book/fuzzy-search?query=%E6%96%97%E7%BD%97```
=======
>>>>>>> 35aabc73a52e06b8aa2f0b0551b55f3106a6cbba
