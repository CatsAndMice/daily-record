## Vuex

> vue状态管理器，为了方便实现多个组件共享状态

```js
npm install vuex --save
```



### Vuex_State

```js
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

let store = new Vuex.Store({
    state:{
        count:0
    }
})

new Vue({
    store
})
```

State：单一状态树，使用一个对象就包含了全部状态

* 获取Vuex状态

```js
this.$store.state.count //0
```

**问题：**

每次获取vuex状态时，总是要`this.$store.state`非常的烦，

Vuex为我们提供也辅助函数：

mapState:帮助我们生成计算属性

```js
import {mapState} from "vuex";
export default {
    computed:mapState(["count"]) //等价于=>this.count = store.state.count
}
```

如果在`computed`中写自己的计算属性可以使用扩展运算符

```js
import {mapState} from "vuex";
export default {
    computed:{
        ...mapState(["count","b"]), //等价于=>this.count = store.state.count,this.b = store.state.b
        a(){
            ...
        }
}
```

如果在组件的`data`中已经存在`count`,然后在计算属性中定义vuex的状态。由于命名冲突会报错。data中的count优先级大于vuex中的count

```js
import {mapState} from "vuex";
export default {
    data:{
        count:0
    },
    computed:{
        ...mapState(["count"]), //等价于=>this.count = store.state.count,this.b = store.state.b
        a(){
            ...
        }
}
```

**解决：**

对vuex重新命名

```js
import {mapState} from "vuex";
export default {
    data:{
        count:0
    },
    computed:{
        //对象形式重新命名
        ...mapState({
            storeCount:store=>store.count,//也可以简写成：storeCount:"count"
        })
    }

}
```

### Vuex_Getter

store的计算属性。getters的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生改变才会被重新计算

```js
getters{
    doubleCount(store){
        return state.count*2;
    }
}
```

#### 属性访问

Getter会暴露为store.getters对象：`this.$store.getters.doubleCount`

#### 方法访问

getters返回一个函数

```html
<div>{{this.$store.state.addCount(2)}}</div>
```



```js
new Vuex.Store({
    state:{
        count:0
    },
    getters:{
        addCount(store){
            return (num)=>{
                return num*store.count;
            }
        }
    }
})
```

#### mapGetters辅助函数 

```js
import {mapGetters} from "vuex";
export default {
    computed:{
        ...mapGetters(["addCount"])
    }
}
```

### Vuex_Mutation

> 更改Vuex的store中的状态的唯一方法是提交mutation

在严格模式下，只能用Mutation更改Vuex中store的状态，否则报错

不在严格模式下，可以直接`this.$store.state.count=1`

#### 严格模式

```js
new Vuex.Store({
    strict:true,//开启严格模式
    state:{
        count:0
    },
    getters:{
        addCount(store){
            return (num)=>{
                return num*store.count;
            }
        }
    }
})
```

#### 开发模式与发布模式

不要在发布模式下启用严格模式！严格模式会深度监测状态树来检测不合规的状态变更，要确保在发布环境下关闭严格模式，以避免性能损失

```js
const store = new Vuex.Store({
    strict:process.env.NODE.ENV !== "production"
})
```



触发：`this.$store.commit("方法名")`或者`mapMutations`辅助函数 

```js
const store = new Vuex.Store({
    strict:process.env.NODE.ENV !== "production",
    state:{
        count:0
    },
    mutations:{
        addCountMut(state,{num}){//第二个为接收的参数
            state.count = state.count+num;
        }
    }
})
```

```js
<div @click=""></div>

import {mapMutation} from "vuex";
new Vue({
    methods:{
        addCount(){
            ...mapMutation(["addCountMut"]); //方法2
            //传递参数
            this.$store.commit("addCountMut",{num:Math.random()*100});//触发mutation  方法1
        }
    }
})
```

使用对象形式触发

```js
this.$store.commit({
    type:"addCountMut",
    num
})
```

#### Mutation需遵守Vue响应规则 

Vuex的store中状态的是响应的，那么当我们变更状态时，监视状态的Vue组件也会自动更新。这意味着Vuex中的Mutation也需要与使用vue一样遵守

* 提前在store中初始化所有的所需的属性

* 当需要在对象上添加新属性时，应该：

  * 使用Vue.set(obj,"prop",20)或者
  * 以新对象替换旧对象，

  ```js
  state.obj = {...state.obj,prop:20}
  ```

  

#### 计算属性双向绑定

```js
new Vue.Store({
    state:{
        count:""
    },
    mutation:{
        addCount(store,{num}){
            store.count+=num;
        }
    }
})
```



```js
<input v-modul="count"><input>

new Vue({
    computed:{
        count:{
            get(){
                return this.$store.state.count;
            },
            set(val){
                this.$store.commit("addCount",{num:val})
            }
        }
    }
})
```

#### Mutation 必须是同步函数 

```js
new Vuex.Store({
    state:{
        count:0
    },
    mutation{
    	addCount(store){
    	//报错，异步会在mutation外部执行
    		setTimeout(()=>{
                store.count++;
            },2000)
		}
	}
})
```

**why?**

更改store状态操作是在回调函数中执行的，我们的代码在devtools工具不好调试：当mutation触发时，回调还没有被调用，devtools不知道什么时候回调函数会被调用，store状态改变时变得不可追踪



### Vuex_Action 

Action类似Moutation，不同在于：

* action 提交的是mutation ,而不是直接变更状态
* action 可以包含任意异步操作

Action函数接收一个与store实例相同的方法与属性的context对象。调用`context.commit`提交一个mutation,或者通过`context.state`和`context.getters`来获取`state`和`getters`:

```js
const store = new Vuex.Store({
    state:{
        count:0
    },
    mutation：{
    	increment(store){
    		store.count++;
		}
	},
    actions:{
          incrementAction(context){
              context.commit("increment");
          }
    }
})
```

#### 分发Actions

```js
this.$store.dispatch("increment");
```

与`mutation`相同，但是在`actions`中，可以执行异步操作，但是在`mutation`中不行

```js
actions:{
    incrementAction(context){ //它也可以接收第二个参数
        setTimeout(()=>{
            context.commit("increment");
        },2000);
    }
}
```

#### 组合action

action执行异步函数后，我们要知道action结束

```js
actions:{
    actionFn(context){
        return Promise((resole,reject)=>{
            setTimeout(()=>{
            	context.commit("...");
                resolve();
            },200)
            
        })
    }
}
```

#### Vuex管理流程图

![vuex](https://vuex.vuejs.org/vuex.png)

### Vuex_Module

