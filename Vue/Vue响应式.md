## Vue响应式1

> 数据变化，页面就会重新渲染

```js
const myVue = new Vue({
    el:"#add",
    data:{
        msg:"Hello Vue"
    }
})
console.log(myVue);
```

传入Vue构造函数的参数中data中的属性是挂在实例对象上的，目的是为了实现响应式，监控数据变化

```js
function Vue(opt){
    if(opt.data){
        getProp.call(this);
    }
}
function getProp(obj){
    var arr = Object.keys(obj);
    for(var i=0;i<arr.length;i++){
        this.arr[i] = obj[arr[i]];
    }
}
```



当输出Vue实例对象时，该对象中用`$`开头的方法，较低版本有`_`开头的方法。但新版中并没有以`_`开头的方法了

> 以`$`开头是我们可以调用的接口方法，以`_`或没有以`$`开头的方法是防止变量冲突



**问题：**在更改数据后，页面会立即渲染吗？

> 不会。页面渲染的操作是异步执行的,渲染要等所有的同步代码执行完才会开始渲染

```js
const myVue = Vue({
    el:"#app",
    data:{
    	num:0//执行完for循环后i变成了9999,然后才渲染
	}
})
for(var i=0;i<1000;i++){
  myVue.num++;  
}
```

```js
//=>$el:vue控制Dom

const myVue = new Vue({
     el: "#add",
     data: {
         msg: "Hello Vue"
     }
 })
 myVue.msg = "Hello jquery";
 console.log(myVue.$el.innerHTML);//Hello Vue
 myVue.msg = "Hello Bootrap";
 console.log(myVue.$el.innerHTML);//Hello Vue

//=>要等同步代码执行完都会重新渲染，
```



> $nextTick() vue实例方法，当页面渲染完后会立即执行该方法, 可以当promise使用

```js
  const myVue = new Vue({
      el: "#add",
      data: {
          msg: "Hello Vue"
      }
  })
  myVue.msg = "Hello jquery";
  console.log(myVue.$el.innerHTML);
  myVue.msg = "Hello Bootrap";
  console.log(myVue.$el.innerHTML);
  myVue.$nextTick(()=>{
      console.log(myVue.$el.innerHTML);//Hello Bootrap
  })
```

> Vue.nextTick() 与上面方法一样，只是this指向不同

```js
 const myVue = new Vue({
      el: "#add",
      data: {
          msg: "Hello Vue"
      }
  })
  myVue.$nextTick(function(){
      console.log(this)//Vue {_uid: 0, _isVue: true, $options: {…}, _renderProxy: Proxy, _self: Vue, …}
  })
  Vue.nextTick(function(){
      console.log(this)//Window {parent: Window, postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, …}
  })
```



**nextTick()方法兼容现实**

微任务：

* Promise.resolve.then()
* MutationObserver   

宏任务：

* setTimeout  

```js
if(typeof Promise !=="undefined"){
    
}else if(typeof MutationObserver !=="undefined"){
    
}else{
    //setTimeout
}

```

<!--messageChannel 被取消了-->

**Vue问题：**

如果在大型项目中程序繁杂，渲染页面就要等待同步伐树执行完。花的时间越长渲染阻塞就越长。不打算解决了，适用于中小开项目

在react中，只要有时间就渲染，适合用于大型项目



## 修改数据渲染中的坑

* 数组
  1. 用数组索引修改数组中的数据不会重新渲染
  2. 用length属性来修改数组中的数据不会重新渲染
* 对象
  1. delete删除属性时不会重新渲染
  2. 增加属性时不会重新渲染

```js
const myVue = new Vue({
    el: "#add",
    data: {
        arr: ["vue", "react"],
        obj: {
            name: "Vue",
            age: 10
        }
    }
})
myVue.arr[2] = "jquery";//不会重新渲染
myVue.arr.length = 0;//不会重新渲染
```

```js
 const myVue = new Vue({
     el: "#add",
     data: {
         arr: ["vue", "react"],
         obj: {
             name: "Vue",
             age: 10
         }
     }
 })
 delete myVue.obj.age;//不会重新渲染
 myVue.obj.wife = "li"//不会重新渲染
```

解决：

1. 数组

使用数组方法修改数据:push,pop,shift,unshift...

Vue实例对象上的`$set`修改，`$delete`删除。在Vue构造函数上也有这两方法，作用一样

2. 对象

`$set`,`$delete`是专门操作对象数据准备的，数组也是对象因此也能使用，但更多是是用数组自身的方法

```js
 const myVue = new Vue({
     el: "#add",
     data: {
         arr: ["vue", "react"],
         obj: {
             name: "Vue",
             age: 10
         }
     }
 })
 //=>这样的操作都会重新渲染页面
 myVue.arr.push("jquery");
 myVue.arr.shift();
```



```js
 const myVue = new Vue({
     el: "#add",
     data: {
         arr: ["vue", "react"],
         obj: {
             name: "Vue",
             age: 10
         }
     }
 })
 console.log(myVue);
 myVue.$set(myVue.obj, "wife", "li");//重新渲染
 myVue.$delete(myVue.obj, "age")//重新渲染
```



### Vue响应式原理

```js
 /*
     Object.defineProperty 实现响应式劣势:
         1.监听不到对象的增删
         2.监听不到数组长度的改变
         3.天生需要递归 
         4.监听不到数组不存在索引的变化 
     
 */
 var obj = {
     name: "",
     obj1: { age: 10 },
     arr: [1, 2, 3]
 }
 var arrPro = Array.prototype//数组原型对象
 var newObj = Object.create(arrPro);//创建一个以数组原型为原型的对象
 //=>Vue中数组方法被重新定义了，所以被叫做变异方法
 //push、pop、shift、unshift、splice、sort、reverse
 ["push", "pop", "shift", "unshift", "splice", "sort", "reverse"].forEach((prop) => {
     newObj[prop] = function () {//重新定义方法覆盖原型对象的方法
         arrPro[prop].apply(this, arguments);//借助数组原型中的方法执行，改变了this指向
         rander();//每次调用变异方法就渲染页面一次
     }
 })
 function hander(data) {
     if (Array.isArray(data)) {//如果是数组就不用执行下面操作了
         data.__proto__ = newObj;//改变传入数组原型改变成我们自己定义的
         return;
     }
     if (typeof data === "object") { //判断传入的数据是否是对象
         for (var prop in data) {
             defData(data, prop, data[prop]);
         }
     }
 }
 function defData(data, key, value) {
     hander(value);
     Object.defineProperty(data, key, {
         get() {
             console.log("读");
             return value
         },
         set(val) {
             console.log("写");
             value = val;
             rander();
         }
     })
 }
 function rander() {
     console.log("渲染页面");
 }
 //修改方法
 function $set(data, prop, val) {//三个参数
     if (Array.isArray(data)) {
         //=>此处在调用hander函数时，已经在监听了
         data.splice(prop, 1, val)//修改数组的某一项
         return val;
     }
     defData(data, prop, val);
     rander();
     return val;
 }
 function $delete(data, prop) {
     if (Array.isArray(data)) {
         return data.splice(prop, 1);//删除
     }
     delete data[prop];
     rander();
 }
 hander(obj)
 $set(obj.arr, 1, 2);
```

