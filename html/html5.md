## 语义化标签

```html
<header>头部</header>
<nav>导航</nav>
<section>章节</section>
<main>
内容
    <artcle>左边</artcle>
    <aside>右边</aside>
</main>
<footer>底部</footer>
```

语义化标签没有自带的样式，与div一样。

在动态的创建语义化标签时，默认的标签类型都是行级元素

```js
document.createElement("header");
```

## 表单元素

 placeholder:提示文本，提示占位 

 autofocus:自动获取焦点 -
autocompplete：自动完成提示  ：on:打开 off:关闭
   1.必须成功提交过：提交才会有记录
   2.当前添加autocomplete的元素必须有name属性 

```html
  <form action="" id="input">
       用户名：<input type="text" name="usename" placeholder="请输入用户名" autofocus autocomplete="on"><br>
       <!-- tel：不去验证，仅仅是在移动端弹出数字键盘
       required:必须输入，如果不输入则提交时阻止
       patteern:正则表达式验证 -->
       手机号;<input type="tel" required pattern="^1\d{10}"><br>
       <!-- multiple：可以选择多个文件
       在email中，multiple允许输入多个邮箱地址 -->
       文件：<input type="file" name="use" multiple><br>
       邮箱：<input type="email" multiple><br>
       <input type="submit">
   </form>
```

单向选择

```html
<select name="" id="">
<option value="1">c</option>
<option value="2">k</option>
<option value="3">j</option>
</select>
```



h5新增元素：datalist创建列表

```html
 <!-- 在不同浏览器效果不同很少用的元素 -->
 <!-- h5新增元素：datalist创建列表 -->
 <!-- 不仅可以选择，还可以输入 -->
 <!-- 建立输入框与datalist关联 list="datalist的id号" -->
 专业：<input type="text" list="form">
 <datalist id="form">
     <!-- 创建选项值：value:具体的值  label:提示信息，辅助值 -->
    
     <!-- option可以是单标签也可以是双标签 -->
     <option value="c" label="好难">
     <option value="java" label="容易"></option>
     <option value="html" label="一般"></option>
 </datalist>
```

h5多媒体标签

 ```html
 <!-- audio:音频 
 src:播放音频文件位置
 controls:音频播放器的控制面板
 autoplay:自动播放
 loop:循环播放
 -->
 <audio src="./意外.mp3" controls autoplay></audio>
 ```

```html
  <!-- video:视频 
  src:播放音频文件位置
  controls:音频播放器的控制面板
  autoplay:自动播放
  loop:循环播放
  poster:指定视频还没有下载完毕，或者用户没有点击前显示的画面。
  默认显示的是当前视频的第一副图像
  width:视频的宽度
  height:视频的高度
  不需要加px
  -->
  <!-- 注意：设置视频宽高的时候，一般只会设置宽度或者高度，让视频自动缩放
  不然只是将视频占据的区域设置为指定大小 -->
  <!-- 有时视频格式不一样，在不同的浏览器中会不一定支持
  不支持就播放下一个可以播放的 -->

  <!-- source:因为不同浏览器所支持的视频格式不一样，为了保证用户能够看到，提供了
  多个视频让浏览器自动选择 -->
  
  <!-- <video src="" controls width="300"></video> -->
  
  <video controls>
      <!-- 视频源，可以多个源 -->
      <source src="../多媒体标签使用/视频.mp4" type="video/flv">
      <source src="" type="video/mp4">
  </video>
```



## 全局属性

**accesskey** 

指定访问当前元素的快捷键

 **dir**

dir属性是可以改变文档流的水平流动方向  
例如英文和中文的阅读是从左往右，阿拉伯语则是从右往左  

ltr  
文档呈现从左往右。  

rtl  
文档呈现从右往左。

auto  
由浏览器自己决定决定。它使用一个基本算法来解析元素中的字符，直到找到一个具有强方向性的字符，然后将该方向性应用于整个元素。

 **hidden** 

hidden属性可以让元素隐藏，表现为display:none，相比类名或者style设置display:none的优点在于优先级极低，可以轻松reset。

IE11+以及其他现代浏览器都支持。  

**title**

title表示元素的标题，在PC端浏览器中，鼠标hover会显示相关的提示。 

 **tabindex**

tabindex可以用来设置元素是否能够被Tab键索。  

如果属性值是负值，表示当前元素可以被focus，但是不能使用键盘访问
如果属性值是0，表示可以被focus，按照DOM先后位置顺序被键盘访问。
如果属性值是正值，则表示可以被focus，同时有优先的键盘访问属性。 

 **draggable** 

draggable属性在拖拽交互中非常有用。支持属性值如下：

true  
元素可以被拖拽。  

false  
元素不能被拖拽。

其中`p`元素天然不能被拖拽，因此，设置draggable="false"的效果和默认效果一样，而设置了draggable="true"之后，则同样也可以被拖拽
了。  

<a href="https://www.zhangxinxu.com/wordpress/2019/11/css-value-type/">CSS值类型文档大全</a>