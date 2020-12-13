## typeScript

### 编译文件

```js
tsc -init
```

生成一个`tsconfig.json`文件

```json
removeComments //去除注释
noImplicitThis //允许注解类型any  不用特意标明
noUnusedLocals //没有用的变量
noUnusedParameters //没有用的方法
```



### 静态类型

```typescript
let count:number = 1;
interface obj {
    name:string,
    age:number
}
let a:obj = {
    name:"李民浩",
    age:20
}
```

#### 基础静态类型

```typescript
let count:number = 996;
const myName:string = "name"
```

#### 对象静态类型

```typescript
const obj:{name:string,age:number} = {
    name:"",
    age:0
}

//字符串数组
const o:string [] = ["lls","njs"];

//类
class Person{}
const dajiao:Person = new Person();

//函数,必须返回一个字符串
const fn:()=>string=()=>{
    return "";
}
```

对象静态类型：对象类型   数组类型  类类型  函数类型

### 类型注解与类型推断

> 如果ts能够自动分析变量类型，我我们什么也不需要做了
>
> 如果ts无法分析变量类型的话，我们就需要使用类型注解

不用类型注解

```js
const one = 1;
const two = 2;
const res = one+two;
```

需要类型注解,只要判断类型为`any`时就需要注解

```js
function get(one:number,two:number){
    return one+two;
}
const res = get(1,2);
```

#### 函数参数与返回注解

```typescript
function get(one:number,two:number):number{
    return one+two;
}
const res = get(1,2);
```

```typescript
//=>不返回值，也要进行注解
function sayHello():void{
    console.log("hell");
}
```

方法永远执行不完：

```typescript
function errFn()：never{
    throw new Error();
    console.log("报错，执行不到此处");
}
```

```typescript
function forNever():never{ //永远执行不完
    while(true){
        console.log("hell");
    }
}
```

坑：

```typescript
//=>代码过不去

function getNum({one:number,two:number}){
    return one+two;
}
const one = getNum({1,2});

//正确注解：
function getNum({one,two}:{one:number,two:numer}){
    return one+two;
}
const one = getNum({1,2});
```

#### 数组注解

```typescript
const numberArr:nuber[] = [1,2,3];
const strArr:string[] = ["a","b"];
const undefinedArr:undefined[] = [undefined,undefined]

const arr:(number | string) = [1,"2"];

//对象数组 
const objArr:{name:string,age:number}[] =[{name:"",age:20},]
//其他写法：

//类型别名
type Lady = {name:string,age:number};
const objArr:Lady[] =[{name:"",age:20}]

//也可以用类的方式
class Dy{
    name:string;
    age:number
}
const objArr:Dy[] =[{name:"",age:20}]
```

### 元组约束

```typescript
const arr:[string,string,number] = ["kk","ss",20]//元组形式后后面的数据第一项必须是字符串，最后一项必须是数字 
```

```typescript
const arr:[string,string,number][] = [
    								 ["kk","ss",20],
                                     ["kk","ss",20]
                                     ["kk","ss",20]
									]
```

### 接口

```typescript
interface init{
    name:string,
    age:number,
    type:string
}

let terObj:init = {
    name:"",
    age:20,
    type:"男"
}

//防止重复定义
function setObj(type:init):void{

}
function getObj(type:init):void{
    
}
```

**接口与类型别名区别：**

```typescript
type dd = string;//类型别名可以用{}定义
```

接口必须需要用`{}`

#### 可选属性

加`?`表示该参数可选

```typescript
interface isOk{
    name:"",
    age:20,
    type:"男",
    like?:string
}
let terObj:init = {
    name:"",
    age:20,
    type:"男"
} 

let terObj2:init = {
    name:"",
    age:20,
    type:"男"，
    like:"玩"
} 

```

`[属性名]`添加额外属性

```ty
interface isOk{
    name:"",
    age:20,
    type:"男",
    like?:string,
    [propName:string]:any
}

let terObj:init = {
    name:"",
    age:20,
    type:"男",
    say:"hell"
} 

let terObj2:init = {
    name:"",
    age:20,
    type:"男"，
    like:"玩",
    wake:"code"
} 
```

方法定义

```typescript
interface isOk{
    name:"",
    age:20,
    type:"男",
    like?:string,
    [propName:string]:any,
    goAdd():string
}
```

#### 接口实现

```typescript
interface gril{
    name:string,
    age:number
}
class Person implements gril{
    name = "";
    age=20;
}
```

#### 接口继承

```typescript
interface gril {
    name: string,
    age: number
}


interface Teacher extends gril {
    teach(): string;
}
class Person implements Teacher {
    name = "";
    age = 20;
    teach() {
       return ""
    }
}
```

