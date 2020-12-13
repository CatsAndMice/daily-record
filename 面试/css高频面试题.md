## 元素居中

> 页面中的要居中的元素

```html
<body>
    <div>元素居中</div>
</body>
```

1. 定位,子元素有固定宽高 

```css
 body {
     width: 100vw;
     height: 100vh;
     background-color: aqua;
     position: relative;
}

div {
    width: 20vw;
    height: 20vh;
    position: absolute;
    left: 50%;
    top: 50%;
    background-color: brown;
    margin-left: -10vw;
    margin-top: -10vh;
}
```

2. 子元素无固定宽高，定位+`transform`

```css
body {
    width: 100vw;
    height: 100vh;
    background-color: aqua;
    position: relative;
}

div {
    position: absolute;
    left: 50%;
    top: 50%;
    background-color: brown;
    transform: translateX(-50%) translateY(-50%);
}
```

使用`transform`不兼容低版本的IE



3. 父级设置为`flex`弹性盒子，子级`margin`设置为`auto`

```css
 body {
     width: 100vw;
     height: 100vh;
     display: flex;
     background-color: aqua;
}

div {
    margin: auto;
    width: 20vw;
    height: 20vh;
    background-color: brown;
}
```

同理缺陷是并不兼容低版本的IE，对没有`固定宽高的子级元素`也同样用该方法可以进行居中



4. 父级设置为`flex`弹性盒子，设置主轴`justify-content`,侧轴` align-items`为都为`center`,  

```css
 body {
      width: 100vw;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: aqua;
}

div {
    background-color: brown;
}
```

该方法相同对子元素是否固定了宽高，都有居中的效果



5. js方法,计算父级`width`,`height`,分别与子级`width`,`height`相减取平均值，即所得值为让子元素定位居中要设置的`left`,`top`值

```css
body {
      margin: 0;
      padding: 0;
      width: 100vw;
      height: 100vh;
      background-color: aqua;
      position: relative;
}

div {
    position: absolute;
    background-color: brown;
    display: inline-block;
}
```

```js
let body = document.getElementsByTagName("body")[0];
let div = document.getElementsByTagName("div")[0];
div.style.left = (body.clientWidth - div.clientWidth) / 2 + "px";
div.style.top = (body.clientHeight - div.clientHeight) / 2 + "px";
```

6. `grid`布局

```css
 body {
     margin: 0;
     padding: 0;
     display: grid;
     grid-template-columns: 100vw;
     grid-template-rows: 100vh;
     justify-items: center;
     align-items: center;
}

div{
    width: 200px;
    height: 200px;
    background-color: aqua;
}
```



### 两边定宽，中间自适应布局

> 双飞翼，圣杯布局

1. `flex`布局 （IE不支持，兼容性还没有`grid`好）

```html
<div class="contion">
    <div class="left">left</div>
    <div class="main">main</div>
    <div class="right">right</div>
</div>
```

```css
.contion{
    display:flex;
}
.left,.right{
    width:200px;
    min-height:100px;
}
.main{
    flex-grow:1;
}
```

2. `grid`布局 (IE10以上支持)

```css
.contion{
    display:grid;
    grid-template-columns:200px auto 200px;
}
.left,.right{
    width:200px;
    min-height:100px;
}
```

方法1，方法2缺陷为：兼容性，不兼容低版本IE



3. `postion`定位布局

```css
.contion{
   position: relative;
   box-sizing: border-box;
   padding:0 200px;
}
.left,.right{
   postion:absolute;
   top:0;
   left:0;
}
.right{
    left:auto;
    right:0;
}
.main{
   width:100%;
}
```

4. 圣杯布局  

```html
<div id="container">
    <div id="center" class="column">#center</div>
    <div id="left" class="column">#left</div>
    <div id="right" class="column">#right</div>
</div>
```

```css
#container {
    width: 50vw;
    padding: 0 200px; 
    margin: auto;
    overflow: hidden;
}

.column {
    float: left;
    position: relative;
    min-height: 200px;
    width: 200px;
}

#center {
    width: 100%; //中间元素取父级宽度
    background-color: aqua;
}

#left {
    <!--当中间区域元素取父宽度时，一行中放下left,right区域， 要想在一行需要将margin-left取自身宽度的负值，在相对定位调整元素的位置-->
    margin-left: -200px; 
    left: -200px;
    background-color: bisque;
}

#right {
    background-color: blue;
    margin-right: -200px;
}
```

5. 双飞翼布局

```html
<div id="container">
    <div id="center" class="column">
        <div class="content">#center</div>
    </div>
    <div id="left" class="column">#left</div>
    <div id="right" class="column">#right</div>
</div>
```

```css
#container {
    overflow: hidden;
}

.column {
    text-align: center;
    height: 300px;
    line-height: 300px;
}

#left,
#right,
#center {
    float: left;
}

#center {
    width: 100%;
    background-color: beige;
}

#left {
    margin-left: -100%;
    background-color: aqua;
    width: 200px;
}

//
#right {
    margin-left: -200px;//不能用-100%,会与left区域重合
    width: 200px;
    background-color: blanchedalmond;
}


.content {
    margin: 0 200px;//让中间区域居中
}
```



### CSS解析性能

```css
a{
    color:blue;
}
```

```css
.contion a{
    color:blue;
}
```

两者谁性能好？

前者，因为CSS选择器解析顺序是`从右往左`，`.contion a`从先从`a`开始查找到`.contion`

