# 浏览器储存

cookie存储数据功能难以满足开发需求，逐渐被webStorage,IndexedDB取代，

HTML5 中新引入的浏览器存储方式 localStorage, sessionStorage, indexeDB 

## sessionStorage

 sessionStorage的使用：存储的容量5mb左右
   1. 这个数据本质是存储当前页面的内存中

   2. 它的生命周期为关闭当前页面，关闭页面，数据会自动清除

         

         setItem(key,value):存储数据，通过指定名称key获取对应的value值 

         getItem(key):获取数据，通过指定名称key获取对应的value值

         removeItem（key）:删除数据，通过指定名称key删除对应的值

         clear（）：指定所有存储的内容

         ## localStorage

         只能存储字符串，如果存储了一个数组，返回时也是一个字符串。但是可以用JSON转换成字符串

         1. 存储内容大概5mb
         2. 不同浏览器不能共享数据，相同浏览器不同窗口中可以共享数据
         3. 永久生效，它的数据存储在硬盘上，并不会随着页面或者浏览器的关闭而清除

          setItem(key,value):存储数据，通过指定名称key获取对应的value值 

          getItem(key):获取数据，通过指定名称key获取对应的value值

          removeItem（key）:删除数据，通过指定名称key删除对应的值

          clear（）：指定所有存储的内容

         

         **localStorage与cookie的区别：**

         1. localStorage在发送请求的时候不会把数据发出去，cooKie会把所有数据带出去
         2. cookie存储内容比较少4k，localStorage可以存放较多的内容，5M左右     
            

**localStorage,sessionStorage区别：**

共同点：都是保存在浏览器端，都遵守同源策略

不同点：在于生命周期与作用域不同



**localStorage,sessionStorage统称为：webStorage**

webStorage：它使用键值对方式存储，只能存储字符串。存储数据量少，



## IndexedDB

用于客户端存储大量结构化数据（包括文件和blobs）。使用索引实现对该数据的高性能搜索。理论上说，IndexedDB无上限（一般来说不小于250m）。存储字符串，还有存储二进制数据 

**特点：**

键值对储存

异步，IndexeDB不会死锁浏览器，用户依然可以进行其他操作，localStorage是同步。异步解决大量数据读写，拖慢网页

支持事务，若操作出错，整个事务取消，数据库回到事务发生之前的状态。

受同源限制，每一个数据库对应创建它的域名。网页只能访问自身 域名下的数据库，而不能访问跨域的数据库。

储存空间大，IndexedDB 的储存空间比 LocalStorage 大得多，一般来说不少于 250MB，甚至 没有上限。

支持二进制，IndexedDB 不仅可以储存字符串，还可以储存二进制数据（ArrayBuffer 对象和 Blob 对象）。

**常见操作：**

建立打开IndexeDb 

```js
var result = indexedDB.open("testDb");//返回一个DB对象
```

onerror: 请求失败的回调函数句柄
onsuccess:请求成功的回调函数句柄
onupgradeneeded:请求数据库版本变化句柄

```js
  function openDB(name) {
      var request = window.indexedDB.open(name); //建立打开 IndexedDB 
      request.onerror = function (e) {
          console.log("open indexdb error");
      };
      
      request.onsuccess = function (e) {
          myDB.db = e.target.result; //这是一个 IDBDatabase 对象，这就是 IndexedDB 对象 
          console.log(myDB.db);//此处就可以获取到 db 实例 }; 
      }
  }
  var myDB = { name: "testDB", version: "1", db: null };
  openDB(myDB.name);
```

关闭IndexeDB

```js
indexeDB.close()
```

删除IndexeDB

```js
-window.indexedDB.deleteDatabase(indexdb)
```

**总结：**

* webStorage是html5专门为浏览器存储而提供的数据存储机制，不与服务器发生通信

* IndexeDB用于客户端存储大量结构化数据 