##  浏览器模块化问题

1. 模块化文件过多，会增加ajax请求次数，降低了页面访问效率
2. 兼容性问题，浏览器目前只支持ES6模块化，还存在兼容性问题
3. 工具问题：浏览器不支持npm下载的第三方包

问：为什么在浏览器端这么多问题，而node端没有那么突出？

答：node运行在本地，可以读写本地文件。而浏览器文件是布属在远程服务器上，需要进行远程通信，影响效率



## webpack安装与使用

命令`npm i -D webpack webpack-cli`安装 

**使用**

```sell
npx webpack
```

在项目根目录下运行`npx webpack`，自动在src目录下找==index.js==作为入口文件，生成dist目录,==main.js==。

**可指定打包模式：**

```
npx webpack --mode=production //生产环境（已经可以放在服务器运行），全部压缩后的代码，


npx webpack --mode=development//开发环境，便于调试
```

也可配置放入==package.json==文件中,将下面对象内的属性配置下

```
 "scripts": {
 	"build":"webpack --mode=production",
    "dev":"webpack --mode=development"
 },
```

这样配置后只要命令`npm run dev`或`npm run build`



## 编译结果分析

在webpack中将==src文件夹==下的所有模块文件全部进行打包，用一个对象a储存，以模块的相对src文件夹的相对路径作为对象的属性名，模块内的代码用node环境读取放入到一个函数中，该函数作为属性的值。

webpack打包后的文件是一个`main.js`文件,里面是一个立即执行函数，对象a作为参数传入，

这样做的目的是==防止变量污染==

src文件夹下文件有：

index.js

```js
console.log("index");
var a = require("./a.js");
```

a.js

```js
console.log("a");
module.expoxts.a = "a";
```

仿写webpack的main.js文件

```js
(function (module) {
    var moduleExport = {};
    
    
    //需要自己构造一个require函数 
    function require(filePath) {
        //检查是否缓存了
        if(moduleExport[filePath]){
            return moduleExport[filePath]
        }
        if (module[filePath]) {//如果存在要请求的模块
            var fun = module[filePath];
            //执行模块函数,函数需要三个参数
            var modules = {
                export: {}
            }
            fun(modules, modules.export, require);
            var result = modules.exports;//得到模块导出的结果
            moduleExport[filePath] = result;//缓存起来
            return result;//返回导出结果
        }
    }
    
    //在立即执行函数中，webpack会先找入口文件
    require("./src/index.js");//默认以index.js作为入口文件
    
})({//webpack会在node环境中，对src文件夹下的每个模块进行读取，以唯一的相对路径作为属性，模块文件中内容，放入一个函数中，将该函数作为值
    "./src/a.js": function (modules, expoxts, require) {
        console.log("a");
        var b = require("./src/.js")//此处也会进行处理，路径换成相对路径
        modules.export.a = "a";
    },
    "./src/index.js": function (modules, expoxts, require) {
        console.log("index")
        var a = require("./src/a.js");//处理下
    }
})
```

webpack打包的main.js文件中，模块文件中的代码是放在`eval()`中,参数名更换了下，但本质没有没化

![image-20200512102700096](D:\编辑器\Typora\markdown\webpack\image-20200512102700096.png)

在eval()中最后为=>`//# sourceURL=./src/web.js?"`,这样写是为了方便调试



## 配置文件

webpack有很多cli支持的参数，例如`--mode`, 一般用配置文件来控制webpack的行为

默认情况下，`npx webpack`会读取webpack.config.js文件作为配置文件，也可用`npx webpack --config xx`来指定某个指定配置文件

配置文件中通过CommonJs模块==导出一个对象==，对象中的各种属性对应不同的webpack配置

**注意：配置文件中的的代码，必须是有效是node代码**

**面试题:**

问：在webpack.config.js文件中为什么用ES6模块化导出会报错？，它不是支持多种模块吗？

![image-20200512141637966](C:\Users\li2322873900\Desktop\markdown\webpack\image-20200512141637966.png)答：在我们打包自己写的源代码时，只是分析依赖关系，并不会运行。只有打包完成后拿到的main.js文件才是要运行的代码。

webpack打包过程是在node环境下，而配置文件webpack.config.js会被运行。node只支持commonJs，所以用ES6模块化导入导出会报错。打包完的文件main.js与配置文件不在有关系

* 基本配置

1. mode:编译模式，取值为development或production,
2. entry:入口，指定入口文件
3. output:出口，指定编译完成后的文件

webpack.config.js文件

```js
module.exposts={//用module={}导出没有用，控制台警告
    mode:"development"
}
```

## devtool

用于在webpack的配置文件设置调试 `source map`,打包时的构造

