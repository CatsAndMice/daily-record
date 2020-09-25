#  html基础

## 简介：

* HTMl是用于描述网页的一种语言。  
  * HTML指的是超文本标记语言  
  * HTML不是编程语言，是一种标记语言  

* HTML标签  

  * HTML标签一般成对出现的，

  * HTML5单标签，例如:<img src=""/>

  * HTML5可以用单标签定义所有标签（在HTML5中会自动补全后面的标签=>`<div />李海` ->`<div>李海</div>`）

    ```html
    <div />李海
    ```

##  body背景

设置`body`背景类似HTML5中的`canvas`，

特点：

1. 初始化时，body元素高度为0，宽度占满整个浏览器大小，自身带有`margin:8px;`。  
2. 在没有设置`body`元素高度占满，没有设置`html`颜色时，设置背景`background-color`时，页面颜色会改变。若给`html`设置背景颜色后，body的颜色区域大小恢复正常。
3.  背景图的宽度百分比，相对于浏览器视口

4. 背景图的高度百分比，相对于网页(html元素)高度

5. 背景图定位的横向位置百分比，预设值（center,left）相对视口 背景图定位的纵向位置百分比，预设值（center,left）相对网页高度

##  元素包含关系

 面试时，可以说：块级元素可以包含行级元素,行级元素不可以包含块级元素，`a`元素除外

准确的说：元素包含关系由元素内容类别决定     具体查看<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML">mdn</a>  

**总结：**

1. 容器元素（没有任何自身样式的块级元素）可以包含任何元素 

   ```html
   <div />
   <main />...
   ```

   * 这里容易搞混以为容器元素就是块级元素，

     在HTML5中，`p`元素不可以包含标题（语主义化）元素`h1,h2...`

2. 行级元素`a`元素中几乎可以包含任何元素

3. 某些元素有固定元素有固定的子元素（`ul>li,ol>li,dt>dt+dd`）

4. 标签元素和段落元素不能相与嵌套，在第一点已经讲过了

## 行盒模型

**特点：**

1. 盒子沿着内容沿伸（盒子的大小与文字有关）
2. 行盒不能设置宽高，要想改变盒子大小只能改变文字大小，修改`line-height,font-sixe`等样式
3. 对`padding,border,margin`样式设置四个方向的大小时，只对-left,-right有效果，对-top，-botton无效

* 文字间隙  

在多个行级元素或行级块元素相邻时，文字之间会有间隙

```html
<span>等级</span>
<span style="display:inline-block">等级</span>
<span>等级</span>
```

![image-20200508172748857](C:\Users\li2322873900\AppData\Roaming\Typora\typora-user-images\image-20200508172748857.png)

解决方法：

1. html文件中元素进行压缩

   ```html
   <span>等级</span><span style="display:inline-block">等级</span><span>等级</span>
   ```

   

2. 使用单标签缩写

   ```htm
   <span>等级<span style="display:inline-block">等级<span>等级</span>
   ```

   

3. 注解

   ```html
   <span></span><!--
   --><span></span><!--
   --><span></span>
   ```


4. `letter-spacing`

   ```html
   <div>
       <span>等级</span>
       <span>等级</span>
       <span>等级</span>
   </div>
   ```

   ```css
   div{
       letter-spaceing:-3px;
   }
   span{
       letter-spaceing:0;
   }
   ```

   

5. `word-spacing`

   ```css
   div{
       word-spacing:-3px;
   }
   ```

   ```html
   <div>
       <span>等级</span>
       <span>等级</span>
       <span>等级</span>
   </div>
   ```
   
   

![image-20200508225445313](C:\Users\li2322873900\AppData\Roaming\Typora\typora-user-images\image-20200508225445313.png)

##  图片底部白边问题

![image-20200508225934731](C:\Users\li2322873900\AppData\Roaming\Typora\typora-user-images\image-20200508225934731.png)

解决1：给父级的`font-size:0px;`,副作用是父级中的文字看不到

解决2：将`img`元素变成块级元素

## 视觉格式化模型

在页面上中的排列分成三种方式：

1. 常规流，（文档流，普通文档流，常规文档流）

2. 浮动
3. 定位

###  常规流布局规则 

所有元素，默认情况下都属于常规流布局。

常规流总体规则：块盒独占一行，行盒水平依次排列

包含块：每个盒子都有自己的包含块，包含块决定了盒子的排列区域。（子元    素的父元素，父元素决定了子元素的排列区域）

