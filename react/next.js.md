## Next.js

> VUE REACT 单一页面，  首屏加载过慢  不能SEO

Next.js

```sell
npm i --save react react-dom next
```

脚手架create-next-app

```sell
npm i create-next-app
```

利用脚手架搭建

```sell
npx create-next-app dome
```

* 路由跳转

```js
import React from "react";
import Like from "next/link";
import router from "next/router";
function Main() {
    return (<div>
        {/* 标签式跳转 */}
        <Like href="/index2"><a>去index2</a></Like>
        <Like href="/index1"><a>去index1</a></Like>
        <button onClick={() => {
            // 函数式跳转
            router.push("/index1")
        }}>inde1</button>
    </div>)
}
export default Main;
```

* 路由跳转传递参数

index.js

```js
import React from "react";
import Like from "next/link";
import router from "next/router";
function Main() {
    return (<div>
        {/* 标签式跳转 */}
        <Like href="/index2?name=index2"><a>去index2</a></Like>
        <Like href={{
            pathname:"/index1",
            query:{name:"index1"}
		}}><a>去index1</a></Like>
        <button onClick={() => {
            // 函数式跳转
            router.push("/index1")
        }}>inde1</button>
    </div>)
}
export default Main;
```

index1.js

```js
import React from "react";
import Link from "next/link";
import { withRouter } from "next/router";
function index(props) {
    console.log(props);
    return (
        <Link href="/"><a>去index</a></Link>
    );
}
export default withRouter(index);
```

index2.js

```js
import React from "react";
import Link from "next/link";
import { withRouter } from "next/router";//高阶函数可用于接收路由参数
function index (props){
    console.log(props);
    return (
        <Link href="/"><a>去index</a></Link>
    );
}
export default withRouter(index);
```

* 数据请求

> 在`Next.js`框架中提供了`getInitialProps`静态方法用来获取远端数据，这个是框架的约定，所以你也只能在这个方法里获取远端数据。不要再试图在声明周期里获得，虽然也可以在`ComponentDidMount`中获得，但是用了别人的框架，就要遵守别人的约定。