具体可查阅<a href ="https://www.webpackjs.com/configuration/devtool/">官网</a>

webpack.config.js

```js
module.exposts={//用module={}导出没有用，控制台警告
    mode:"development",
    devtool:"none"//默认值 
}
```

## 出口与入口

* 出口配置

webpack.config.js

```js
var path = require("path");
module.exports = {
    mode:"development",
    output:{
        //考虑到用D:\\hai\\...\\target容易写死，即需用node中path模块
        path：path.resolve(_dirname,"target")//必须配置一个绝对路径，表示资源放置的地方
    	
    	//第二参数
    	filename:"bundle.js"//配置合并的js文件规则，也可写script/bundle.js
    }
}
```

* 入口配置

webpack.config.js

```js
module.exports = {
    mode:"development",
    //entry:"./src/index.js",有时候这样写会自动转换成下面的写法
    entry:{
        main:"./src/index.js",//默认情况下这样写， 属性名：chunk的名称，属性值：入口模块（启动模块）
        
        //可以多个入口模块
        a:"./src/a.js" //多个入口模块会创建多个chunk文件，会造成创建多个bundle.js(出口配置与上面一样)冲突报错，此时需要动态配置出口    
    },
     output:{
         path：path.resolve(_dirname,"target"),
    	 filename:"[name].js"//动态创建替换name
    }
}
```

* 总的hash值，用于解决浏览器缓存问题，或者使用chunkhash，修改某个chunk文件chunkhash会改变，每一个chunk文件互不影响

```html
<script src="./main.js"></script>
```

在html文件中引入了一个main.js文件，浏览器会将该文件进行**缓存**。如果我们修改了打包文件的内容后，main.js文件名没有变，浏览器依然使用未修改的main.js文件（已经缓存）。

**解决：**

在出口配置设置哈希值hash,main+hash(哈希值).js，每次的文件名不同，浏览器会重新缓存 

hash:在修改文件内容时都会生成一个字符串（唯一）

```js
module.exports = {
    mode:"development",
    //entry:"./src/index.js",有时候这样写会自动转换成下面的写法
    entry:{
        main:"./src/index.js",//默认情况下这样写， 属性名：chunk的名称，属性值：入口模块（启动模块）
        
        //可以多个入口模块
        a:"./src/a.js" //多个入口模块会创建多个chunk文件，会造成创建多个bundle.js(出口配置与上面一样)冲突报错，此时需要动态配置出口    
    },
     output:{
         path：path.resolve(_dirname,"target"),
    	 filename:"[name][hash].js"//动态创建替换name,设置hash值 
         //filename:"[name][chunkhash].js"运用chunkhash
    }
}
```

![image-20200515151917384](C:\Users\li2322873900\Desktop\markdown\webpack\image-20200515151917384.png)

![image-20200515152444065](C:\Users\li2322873900\Desktop\markdown\webpack\image-20200515152444065.png)

## loader

**loader:**loader本质上是一个函数,它的作用将某个源码字符串转换成另一个源码字符串返回

![image-20200516142051729](C:\Users\li2322873900\Desktop\markdown\webpack\image-20200516142051729.png)

loader函数将在模块解析的过程中被调用，以得到最终源码

loader函数处理位置：

解析过程中：读取文件之后，抽象语法树(AST)之前

loader.js文件

```js
module.exports = function(code){
    return "var i= 1";
}
```

* 配置

webpack.config.js

```js
module.exports = {
    mode:"development",
    module:{
        //规则都是从下往上匹配
        rules:[
            {
                test:/index\.js$/ //正则表达式，匹配模块的路径
           		use:[
                {
                loader"./loader/index.js"//加载器路径
            	}
                ]//每个加载器路径
            }//规则1
            //{}//规则2
        ],//模块匹配规则 
    }
}
```

* loader练习

loader函数返回`.css文件`内容

./loader/loader.js，loader函数返回字符串

