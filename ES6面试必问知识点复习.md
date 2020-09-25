# ES6面试必问知识点复习 
>课程视频保存在百度网盘中，想看的自取<a herf="https://pan.baidu.com/s/1gUP_Sh8mTRCwZ56vNV7yzQ">https://pan.baidu.com/s/1gUP_Sh8mTRCwZ56vNV7yzQ</a>  
提取符：svl7 
## Symbol  

> ES6中新加入的唯一值，原始数据类型(基本数据类型)    


* 唯一属性：防止同名属性，及被改写或覆盖
* 消除魔术字符串：在代码中多次出现，
```javascript
let m = Symbol();
let n = Symbol();
m === n //fales
```   
做私有属性
```javascript
let n = Symbol("N");
let obj = {
	[n]:'Symbol'
}
```  
消除魔术字符串 (宏管理) 
```javascript  
//如果代码量大，在写字符串时写错一个字母就很难找到错误点在哪？
function reducer(action){
	let state = {
		count:0
	}
	switch(action.type{
	    case:'mol':
		    state.count++;
		    break;
	}
	return state;
}

reducer({
	type:'mol'
})
-------------------
//=>解决方法
let prop = Symbol('mol'); //Symbol是原始值，不是引用值
function reducer(action){
	let state = {
		count:0
	}
	switch(action.type{
	    case:prop:
		    state.count++;
		    break;
	}
	return state;
}

reducer({
	type:prop
})
```    
### 特征：
Symbol不能隐式转化  
```js
let a = Symbol();
a+1//报错
a+''//报错
```  
Symbol不能被遍历  
```js
let obj = {
	name:'a',
	age:20,
	[Symbol('a')] : 20
}
//for in迭代/Object.keys/Object.getOwnPropertyNames/JSON.stringify的时候不能遍历Symbol属性  

JSON.stringify(obj);//"{"name":"a","age":20}" 自动跳过Symbol属性

Object.getOwnPropertySymbol(obj)//此方法可以拿到Symbol值  
```  
### 内置Symbol值  (公开符号)
* Symbol.hasInstancel    instanceof方法实现的底层方法
```js
let arr = [1];
arr instanceof Array; //true 

Array[Symbol.hasInstance](arr);//与上面等阶， instanceof方法底层就是由Symbol.hasInstancel实现的  
```   
* Symbol.isConcatSpreadable 改变数组拼接方式
```js
//Symbol.isConcatSpreadable 改变数组的拼接方式  
let a = [1];
let b = [2];
a.concat(b);//[1, 2]

a[Symbol.isConcatSpreadable] = false;
a.concat(b);//[Array(1), 2]
```  
* Symbol.iterator 可迭代  
>能被 for...of.. 遍历的对象  
>可迭代对象：拥有Symbol.iterator属性  
```js
let obj = {
	0：1,
	1：2,
	length:2,
	[Symbol.iterator]:Array.prototype[Symbol.iterator]
};//对象是不可迭代的，但是添加Symbol.iterator属性后可以迭代  

for(let val of obj){
	console.log(val);
}
```  
* Symbol.toPrimitive强制类型转化  
> 在一个对象中如果有Symbol.toPrimitive属性，在进行类型转化时，会优先执行该方法。没有时，才会考虑转化的类型是会什么？若转化不是字符串，则用valueOf()。其于用toString()    

```js
let a = {
	value:0,
	[Symbol.toPrimitive](hint){
		console.log(hint);
	}
}
a==11 && a==3
```  
* Symbol.toStringTag 控制```原型或实例```的[Object __]字符串化时使用的字符值 
```js
function fn (){}
let a = new fn();
a.toSting();//"[object Object]"

fn.prototype[Symbol.toStringTag] = 'fn';
a.toSting();//"[object fn]"
```  

## Generator生成器/Iterator迭代器及实战应用  

```js
//=>迭代器是新的数据结构:next()
let arr =[10,20]
let it=Array.prototype[Symbol.iterator](arr);//得到一个迭代器
it.next();//{value:10,done:fales}
```  
```js
//迭代器原理代码
function creatIterator(items){
	let i = 0;
	return {
		next(){
			let done = items.length>i;
			let value = items[i++];
			return {
				done,
				value
			}
		}
	}
}
```  
* 生成器Generator函数   
```js
function *gen(){
	yield 1;
	yield 2;
}
let g = gen();//生成一个迭代器(迭代器中有琴next方法)
g.next();//{value:1,done:fales};
g.next();//{value:2,done:fales};
g.next();//{value:undefiend,done:true}

//=>每调用一次next方法，gen函数就执行一个yield语句。生成器完整执行到结束，next调用次数比yield语句多一次
```  

## promise(异步)  
> 管理异步编程：防止回调地狱  
```js
function promiseFn(){
	return new Promise((resole,reject)=>{
		setTimeout(()=>{//异步，要等待全部的同步代码执行完成都会执行异步代码
			resole(1)
		},1000)
	})
}

//>要想promise成功拿到结果，必须要等promise中的代码执行完成
promiseFn().then(res=>{
	console.log(res);//1
})

//>或者用async/await (await必须在async中使用，否则报错)
async function getDate(){
	await promiseFn();
}
```  

*  async/await底层实现是基于Generator生成器实现的

