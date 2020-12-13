







## CSS   grid网格

> grid网格布局功能强大，属性蛮多。
>
> 我参考阮一峰老师网络日记，记录下我认为常用属性



[兼容性](https://caniuse.com/?search=grid)

![image-20201101165205598](C:%5CUsers%5Cli2322873900%5CDesktop%5C%E7%AC%94%E8%AE%B0%5CCSS%5Cgrid%E7%BD%91%E6%A0%BC.assets%5Cimage-20201101165205598.png)

设置父元素`display`为`grid`,父级区域会被分划成网格，具有块级元素特性 ，若要有行内元素特性可以设置`display:inline-grid;`

```html
  <div class="main">
        grid
    </div>
    <div class="other">
        其他
    </div>
```

```css
.main {
      display: grid;
      background-color: bisque;
      width: 200px;
      height: 200px;
}
.other{
    background-color: aqua;
    width: 200px;
    height: 200px;
}

```





![image-20201101171337002](C:%5CUsers%5Cli2322873900%5CDesktop%5C%E7%AC%94%E8%AE%B0%5CCSS%5Cgrid%E7%BD%91%E6%A0%BC.assets%5Cimage-20201101171337002.png)

* 设置行列

`grid-template-columns`属性用于设置`列数`与`每列的宽度`

`grid-template-rows`属性用于设置行数与每行的高度

<div class="main">
    <div class="left b">left</div>
    <div class="contion b">center</div>
    <div class="right b">reight</div>
</div>

```css
.main{
    display:grid;
    grid-template-columns:100px 100px 100px; //三列  每列宽度为100px
    grid-template-rows:100px; // 一行  每行高度为100px
}
```

![image-20201101152221252](C:%5CUsers%5Cli2322873900%5CDesktop%5C%E7%AC%94%E8%AE%B0%5CCSS%5Cgrid%E7%BD%91%E6%A0%BC.assets%5Cimage-20201101152221252.png)

* `grid-template-columns`，`grid-template-rows`所支持的值类型

  * 绝对单位`px`
  * 百分比

  ```css
  .main{
      display:grid;
      grid-template-columns:33.3% 33.3% 33.3%; //每列宽度占父级宽度的1/3
      grid-template-rows:100px;
  }
  ```

  * `repeat()`

  接受两个参数

  ```css
  grid-template-columns:repeat(3,100px);//三列，每列宽度为100px
  ```

  重复某种模式

  ```css
  grid-template-columns:repeat(3,100px 200);//六列  100px 200px 100px 200px 100px 200px
  ```

  * auto 由浏览器决定宽度

  ```css
  grid-template-columns:100px auto 100px;
  ```

  * fr  类似于百分比

  ```
  grid-template-columns:1fr 1fr 1fr;//将父级宽度平分成3份
  ```

  * minmax() 取值范围,接收两个参数最小值与最大值 

  ```
  grid-template-columns:100px 100px minmax(50px,100px)
  ```



* `grid-row-gap`,`grid-columns-gap`设置行列间距

```css
  .main {
      display: grid;
      grid-template-columns: repeat(3,100px);
      grid-template-rows: 100px;
      grid-row-gap: 20px;
      grid-column-gap: 20px;
  }
```

![image-20201101155059792](C:%5CUsers%5Cli2322873900%5CDesktop%5C%E7%AC%94%E8%AE%B0%5CCSS%5Cgrid%E7%BD%91%E6%A0%BC.assets%5Cimage-20201101155059792.png)

`grid-gap`为`grid-row-gap`,`grid-columns-gap`合并写法

```
grid-gap:20px,20px;
```

效果与上图一致





* `grid-auto-flow`属性设置子元素排列顺序

  为了方便展示下面例子全部用下面的html元素

  ```html
  <div class="main">
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
      <div>6</div>
  </div>
  ```

  

`grid-auto-flow` 默认值为`row`，`先行后列`排列

```css
.main {
      display: grid;
      grid-template-columns: repeat(3, 100px);
      grid-template-rows: repeat(2, 100px);
      grid-row-gap: 20px;
      grid-column-gap: 20px;
}
.main div {
      border:  1px solid red;
}
```





![image-20201101160149029](C:%5CUsers%5Cli2322873900%5CDesktop%5C%E7%AC%94%E8%AE%B0%5CCSS%5Cgrid%E7%BD%91%E6%A0%BC.assets%5Cimage-20201101160149029.png)

```
grid-auto-flow:column;//先列后列
```

![image-20201101160545228](C:%5CUsers%5Cli2322873900%5CDesktop%5C%E7%AC%94%E8%AE%B0%5CCSS%5Cgrid%E7%BD%91%E6%A0%BC.assets%5Cimage-20201101160545228.png)

`grid-auto-flow`还有两个值：`row demsn` ,`row dense` 这两个值与`row,column`不同在于前者在排序时，不允许空区域，后者允许



* ` justify-items`,`align-items`设置全部单元格的放置区

值：`start | end | center | stretch;`,默认值`stretch`撑满单元格

```css
.main {
      display: grid;
      grid-template-columns: repeat(3, 100px);
      grid-template-rows: repeat(2, 100px);
      grid-gap: 2px 2px;
      grid-auto-flow: column;
      justify-items: center;

}

.main div {
    border: 1px solid red;
    height: 100px;
}
```



![image-20201101163351099](C:%5CUsers%5Cli2322873900%5CDesktop%5C%E7%AC%94%E8%AE%B0%5CCSS%5Cgrid%E7%BD%91%E6%A0%BC.assets%5Cimage-20201101163351099.png)



* `justify-content`,`align-content`属性为设置整个区域在容器里的水平与垂直位置

值：`start | end | center | stretch | space-around | space-between | space-evenly;` 

与`flex`中`justify-content`一样的值一样的效果

```css
 .main {
     display: grid;
     grid-template-columns: repeat(3, 100px);
     grid-template-rows: repeat(2, 100px);
     grid-gap: 2px 2px;
     height: 300px;
     grid-auto-flow: column;
     justify-content: space-between;
     align-content: space-between;
}
.main div {
    border: 1px solid red;
    height: 100px;
}

```

```css

.main {
    display: grid;
    grid-template-columns: repeat(3, 100px);
    grid-template-rows: repeat(2, 100px);
    grid-gap: 2px 2px;
    height: 300px;
    grid-auto-flow: column;
    justify-content: space-between;
    align-content: space-between;
}

.main div {
    border: 1px solid red;
    height: 100px;
}
```

![image-20201101164620644](C:%5CUsers%5Cli2322873900%5CDesktop%5C%E7%AC%94%E8%AE%B0%5CCSS%5Cgrid%E7%BD%91%E6%A0%BC.assets%5Cimage-20201101164620644.png)



* `justify-self`,`align-self`属性只针对单个单元格

`justify-self`,`align-self`与`justify-content`,`align-content`等属性区别：

1. 前者针对单个单元格

2. 后者针对所有的单元格

3. 前者的属性值与后者属性值相同

```css
 .main {
     display: grid;
     grid-template-columns: repeat(3, 100px);
     grid-template-rows: repeat(2, 100px);
     grid-gap: 2px 2px;
     height: 300px;
     grid-auto-flow: column;
     justify-content: space-between;
     align-content: space-between;
}

.main div {
    border: 1px solid red;
    height: 100px;
}

.main div:nth-child(1) {
    justify-self: center;
    align-self: center;
    width: 50px;
    height: 50px;

}

```



![image-20201101170213001](C:%5CUsers%5Cli2322873900%5CDesktop%5C%E7%AC%94%E8%AE%B0%5CCSS%5Cgrid%E7%BD%91%E6%A0%BC.assets%5Cimage-20201101170213001.png)



参考：

[阮一峰的网络日志-CSS Grid 网格布局教程](http://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html)