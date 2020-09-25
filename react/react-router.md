## Router

```js
npm install react-router-dom
```



history模式（不发送请求）

```js
import {BrowserRouter as Router,Link,Route} from "react-router-dom";
```



ReactRouter三大组件 ：

Router:所有路由组件的根组件（底层组件），包裹路由规则最外层容器。

属性：basename->设置跟路由路径，router可以在1个组件中写多个。

Route:路由规则匹配组件，显示当前对应的组件 

Like:路由跳转组件

**如果精确匹配，那么可以在route上设置exact属性。**

## Link

to可以用一个字符串，也可以对象

```js
<Link to={
    {
 pathname:"/me",//跳转路径
    search:"?usename=admin",//get请求参数
    hash:"#abc",//设置的Hash的值
    state:{msg:"hello"}//传入组件的数据 
 }
}>
    
 </Link>
```

```js
<Link to="/me" replace></Link>
```

`replace`属性：点击后，将新地址替换成历史访问记录的原地址



## 重定向组件 

如果访问某个组件时，如果要重定向组件，那就会修改路径，

```js
import {BrowserRouter as Router,Link,Route,Redirect} from "react-router-dom";
```

```js
function login(props){
    if(props.login==="success"){
        return (<Redirect to="/admin"></Redirect>)
    }else{
         return (<Redirect to="/login"></Redirect>)
     }
}

class App extends React.Compoent{
    
}
```

## Switch组件 

> 路由匹配时，会全部匹配一下。

让switch组件内容的route只匹配一次，不会在向下匹配



不使用Link跳转

```js
class Chlidran extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (<button onClick={() => {
            this.ClickEvet();
        }}>点击</button>)
    }
    ClickEvet() {
        this.props.history.push("/hash",{msg:"这是由Childran组件发给首页的数据 "})//对url
        // this.props.history.replace("/hash",{msg:"这是由Childran组件发给首页的数据 "})
        
        //前进
        this.props.history.go(1);
        this.props.history.goForward();
        
        //后退
         this.props.history.go(-1);
    	 this.props.history.goBack();
    }
}

class App extends Component {
    render() {
        return (
            <Router>
                <Route path="/index" component={Chlidran}></Route>
            </Router>
        )
    }
}

ReactDom.render(<App />, document.querySelector("#root"));
```

