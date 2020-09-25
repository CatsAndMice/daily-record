## 裁剪clip-path

>`clip-path`css属性可以创建一个只有元素的部分区域可以显示的剪切区域。区域内的部分显示，区域外的隐藏。剪切区域是被引用内嵌的URL定义的路径或者外部svg的路径，或者作为一个形状。clip-path属性代替了现在已经弃用的剪切 `clip`属性。

语法详解

基本图形：

> inset：定义一个矩形，注意定义矩形不是`rect`,而是inset

```html
 <style>
        div {
            width: 100px;
            height: 100px;
            background-color: red;
            /* top，right,bottom ,left  圆角 尺寸 */
            clip-path: inset(0 0 10px 20px round 20px);
        }
    </style>

<div></div>
```

> circle：定义一个圆

可传两个参数：

圆的半径:默认元素宽高两者最少的作为直径，支持百分比

圆的中心位置：默认元素中心点

```html
<div></div>
```

```css
 div {
     width: 100px;
     height: 100px;
     background-color: red;
     /* 半径，中心位置 */
     clip-path:circle(20px at 50px 50px)
     }
```

> elipse:定义一个椭圆

可传三个参数

椭圆x轴半径：默认是宽度的一半，支持百分比

椭圆y轴半径：默认高宽的一半，支持百分比

椭圆的中心位置：默认元素中心点

```css
div {
    width: 100px;
    height: 100px;
    background-color: red;
    /* clip-path:ellipse() 不传参数则采取默认值：x轴半径：50px,y轴半径：50px,中心点位置：50px,50px*/
    clip-path: ellipse(30% 50% at 50% 50%);
    }
```

> polygon:定义一个多边形

可以传入多个定点坐标，每个定点坐标对应（x,y）,支持百分比

```css
  div {
      width: 100px;
      height: 100px;
      background-color: red;
      clip-path: polygon(0px 50px, 50px 0, 100px 100px);
      }
```

## 覆盖 mask

### mask-image属性  

mask-image指遮罩使用的图片资源，默认值是`none`  
支持：`url()`功能符，`image()`功能符，甚至`element()`  
支持base64内嵌图片也是支持的，支持`.svg`,内嵌svg元素覆盖在谷歌不支持，火狐支持  

```html
<svg>
    <defs>    
        <mask id="mask" maskContentUnits="objectBoundingBox">
            <ellipse cx=".5" cy=".5" rx=".4" ry=".2" fill="white"></ellipse>
            <rect x=".3" y=".1" width=".4" height=".8" rx=".1" ry=".1" 
fill="white"></rect>
        </mask>
    </defs>    
</svg>
```
```css
.mask-image {
    mask-image: url(#mask);    /* #mask对应SVG中<mask>元素的id属性值 */
}
```
* `image()`功能符资源作为遮罩  
```css
.mask-image {
    width: 250px; height: 187.5px;
    -webkit-mask-image: image(url(loading.png), skyblue);
    mask-image: image(url(loading.png), skyblue);
}
```
火狐，谷歌暂不支持 

* `image-set()`功能符资源作为元素    
Edge,Firefor都不支持，  
谷歌，Safari/Android都可以无障碍使用，  
`image-set()`:作用是可以让不同屏幕密度设备加载不同的图片资源,对背景`background-image`
也能使用。
```css
.example {
    background-image: -webkit-image-set( "test.png" 1x, "test-2x.png" 2x, 
"test-print.png" 600dpi );
}
```
```css
.mask{
     /* 在屏幕密度（设备像素比为1）设备下使用loading.png，屏幕密度比2大的时候使用star.
svg作为遮罩图片*/
      -webkit-mask-image: -webkit-image-set(url(loading.png) 1x, url(star.svg) 2x)
;
     
    mask-image: image-set(url(loading.png) 1x, url(star.svg) 2x);
}
```

* `cross-fade()`功能符资源作为遮罩元素  
目前兼容性和image-set()功能符类似，Chrome和移动端可以使用，Edge, Firefox尚不支持。  
```css
/* 用法 
两个图片地址，外加一个透明度百分比。
*/
background-image: -webkit-cross-fade(url(1.jpg), url(2.jpg), 50%);
```
**`cross-fade()`的透明度只作用于后面一张图片上** 

*` element()`功能符资源作为遮罩元素   
只有firefox浏览器支持element()功能符，并且需要-moz-私有前缀。  

* <gradient>渐变作为遮罩图片

### mask-mode属性 

mask-mode属性的默认值是match-source，意思是根据资源的类型自动采用合适的遮罩模式。  

如果我们的遮罩使用的是SVG中的<defs>中的<mask>元素，则此时的mask-mode属性的计算值是
luminance，表示基于亮度遮罩。如果是其他场景，则计算值是alpha，表示基于透明度遮罩。
```css
mask-mode: alpha;
mask-mode: luminance;
mask-mode: match-source;
```
mask-mode仅Firefox浏览器支持，因此，Chrome浏览器是看到的依然是基于alpha遮罩的效果，颜色
不像上图那样淡。

### mask-repeat属性  

mask-repeat属性的默认值是repeat，行为类似于background-repeat属性。  
由于mask-image支持多遮罩图片，因此，mask-repeat也支持多属性值，例如：  
```css
由于mask-image支持多遮罩图片，因此，mask-repeat也支持多属性值，例如：
```

### mask-position属性  

