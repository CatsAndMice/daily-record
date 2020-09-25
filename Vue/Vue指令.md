## 指令

前缀`v-*`;

* `v-pre`

路过元素和它的子元素的编译过程

路过没有指令的节点，加快编译

```html
<div id="app" v-pre>{{ msg }}</div> <!--页面结果就是： {{msg}} -->
//=>是用DOM元素上的outHTML将自己拿过来然后在进行替换
```

* v-cloak

闪烁问题   解决网络慢时页面闪烁问题

* v-once

只渲染一次。后面渲染时，直接路过

* v-text

更新元素的textContent  innerText，会将元素内的元素全部清空

插值表达式:{{ }}

v-text 替换元素中所有的文本

{{ }} 只替换自己，不清空元素内容

v-text 优先级高于{{ }}

```html
<div id="app" v-text="msg1">{{ msg }}</div>
```

**textContent与innerText的区别：**

1. textContent与innerText两者都会把节点下的所有子节点也一并替换掉

```js
dom.textConent = "Vue"
```

2. textContent会获取元素及其子元素的文本，innerText只会获取自身的文本
3. innerText会受css影响，不获取隐藏文本。而textContent不会

```css
div{
    display:none
}
```

4. innerText会触发重排
5. textContent是标准方法（支持IE8+），innertext是IE引入 

从性能上，Vue选择了textContent

* v-html

更新元素的innerHtml

【注意】安全，xss攻击

想在可信内容上使用v-html，永远不要用在用户提交的内容上

```js
  const vm = new Vue({
      el: "#app",
      data: {
          msg: "hello",
          msg1: "Vue",
          html: "h"
      }
  })
  var btn = document.getElementsByTagName("button")[0];
  var html = "";
  document.getElementsByTagName("input")[0].oninput = (function () {
      //防抖
      var stat = 0;
      return function () {
          var end = new Date().getTime();
          if (end - stat > 500) {
              stat = end;
              html = `<div>${this.value}</div>`;
              console.log(this.value);
              
          }
      }
  })()
  btn.onclick = function () {
      vm.html = html;
  }
```



### 条件渲染

* v-if

可以用一个`<template>`元素包裹，该`<template>`元素在页面上不可见，

* v-else

为v-if或者v-slse-if添加else块

注意：前一个兄弟元素必须有v-if或v-else-if