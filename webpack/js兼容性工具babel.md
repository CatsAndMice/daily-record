# js兼容性工具

## babel的安装与使用

* 安装:

```js
npm i -D @babel/core @babel/cli
```

* 使用：

可在webpack中使用，也可以独立使用

```js
//安文件编译
npx babel 要编译的文件 -o 编译的结果文件 (-w 监制)

//按目录编译
npx babel 要编译的整个目录 -d 编译结果放置的目录
```

* babel配置：

babel本身并没有做任何事，编译要依赖babel插件和babel预设

文件：`.babelrc`

```js
{
    "presets":[],
     "plugins":[]
}
```

* babel预设

预设有很多，最常见的预设是`@babel/preset-env`

`@babel/preset-env`可以让你使用最新的js语法，不需要其他针对每种语法进行具体的插件

文件：`.babelrc`

```js
{
    "presets":["@babel/preset-env"]
}
```

兼容浏览器

`@babel/preset-env`需要根据兼容的浏览器范围来确定如何编译。和postcss一样，可以使用文件`.browserslistrc`来描述浏览顺的兼容范围

```js
last 3 version  //兼容后面三个版本的浏览器
>1%     //市场使用占1%以上
not ie <=8  //兼容ie8以上
```

自身配置

`@babel/preset-env`也要有一些配置

文件：`.babelrc`

```js
{
    "presets":[["@babel/preset-env",{
        "配置1"
    }]
}
```

常用配置项`useBuiltIns`,该配置默认值是false

> 详细配置：https://www.babeljs.cn/docs/babel-preset-env#usebuiltins

该预设仅转换新的语法，并不对新的API进行任何处理

例如：

```js
new Promise((rel)=>{
    resolve();
})
```

转换后的结果为

```js
new Promise(function (rel){
    resolve();
})
```

如果遇到没有Promise构造函数的旧版本浏览器，会报错

`useBuiltins`可以在编译结果中注入新的API，它的值默认为false，表示 不在注入任何API,可以将其设置为`usage`,按需导入API,会从另一个库中导入一个promise函数 

.babelrc

```js
{
    "presets":[["@babel/preset-env",{
        "useBuiltIns":"usage",
        "corejs":3
    }]
}
```



要安装这个库：

```js
npm i core-js
```

还有一些`ansyc`等特殊语法要另一个库也要安装 

```js
npm i regenerator-runtime
```

* babel插件

> @babel/polyfill已过时，目前被`core-js`和`regenerator-runtime`取代

使用插件的前提：

通常下，`@babel/preset-env`只转换已形成正式标准的语法，对于处于前期阶段，还有没有确定的语法不做转换。

如果要用到这些语法，就要单独使用插件



除了预设可以转换代码之外，插件也可以转换代码，它们顺序是：

* 插件在Presets（预设）前运行
* 插件顺序从前往后排列
* Preset顺序是颠倒的（从后往前）

```js
{
    "presets":[
        "a","b"
    ]
    "plugins":["c","d"]
}

//顺序：先插件运行 c->d ,然后预设：b-a
```

插件：https://www.babeljs.cn/docs/plugins



## 在webpack中使用babel

> 查看中文网使用webpack:https://www.babeljs.cn/setup#installation

```shell
npm install -dev babel-loader @babel/core
```

webpack.config.js

```js
module.exports={
    mode:"development",
    devtool:"source-map",
    modeule:{
        rules:[
            {test:/\.js/,use:"babel-loader"}
        ]
    }
}
```

```shell
npm install @babel/preset-env  //安装预设
```

配置`.babelrc`文件

```js
{
    "presets":[[
        "@babel/preset-env",{
             "useBuiltIns":"usage",
             "corejs":3//默认值为2
        }
    ]]
}
```

