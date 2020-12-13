## nuxt.js 

> Vue服务器渲染框架
>
> 用于做seo,

### 配置与文件  

assets：存放静态的scss,js,css

middleware:中间件

pages:主要工作目录，该目录文件会自动生成路径

plugins:插件

static:存放图片

store:vuex状态管理

nuxt.config.js:nuxt配置文件，会覆盖默认配置

**package.json端口配置：**

```shell
"config":{
	"nuxt":{
	"host":127.0.0.1,
	"port":1818
	}
}
```

配置公共css文件

```assets```文件下css文件夹中有`commen.css`文件

nuxt.config.js

```js
module.exports={
    css:["@/assets/commen.css"],
}
```

### 路由  

在nuxt使用a标签进行路由跳转时，nuxt会自动配置router

```html
<a href="/">home</a>
<a href="/about">about</a>
<a href="/news">news</a>
```

nuxt封闭一个组件给我们使用`nuxt-link` 

```html
<nuxt-link to="/">home</nuxt-link>
<nuxt-link to="about">about</nuxt-link>
<nuxt-link to="/news">news</nuxt-link>
```

#### 动态路由

接收动态路由的文件要用`_`开头命名

news/_id.vue

```html
<template>
    <div>{{$route.params.id}}</div>
</template>
```

nuxt会自动配置路由:

```js
router{
    routes[
        {
            name:"news-id",
            path:"/news/:id?",
            component:"pages/news/_id.vue"
		}
    ]
}
```

其中`:id?`表示可选，如果你想将它设置为必选的路由，需要在 `news/_id` 目录内创建一个 `index.vue` 文件。   `news/_id/index.vue`

#### 参数校验

nuxt提供一个函数：`validate`用于校验动态路由参数;

```js
export default {
    validate({params}){
        ...
    }
}
```

`validate`返回一个布尔值，`false`参数无效，nuxt.js停止渲染



#### 嵌套路由

在路由`/news`下存在其他两个子路由,在`/news`创建`_id.vue`,`child.vue`文件

在`/news`外层创建`news.vue`

自动配置路由：

```js
router{
    routes[
        {
            path:"/news",
            component:"pages/news.vue",
            children:[
                {
                    path:"/child",
                    component:"pages/news/child.vue"
                },
                {
                    path:":id",
                    component:"pages/news/_id.vue"
                }
            ]
		}
    ]
}
```

在news.vue父组件中使用`<nuxt-child>`显示子组件内容

```html
<template>
  <div>
    父组件
    <nuxt-child />
  </div>
</template>
```

### 默认布局与默认模板

#### 默认模板

在项目文件下创建`app.html`

变量大写，写完后要重启才看到效果，`<head>`标签中的SEO在`nuxt.config.js`中设置文件中引入 

```html
<!DOCTYPE html>
<html lang="en">
<head>
    {{ HEAD }}
</head>
<body>
    <p>你好帅</p>
    {{ APP }}
</body>
</html>
```

nuxt.config.js

```js
module.exports={
    css:["@/assets/commen.css"],
    head: {
        titleTemplate: '%s - Nuxt.js',
        meta: [
          { charset: 'utf-8' },
          { name: 'viewport', content: 'width=device-width, initial-scale=1' },
          { hid: 'description', name: 'description', content: '李海' }
        ]
      }
}
```

#### 默认布局

在`layouts`文件下创建自定义的布局

`layouts/res.vue`扩展

`<nuxt/>` 用于显示页面中主体的内容

```html
<template>
    <div>
        <p>好帅 </p>
          <nuxt />
    </div>

</template>
```

使用布局：

```js
export default{
    layout:"布局文件名"
}
```

#### 错误页面

编辑`layouts/error.vue`,制作错误页面

该页面可以不用`<nuxt/>`标签，

`layouts/error.vue`

```html
<template>
  <div class="container">
    <h1 v-if="error.statusCode === 404">页面不存在</h1>
    <h1 v-else>应用发生错误异常</h1>
    <nuxt-link to="/">首 页</nuxt-link>
  </div>
</template>
export default{
props:["error"]
}
```

#### 配置head

```html
<template>
  <h1>{{ title }}</h1>
</template>
<script>
  export default {
    data() {
      return {
        title: 'Hello World!'
      }
    },
    head() {
      return {
        title: this.title,
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: 'My custom description'
          }
        ]
      }
    }
  }
</script>
```

在`nuxt.config.js`文件中有对mate的配置，为了覆盖该文件中的meta，`在组件中的hid要使用与父级相同的去覆盖`

### 异步数据 

nuxt增加了一个方法`asyncDate`，在设置组件数据之前能异步的获取数据 

第一个参数接收一个当前页面的上下文对象

**限于页面组件**

组件每次加载之前调用。在路由更新之前被调用

> asyncDate是在组件初始化之前被调用的，所以`this`无法获取组件的实例对象

它可以用`Promise`或`async和await`进行异步请求

```js
data:(){
    retrun {
        msg:"",
            
    }
}
asyncDate(){
    return axios.get("..").then(
        res=>{
            return {info:res.data}
        }
    );
}
```

asyncDate返回的数据相当在`data`添加了一个新数据 

```js
data:(){
    return {
        msg:'',
        info:res.data
    }
}
```

#### 访问动态路由数据

```js
asyncDate({params}){
    ...
}
```



### 静态资源文件 

```html
<img src="../statc/..">
```

使用`..`打包后可能会出问题，所以建议用`~/`

```html
<img src="~/statc/..">
```



静态资源需要Webpack构建编译处理时，文件放于`assets`。例如：css文件，js文件。不需要时放于`static`目录下，如：图片，icon

```html
<!-- 引用 static 目录下的图片 -->
<img src="/my-image.png" />

<!-- 引用 assets 目录下经过 webpack 构建处理后的图片 -->
<img src="~/assets/my-image-2.png" />
```

