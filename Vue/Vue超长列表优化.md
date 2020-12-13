一，什么是进程？什么是线程？

> 进程是系统进行资源分配和调度的一个独立单位，一个进程内包含多个线程 

二,渲染进程

* GUI渲染进程(页面渲染)
* js引擎线程(执行js脚本)
* 事件触发线程（EventLoop轮询处理线程）
* 事件(onclick),定时器，ajax(xhr)（独立线程）

> GUI渲染线程与js引擎线程是互斥的

这句话完美的解释了，在`head`中放入大量`script`执行js代码是页面渲染时会出现长时间的白版



**所谓js是单线程的，只是js的主线程是单线程的(防止一个线程加入dom，一个线程删除dom,容易造成混乱)**   

>  html5出现的`worker`可以实现多线程，但在worker创建的线程中是无法操作dom

![image-20201006094610473](C:\Users\li2322873900\Desktop\记录\Vue\image-20201006094610473.png)

1. **js主线程(执行栈)**执行时，将`Promise.then`等微任务放入微任务队列中，把`ajax`等宏任务等到达到要求后，将其放入宏任务队列中。
2. **js主线程(执行栈)**全部执行完成后，清空**微任务队列**的东西
3. **GUI渲染线程**对页面进行渲染
4. 查看**宏任务队列**中是否有任务，有则取出第一个任务放入**执行栈**中执行（每次只会取一个宏任务）

然后重复上面四步，整个过程即为**Eventloop**事件轮询

### 列表优化

```js
// id为一个dom
let start = Date.now();
for(let i = 0;i<10000;i++){
    //新版本浏览器的优化，当js执行完成后会将其一并插入页面中
    let li = document.createElement("li");
    li.innerHTML = i;
    id.appendChild(li);
}
let end = Date.now()
console.log(end-start);//js执行时间

//宏任务执行时，页面已渲染完成
setTimeout(()=>{
    console.log(Date.now()-end);  //渲染的时间
},0)

//=>执行结果很慢，浏览器刷新很久
```

分片优化

```js
// id为一个dom
let tat = 1000,
    index = 0;

function loop(){
    //定时器是个宏任务，它执行时，页面已渲染一次，每次渲染50个
    setTimeout(()=>{
          index += 50;
        //ie浏览器，需要用文档碎片
    	  for(let i=0;i<index;i++){
    			let li = document.createElement("li");
    			li.innerHTML = i;
    			id.appendChild(li);
    		}
        loop();
    },0)
  
}
loop();

//=>分片加载，会导致页面dom过多，页面卡顿
```

虚拟列表优化(只渲染可视区)

```js
//具体代码不列了
```

参考组件<a href = "https://www.npmjs.com/package/vue-virtual-scroll-list">vue-virtual-scroll-list</a>

