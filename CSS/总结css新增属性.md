## `display:flow-root`

在使用`display:flow-root`无论是行级元素还是块级元素，都会变成块级元素，同时该元素会建立新的块级格式上下文(BFC)

BFC可以用于清除浮动，以及去除margin合并现象。

BFC触发条件：根元素，定位，浮动，或者`overflow`隐藏，inline-block等特性产生。

其中`display:flow-root`不会给元素带有额外的副作用

## CSS columns实现两端对齐布局效果

```css
parset{
    columns:3;
    columns-gap:30px;
}
```

优点：保护了HTML元素原本的`display`计算值, 如果使用Flex或者Grid布局，就要设置`display:flex`或者`display:grid`,改变了`display:list-item`计算值，圆点，或数字序号消失