绝大部分情况下：盒子的包含块，为其父元素的内容盒

```html
<div>//父元素
    <div></div>//子元素
</div>
```

### 块盒模型

1. 每个块盒的总宽度(padding+content+border+margin),必须刚好等于包含块的内容盒。
2. 宽度默认为`auto`，margin默认为0。当`width,margin`同时为`auto`时，`width`占满包含块宽度，`margin`为0。因为width,margin都为auto时，width的吸收能力强于margin。
3. 在给定子元素宽高时，设置`margin：auto`,`margin-lett,margin-right`各占父元素剩余空间的1/2，而`margin-top,margin-botton`都为0

4. 若子元素的padding+content+border+margin依然没有占满父元素的宽度时，子元素margin-right来全部吸收，浏览器不会显示margin-right值

**边距合并问题：**

1. 相邻的两个常规流块盒，设置了外边距并相邻时，会进行合并，合并最大值取最大外边距

```css
div.wrapp{
    height:200px;
    background-color:red;
    margin-bottom:20px;
}
div.box{
    margin-top:30px;
    height:100px;
    background-color:blue;
}
```



```html
<div class="wrapp">块盒1</div>
<div class="box">块盒2</div>
```

![image-20200509152346798](C:\Users\li2322873900\AppData\Roaming\Typora\typora-user-images\image-20200509152346798.png)

2. 子元素与父元素外边距相邻时，也会合并边距，最大值取最大外边距

```css
div.wrapp{
    height:200px;
    background-color:red;
    margin-bottom:20px;
}
div.box{
    margin-top:30px;
    height:100px;
    background-color:blue;
}
```

```html
<div class="wrapp">
    <div class="box"></div>
</div>
```

![image-20200509152835193](C:\Users\li2322873900\AppData\Roaming\Typora\typora-user-images\image-20200509152835193.png)

###  浮动布局

**特点：**

1. 当一个元素浮动时，元素必定为块盒（自动更换display值 ）

2. 浮动元素的包含块，和常规流一样，为父元素的内容盒中活动

盒子尺寸

1. 宽度为atuo时，宽度大小要看内容宽度的脸色，（常规流宽度会占满父级）
2. 高度为auto时，与常规流一致，适应内容高度
3. margin为auto，四个方向都为0（常规流中是左右会吸收）

盒子排列

1. 向左浮动的盒子靠上靠左排列

2. 向右浮动的盒子靠上靠右排列

3. 浮动盒子在包含块中排列时，会避开常规流盒子

```css
 .wrapp {
     height: 200px;
     margin-top: 20px;
     background-color: red;
 }
 .box {
     width: 100px;
     height: 100px;
     background-color: blue;
 }
 .left{
     float: left;
     width: 100px;
     height: 100px;
     background-color: antiquewhite;
 }
```

```html
  <div class="wrapp">
      <div class="box"></div>
      <div class="left"></div>
      <div class="left"></div>
      <div class="left"></div>
  </div>
```



![image-20200509155214137](C:\Users\li2322873900\AppData\Roaming\Typora\typora-user-images\image-20200509155214137.png)

4. 常规流会无视浮动元素

```html
 <div class="wrapp">
      <div class="left"></div>
      <div class="left"></div>
      <div class="left"></div>
     <div class="box"></div>
  </div>
```

![image-20200509155423865](C:\Users\li2322873900\AppData\Roaming\Typora\typora-user-images\image-20200509155423865.png)

5. 行级元素会避开浮动元素

```css
 .wrapp {
     height: 200px;
     margin-top: 20px;
     background-color: red;
 }
 .left{
     float: left;
     width: 100px;
     height: 100px;
     background-color: antiquewhite;
 }
 span{
     background-color: aqua;
 }
```

```html
 <div class="wrapp">
      <div class="left"></div>
</div>
```

![image-20200509155743422](C:\Users\li2322873900\AppData\Roaming\Typora\typora-user-images\image-20200509155743422.png)

【注意点】

使用浮动布局时，父级高度会坍塌，根本原因在于：常规流在自动高度（子元素高度相加）时，不会考虑浮动盒子的高度

解决方法：

1. 清除浮动三要素,给父级添加

```css
*::after{
    content:"";
    display:block;
    clear:both;
}
```

2. 父级触发BFC

触发条件：

1. 浮动和绝对定位(相对定位不算)

2. overflow不等于visible的块盒(一般用hidden，因为副作用最少)

```css
父{
    position:absolute;或者overflow:hidden;
}
```

