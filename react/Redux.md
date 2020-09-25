## Ant Design开源UI库

```js
npm install antd -s
```

```js
import 'antd/dist/antd.css';//引入样式
```

自行查看官网



```js
npm install --save redux
```

### 创建仓库

```js
import {createStore} from "redux";
import reducer from "./reducer.js";//引入管理员
const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()//是否有redux插件                     
                         );//创建仓库
export default store;
```

管理员

```js
const defaultState = {
    inputValue: "write something",
    list: [
        "吵",
        "吕"
    ]
};

export default (state = defaultState, action) => {//action是actionq触发事件
   	//Reducer里只能接受state,不能改变state
    if(action.type="changeInput"){
        let newState=JSON.parse(JSON.stringify(state))//克隆一份
         return state //返回新的数据 
    }
   
}
```



> 解决React数据管理，用于中大型，数据比较大，组件之间数据交互多的情况使用

Store:数据仓库，保存数据的地方

State:state是一个对象，数据仓库所有数据都放在一个state里

Dispathch:将动作触发方法

Reducer:一个函数，通过获取方法，改变数据，生成一个新的state，从而改变页面

```js
import Redux,{createStore} from "redux";
const reducer = function (state={num:0},action){
    if(action.type=="add"){
        ...
    }
    return {...state}//换成新的状态
}

const store = createStore(reducer);//创建仓库

function add (){
    //通过仓库的方法dispatch进行修改数据 
    store.dispatch({type:"add"});//传递的参数会被仓库函数接收到 
}

functioon decrment(){
    //通过仓库的方法dispatch进行修改数据 
    store.dispatch({type:"decrement"})
}
```

初始化数据 

```js
const reducer = function (state={num:0},action){
    if(action.type=="add"){
        ...
    }
    return {...state}//换成新的状态
}

const store = createStore(reducer);//创建仓库

```

获取数据

```js
console.log(store.getState())
```

修改数据 （通过动作修改数据）

```js
store.dispatch({type:"add"})
```

修改视图（监听数据的变化，重新渲染内容）

```js
store.subscribe(()=>{//监听数据改变，改变时会触发该函数
    ReactDOM.render(...,document.querySelector("#root"))
})
```



## Redux-thunk中间件

```js
npm install --save redux-thunk
```

```js
import {createStore,applyMiddleware,compose} from "redux";

import thunk from "redux-thunk";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__COMPOSE__?
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}):compose

const en = composeEnhancers(applyMiddleware(thunk))//增加函数 
const reducer = (state,actioin)=>{
    return newState;
}
const store = createStore(reducer,en);
```

配置流程



## React-redux

```js
npm install react-redux --save
```

概念：

Provider组件：自动将store里的state和组件进行关联