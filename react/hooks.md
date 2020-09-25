```js
//=>hooks写法
import React, { useState,useEffect } from "react";
import ReactDom from 'react-dom';
import Index1 from "./index1.js";

function Button(props) {
    console.log(useState);
    const [count, setState] = useState(0);
    const [age,setAge] = useState(18);//不可用在if判断中

    useEffect(()=>{//异步  代替react中的周期函数 ,传入的函数异步调用
        console.log("useEffect");  
    })
    return (
        <div>
            <p>{count}</p>
            <div>{ age }</div>
            <button onClick={() => {
                setState(count + 1);
                setAge(age+1)
            }}>click me</button>
        </div>
    );
}
ReactDom.render(<Index1 />, document.querySelector("#root"));
```

```js
//=>react原生写法

import React, { useState,useEffect } from "react";
import ReactDom from 'react-dom';
import Index1 from "./index1.js";

function Button(props) {
    console.log(useState);
    const [count, setState] = useState(0);
    const [age,setAge] = useState(18);//不可用在if判断中

    useEffect(()=>{//异步  代替react中的周期函数 
        console.log("useEffect");  
    })
    return (
        <div>
            <p>{count}</p>
            <div>{ age }</div>
            <button onClick={() => {
                setState(count + 1);
                setAge(age+1)
            }}>click me</button>
        </div>
    );
}
ReactDom.render(<Index1 />, document.querySelector("#root"));
```

* 父子组件传值

```js
import React, { useState, createContext, useContext } from "react";
import ReactDom from 'react-dom';
const Context = createContext();//创建上下文

function Count() {//子组件
    let count = useContext(Context);//使用上下文
    return (<h3>{count}</h3>);
}

function Button(props) {
    // console.log(useState);
    const [count, setState] = useState(0);
    const [age, setAge] = useState(18);//不可用在if判断中
    return (
        <div>
            <button onClick={() => {
                setState(count + 1);
            }}>加一</button>
            {/* 给子组件传值 */}
            <Context.Provider value={count}>
                <Count />
            </Context.Provider>
        </div>
    );
}
ReactDom.render(<Button />, document.querySelector("#root"));
```



* useReducer

> 与Redux中的reducer一样

```js
import React,{useReducer} from "react";

function ReducerDemo(){
    const [count,dispatch] = useReducer((stat,action)=>{
        switch(action){
            case "add":
                return state+1;
            case "sub":
                return state -1 ;
            default:
                return state;
         }
    },0)//第二个参数是初始值
    
    return (
    	<div>
        <h2>{count}</h2>
        <button onClick={()=>{
        dispatch("add")
    	}}></button>
 		<button onClick={()=>{
        	dispatch("sub")
    	}}></button>
        </div>
    )
}
```



* useMemo

```js
import React, { useState,useMemo } from "react";
import ReactDom from 'react-dom';

function Parent() {
    const [name1, setName1] = useState("小红");
    const [name2, setName2] = useState("小绿");
    return (
        <>
            <button onClick={
                () => {
                    setName1(name1 + new Date().getTime())
                }
            }>小红</button>
            <button onClick={
                () => {
                    setName2(name2 + new Date().getTime());
                }
            }>小绿</button>
            <Children name={name1}>{name2}</Children>
        </>
    )
}

function Children({ name, children }) {
    // console.log(props);
   
    let a = ()=>{
        console.log("更新");
    }
    //父组件改变轻易时都会触发子组件重新渲染
    let b = useMemo(()=>{//如果没有使用useMemo每次切换时，都会触发a函数。
        a()
    },[name])//第二个参数是表示针对某个

    return (
        <>
            <div>{name}</div>
            <div>{children}</div>
        </>
    );

}
ReactDom.render(<Parent />, document.querySelector("#root"));
```

* useRef

```js
import React, { useState,useMemo, createRef,useRef } from "react";
import ReactDom from 'react-dom';

function Parent() {
    const [name1, setName1] = useState("小红");
    const [name2, setName2] = useState("小绿");
    // const ref = createRef();//react获取dom
    const ref = useRef();//hooks获取dom
    return (
        <>
            <button onClick={
                () => {
                    setName1(name1 + new Date().getTime())
                    // console.log(ref.current);//react获取dom
                    console.log(ref);
                }
            }>小红</button>
            <button ref={ref} onClick={
                () => {
                    setName2(name2 + new Date().getTime());
                }
            }>小绿</button>
            <Children name={name1}>{name2}</Children>
        </>
    )
}

function Children({ name, children }) {
    // console.log(props);
   
    let a = ()=>{
        console.log("更新");
    }
    //父组件改变轻易时都会触发子组件重新渲染
    let b = useMemo(()=>{//如果没有使用useMemo每次切换时，都会触发a函数。
        a()
    },[name])//第二个参数是表示针对某个

    return (
        <>
            <div>{name}</div>
            <div>{children}</div>
        </>
    );

}
ReactDom.render(<Parent />, document.querySelector("#root"));
```

* 自定义hooks函数 

```js
import React, { useState, useEffect, useCallback } from "react";

function useWinSize() {
    const [size, setSize] = useState({
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
    })

    const onResize = useCallback(() => {//自定义
        setSize({
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
        })
    }, [])

    useEffect(() => {
        window.addEventListener("resize", onResize);
        return () => {//组件销毁时触发
            console.log(1);
            window.removeEventListener("resize", onResize)
        }
    }, [])
    return size
}

function Index(params) {
    let size = useWinSize();
    return (<div>width:{size.width},
                height:{size.height}
    </div>);
}

export default Index;
```

