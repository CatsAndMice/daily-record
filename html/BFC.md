##  块级格式化上下文

简称：BFC

它是一块独立的渲染区域，它规定在该区域中，常规流块盒的布局

1. 常规流块盒在水平方向上，必须撑满包含块
2. 常规流块盒在包含块的垂直方向上依次摆放
3. 常规流块盒基外边距相邻，则进行外边距合并 
4. 常规流块盒的自动高度与摆放位置，无视浮动元素



**BFC渲染区域**

这个区域由某个html元素创建，以下元素会在其内部创建BFC区域：

1. 根元素（html）
2. 浮动和绝对定位(相对定位不算)
3. overflow不等于visible的块盒(一般用hidden，因为副作用最少)

**具体规则：**
1.创建BFC的元素，它的自动高度需要计算浮动元素
2.创建BFC的元素，它的边框盒不会与浮动元素重叠
3.不会和它的子元素进行外边距合并 

```css
 .left {
     float: left;
     width: 100px;
     height: 100px;
     background-color: red;
 }
 .box {
     overflow: hidden;
     width: 100px;
     height: 100px;
     background-color: aqua;
 }
```

```html
 <div class="left"></div>
 <div class="box"></div>
```

![image-20200510222326377](C:\Users\li2322873900\Desktop\markdown\html\image-20200510222326377.png)