mask-position和background-position支持的属性值和表现基本上都是一模一样的。

例如，mask-position默认计算值是0% 0%，也就是相对左上角定位。  

### mask-clip属性  

mask-clip属性性质上和background-clip类似，但是mask-clip支持的属性值要多一点，主要是多
了个SVG元素的mask-clip支持。 

```css
mask-clip: content-box;
mask-clip: padding-box;
mask-clip: border-box;

/* 前面只对普通元素有，下面的要对svg */
mask-clip: fill-box;
mask-clip: stroke-box;
mask-clip: view-box;

mask-clip: no-clip;
```

### mask-origin属性  

mask-origin属性性质上和background-origin类似，但是mask-origin支持的属性值要多一点，主
要是多了个SVG元素的mask-origin支持。  
```css
mask-origin: content-box;
mask-origin: padding-box;
mask-origin: border-box;
mask-origin: fill-box;
mask-origin: stroke-box;
mask-origin: view-box;
```

### mask-size属性  

mask-size属性性质上和background-size类似，支持的属性值也类似，作用是控制遮罩图片尺寸。

默认值是`auto`.

支持`contain`和`cover`这两个关键字：  
```css
mask-size: cover;
mask-size: contain;
```
也支持各类的数值（缺少的会自动计算为auto）
```css
mask-size: 50%;
mask-size: 3em;
mask-size: 12px;

mask-size: 50% auto;
mask-size: 3em 25%;
mask-size: auto 6px;
```

## 计算属性counter

```html
 <div class="box">
     <div></div>
     <div></div>
     <div></div>
     <div></div>
     <div></div>
     <div></div>
     <div></div>
     <div></div>
     <div></div>
     <div></div>
     <div></div>
     <div></div>
     <div></div>
     <div></div>
     <div></div>
     <div></div>
     <div></div>
     <div></div>
     <div></div>
     <div></div>
 </div>
```

```css
  .box{
      width: 200px;
      column-count: 4;
      column-gap: 50px;
  }
  .box>div {
      counter-increment: item 1;
      width: 50px;
      margin: 5px 5px;
      background-color: aqua;
  }
  .box>div::after {
      content: counter(item);
      width: 20px;
      height: 20px;
      line-height: 20px;
      text-align: center;
      color: #fff;
      display: block;
      background-color: black;
  }
  .box div:nth-child(even) {
      height: 50px;
  }
  .box div:nth-of-type(odd) {
      height: 100px;
  }
```

## shapes布局

在用`shapes布局`时要用***浮动属性**`float`才能有效

### 了解shape-outside  

`shape-outside`是不规则形状环绕布局的核心，属性值分为如
下：  
`1.none  默认值  
2.shape-box-图形盒子 
3.basic-shape-基本图形函数
4.image-图像类
`  
其中：  
`none`很好理解，表示就是普通的矩形环绕。
`shape-box`（图形盒子）是shape相关布局中的一个名词，比
clip-path属性中的`geometry-box`（几何盒子）支持的盒子要少一
些，就是CSS2.1中的基本盒模型的4种盒子，分别是margin-box，
border-box，padding-box和content-box。要来指定文字环绕的时
候是依照哪个盒子的边缘来计算的。  
`basic-shape`指的是基本形状函数，和CSS `clip-path`剪裁属性
支持的基本形状函数一模一样。`inset`方形...  

**值**  
`none`：该浮动区域不产生影响，行内元素以默认的方式包裹着该元
素的margin box。  
`shape-box`:margin-box,content-box,padding-box,
border-box四个值  
`basic-shape`：基于`inset(),circle(),ellipse(),polygon()
`,默认为`margin-box`
`image`:以图片非透明区域进行文字包裹   

### shape-margin  

用于设定由`shape-outside`创建的CSS形状的外边距。  
**值**  
shape-margin：最大值为浮动元素的大小，超出则以浮动元素的大小
包裹  

### shape-image-thresshold

 通过设定一个alpha通道的界限值来提取`shape-outside`值为图像
的形状。  

**值**  
设定界限值从图像提取形状。在0.0（完全透明）到1.0（完全不透
明）之外的值会被重置（译者：如，小于0.0的值会被重置成0.0）  
`透明度大于这个值的区域为shape-outside值的图像的形状`

## pointer-events  
指定在什么情况下某个特定图形元素可以成
鼠标事件`target`  
**值**  
`auto`:与未设置`pointer-events`属性
表现效果相同  
`none`:元素永远不会成为鼠标事件的
`target`,对绑定鼠标事件的函数都无效。
但是对未设置`none`的子元素有效  
`其他值`：主要是适用`SVG`  

----
## 字间距  
`行间距`不用说大家都知道，用
`line-height`属性来实现行间距  
那么如何设置`字间距`呢？    
两个属性都可以：`letter-spacing,
ward-spacing`;  

**值**  
正负值都可以,css像素单位都有效。不接受
纯数字  

**两者区别**  
`letter-spacing`：针对单个字符间距，
一个中文字体，一个字母  
`word-spacing`:针对的是字间距，一段
文字中有多少个空格。它的作用就是将控制
这些空格大小

```css 
    div{
        border: 1px solid #000;
        height: 50px;
        letter-spacing: 10px;
    } 

```


```css
   div {
        border: 1px solid #000;
        height: 50px;
        /* letter-spacing: -1px; */
        word-spacing: 30px;
        }
```


