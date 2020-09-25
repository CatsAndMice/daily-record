## css-loader（webpack）

作用：就是将css代码转换成js代码

处理原理：将css代码作为字符串导出

```css
.red{
    color:"#000";
}
```

经过css-loader转换后变成js代码：

```js
module.exports = `.red{
	color:"#000";
}`
```

简化后的，css-loader转换后代码有些复杂，同时会导出更多信息，但核心思想 不变。

## 解决重复样式的问题

**css in js**

用js对象来写css样式，太激进，开发者不适应

```js
var style ={
    color:"#000"
}
var dom  = docment.get..("div");

function styleDom(dom,style){
    ...
}

styleDom(dom,style)
```

**预编译器**

基本原理

css出现的问题：

* 重复样式：颜色，尺寸
* 重复代码段：定位居中
* 重复嵌套书写