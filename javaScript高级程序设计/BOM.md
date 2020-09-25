## 浏览窗口大小

`document.docmentElement.clientWidth`和`document,documentElement.cliement.clientHeight`

保存了页面视口，

在ES6d在标准模式下才有用。在混杂模式下，需要用`document.body.clientWidth`和`document.body,clientHight`;

```js
//=>兼容EI
var clientWidth = document.documentElement.clientWidth || document.body.clientWidth;
var clientHeight = document.documentElement.clientHeight || document.body.clientHight;              
```

## 定时器

定时器调用的代码都是在全局作用域环境中被调用的，因此函数this指向window对象，在严格模式下是undefined

## 对话框

`alert(),confirm(),prompt()`三种方法

`alert()`弹出一个对话框，只有一个确定按钮，表示浏览器不可控制事件

`confirm()`弹出对话框，一个确定按钮，一个取消按钮，用户选择后返回一个boolean类型

`prompt()`弹出对话框，一个确定按钮，一个取消按钮,并且会显示一个文本输入域，供用户输入。并返回用户输入文本框的内容。可接收两个参数，文本提示与文本框默认内容

```js
alert("你好")；
confirm("今天吃了吗");
prompt("今天吃了什么","大白菜");
```

## location对象

它既是window对象的属性，也是document对象的属性

> **window.location === windon,location**

用于处理URL解析为独立的片段

* location.assign()方法接收一个URL参数并跳转到新地址，浏览器的历史记录中会保存该地址

```js
location.assign("https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/iframe");

//=>下面方法相当于直接调用了location.assign();方法

location.href = "https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/iframe"
window.location="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/iframe"
```

* replace()与assign()类似，不同处在于浏览器不会生成一条记录保存。意味着不能在重新返回上一个页面

```js
location.replace         ("https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/iframe");
```

* reload()重新加载页面

不传参数：从浏览器缓存中重新加载

传入true：从服务器重新加载