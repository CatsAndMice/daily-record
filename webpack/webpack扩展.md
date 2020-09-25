插件：npm

* clean-webpack-plugin：删除哈希值已经修改的文件，（不要手动删除）

* html-webpack-plugin:自动生成html文件引入打包好的js文件

* copy-webpack-plugin:复制静态资源到目的位置，例如图片



* webpack官方出品：

不是loader也不是plugin

webpack-dev-server：减少开发阶段调试步骤。类似于VsCode插件live-server服务器

1. 安装 
2. 运行`npx webpack-dev-server`

当我们执行`webpack-dev-server`命令后，它做以下操作：

1. 内部执行webpack命令，传递命令参数

```shell
npx webpack-dev-server --config a.js
-->传递
npx webapck --config a.js
```

2. 开启watch
3. 注册钩子

4. 用express开启一个服务器，监听某个端口，当请求到达后，根据请求的路径，给予相应的资源内容

**配置**

具体查看官方文档https://www.webpackjs.com/configuration/dev-server/#devserver

配置写在webpack.config.js文件中

webpack.config.js

```js
module.exports = {
    mode:"development",
    devServer:{
        post:8000,//端口号
        proxy:{//代理规则 
            "/api":{//前面的属性名是一个正则,表示请求地址中有/api就跳转"http://open.."
                target:"http://open..",
                changeOrigin:true//更改请求头中的host和origin
            }
        }
    }
}
```



* file-loader:生成依赖的文件到输出目录，然后将模块文件设置为：导出一个路径

```js
function  loader(code){
    //code:文件内容（图片内容 buffer）
    //1.根据buffer生成一个base64编码
    //2.返回一段代码，export default "文件名"
}
```



* url-loader:将依赖的文件转换为：导出一个base64格式的字符串

```js
function  loader(code){
    //code:文件内容（图片内容 buffer）
    //1.根据buffer生成一个base64编码
    //2.返回一段代码，export default "base64编码"
}
```



##  webpack中使用less

less-loader将less文件转换成css文件