### 类

```typescript
//自动注解
class Lady{
    content= "hi";
    sayHello(){
        return this.content;
    }
}
```

#### 访问类型

public：允许在类的内部，外部都可以使用，没有设置访问类型时，默认public

```ty
class Person{
	name:string
}
const p =  new Person();
p.name = "haha";

```

protected:只允许在类的内部使用，继承类也能使用

```typescript
class Lady{
    content = "hi";
    protected age:number
    sayHello(){
        return this.content + this.age;
    }
}

const La =new Lady();
La.age // 报错
```

private：私有属性，只能自己使用

```typescript
class Lady {
    private content = "hi";
    protected age = 20;
    sayHello() {
        return this.content + this.age;
    }
}

class Sun extends Lady{
    run (){
        return this.content;//报错
    }
}

```

#### 类的构造函数

子类的构造函数必须要调用`super()`

#### 针对private的set，get（存取器）

```typescript
//=>给私有属性设置set,get方法后就可以在外部使用
class Lady {
    private age:number;
    constructor(age:number){
        this.age = age;
    }
    get _age (){
        return this.age;
    }
    set _age(val:number){
        this.age = val;
    }
}

const La = new Lady(20);
La._age；
La._age = 25;
```

#### 静态属性

```typescript
class la {
    static age = "lihai";
    static say() {
        return "static";
    }
}
la.age
la.say();
```

可以不需要实例化，直接通过类调用属性；

#### 只读属性

`readonly`关键字将属性设置为只读的。 只读属性必须在声明时或构造函数里被初始化。

```typescript
class Person{
    readonly name:string;
}
let p = new Person();
```



#### 抽象类

`abstract`关键字是用于定义抽象类和在抽象类内部定义抽象方法。

抽象类中定义的抽象方法在继承的子类中要实现这个抽象方法，抽象类中可以定义非抽象方法

```typescript
abstract class Person{
    abstract sayHell():void;
    eat(){
        return "吃东西"
    }
}

class Boy extends Person{
    sayHell(){
        console.log("hello");
    }
}
let b = new Boy ();
console.log(b.eat());
```

### 联合类型

```typescript
interface i1{
	isTrue:boolean,
	sayHell(){
		
	}
}

interface i2{
	isI2:boolean,
	skill:()=>{
	
	}
}

//类型注解在两种以上就是联合类型
function fn(prop:i1|i2){
	prop.skill()//问题： 不能分清prop具体时哪种类型
}
```

#### 类型保护

1. 

```typescript
  if(prop.isTrue){
        (prop as i1).sayHell();
    }else{
        (prop as i2).skill();
    }
```

2. 

```typescript
if("sayHell" in prop){
    prop.sayHell();
}else{
    prop.skill();
}
```

3.  typeof

```typescript
function add (first:string|number,ather:string|number){
    if(typeof first === "string" || typeof other==="string"){
        return `${first}${other}`;
    }
}
```

4. instaceof

```typescript
class Obj {
    count:number
}
function addObj (prop1:object|Obj,prop2:object|Obj){
    if(prop1 instaceof Obj && prop2 instaceof Obj){
        return prop1.count +props2.count;
    }
    return 0;
}
```

### enum枚举

> typeScript新增的，js中并没有

```typescript
//枚举默认会从0开始堆加
enum en{
    one,
    two,
    tree
}
//相同于=>
enum en{
    one = 0,
    two = 1,
    tree = 2
}

//也可以反向预查 
en[0] // one
en.one // 0

//也可以初始化堆加起始值
enum en{
    one = 5,
    two ,
    tree
}
```

### 泛型

```typescript
function join<T>(prop:T,two:T){
    return `$(prop)$(two)`;
}
join<number>(1,2);
join<string>("one","two");
```

数组中运用泛型

```typescript
function join<T>(prop: T[]) {
    console.log(prop);
}
join<number>([1, 2]);
join<string>(["one", "two"]);
```

多个泛型

```typescript
function join<T,P>(prop:T,two:P){
    return `$(prop)$(two)`;
}
join<string,number>("haha",20)
```

泛型类

```typescript
class Person<T>{
    constructor(prop: T) {

    }
}
let p = new Person<string>("haha")
```

继承泛型

```typescript
interface GenericIdentityFn {
    name: string
}
class Person<T extends GenericIdentityFn>{
    constructor(prop: T) {

    }
}
let p = new Person<{ age: number,name:string }>({ age: 20,name:"ahah" })
```

### 命名空间



引入Jquery库

```typescript
declare var $:any;//粗暴方法解决

$(function(){//会出现警告
    
})



```



或下载其他库

```js
npm i @type/jquery;
```