```js
module.exports = function (code){
     return ` var style = document.createElement("style");
 			  style.innerHTML = \`${ code} \`;
 			  document.head.appendChild(style);`;
}
```

./src/index.css

```css
body{
    height:100%;
    background-color:aquq;
}
```

./src/index.js

```js
require("./index.css");
```



webpack.config.js

```js
var path = require("path");
module.exports = {
    mode: "development",
    module: {
        rules: [
            {
                test: /\.css$/,//匹配.css文件
                use: [{
                    loader: "./loader/loader.js
                }]
            }
        ]
    },
    entry: {
        //创建两个chunk文件
        main: "./src/index.js",
    },
```

打包后的main.js

![image-20200516153741795](C:\Users\li2322873900\Desktop\markdown\webpack\image-20200516153741795.png)

有该loader函数返回的字符串，用`<srcipt src="">`引入main.js，就有相对应的css样式了。

## plugin

loader的功能定位是转换代码，而一些其他的操作难以使用loader完成，比如：

* 当webpack生成文件时，顺便多生成一个说明描述文件
* 当webpack编译启动时，控制台输出一句话，表示webpack启动了

这些类似功能需要把功能嵌入到时webpack的编译流流程中，而这种事的实现是依托于plugin的



plugin的本质是一个带有apply方法的对象

```js
var plugin = {
    apply:function (compiler){
        
    }
}
```

习惯上，我们会将该对象写成构造对象的模式

./plugin/plugin.js

```js
class Myplugin{
    apply(compiler){
        console.log("plugin")
    }
}

```

配置

webpack.config.js

```js
var myPlugin = require("./plugin/plugin.js");
module.exports = {
    mode:"development",
    plugins:[
        new myPlugin()
    ]
}
```

`apply`函数会在创建`compiler`对象之后才运行

在wbpack.config.js中文件中，

```js
modlue.exports = {
    mode:'development',
    plugins:[
        new myPlugin()
    ]
}
```

`compiler`对象是在初始化阶段构建的，整个webpack打包期间只有一个`compiler`对象，后续塞饭打包工作的是`cpmiler`对象内部创建的

`apply`类似于window.load函数，用于注册事件

`compiler`用勾子函数监听

## 区分环境

针对生产环境和开发环境分别书写webpack配置

webpack允许配置不仅可以是一个对象，还可以是一个函数 

```js
//这样就可以在函数中进行判断，是用开发环境打包，还是生产环境打包
module.exports = env =>{
    return {
        //配置内容可以写在另外的文件中，在用commonJs导入
        //配置内容
    }
}
```

在调用webpack函数时，webpack会向函数传入一个参数env，该参数的值来自于webpack命令中给env指定的值，

```js
npx webpack --env abc //env："abc"

npx webpack --env.abc //env:{abc:true}
npx webpack --env.abc=1 //env:{abc:1}
npx webpack --env.abc = 1 --envbcd = 2 //env:{abc:1,bcd:2}
```

我们可以在命令中指定环境，用env参数进行判断，根据环境返回不同的配置结果 

## 其他配置

* context

```js
context:path.resolve(_dirname,"src")//entry:{main:"./index.js"}//该配置不需要entry等文件路径中反复写./src/...
```

影响入口和loader的解析，入口和loaders的相对路径会以context的配置作为基准路径。

* output

  * library

  ```js
  output:{
      library:"abc"
  }
  ```

  将打包过后的main.js文件中的自执行的函数返回的东西给abc

  * libraryTarget

  ```js
  output:{
      library:"abc",
       libraryTarget:"commonjs"
  }
  ```

  与library配套使用，

  可用值有：

  * var :默认值，暴露给普通变量
  * window：暴露给window对象的一个属性
  * this:暴露给global的一个属性
  * commonjs：暴露给exports的一个属性
  * 其他...

  打包后的main.js

  ```js
  export["abc"] = (function(){
      ...
  })()
  ```

  * target

  设置打包结果最终要运行的环境，常用值有

  默认值："web"： 打包后的代码运行在web环境中

  node:打包后的代码运行在node环境中

  其他：自行文档

* resolve

  * modules改变webpack查找文件位置

  ```js
  //在webpack中查找文件与node一样，先看node_module
  resolve{
      modules:["abc"]//模块查找位置,改变查找位置
  }
  ```

  * extensions补全后缀名

  当解析模块时，遇到无具体后缀的导入语句，例如`require("test")`,会依次测试它的后缀名

  ​     test.js

  ​	 test.json

  ```js
  resolve{
      modules:["abc"]//模块查找位置,改变查找位置
      extensions:[".js",".json",".css",".vue"]
  }
  ```

  

  面试题：

  ./src/index.js

  ```js
  require("./a");
  
  //为什么没有书写后缀名，仍然可以找到a.js
  //答1：因为会自动补全后缀名
  //答2：因为node会自动补全后缀名  [错误]webpack打包过程中不运行文件
  //答3：因为webpack配置的extensions会自动补全后缀名
  ```

  * alias别名，导入语句中可以加入配置的键名

* externals

适用于一些第三方库来自外部CDN的情况，这样一来，即可以在页面中使用CDN，又让bundle的体积变得更小，还不影响源码的编写

```html
<!--在页面中已经引入了jquery-->
<script src="...jquery"></script>
//在webpack打包中不需要在次将jquery源码打包进入main.js中
```

* stats

控制台输出信息