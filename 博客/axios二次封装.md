使用`webpack`打包

```js
npm i -D webpack webpack-cli;
```

下载`axios`,`qs`

```js
npm i axios qs;
```



配置`webpack-cli`命令

```js
npx webpack --mode=production //生产环境（已经可以放在服务器运行），全部压缩后的代码，


npx webpack --mode=development//开发环境，便于调试
```

在package.json文件中配置

```js
"scripts": {
    "dev":"webpack --mode=development",
    "build":"webpack --mode=production ",
    "test": "echo \"Error: no test specified\" && exit 1"
},
```

webpack寻找到在`src`文件夹下的`index.js`作为入口文件，打包在`dist`文件夹下



`src/index.js`

```js
import axios from "axios";
import qs from "qs";

/**
 * 根据环境区分不同的ip地址
 */
switch (process.env.NODE_ENV) {
    case "deveplopment"://开发环境
        axios.defaults.baseURL = "http://127.0.0.1:3000";
        break;
    case "test":
        axios.defaults.baseURL = "..";
        break;
    default://默认走开发环境
        axios.defaults.baseURL = "http:127.0.0.1:3000";
        break;
}

/**
 * 设置响应时间，跨域是否携带凭证
 */
axios.defaults.timeout = 10000;
axios.defaults.withCredentials = true;//跨域过程是否携带资源 


/**
 * 设置请求传递数据的格式  (主要看服务器要求是什么格式)
 * x-www-form-urlencoded  (键值对形式：xxx=xxx)  服务器常用格式
 * 
 */
axios.defaults.headers["Content-Type"] = "application/x-www-from-urlencoded";//明确传递数据格式


/**
 * post请求，传递数据 
 * 将post请求传递给服务器的数据转换成xxx=xxx(键值对)的格式，
 */
axios.defaults.transformRequest = data => qs.stringify(data);//第三方包转换


/**
 * 设置请求拦截器
 * 
 * 向服务器请求后，获取token并且将其存储到vuex或本地存储中
 * 每次向服务器请求时，都应该将token带上
 */
axios.interceptors.request.use(config => {//config：设置后的请求配置
    //获取存储的token
    let token = localStorage.getItem("token");
    token && (config.headers.Authorization = token);//每次请求自动携带上token

    return config;//配置完的参数一定要返回
}, err => {//请求失败
    console.log(err);
    return Promise.reject(err);
})

/**
 * 响应拦截器
 */

//校验响应回来的状态码
axios.defaults.validateStatus = status => {
    return /^(2|3)\d{2}&/.test(status);//设置2或3开头为成功
}



axios.interceptors.response.use(res => {
    return res.data; //直接返回数据主体，没必要在每次请求获取数据时，反复判断是否成功然后获取主体数据 
}, err => {
    let { response } = err;
    if (response) {
        //服务器返回了结果

        switch (response.status) {
            case 401://一般为未登陆
                //do some things  跳转至登陆页面 
                break;
            case 403://可能为token过期
                //do some things  登陆过期，清除token,跳转登陆页面
                break;
            case 404:
                break;
        }

    } else {
        //服务器连结果都没有返回

        //判断是否网络问题
        if (!window.navigator.onLine) {
            //可以添加一个断网处理页面，断网时跳转至断网页面
            return;
        }

        //服务器问题
        return Promise.reject(err);
    }
});

export default axios;

```

`src/http.js`

```js
import axios from "./index.js";
async function http(url, props = {}) {
    let url = axios.defaults.baseURL + url,
        res = null;

    props.method ? null : props.method = "get";
    switch (props.method.toUpperCase()) {
        case "POST":
            res = await axios.post(url, props);
            break;
        default:
            res = await axios.get(url, props);
            break;
    }
    return res;
}

export default http;
```



